import { Injectable } from '@nestjs/common'
import { Cron, Timeout } from '@nestjs/schedule'
import { paginate, Pagination } from 'nestjs-typeorm-paginate'
import { Brackets, getManager } from 'typeorm'
import { User } from '../../auth/entities/user.entity'
import { MOST_VIEW_PRODUCT_REDIS_KEY } from '../../common/constants/global.constant'
import { PaginateQueryDto } from '../../common/dtos/paginate-query.dto'
import { getProductsQuery } from '../../common/query/product.query'
import { InjectRedis } from '../../redis/decorators'
import { RedisClientType } from '../../redis/types'
import { Product } from '../entities/product.entity'
import { Sort } from '../enums/sort.enum'
import { ProductImageRepository } from '../repositories/product-image.repository'
import { ProductRatingRepository } from '../repositories/product-rating.repository'
import { ProductVariationRepository } from '../repositories/product-variation.repository'
import { ProductRepository } from '../repositories/product.repository'
import { formatAndParseJsonStringFromDb } from '../utils/index.util'
import { GetProductsDto } from './dtos/get-products.dto'
import { RatingProductDto } from './dtos/rating-product.dto'

@Injectable()
export class ProductService {
	constructor(
		private productRepo: ProductRepository,
		private productRatingRepo: ProductRatingRepository,
		private productVariationRepo: ProductVariationRepository,
		private productImageRepo: ProductImageRepository,
		@InjectRedis() private redis: RedisClientType
	) {}

	@Cron('59 23 * * 0')
	async deleteMostViewedProductRedis() {
		await this.redis.del(MOST_VIEW_PRODUCT_REDIS_KEY)
	}

	// We can use custom query, or we can use nest paginate with hydration
	async getProducts(body: GetProductsDto, query: PaginateQueryDto) {
		const { size, page } = query
		const {
			brandIds,
			categoryIds,
			colorIds,
			genders,
			keyword,
			sizeIds,
			sortBy,
		} = body
		// Đầu tiên chúng ta cần lấy id của product thoả mãn điều kiện lọc
		// Sau đó chúng ta sẽ hydration cho nó
		// Chúng ta cần group by bởi vì left join sẽ multiple số hàng lên dù chúng ta có select hay là ko
		// Nên phải group by để loại bỏ số hàng đó
		const queryBuilder = this.productRepo
			.createQueryBuilder('product')
			.leftJoin('product.category', 'category')
			.leftJoin('product.brand', 'brand')
			.leftJoin('product.productImages', 'productImages')
			.leftJoin('product.productRatings', 'productRatings')
			.leftJoin('product.productVariations', 'productVariations')
			.groupBy('product.id')
			.addGroupBy('category.id')
			.addGroupBy('brand.id')
			.select('product.id')

		if (keyword)
			queryBuilder.andWhere(
				new Brackets((qb) => {
					qb.where('product.name ILIKE :keyword', {
						keyword: `%${keyword}%`,
					}).orWhere('product.description ILIKE :keyword', {
						keyword: `%${keyword}%`,
					})
					return qb
				})
			)
		if (brandIds.length)
			queryBuilder.andWhere('product.brandId IN (:...brandIds)', { brandIds })
		if (categoryIds.length)
			queryBuilder.andWhere('product.categoryId IN (:...categoryIds)', {
				categoryIds,
			})
		if (colorIds.length)
			queryBuilder.andWhere('productVariations.colorId IN (:...colorIds)', {
				colorIds,
			})
		if (sizeIds.length)
			queryBuilder.andWhere('productVariations.sizeId IN (:...sizeIds)', {
				sizeIds,
			})
		if (genders.length)
			queryBuilder.andWhere('product.gender IN (:...genders)', { genders })

		const result = await paginate<Product>(queryBuilder, {
			limit: size,
			page,
		})

		return new Pagination(
			await Promise.all(
				result.items.map(async (item) => {
					const hydratedProduct = await this.productRepo
						.createQueryBuilder('product')
						.leftJoinAndSelect('product.category', 'category')
						.leftJoinAndSelect('product.brand', 'brand')
						.leftJoinAndSelect('product.productImages', 'productImages')
						.leftJoinAndSelect('product.productRatings', 'productRatings')
						.leftJoinAndSelect('product.productVariations', 'productVariations')
						.where('product.id = :id', { id: item.id })
						.getOne()
					return hydratedProduct
				})
			),
			result.meta,
			result.links
		)

		/**
		 * Old code using plain sql query
		 */
		// let result = await getManager().query(getProductsQuery(body, query))
		// result = result.map((item: any, index: number) => {
		// 	item.productVariation = formatAndParseJsonStringFromDb(
		// 		item.productVariation
		// 	)
		// 	item.productImage = formatAndParseJsonStringFromDb(item.productImage)
		// 	item.productRating = formatAndParseJsonStringFromDb(item.productRating)

		// 	return item
		// })
		// return result
	}

	async getProductById(id: number) {
		this.redis.ZINCRBY(MOST_VIEW_PRODUCT_REDIS_KEY, 1, String(id))

		const product = await this.productRepo
			.createQueryBuilder('product')
			.where('product.id = :id', { id })
			.leftJoinAndSelect('product.category', 'category')
			.leftJoinAndSelect('product.brand', 'brand')
			.leftJoinAndSelect('product.comments', 'comments')
			.leftJoinAndSelect('comments.user', 'user')
			.leftJoinAndSelect('user.userAvatar', 'userAvatar')
			.leftJoinAndSelect('product.productImages', 'productImages')
			.leftJoinAndSelect('product.productRatings', 'productRatings')
			.leftJoinAndSelect('product.productVariations', 'productVariations')
			.leftJoinAndSelect('productVariations.color', 'color')
			.leftJoinAndSelect('productVariations.size', 'size')
			.orderBy('comments.updatedAt', 'DESC')
			.getOne()
		return product
	}

	async getMostViewedProduct() {
		const mostViewedProductIds = await this.redis.sendCommand<string[]>([
			'ZREVRANGE',
			MOST_VIEW_PRODUCT_REDIS_KEY,
			'0',
			'9',
		])

		if (!mostViewedProductIds || mostViewedProductIds.length < 5) {
			const result = await this.getProducts(
				{
					brandIds: [],
					categoryIds: [],
					colorIds: [],
					genders: [],
					sizeIds: [],
				},
				{ page: 1, size: 10 }
			)
			return result.items
		}
		return this.productRepo
			.createQueryBuilder('product')
			.leftJoinAndSelect('product.productImages', 'productImages')
			.leftJoinAndSelect('product.productRatings', 'productRatings')
			.leftJoinAndSelect('product.productVariations', 'productVariations')
			.whereInIds(mostViewedProductIds)
			.getMany()
	}

	async ratingProduct(data: RatingProductDto, user: User) {
		const { rating, productId } = data
		await this.productRatingRepo.upsert(
			{ productId, userId: user.id, rating },
			{
				conflictPaths: ['productId', 'userId'],
				skipUpdateIfNoValuesChanged: true,
			}
		)
	}

	// Parse sort to [key, direction]
	parseSort(sort: Sort): [string, 'ASC' | 'DESC'] {
		switch (sort) {
			case Sort.PRICE_ASC:
				return ['price', 'ASC']
			default:
				throw new Error(`Sort value: ${sort} is not valid`)
		}
	}
}

import {
	BadRequestException,
	Injectable,
	NotFoundException,
} from '@nestjs/common'
import { find } from 'rxjs'
import { getManager } from 'typeorm'
import { User } from '../auth/entities/user.entity'
import {
	ExpectationFailedExc,
	OutOfStockCartExc,
} from '../common/exceptions/index.exception'
import { ProductVariation } from '../product/entities/product-variation.entity'
import { ProductVariationRepository } from '../product/repositories/product-variation.repository'
import { generateErrorOutOfStock } from '../product/utils/index.util'
import { AddCartDto } from './dtos/add-cart.dto'
import { RemoveProductDto } from './dtos/remove-product.dto'
import { UpdateCartDto } from './dtos/update-cart.dto'
import { CartRepository } from './repositories/cart.repository'

@Injectable()
export class CartService {
	constructor(
		private cartRepo: CartRepository,
		private productVariationRepo: ProductVariationRepository
	) {}

	async addProductToCart(data: AddCartDto, user: User) {
		const { quantity, productVariationId } = data
		const productVariation = await this.productVariationRepo.findOne(
			productVariationId,
			{ relations: ['inventory', 'product'] }
		)
		if (!(productVariation?.inventory?.amount > quantity))
			throw new OutOfStockCartExc(
				generateErrorOutOfStock(
					productVariation.product.name,
					productVariation?.inventory?.amount
				)
			)

		const existedCart = await this.cartRepo.findOne({
			userId: user.id,
			productVariationId,
		})
		if (existedCart) {
			if (existedCart.quantity < 0 && quantity < 0)
				throw new BadRequestException(
					'Quantity of both item in cart, and new quantity is less than 0'
				)
			existedCart.quantity += quantity
			return this.cartRepo.save(existedCart)
		}

		if (quantity < 0)
			throw new BadRequestException('New cart must have quantity > 0')
		const productCart = this.cartRepo.create({
			productVariationId,
			userId: user.id,
			quantity,
		})
		return this.cartRepo.save(productCart)
	}

	async updateProductInCart(data: UpdateCartDto, user: User) {
		const { productVariationId, quantity } = data

		const productVariation = await this.productVariationRepo.findOne(
			productVariationId,
			{ relations: ['inventory', 'product'] }
		)
		if (!productVariation || productVariation.inventory.amount < quantity)
			throw new OutOfStockCartExc(
				generateErrorOutOfStock(
					productVariation.product.name,
					productVariation.inventory.amount
				)
			)

		const cart = await this.cartRepo.findOne({
			where: {
				userId: user.id,
				productVariationId,
			},
		})
		if (!cart) throw new ExpectationFailedExc()
		cart.quantity = quantity
		return this.cartRepo.save(cart)
	}

	async getUserCart(user: User) {
		return this.cartRepo
			.createQueryBuilder('cart')
			.leftJoinAndSelect('cart.productVariation', 'productVariation')
			.leftJoinAndSelect('productVariation.product', 'product')
			.leftJoinAndSelect('productVariation.size', 'size')
			.leftJoinAndSelect('productVariation.color', 'color')
			.leftJoinAndSelect('product.productImages', 'productImages')
			.where('cart.userId = :userId', { userId: user.id })
			.orderBy('cart.createdAt', 'DESC')
			.getMany()
	}

	async removeProductFromCart(data: RemoveProductDto) {
		const { cartIds } = data
		const { affected } = await this.cartRepo.delete(cartIds)
		return affected
	}
}

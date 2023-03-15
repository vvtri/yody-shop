import {
	AfterLoad,
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
} from 'typeorm'
import { Brand } from '../../brand/entities/brand.entity'
import { Category } from '../../category/entities/category.entity'
import { Comment } from '../../comment/entities/comment.entity'
import { BaseEntity } from '../../common/entities/base.entity'
import { Gender } from '../enums/gender.enum'
import { ProductImage } from './product-image.entity'
import { ProductRating } from './product-rating.entity'
import { ProductVariation } from './product-variation.entity'

@Entity()
export class Product extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number

	@Column()
	description: string

	@Column()
	name: string

	@Column()
	available: boolean

	@Column()
	unit: string

	@Column({ enum: Gender, type: 'enum' })
	gender: Gender

	@Column()
	price: number

	// Load rating
	rating: number = 0
	@AfterLoad()
	calcRating() {
		if (!this.productRatings?.length) return

		let avgRating =
			this.productRatings.reduce((accum, item) => accum + item.rating, 0) /
			this.productRatings.length
		this.rating = avgRating
	}

	// Join product rating
	@OneToMany(() => ProductRating, (productRating) => productRating.product, {
		cascade: ['insert'],
	})
	productRatings: ProductRating[]
	// End join product rating

	// Join product image
	@OneToMany(() => ProductImage, (productImage) => productImage.product, {
		cascade: ['insert'],
	})
	productImages: ProductImage[]
	// End join product image

	// Join category
	@Column({ name: 'category_id' })
	categoryId: number

	@ManyToOne(() => Category, (category) => category.products, {
		onDelete: 'RESTRICT',
	})
	@JoinColumn({ name: 'category_id' })
	category: Category
	// End join category

	// Join brand
	@Column({ name: 'brand_id' })
	brandId: number

	@ManyToOne(() => Brand, (brand) => brand.products, { onDelete: 'RESTRICT' })
	@JoinColumn({ name: 'brand_id' })
	brand: Brand
	// End join category

	// Join product variation
	@OneToMany(
		() => ProductVariation,
		(productVariation) => productVariation.product,
		{ cascade: ['insert'] }
	)
	productVariations: ProductVariation[]
	// End join product variation

	// Join comment
	@OneToMany(() => Comment, (comment) => comment.product, {
		cascade: ['insert'],
	})
	comments: Comment[]
	// End join comment
}

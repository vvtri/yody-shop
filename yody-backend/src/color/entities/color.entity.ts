import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { BaseEntity } from '../../common/entities/base.entity'
import { ProductVariation } from '../../product/entities/product-variation.entity'

@Entity()
export class Color extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number

	@Column()
	name: string

	@Column({ name: 'hex_code' })
	hexCode: string

	// Join product variation
	@OneToMany(
		() => ProductVariation,
		(productVariation) => productVariation.product,
		{ cascade: ['insert'] }
	)
	productVariations: ProductVariation[]
	// End join product variation
}

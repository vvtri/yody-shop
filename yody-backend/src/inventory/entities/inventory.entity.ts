import {
	Column,
	Entity,
	JoinColumn,
	OneToOne,
	PrimaryGeneratedColumn,
} from 'typeorm'
import { BaseEntity } from '../../common/entities/base.entity'
import { ProductVariation } from '../../product/entities/product-variation.entity'

@Entity()
export class Inventory extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number

	@Column()
	amount: number

	// Join product variation
	@Column({ name: 'product_variation_id' })
	productVariationId: number

	@OneToOne(
		() => ProductVariation,
		(productVariation) => productVariation.inventory,
		{ onDelete: 'CASCADE' }
	)
	@JoinColumn({ name: 'product_variation_id' })
	productVariation: ProductVariation
	// End join product variation
}

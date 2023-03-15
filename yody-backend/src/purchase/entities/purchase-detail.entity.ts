import {
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
} from 'typeorm'
import { BaseEntity } from '../../common/entities/base.entity'
import { ProductVariation } from '../../product/entities/product-variation.entity'
import { Purchase } from './purchase.entity'

@Entity({name: 'purchase-detail'})
export class PurchaseDetail extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number

	@Column()
	quantity: number

	@Column()
	price: number

	// Join product variation
	@Column({ name: 'product_variation_id' })
	productVariationId: number

	@ManyToOne(
		() => ProductVariation,
		(productVariation) => productVariation.purchaseDetails,
		{ onDelete: 'CASCADE' }
	)
	@JoinColumn({ name: 'product_variation_id' })
	productVariation: ProductVariation
	// End join product variation

	// Join purchase
	@Column({ name: 'purchase_id' })
	purchaseId: number

	@ManyToOne(() => Purchase, (purchase) => purchase.purchaseDetails, {
		onDelete: 'CASCADE',
	})
	@JoinColumn({ name: 'purchase_id' })
	purchase: Purchase
	// End join purchase
}

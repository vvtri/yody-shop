import {
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	OneToMany,
	OneToOne,
	PrimaryGeneratedColumn,
	Unique,
} from 'typeorm'
import { BaseEntity } from '../../common/entities/base.entity'
import { Color } from '../../color/entities/color.entity'
import { Product } from './product.entity'
import { Size } from '../../size/entities/size.entity'
import { Cart } from '../../cart/entities/cart.entity'
import { Inventory } from '../../inventory/entities/inventory.entity'
import { PurchaseDetail } from '../../purchase/entities/purchase-detail.entity'

@Entity({ name: 'product-variation' })
@Unique(['productId', 'colorId', 'sizeId'])
export class ProductVariation extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number

	// Join product
	@Column({ name: 'product_id' })
	productId: number

	@ManyToOne(() => Product, (product) => product.productVariations, {
		onDelete: 'RESTRICT',
	})
	@JoinColumn({ name: 'product_id' })
	product: Product
	// End join product

	// Join color
	@Column({ name: 'color_id' })
	colorId: number

	@ManyToOne(() => Color, (color) => color.productVariations, {
		onDelete: 'RESTRICT',
	})
	@JoinColumn({ name: 'color_id' })
	color: Color
	// End join color

	// Join size
	@Column({ name: 'size_id' })
	sizeId: number

	@ManyToOne(() => Size, (size) => size.productVariations, {
		onDelete: 'RESTRICT',
	})
	@JoinColumn({ name: 'size_id' })
	size: Size
	// End join color

	// Join cart
	@OneToMany(() => Cart, (cart) => cart.productVariation, {
		cascade: ['insert'],
	})
	carts: Cart[]
	// End join cart

	// Join inventory
	@OneToOne(() => Inventory, (inventory) => inventory.productVariation, {
		cascade: ['insert'],
	})
	inventory: Inventory
	// End join inventory

	// Join purchase detail
	@OneToMany(
		() => PurchaseDetail,
		(purchaseDetail) => purchaseDetail.productVariation,
		{ cascade: ['insert'] }
	)
	purchaseDetails: PurchaseDetail[]
  // End join purchase detail 
}

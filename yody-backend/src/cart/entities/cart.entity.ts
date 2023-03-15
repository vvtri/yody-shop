import {
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
	Unique,
} from 'typeorm'
import { User } from '../../auth/entities/user.entity'
import { BaseEntity } from '../../common/entities/base.entity'
import { ProductVariation } from '../../product/entities/product-variation.entity'

@Entity()
@Unique(['userId', 'productVariationId'])
export class Cart extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number

	@Column()
	quantity: number

	// Join user
	@Column({ name: 'user_id' })
	userId: number

	@ManyToOne(() => User, (user) => user.carts, { onDelete: 'CASCADE' })
	@JoinColumn({ name: 'user_id' })
	user: User
	// End join user

	// Join product variation
	@Column({ name: 'product_variation_id' })
	productVariationId: number

	@ManyToOne(
		() => ProductVariation,
		(productVariation) => productVariation.carts,
		{ onDelete: 'CASCADE' }
	)
	@JoinColumn({ name: 'product_variation_id' })
	productVariation: ProductVariation
	// End join product variation
}

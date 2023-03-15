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
import { Product } from './product.entity'

@Entity({ name: 'product-rating' })
@Unique(['productId', 'userId'])
export class ProductRating extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number

	@Column({ type: 'smallint' })
	rating: number

	// Join product
	@Column({ name: 'product_id' })
	productId: number

	@ManyToOne(() => Product, (product) => product.productRatings, {
		onDelete: 'CASCADE',
	})
	@JoinColumn({ name: 'product_id' })
	product: Product
	// End join product

	// Join user
	@Column({ name: 'user_id' })
	userId: number

	@ManyToOne(() => User, (user) => user.productRatings, { onDelete: 'CASCADE' })
	@JoinColumn({ name: 'user_id' })
	user: User
	// End join user
}

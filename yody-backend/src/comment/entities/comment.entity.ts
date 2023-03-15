import {
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
} from 'typeorm'
import { User } from '../../auth/entities/user.entity'
import { BaseEntity } from '../../common/entities/base.entity'
import { Product } from '../../product/entities/product.entity'

@Entity()
export class Comment extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number

	@Column()
	content: string

	// Join user
	@Column({ name: 'user_id' })
	userId: number

	@ManyToOne(() => User, (user) => user.comments, { onDelete: 'CASCADE' })
	@JoinColumn({ name: 'user_id' })
	user: User
	// End join user

	// Join product
	@Column({ name: 'product_id' })
	productId: number

	@ManyToOne(() => Product, (product) => product.comments, {
		onDelete: 'CASCADE',
	})
	@JoinColumn({ name: 'product_id' })
	product: Product
	// End join product
}

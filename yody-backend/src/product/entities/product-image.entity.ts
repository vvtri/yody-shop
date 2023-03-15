import {
	BaseEntity,
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
} from 'typeorm'
import { Product } from './product.entity'

@Entity({ name: 'product-image' })
export class ProductImage extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number

	@Column()
	url: string

	@Column({ name: 'public_id' })
	publicId: string

	// Join product
	@Column({ name: 'product_id' })
	productId: number

	@ManyToOne(() => Product, (product) => product.productImages, {
		onDelete: 'CASCADE',
	})
	@JoinColumn({ name: 'product_id' })
	product: Product
	// End join product
}

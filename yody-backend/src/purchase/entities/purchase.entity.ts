import {
	BeforeInsert,
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
} from 'typeorm'
import { User } from '../../auth/entities/user.entity'
import { BaseEntity } from '../../common/entities/base.entity'
import { PurchaseDetail } from './purchase-detail.entity'

@Entity()
export class Purchase extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number

	@Column({ name: 'total_price' })
	totalPrice: number

	@BeforeInsert()
	calculateTotalPrice() {
		this.totalPrice = this.purchaseDetails.reduce(
			(total, item) => total + item.price * item.quantity,
			0
		)
	}

	@Column({ name: 'item_count' })
	itemCount: number

	@BeforeInsert()
	countTotalItem() {
		this.itemCount = this.purchaseDetails.reduce(
			(total, item) => total + item.quantity,
			0
		)
	}

	// Join purchase detail
	@OneToMany(
		() => PurchaseDetail,
		(purchaseDetail) => purchaseDetail.purchase,
		{ cascade: ['insert'] }
	)
	purchaseDetails: PurchaseDetail[]
	// End join purchase detail

	// Join user
	@Column({ name: 'user_id' })
	userId: number

	@ManyToOne(() => User, (user) => user.purchases, { onDelete: 'CASCADE' })
	@JoinColumn({ name: 'user_id' })
	user: User
	// End join user
}

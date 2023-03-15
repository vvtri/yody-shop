import {
	Column,
	Entity,
	OneToMany,
	OneToOne,
	PrimaryGeneratedColumn,
	Unique,
} from 'typeorm'
import { Cart } from '../../cart/entities/cart.entity'
import { Comment } from '../../comment/entities/comment.entity'
import { BaseEntity } from '../../common/entities/base.entity'
import { ProductRating } from '../../product/entities/product-rating.entity'
import { Gender } from '../../product/enums/gender.enum'
import { Purchase } from '../../purchase/entities/purchase.entity'
import { UserAvatar } from './user-avatar.entity'
import { UserPermission } from './user-permission.entity'
import { UserResetPassword } from './user-reset-password.entity'
import { UserVerification } from './user-verification.entity'

@Unique(['email', 'deletedAt'])
@Unique(['phoneNumber', 'deletedAt'])
@Entity({ name: 'user' })
export class User extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number

	@Column()
	email: string

	@Column({ nullable: true })
	name: string

	@Column({ nullable: true, enum: Gender, type:'enum' })
	gender: Gender

	@Column({ nullable: true, name: 'phone_number' })
	phoneNumber: string

	@Column()
	password: string

	@Column({ nullable: true })
	address: string

	@Column({ name: 'is_verified', default: false })
	isVerified: boolean

	@Column({ name: 'is_active', default: true })
	isActive: boolean

	@OneToOne(
		() => UserVerification,
		(userVerification) => userVerification.user,
		{ cascade: ['insert'] }
	)
	userVerification: UserVerification

	@OneToOne(() => UserResetPassword, (userResetPw) => userResetPw.user, {
		cascade: ['insert'],
	})
	userResetPassword: UserResetPassword

	@OneToMany(() => UserPermission, (userPermission) => userPermission.user, {
		cascade: ['insert'],
	})
	userPermissions: UserPermission[]

	@OneToOne(() => UserAvatar, (userAvatar) => userAvatar.user, {
		cascade: ['insert'],
	})
	userAvatar: UserAvatar

	@OneToMany(() => ProductRating, (productRating) => productRating.user, {
		cascade: ['insert'],
	})
	productRatings: ProductRating[]

	// Join comment
	@OneToMany(() => Comment, (comment) => comment.user, { cascade: ['insert'] })
	comments: Comment[]
  // End join comment

  // Join cart
  @OneToMany(() => Cart, cart => cart.user, {cascade: ['insert']})
  carts: Cart[]
  // End join cart

  // Join purchase
  @OneToMany(() => Purchase, purchase => purchase.user, {cascade: ['insert']})
  purchases: Purchase[]
}

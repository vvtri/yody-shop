import {
	Column,
	Entity,
	JoinColumn,
	OneToOne,
	PrimaryGeneratedColumn,
	Unique,
} from 'typeorm'
import { CreatedEntity } from '../../common/entities/base.entity'
import { User } from './user.entity'

@Entity({ name: 'user-reset-password' })
@Unique( ['userId'])
export class UserResetPassword extends CreatedEntity {
	@PrimaryGeneratedColumn()
	id: number

	@Column()
	secret: string

	@Column({ type: 'timestamptz', name: 'expires_at' })
	expiresAt: Date

	// <join user>
	@Column({ name: 'user_id' })
	userId: number

	@OneToOne(() => User, (user) => user.userResetPassword, {
		onDelete: 'CASCADE',
	})
	@JoinColumn({ name: 'user_id' })
	user: User
	// <join user />
}

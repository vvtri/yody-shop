import {
	Column,
	Entity,
	JoinColumn,
	OneToOne,
	PrimaryGeneratedColumn,
} from 'typeorm'
import { BaseEntity } from '../../common/entities/base.entity'
import { User } from './user.entity'

@Entity({name: 'user-avatar'})
export class UserAvatar extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number

	@Column()
	url: string

	@Column({ name: 'public_id', nullable: true })
	publicId: string

	@Column({ name: 'user_id' })
	userId: number

	@OneToOne(() => User, (user) => user.userAvatar, {
		onDelete: 'CASCADE',
	})
	@JoinColumn({ name: 'user_id' })
	user: User
}

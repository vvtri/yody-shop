import {
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
	Unique,
} from 'typeorm'
import { BaseEntity } from '../../common/entities/base.entity'
import { ActionAbility } from '../../common/enums/action-ability.enum'
import { Action } from '../../common/enums/action.enum'
import { Resource } from '../../common/enums/resource.enum'
import { User } from './user.entity'

@Entity({ name: 'user-permission' })
@Unique( ['action', 'resource', 'actionAbility'])
export class UserPermission extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number

	@Column({ enum: Action, type: 'enum' })
	action: Action

	@Column({ type: 'enum', enum: Resource })
	resource: Resource

	@Column({ type: 'enum', enum: ActionAbility, name: 'action_ability' })
	actionAbility: ActionAbility

	// <join user>
	@Column({ name: 'user_id' })
	userId: number

	@ManyToOne(() => User, (user) => user.userPermissions, {
		onDelete: 'CASCADE',
	})
	@JoinColumn({ name: 'user_id' })
	user: User
	// <join user />
}

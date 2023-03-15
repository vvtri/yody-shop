import { EntityRepository, Repository } from 'typeorm'
import { UserResetPassword } from '../entities/user-reset-password.entity'

@EntityRepository(UserResetPassword)
export class UserResetPasswordRepository extends Repository<UserResetPassword> {}

import { EntityRepository, Repository } from 'typeorm'
import { UserVerification } from '../entities/user-verification.entity'

@EntityRepository(UserVerification)
export class UserVerificationRepository extends Repository<UserVerification> {}

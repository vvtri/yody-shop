import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserAvatarRepository } from '../../auth/repositories/user-avatar.repository'
import { UserRepository } from '../../auth/repositories/user.repository'
import { UserController } from './user.controller'
import { UserService } from './user.service'

@Module({
	imports: [TypeOrmModule.forFeature([UserRepository, UserAvatarRepository])],
	controllers: [UserController],
	providers: [UserService],
})
export class UserModule {}

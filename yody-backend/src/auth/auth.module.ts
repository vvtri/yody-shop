import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserRepository } from './repositories/user.repository'
import { UserVerificationRepository } from './repositories/user-verification.repository'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { UserResetPasswordRepository } from './repositories/user-reset-password.repository'
import { UserPermissionRepository } from './repositories/user-permission.repository'
import { RefreshTokenStrategy } from './strategies/refresh-token.strategy'
import { AccessTokenStrategy } from './strategies/access-token.strategy'

@Module({
	imports: [
		TypeOrmModule.forFeature([
			UserRepository,
			UserVerificationRepository,
			UserResetPasswordRepository,
			UserPermissionRepository,
		]),
		PassportModule,
		JwtModule.register({
			secret: process.env.JWT_SECRET,
		}),
	],
	controllers: [AuthController],
	providers: [AuthService, AccessTokenStrategy, RefreshTokenStrategy],
})
export class AuthModule {}

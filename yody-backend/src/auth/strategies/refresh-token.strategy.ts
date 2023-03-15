import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-jwt'
import { StrategyName } from '../../common/constants/auth.constant'
import { Cookie } from '../../common/enums/cookie.enum'
import { JwtPayload } from '../../common/types/jwt-payload.type'
import { User } from '../entities/user.entity'
import { UserRepository } from '../repositories/user.repository'
import { cookieExtractor } from '../utils/index.util'

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
	Strategy,
	StrategyName.REFRESH_TOKEN
) {
	constructor(private userRepo: UserRepository) {
		super({
			jwtFromRequest: cookieExtractor(Cookie.REFRESH_TOKEN),
			ignoreExpiration: false,
			secretOrKey: process.env.JWT_SECRET,
			algorithms: ['HS256'],
		})
	}

	async validate(payload: JwtPayload): Promise<User> {
		const { userId } = payload

		const user = await this.userRepo.findOne(userId, {
			relations: ['userPermissions'],
		})

		if (!user) throw new UnauthorizedException('Invalid token')

		if (!user.isVerified)
			throw new UnauthorizedException('Email is not verified')

		return user
	}
}

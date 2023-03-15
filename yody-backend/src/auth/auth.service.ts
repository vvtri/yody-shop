import {
	ConflictException,
	Injectable,
	NotFoundException,
	UnauthorizedException,
} from '@nestjs/common'
import { JwtService, JwtSignOptions } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'
import { CookieOptions, Response } from 'express'
import { Like } from 'typeorm'
import {
	accessTokenAge,
	accessTokenAgeMs,
	limitResetPassword,
	limitVerify,
	refreshTokenAge,
	refreshTokenAgeMs,
	resetPwExpiresIn,
	verificationExpiresIn,
} from '../common/constants/auth.constant'
import { Cookie } from '../common/enums/cookie.enum'
import {
	ExpectationFailedExc,
	LockedExc,
	NotVerifiedExc,
} from '../common/exceptions/index.exception'
import { JwtPayload } from '../common/types/jwt-payload.type'
import { bcryptHash } from '../common/utils/index.util'
import { InjectRedis } from '../redis/decorators'
import { RedisClientType } from '../redis/types'
import { MailService } from '../utils/mail.service'
import { RequestResetPasswordReqDto } from './dtos/request/request-reset-password.req.dto'
import { ResendVerifyReqDto } from './dtos/request/resend-verify.req.dto'
import { ResetPasswordReqDto } from './dtos/request/reset-password.dto'
import { SigninReqDto } from './dtos/request/signin.req.dto'
import { SignupReqDto } from './dtos/request/signup.req.dto'
import { VerifyUserReqDto } from './dtos/request/verify-user.req.dto'
import { User } from './entities/user.entity'
import { UserResetPasswordRepository } from './repositories/user-reset-password.repository'
import { UserVerificationRepository } from './repositories/user-verification.repository'
import { UserRepository } from './repositories/user.repository'
import { generateAndHashSecret } from './utils/index.util'

@Injectable()
export class AuthService {
	constructor(
		private userRepo: UserRepository,
		private userVerificationRepo: UserVerificationRepository,
		private userResetPwRepo: UserResetPasswordRepository,
		private jwtService: JwtService,
		@InjectRedis() private redis: RedisClientType,
		private mailService: MailService
	) {}

	async signup(payload: SignupReqDto) {
		const { email, password } = payload

		const existUser = await this.userRepo.findOne({
			where: [{ email: Like(email) }],
		})
		if (existUser) throw new ConflictException('User existed')

		const hashedPassword = bcryptHash(password)
		const [secret, hashedSecret] = generateAndHashSecret()

		const userVerification = this.userVerificationRepo.create({
			expiresAt: new Date(Date.now() + verificationExpiresIn),
			secret: hashedSecret,
		})
		const user = this.userRepo.create({
			email,
			password: hashedPassword,
			userVerification,
		})
		await this.userRepo.save(user)

		this.mailService.sendVerifyUserEmail(
			email,
			this.generateVerifyLink(user.id, secret)
		)

		return user
	}

	async signin(data: SigninReqDto, res: Response) {
		const { email, password } = data
		const user = await this.userRepo.findOne({
			where: [{ email: Like(email) }],
			relations: ['userPermissions'],
		})

		if (!user) throw new UnauthorizedException()

		if (!user.isVerified) throw new NotVerifiedExc()

		if (!user.isActive || !bcrypt.compareSync(password, user.password))
			throw new UnauthorizedException()

		const userPermissions = user.userPermissions.map((item) => ({
			action: item.action,
			resource: item.resource,
			actionAbility: item.actionAbility,
		}))
		const payload: JwtPayload = {
			permissions: userPermissions,
			userId: user.id,
		}
		// Sign token
		this.signToken(res, payload, payload)

		// return user
		return user
	}

	async signout(res: Response) {
		res.cookie(Cookie.ACCESS_TOKEN, '', { maxAge: 0 })
		res.cookie(Cookie.REFRESH_TOKEN, '', { maxAge: 0 })
	}

	async verifyUser(data: VerifyUserReqDto, res: Response) {
		const { secret, userId } = data
		const user = await this.userRepo.findOne(userId, {
			relations: ['userVerification', 'userPermissions'],
		})

		if (!user || user.isVerified || !user.userVerification)
			throw new ExpectationFailedExc()
		if (
			!bcrypt.compareSync(secret, user.userVerification.secret) ||
			user.userVerification.expiresAt < new Date()
		)
			throw new UnauthorizedException()

		user.isVerified = true
		await Promise.all([
			this.userRepo.save(user),
			this.userVerificationRepo.delete({ userId }),
		])

		const userPermissions = user.userPermissions.map((item) => ({
			action: item.action,
			resource: item.resource,
			actionAbility: item.actionAbility,
		}))
		const payload: JwtPayload = {
			permissions: userPermissions,
			userId: user.id,
		}
		this.signToken(res, payload, payload)
		return user
	}

	async resendVerifyUser(data: ResendVerifyReqDto) {
		const { email } = data

		// Check user
		const user = await this.userRepo.findOne({
			where: [{ email: Like(email) }],
		})
		if (!user || user.isVerified || !user.isActive)
			throw new NotFoundException()

		// Check count verify sent
		const redisKey = `${limitVerify.key}:${user.id}`
		const countSendVerify = await this.redis.get(redisKey)
		if (!countSendVerify) {
			await this.redis.set(redisKey, 1)
			await this.redis.expire(redisKey, limitVerify.expiresIn)
		} else {
			if (+countSendVerify >= limitVerify.max) throw new LockedExc()
			await this.redis.incrBy(redisKey, 1)
		}

		// Update db
		const [secret, hashedSecret] = generateAndHashSecret()
		await this.userVerificationRepo.update(
			{ userId: user.id },
			{
				createdAt: new Date(),
				secret: hashedSecret,
				expiresAt: new Date(Date.now() + verificationExpiresIn),
			}
		)
		this.mailService.sendVerifyUserEmail(
			user.email,
			this.generateVerifyLink(user.id, secret)
		)
	}

	async requestResetPassword(data: RequestResetPasswordReqDto) {
		const { email } = data

		// check user exist and verified
		const user = await this.userRepo.findOne({
			where: [{ email }],
		})
		if (!user || !user.isVerified || !user.isActive)
			throw new NotFoundException()

		// check count request reset password send
		const redisKey = `${limitResetPassword.key}:${user.id}`
		const countSendResetPw = await this.redis.get(redisKey)
		if (!countSendResetPw) {
			await this.redis.set(redisKey, 1)
			await this.redis.expire(redisKey, limitResetPassword.expiresIn)
		} else {
			if (+countSendResetPw >= limitResetPassword.max) throw new LockedExc()
			await this.redis.incrBy(redisKey, 1)
		}

		// save secret to db
		const [secret, hashedSecret] = generateAndHashSecret()
		const userResetPw = this.userResetPwRepo.create({
			userId: user.id,
			secret: hashedSecret,
			createdAt: new Date(),
			expiresAt: new Date(Date.now() + resetPwExpiresIn),
		})
		await this.userResetPwRepo.upsert(userResetPw, {
			conflictPaths: ['userId'],
			skipUpdateIfNoValuesChanged: true,
		})
		this.mailService.sendResetPasswordEmail(
			email,
			this.generateResetPasswordLink(user.id, secret)
		)
	}

	async resetPassword(data: ResetPasswordReqDto) {
		const { secret, userId, password } = data
		const user = await this.userRepo.findOne(userId, {
			relations: ['userResetPassword'],
		})
		if (!user || !user.isVerified || !user.isActive || !user.userResetPassword)
			throw new ExpectationFailedExc()
		if (
			!bcrypt.compareSync(secret, user.userResetPassword.secret) ||
			user.userResetPassword.expiresAt < new Date()
		)
			throw new UnauthorizedException()

		user.password = bcryptHash(password)
		user.isVerified = true

		await Promise.all([
			this.userRepo.save(user),
			this.userResetPwRepo.delete({ userId }),
		])
	}

	async refreshToken(user: User, res: Response) {
		const userPermissions = user.userPermissions.map((item) => ({
			action: item.action,
			resource: item.resource,
			actionAbility: item.actionAbility,
		}))
		const payload: JwtPayload = {
			permissions: userPermissions,
			userId: user.id,
		}
		// Sign token
		this.setAccessTokenCookie(res, payload)
	}

	generateVerifyLink(userId: number, secret: string) {
		return `${process.env.CLIENT_HOST}/auth/verify?userId=${userId}&secret=${secret}`
	}

	generateResetPasswordLink(userId: number, secret: string) {
		return `${process.env.CLIENT_HOST}/auth/reset-password?userId=${userId}&secret=${secret}`
	}

	signToken(
		res: Response,
		accessTokenPayload: JwtPayload,
		refreshTokenPayload: JwtPayload
	) {
		this.setAccessTokenCookie(res, accessTokenPayload)
		this.setRefreshTokenCookie(res, refreshTokenPayload)
	}

	setAccessTokenCookie(res: Response, payload: JwtPayload) {
		return this.setCookie(
			res,
			Cookie.ACCESS_TOKEN,
			{ httpOnly: true, maxAge: accessTokenAgeMs },
			payload,
			{ expiresIn: accessTokenAge }
		)
	}

	setRefreshTokenCookie(res: Response, payload: JwtPayload) {
		return this.setCookie(
			res,
			Cookie.REFRESH_TOKEN,
			{ httpOnly: true, maxAge: refreshTokenAgeMs },
			payload,
			{ expiresIn: refreshTokenAge }
		)
	}

	setCookie(
		res: Response,
		name: Cookie,
		cookieOptions: CookieOptions,
		payload: JwtPayload,
		jwtOptions: JwtSignOptions
	) {
		if (process.env.NODE_ENV === 'production') {
			cookieOptions = {
				...cookieOptions,
				sameSite: 'none',
				secure: true,
			}
		}
		console.log('process.env.NODE_ENV', process.env.NODE_ENV)
		console.log('cookieOptions', cookieOptions)
		const token = this.jwtService.sign(payload, jwtOptions)
		res.cookie(name, token, cookieOptions)
		return token
	}
}

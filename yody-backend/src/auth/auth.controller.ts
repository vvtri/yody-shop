import {
	Body,
	Controller,
	HttpCode,
	Post,
	Res,
	Get,
	UseGuards,
	UnauthorizedException,
  HttpException,
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { Response } from 'express'
import { StrategyName } from '../common/constants/auth.constant'
import { Authenticate, GetUser } from '../common/decorators/auth.decorator'
import { Serialize } from '../common/interceptors/serialize.interceptor'
import { AuthService } from './auth.service'
import { RequestResetPasswordReqDto } from './dtos/request/request-reset-password.req.dto'
import { ResendVerifyReqDto } from './dtos/request/resend-verify.req.dto'
import { ResetPasswordReqDto } from './dtos/request/reset-password.dto'
import { SigninReqDto } from './dtos/request/signin.req.dto'
import { SignupReqDto } from './dtos/request/signup.req.dto'
import { VerifyUserReqDto } from './dtos/request/verify-user.req.dto'
import { UserResDto } from './dtos/response/user.res.dto'
import { User } from './entities/user.entity'

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

  @Get()
  etst() {
    throw new HttpException(['loi 1', 'loi 2'], 499)
  }

	@Get('signout')
	signout(@Res({ passthrough: true }) res: Response) {
		return this.authService.signout(res)
	}

	@Get('refresh')
	@UseGuards(AuthGuard(StrategyName.REFRESH_TOKEN))
	refreshToken(
		@GetUser() user: User,
		@Res({ passthrough: true }) res: Response
	) {
		return this.authService.refreshToken(user, res)
	}

	@Get('current')
	@Authenticate()
	getUserInfo(@GetUser() user: User) {
		return user
	}

	@Post('signup')
	@Serialize(UserResDto)
	signup(@Body() body: SignupReqDto) {
		return this.authService.signup(body)
	}

	@Post('signin')
	@HttpCode(200)
	@Serialize(UserResDto)
	signin(
		@Body() body: SigninReqDto,
		@Res({ passthrough: true })
		res: Response
	) {
		return this.authService.signin(body, res)
	}

	@Post('verify/resend')
	@HttpCode(200)
	resendVerify(@Body() body: ResendVerifyReqDto) {
		return this.authService.resendVerifyUser(body)
	}

	@Post('verify')
	@HttpCode(200)
	@Serialize(UserResDto)
	verify(
		@Body() body: VerifyUserReqDto,
		@Res({ passthrough: true })
		res: Response
	) {
		return this.authService.verifyUser(body, res)
	}

	@Post('password/request-reset')
	@HttpCode(200)
	requestResetPassword(@Body() body: RequestResetPasswordReqDto) {
		return this.authService.requestResetPassword(body)
	}

	@Post('password/reset')
	@HttpCode(200)
	resetPassword(@Body() body: ResetPasswordReqDto) {
		return this.authService.resetPassword(body)
	}
}

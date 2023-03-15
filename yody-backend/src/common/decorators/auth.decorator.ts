import {
	createParamDecorator,
	ExecutionContext,
	UseGuards,
} from '@nestjs/common'
import { AuthenGuard } from '../../auth/guards/authen.guard'

export const Authenticate = () => UseGuards(AuthenGuard)

export const GetUser = createParamDecorator(
	(_data: any, ctx: ExecutionContext) => {
		const req = ctx.switchToHttp().getRequest()

		if (!req.user) return null

		return req.user
	}
)

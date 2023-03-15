import { ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { AuthGuard } from '@nestjs/passport'
import { Observable } from 'rxjs'
import { StrategyName } from '../../common/constants/auth.constant'
import { isPublicRouteName } from '../../common/constants/global.constant'

@Injectable()
export class AuthenGuard extends AuthGuard(StrategyName.ACCESS_TOKEN) {
	constructor(private reflector: Reflector) {
		super()
	}

	canActivate(
		context: ExecutionContext
	): boolean | Promise<boolean> | Observable<boolean> {
		const isPublic = this.reflector.getAllAndOverride(isPublicRouteName, [
			context.getClass(),
			context.getHandler(),
		])
		if (isPublic) return true
		return super.canActivate(context)
	}
}

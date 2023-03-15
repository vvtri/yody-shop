import { Exclude } from 'class-transformer'

export class UserResDto {
	@Exclude()
	password: string

	@Exclude()
	userVerification: Record<any, any>
}

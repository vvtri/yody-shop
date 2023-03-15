import { IsEmail } from 'class-validator'

export class RequestResetPasswordReqDto {
	@IsEmail()
	email: string
}

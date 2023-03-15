import {
  IsEmail
} from 'class-validator'

export class ResendVerifyReqDto {
	@IsEmail()
	email: string
}

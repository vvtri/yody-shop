import { IsString, IsNotEmpty, IsUUID, MinLength, IsNumber } from 'class-validator'

export class ResetPasswordReqDto {
	@IsString()
	@IsNotEmpty()
	secret: string

	@IsNumber()
	userId: number

	@IsString()
	@MinLength(6)
	password: string
}

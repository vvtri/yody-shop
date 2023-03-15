import { IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator'

export class VerifyUserReqDto {
	@IsString()
	@IsNotEmpty()
	secret: string

	@IsNumber()
	userId: number
}

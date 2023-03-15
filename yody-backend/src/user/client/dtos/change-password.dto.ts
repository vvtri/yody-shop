import { IsString, MinLength, IsOptional } from 'class-validator'

export class ChangePasswordDto {
	@IsString()
	@MinLength(6)
	password: string

	@IsString()
	@MinLength(6)
	newPassword: string
}

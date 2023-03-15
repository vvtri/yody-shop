import {
	IsOptional,
	IsPhoneNumber,
	IsString,
	MinLength,
	IsEmail,
	ValidateIf,
} from 'class-validator'

export class SignupReqDto {
	@IsEmail()
	email: string

	@IsString()
	@MinLength(6)
	password: string
}

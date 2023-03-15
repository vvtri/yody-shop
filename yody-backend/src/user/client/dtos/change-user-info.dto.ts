import {
	IsBase64,
	IsEnum,
	IsNotEmpty,
	IsOptional,
	IsPhoneNumber,
	IsString,
	MinLength,
} from 'class-validator'
import { Gender } from '../../../product/enums/gender.enum'

export class ChangeUserInfoDto {
	@IsString()
	@IsNotEmpty()
	@IsOptional()
	name?: string

	@IsEnum(Gender)
	@IsOptional()
	gender?: Gender

	@IsPhoneNumber('VN')
	@IsOptional()
	phoneNumber?: string

	@IsString()
	@IsNotEmpty()
	@IsOptional()
	address?: string

	@IsString()
	@IsNotEmpty()
	@IsOptional()
	avatar?: string
}

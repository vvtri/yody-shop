import {
	IsEnum,
	IsNotEmpty,
	IsNumber,
	IsOptional,
	IsString,
} from 'class-validator'
import { Gender } from '../../enums/gender.enum'
import { Sort } from '../../enums/sort.enum'

export class GetProductsDto {
	@IsString()
	@IsOptional()
	keyword?: string

	@IsEnum(Gender, { each: true })
	@IsOptional()
	genders?: Gender[] = []

	@IsNumber({}, { each: true })
	@IsNotEmpty()
	@IsOptional()
	categoryIds?: number[] = []

	@IsNumber({}, { each: true })
	@IsNotEmpty()
	@IsOptional()
	brandIds?: number[] = []

	@IsNumber({}, { each: true })
	@IsNotEmpty()
	@IsOptional()
	colorIds?: number[] = []

	@IsNumber({}, { each: true })
	@IsNotEmpty()
	@IsOptional()
	sizeIds?: number[] = []

	@IsEnum(Sort)
	@IsOptional()
	sortBy?: Sort
}

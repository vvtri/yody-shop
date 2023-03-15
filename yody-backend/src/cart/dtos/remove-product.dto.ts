import { IsArray, IsDefined, IsNumber } from 'class-validator'

export class RemoveProductDto {
	@IsNumber({}, { each: true })
	// @IsArray()
	// @IsDefined()
	cartIds: number[]
}


import { Type } from 'class-transformer'
import { IsNumber, Min } from 'class-validator'

export class GetProductByIdDto {
	@IsNumber()
	@Type(() => Number)
	id: number
}

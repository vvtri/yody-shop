import { Type } from 'class-transformer'
import { IsNumber, Min } from 'class-validator'

export class PaginateQueryDto {
	@IsNumber()
	@Min(1)
	@Type(() => Number)
	page: number = 1

	@IsNumber()
	@Min(1)
	@Type(() => Number)
	size: number = 10
}

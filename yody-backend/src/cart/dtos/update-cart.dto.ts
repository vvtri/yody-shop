import { IsNumber, IsPositive } from 'class-validator'

export class UpdateCartDto {
	@IsNumber()
	productVariationId: number

	@IsNumber({ maxDecimalPlaces: 0 })
  @IsPositive()
	quantity: number
}

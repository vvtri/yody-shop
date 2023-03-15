import { IsNumber, IsPositive } from 'class-validator'

export class AddCartDto {
	@IsNumber()
	productVariationId: number

	@IsNumber({ maxDecimalPlaces: 0 })
	quantity: number
}

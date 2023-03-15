import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator'

export class CreateCommentDto {
	@IsString()
	@IsNotEmpty()
	content: string

	@IsNumber()
	productId: number
}
  
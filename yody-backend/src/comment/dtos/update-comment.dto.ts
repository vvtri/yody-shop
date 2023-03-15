import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator'

export class UpdateCommentDto {
	@IsString()
	@IsNotEmpty()
	content: string

  @IsNumber()
  @Min(0)
  commentId: number
}

import { IsNumber, Min } from 'class-validator'

export class DeleteCommentDto {
	@IsNumber()
	@Min(0)
	commentId: number
}

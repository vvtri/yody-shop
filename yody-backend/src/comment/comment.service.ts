import {
	BadRequestException,
	Injectable,
	NotFoundException,
} from '@nestjs/common'
import { User } from '../auth/entities/user.entity'
import { CreateCommentDto } from './dtos/create-comment.dto'
import { DeleteCommentDto } from './dtos/delete-comment.dto'
import { UpdateCommentDto } from './dtos/update-comment.dto'
import { CommentRepository } from './repositories/comment.repository'

@Injectable()
export class CommentService {
	constructor(private commentRepo: CommentRepository) {}

	async createComment(data: CreateCommentDto, user: User) {
		const { content, productId } = data
		const comment = this.commentRepo.create({
			content,
			productId,
			userId: user.id,
		})
		return this.commentRepo.save(comment)
	}

	async updateComment(data: UpdateCommentDto, user: User) {
		const { commentId, content } = data
		const result = await this.commentRepo.update(
			{ id: commentId, userId: user.id },
			{ content }
		)
		if (result.affected === 0) throw new NotFoundException()
	}

	async deleteComment(data: DeleteCommentDto, user: User) {
		const { commentId } = data

		const result = await this.commentRepo.delete({
			id: commentId,
			userId: user.id,
		})

		if (result.affected === 0) throw new NotFoundException()
	}
}

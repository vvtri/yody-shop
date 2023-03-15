import {
	BadRequestException,
	Body,
	Controller,
	Delete,
	Get,
	Patch,
	Post,
} from '@nestjs/common'
import { User } from '../auth/entities/user.entity'
import { Authenticate, GetUser } from '../common/decorators/auth.decorator'
import { CommentService } from './comment.service'
import { CreateCommentDto } from './dtos/create-comment.dto'
import { DeleteCommentDto } from './dtos/delete-comment.dto'
import { UpdateCommentDto } from './dtos/update-comment.dto'

@Controller('comment')
export class CommentController {
	constructor(private readonly commentService: CommentService) {}

	@Post()
	@Authenticate()
	async createCommentDto(
		@Body() body: CreateCommentDto,
		@GetUser() user: User
	) {
		return this.commentService.createComment(body, user)
	}

	@Patch()
	@Authenticate()
	updateComment(@Body() body: UpdateCommentDto, @GetUser() user: User) {
		return this.commentService.updateComment(body, user)
	}

	@Delete()
	@Authenticate()
	deleteComment(@Body() body: DeleteCommentDto, @GetUser() user: User) {
		return this.commentService.deleteComment(body, user)
	}
}

import {
	Controller,
	Get,
	Param,
	ParseIntPipe,
	Post,
	Query,
} from '@nestjs/common'
import { User } from '../auth/entities/user.entity'
import { Authenticate, GetUser } from '../common/decorators/auth.decorator'
import { PaginateQueryDto } from '../common/dtos/paginate-query.dto'
import { GetPurchaseHistoryDto } from './dto/get-purchase-history.dto'
import { PurchaseService } from './purchase.service'

@Controller('purchase')
@Authenticate()
export class PurchaseController {
	constructor(private readonly purchaseService: PurchaseService) {}

	@Get(':id')
	getPurchaseDetail(
		@Param('id', ParseIntPipe) id: number,
		@GetUser() user: User
	) {
		return this.purchaseService.getPurchaseDetail(id, user)
	}

	@Get()
	getPurchaseHistory(
		@Query() query: GetPurchaseHistoryDto,
		@GetUser() user: User
	) {
		return this.purchaseService.getPurchaseHistory(query, user)
	}

	@Post()
	purchaseProductInCart(@GetUser() user: User) {
		return this.purchaseService.purchaseProductInCart(user)
	}
}

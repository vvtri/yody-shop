import {
	Body,
	Controller,
	Get,
	Param,
	ParseIntPipe,
	Patch,
	Post,
	Query,
} from '@nestjs/common'
import { User } from '../../auth/entities/user.entity'
import { Authenticate, GetUser } from '../../common/decorators/auth.decorator'
import { PaginateQueryDto } from '../../common/dtos/paginate-query.dto'
import { GetProductsDto } from './dtos/get-products.dto'
import { RatingProductDto } from './dtos/rating-product.dto'
import { ProductService } from './product.service'

@Controller('product')
export class ProductController {
	constructor(private productService: ProductService) {}

	@Post('/get-products')
	getProducts(@Body() body: GetProductsDto, @Query() query: PaginateQueryDto) {
		return this.productService.getProducts(body, query)
	}

  @Get('most-viewed')
  getMostViewedProducts() {
    return this.productService.getMostViewedProduct()
  }

	@Get('/:id')
	getProductById(@Param('id', ParseIntPipe) id: number) {
		return this.productService.getProductById(id)
	}

	@Post('/rating-product')
	@Authenticate()
	ratingProduct(@Body() body: RatingProductDto, @GetUser() user: User) {
		return this.productService.ratingProduct(body, user)
	}
}

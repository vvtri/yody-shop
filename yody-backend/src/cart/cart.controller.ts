import { Body, Controller, Delete, Get, Patch, Post } from '@nestjs/common'
import { User } from '../auth/entities/user.entity'
import { Authenticate, GetUser } from '../common/decorators/auth.decorator'
import { CartService } from './cart.service'
import { AddCartDto } from './dtos/add-cart.dto'
import { RemoveProductDto } from './dtos/remove-product.dto'
import { UpdateCartDto } from './dtos/update-cart.dto'

@Controller('cart')
@Authenticate()
export class CartController {
	constructor(private readonly cartService: CartService) {}

	@Post('/add-product')
	addProduct(@Body() body: AddCartDto, @GetUser() user: User) {
		return this.cartService.addProductToCart(body, user)
	}

	@Patch()
	updateProductInCart(@Body() body: UpdateCartDto, @GetUser() user: User) {
		return this.cartService.updateProductInCart(body, user)
	}

	@Get()
	getUserCart(@GetUser() user: User) {
		return this.cartService.getUserCart(user)
	}

	@Delete()
	removeProductFromCart(@Body() body: RemoveProductDto) {
		return this.cartService.removeProductFromCart(body)
	}
}

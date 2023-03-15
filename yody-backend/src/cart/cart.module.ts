import { Module } from '@nestjs/common'
import { CartService } from './cart.service'
import { CartController } from './cart.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CartRepository } from './repositories/cart.repository'
import { ProductVariationRepository } from '../product/repositories/product-variation.repository'

@Module({
	imports: [
		TypeOrmModule.forFeature([CartRepository, ProductVariationRepository]),
	],
	controllers: [CartController],
	providers: [CartService],
})
export class CartModule {}

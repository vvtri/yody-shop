import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ProductImageRepository } from '../repositories/product-image.repository'
import { ProductRatingRepository } from '../repositories/product-rating.repository'
import { ProductVariationRepository } from '../repositories/product-variation.repository'
import { ProductRepository } from '../repositories/product.repository'
import { ProductController } from './product.controller'
import { ProductService } from './product.service'

@Module({
	imports: [
		TypeOrmModule.forFeature([ProductRepository, ProductRatingRepository, ProductVariationRepository, ProductRatingRepository, ProductImageRepository]),
	],
	controllers: [ProductController],
	providers: [ProductService],
})
export class ProductModule {}

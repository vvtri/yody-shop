import { Module } from '@nestjs/common'
import { PurchaseService } from './purchase.service'
import { PurchaseController } from './purchase.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PurchaseRepository } from './repositories/purchase.repository'
import { PurchaseDetailRepository } from './repositories/purchase-detail.repository'
import { InventoryRepository } from '../inventory/repositories/inventory.repository'
import { CartRepository } from '../cart/repositories/cart.repository'

@Module({
	imports: [
		TypeOrmModule.forFeature([
			PurchaseRepository,
			PurchaseDetailRepository,
			InventoryRepository,
			CartRepository,
		]),
	],
	controllers: [PurchaseController],
	providers: [PurchaseService],
})
export class PurchaseModule {}

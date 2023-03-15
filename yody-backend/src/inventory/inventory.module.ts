import { Module } from '@nestjs/common'
import { InventoryService } from './inventory.service'
import { InventoryController } from './inventory.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { InventoryRepository } from './repositories/inventory.repository'

@Module({
	imports: [TypeOrmModule.forFeature([InventoryRepository])],
	controllers: [InventoryController],
	providers: [InventoryService],
})
export class InventoryModule {}

import { EntityRepository, Repository } from 'typeorm'
import { Inventory } from '../entities/inventory.entity'

@EntityRepository(Inventory)
export class InventoryRepository extends Repository<Inventory> {}

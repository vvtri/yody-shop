import { EntityRepository, Repository } from 'typeorm'
import { PurchaseDetail } from '../entities/purchase-detail.entity'

@EntityRepository(PurchaseDetail)
export class PurchaseDetailRepository extends Repository<PurchaseDetail> {}

import { Injectable } from '@nestjs/common'
import { BrandRepository } from './repositories/brand.repository'

@Injectable()
export class BrandService {
	constructor(private brandRepo: BrandRepository) {}

	async getAllBrands() {
		return this.brandRepo.find()
	}
}

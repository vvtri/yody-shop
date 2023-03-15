import { Injectable } from '@nestjs/common'
import { SizeRepository } from './repositories/size.repository'

@Injectable()
export class SizeService {
	constructor(private sizeRepo: SizeRepository) {}

	async getAllSizes() {
		return this.sizeRepo.find()
	}
}

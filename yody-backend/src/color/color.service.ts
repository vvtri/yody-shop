import { Injectable } from '@nestjs/common'
import { ColorRepository } from './respositories/color.repository'

@Injectable()
export class ColorService {
	constructor(private colorRepo: ColorRepository) {}

	async getAllColor() {
		return this.colorRepo.find()
	}
}

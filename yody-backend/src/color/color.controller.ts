import { Controller, Get } from '@nestjs/common'
import { ColorService } from './color.service'

@Controller('color')
export class ColorController {
	constructor(private colorService: ColorService) {}

	@Get()
	getAllColors() {
		return this.colorService.getAllColor()
	}
}

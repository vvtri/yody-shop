import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ColorController } from './color.controller'
import { ColorService } from './color.service'
import { ColorRepository } from './respositories/color.repository'

@Module({
	imports: [TypeOrmModule.forFeature([ColorRepository])],
	controllers: [ColorController],
	providers: [ColorService],
})
export class ColorModule {}

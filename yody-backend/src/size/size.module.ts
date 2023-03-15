import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { SizeRepository } from './repositories/size.repository'
import { SizeController } from './size.controller'
import { SizeService } from './size.service'

@Module({
	imports: [TypeOrmModule.forFeature([SizeRepository])],
	controllers: [SizeController],
	providers: [SizeService],
})
export class SizeModule {}

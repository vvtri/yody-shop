import { Module } from '@nestjs/common';
import { BrandService } from './brand.service';
import { BrandController } from './brand.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BrandRepository } from './repositories/brand.repository';

@Module({
  imports: [TypeOrmModule.forFeature([BrandRepository])],
  providers: [BrandService],
  controllers: [BrandController]
})
export class BrandModule {}

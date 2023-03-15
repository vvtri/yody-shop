import { DynamicModule, Module, OnModuleInit } from '@nestjs/common'

import { CloudinaryService } from './cloudinary.service'
import { MailService } from './mail.service'

@Module({})
export class UtilsModule {
	static async register(): Promise<DynamicModule> {
		return {
			module: UtilsModule,
			providers: [MailService, CloudinaryService],
			exports: [MailService, CloudinaryService],
			global: true,
		}
	}
}

// dotenv must be top of everything
import * as dotenv from 'dotenv'
dotenv.config()

import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { urlencoded, json } from 'express'


async function bootstrap() {
	const app = await NestFactory.create(AppModule)
	app.setGlobalPrefix('api')
	app.enableCors({
		origin: true,
		credentials: true,
	})
	app.use(urlencoded({ limit: '10mb', extended: false }))
	app.use(json({ limit: '10mb' }))
	await app.listen(process.env.PORT || 5000)
}
bootstrap()

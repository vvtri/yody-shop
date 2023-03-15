import { ConsoleLogger, DynamicModule, Module } from '@nestjs/common'
import { createClient, RedisClientOptions } from 'redis'
import { RedisClientSymbol } from '../common/constants/global.constant'
import { RedisClientType } from './types'

@Module({})
export class RedisModule {
	static async register(options: RedisClientOptions): Promise<DynamicModule> {
		const redis: RedisClientType = createClient(options)
		const logger = new ConsoleLogger(RedisModule.name)
		redis.on('error', (err) => logger.error(err))
		redis.on('connect', () => logger.log('Redis Client connected'))

		await redis.connect()

		return {
			module: RedisModule,
			providers: [
				{
					provide: RedisClientSymbol,
					useValue: redis,
				},
			],
			exports: [RedisClientSymbol],
			global: true,
		}
	}
}

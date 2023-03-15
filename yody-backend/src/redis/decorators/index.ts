import { Inject } from '@nestjs/common'
import { RedisClientSymbol } from '../../common/constants/global.constant'

export function InjectRedis() {
	return Inject(RedisClientSymbol)
}

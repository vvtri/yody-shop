import * as bcrypt from 'bcrypt'
import { bcryptHashRound } from '../constants/global.constant'

export function bcryptHash(plain: string) {
	return bcrypt.hashSync(plain, bcryptHashRound)
}

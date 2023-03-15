import { Request } from 'express'
import * as bcrypt from 'bcrypt'
import * as _uuid from 'uuid'
import { bcryptHashRound } from '../../common/constants/global.constant'
const uuid = _uuid.v4

export const cookieExtractor = (cookieName: string) => {
	return (req: Request) => {
		let token = null
		if (req && req.cookies) {
			token = req.cookies?.[cookieName]
		}
		return token
	}
}

/**
 * @example
 * const [secret, hashedSecret] = generateAndHashSecret()
 * @returns First element in array is secret, second element in array is hashedSecret
 *
 */
export const generateAndHashSecret = (): [string, string] => {
	const secret = uuid()
	const hashedSecret = bcrypt.hashSync(secret, bcryptHashRound)
	return [secret, hashedSecret]
}

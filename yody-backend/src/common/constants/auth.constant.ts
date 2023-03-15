export enum StrategyName {
	ACCESS_TOKEN = 'access_token',
	REFRESH_TOKEN = 'refresh_token',
}
export const verificationExpiresIn = 43200000 // 1000ms * 60 * 60 * 12 = 12h. Expires Verification for user
export const resetPwExpiresIn = 43200000 // 1000ms * 60 * 60 * 12 = 12h. Expires Reset Password for user
export const accessTokenAge = 900 // 60s * 15 = 15m
export const accessTokenAgeMs = 900000 // 1000ms * 60 * 15 = 15m
export const refreshTokenAge = 604800 // 60s * 60 *  24 * 7 = 7days
export const refreshTokenAgeMs = 604800000 // 1000ms * 60s * 60 *  24 * 7 = 7days
// Redis option for verify email
export const limitVerify = {
	key: 'verify_email',
	expiresIn: 86400, // 60s * 60 * 24 = 24h
	max: 10,
}
// Redis option for reset password
export const limitResetPassword = {
	key: 'reset_password',
	expiresIn: 86400, // 60s * 60 * 24 = 24h
	max: 10,
}

export interface ISignupPayload {
	email: string
	password: string
}

export interface ISigninPayload {
	email: string
	password: string
}

export interface IVerifyUserPayload {
  secret: string
  userId: number
}

export interface IResendVerifyEmail {
  email: string
}

export interface IRequestResetPassword {
  email: string
}

export interface IResetPassword {
  userId: number
  secret: string
  password: string
}
import axiosConfig from '../../common/config/axios.config'
import {
	IRequestResetPassword,
	IResendVerifyEmail,
	IResetPassword,
	ISigninPayload,
	ISignupPayload,
	IVerifyUserPayload,
} from '../interfaces/payload.interface'
import { IUser } from '../interfaces/user.interface'
import {
	getCurrentUserUrl,
	requestResetPasswordUrl,
	resendVerifyEmailUrl,
	resetPasswordUrl,
	signinUserUrl,
	signoutUrl,
	signupUserUrl,
	verifyUserUrl,
} from './url'

export const fetchUser = async () => {
	return axiosConfig.get<IUser>(getCurrentUserUrl)
}

export const signupUser = async (payload: ISignupPayload) => {
	return axiosConfig.post(signupUserUrl, payload)
}

export const signinUser = async (payload: ISigninPayload) => {
	return axiosConfig.post<IUser>(signinUserUrl, payload)
}

export const signoutUser = async () => {
	return axiosConfig.get(signoutUrl)
}

export const verifyUser = async (payload: IVerifyUserPayload) => {
	return axiosConfig.post<IUser>(verifyUserUrl, payload)
}

export const resendVerifyEmail = async (payload: IResendVerifyEmail) => {
	return axiosConfig.post(resendVerifyEmailUrl, payload)
}

export const requestResetPassword = async (payload: IRequestResetPassword) => {
	return axiosConfig.post(requestResetPasswordUrl, payload)
}

export const resetPassword = async (payload: IResetPassword) => {
	return axiosConfig.post(resetPasswordUrl, payload)
}

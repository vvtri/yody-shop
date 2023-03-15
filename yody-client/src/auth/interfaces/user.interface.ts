import { Gender } from "../../common/constant/global.constant"

export interface IUser {
	id: number
	email: string
  name?: string
	phoneNumber: string
	password?: string
  gender?: Gender
	address?: string
	isVerified: boolean
	isActive: boolean
	userAvatar?: {
		id: number
		url: string
		publicId: string
	}
}

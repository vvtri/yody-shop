import { Gender } from '../../common/constant/global.constant'
import { IPaginateQueryPayload } from '../../common/interfaces/paginate-query-payload.interface'

export interface ChangeUserInfoPayload {
	name?: string
	gender?: Gender
	phoneNumber?: string
	address?: string
	avatar?: string
}

export interface ChangeUserPasswordPayload {
  password: string
  newPassword: string
}

export interface FetchPurchaseHistoryPayload  extends IPaginateQueryPayload{

}

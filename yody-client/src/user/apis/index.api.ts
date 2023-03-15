import { IUser } from '../../auth/interfaces/user.interface'
import axiosConfig from '../../common/config/axios.config'
import { IPaginateResult } from '../../common/interfaces/paginate.interface'
import {
	ChangeUserInfoPayload,
	ChangeUserPasswordPayload,
	FetchPurchaseHistoryPayload,
} from '../interfaces/payload.interface'
import { IPurchaseDetail } from '../interfaces/purchase-detail.interface'
import { IPurchaseHistory } from '../interfaces/purchase-history.interface'
import {
	changeUserInfoUrl,
	changeUserPasswordUrl,
	getPurchaseDetailUrl,
	getPurchaseHistoryUrl,
} from './url'

export const changeUserInfo = (payload: ChangeUserInfoPayload) => {
	return axiosConfig.patch<IUser>(changeUserInfoUrl, payload)
}

export const changeUserPassword = (payload: ChangeUserPasswordPayload) => {
	return axiosConfig.patch(changeUserPasswordUrl, payload)
}

export const fetchPurchaseHistory = (payload: FetchPurchaseHistoryPayload) => {
	const params = new URLSearchParams(payload as Record<string, string>)
	return axiosConfig.get<IPaginateResult<IPurchaseHistory[]>>(
		`${getPurchaseHistoryUrl}?${params}`
	)
}

export const fetchPurchaseDetail = (purchaseId: number) => {
	return axiosConfig.get<IPurchaseDetail[]>(
		`${getPurchaseDetailUrl}/${purchaseId}`
	)
}

import { useMutation, useQuery } from 'react-query'
import { useAppDispatch } from '../../../redux/hook'
import {
	fetchUserThunk,
	setUser,
	updateUser,
} from '../../../redux/slices/auth.slice'
import { useUser } from '../../common/hooks/use-auth'
import {
	changeUserInfo,
	changeUserPassword,
	fetchPurchaseDetail,
	fetchPurchaseHistory,
} from '../apis/index.api'
import {
	fetchPurchaseDetailKey,
	fetchPurchaseHistoryKey,
} from '../constant/user.constant'
import { FetchPurchaseHistoryPayload } from '../interfaces/payload.interface'

export const useChangeUserInfo = () => {
	const { user } = useUser()
	const dispatch = useAppDispatch()

	return useMutation(changeUserInfo, {
		onMutate: (data) => {
			dispatch(updateUser(data))
			return { previosData: user }
		},
		onError: (error, payload, ctx: any) => {
			dispatch(setUser({ user: ctx.previosData, isLoading: false }))
		},
		onSettled: (data, error, payload, ctx) => {
			dispatch(fetchUserThunk())
		},
	})
}

export const useChangeUserPassword = () => {
	return useMutation(changeUserPassword)
}

export const useFetchPurchaseHistory = (
	payload: FetchPurchaseHistoryPayload
) => {
	return useQuery(
		[fetchPurchaseHistoryKey, payload],
		async () => {
			const result = await fetchPurchaseHistory(payload)
			return result.data
		},
		{ keepPreviousData: true, cacheTime: 0 }
	)
}

export const useFetchPurchaseDetail = (id: number) => {
	return useQuery(
		[fetchPurchaseDetailKey, id],
		async () => {
			const result = await fetchPurchaseDetail(id)
			return result.data
		},
		{ cacheTime: 0 }
	)
}

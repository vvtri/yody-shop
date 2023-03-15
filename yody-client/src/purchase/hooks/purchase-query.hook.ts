import { AxiosError } from 'axios'
import { useMutation, useQueryClient } from 'react-query'
import { toast } from 'react-toastify'
import { fetchCartQueryKey } from '../../cart/constants/index.constants'
import { ICart } from '../../cart/interfaces/cart.interface'
import { purchaseCart } from '../apis/index.api'

export const usePurchaseCart = () => {
	const queryClient = useQueryClient()
	return useMutation<any, AxiosError<string[]>>(purchaseCart, {
		onMutate: async () => {
			await queryClient.cancelQueries(fetchCartQueryKey)
			const previosData = queryClient.getQueryData<ICart[]>(fetchCartQueryKey)
			queryClient.setQueryData(fetchCartQueryKey, [])
			return { previosData }
		},
		onError: (error, payload, ctx: any) => {
			toast.error('Có lỗi xảy ra khi đặt hàng')
			console.log('error', error)
			queryClient.setQueryData(fetchCartQueryKey, ctx.previosData)
		},
	})
}

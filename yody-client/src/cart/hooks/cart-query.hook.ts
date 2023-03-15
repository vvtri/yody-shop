import { AxiosError } from 'axios'
import { QueryClient, useMutation, useQuery, useQueryClient } from 'react-query'
import { toast } from 'react-toastify'
import {
	addProductToCart,
	fetchUserCart,
	removeProductFromCart,
	updateProductInCart,
} from '../apis/index.api'
import { fetchCartQueryKey } from '../constants/index.constants'
import { ICart } from '../interfaces/cart.interface'
import { ErrorOutOfStockCart } from '../interfaces/error.interface'

export const useFetchCart = () => {
	return useQuery(
		fetchCartQueryKey,
		async () => {
			const { data } = await fetchUserCart()
			return data
		},
		{ refetchOnWindowFocus: false, retry: false }
	)
}

export const useClearCart = () => {
	const queryClient = useQueryClient()
	return {
		clearCart: () => queryClient.setQueryData(fetchCartQueryKey, null),
	}
}

export const useAddCart = () => {
	const queryClient = useQueryClient()
	return useMutation(addProductToCart, {
		onError: (error: AxiosError<ErrorOutOfStockCart>) => {
			if (error.response?.status === 459) {
				toast.error(error.response.data.message)
			} else {
				toast.error('Có lỗi xảy ra khi thêm sản phẩm')
			}
		},
		onSettled: () => {
			queryClient.invalidateQueries(fetchCartQueryKey)
		},
	})
}

export const useUpdateCart = () => {
	const queryClient = useQueryClient()
	return useMutation(updateProductInCart, {
		onMutate: async (payload) => {
			await queryClient.cancelQueries(fetchCartQueryKey)
			const previosData = queryClient.getQueryData<ICart[]>(fetchCartQueryKey)
			queryClient.setQueryData(
				fetchCartQueryKey,
				(oldData: ICart[] | undefined) => {
					const idx = oldData?.findIndex(
						(item) => payload.productVariationId === item.productVariation.id
					) as number
					oldData![idx].quantity = payload.quantity
					return oldData as ICart[]
				}
			)
			return { previosData }
		},
		onError: (error: AxiosError<ErrorOutOfStockCart>, payload, ctx: any) => {
			if (error.response?.status === 459) {
				toast.error(error.response.data.message)
			} else {
				toast.error('Có lỗi xảy ra khi thay đổi số lượng sản phẩm')
			}
			queryClient.setQueryData(fetchCartQueryKey, ctx.previosData)
		},
		onSettled: () => {
			queryClient.invalidateQueries(fetchCartQueryKey)
		},
		retry: false,
	})
}

export const useRemoveProductFromCart = () => {
	const queryClient = useQueryClient()
	return useMutation(removeProductFromCart, {
		onMutate: async (payload) => {
			await queryClient.cancelQueries(fetchCartQueryKey)
			const previosData = queryClient.getQueryData<ICart[]>(fetchCartQueryKey)
			queryClient.setQueryData(
				fetchCartQueryKey,
				(oldData: ICart[] | undefined) => {
					const temp: ICart[] = []
					oldData?.forEach((item) => {
						if (!payload.cartIds.includes(item.id)) temp.push(item)
					})
					return temp
				}
			)
			return { previosData }
		},
		onError: (error, payload, ctx: any) => {
			toast.error('Có lỗi xảy ra khi xoá sản phẩm')
			queryClient.setQueryData(fetchCartQueryKey, ctx.previosData)
		},
		onSettled: () => {
			queryClient.invalidateQueries(fetchCartQueryKey)
		},
	})
}

import {
	useInfiniteQuery,
	useMutation,
	useQuery,
	useQueryClient,
} from 'react-query'
import {
	createCommentProduct,
	fetchProductById,
	fetchProducts,
	ratingProduct,
} from '../apis/index.api'
import { fetchProductDetailQueryKey } from '../constants/index.constant'
import { FilterProductPayload } from '../interfaces/payload.interface'
import { IProductDetail } from '../interfaces/product-detail.interface'
import { toast } from 'react-toastify'
import { useUser } from '../../common/hooks/use-auth'

export const useFetchProductDetail = (product: IProductDetail) => {
	return useQuery(
		[fetchProductDetailQueryKey, product.id],
		async () => {
			const { data } = await fetchProductById(product.id)
			return data
		},
		{ initialData: product, refetchOnWindowFocus: false }
	)
}

export const useFetchProducts = (filter: FilterProductPayload) => {
	return useInfiniteQuery(
		['products', filter],
		async ({ pageParam }) => {
			const result = await fetchProducts(filter, {
				page: pageParam,
			})
			return result.data
		},
		{
			getNextPageParam: (lastPages, pages) => {
				if (lastPages?.meta?.totalPages > lastPages?.meta?.currentPage) {
					return lastPages.meta.currentPage + 1
				}
				return undefined
			},
			keepPreviousData: true,
		}
	)
}

export const useRatingProduct = (queryKey: any[]) => {
	const queryClient = useQueryClient()
	return useMutation(ratingProduct, {
		onSuccess: (data) => {
			queryClient.invalidateQueries(queryKey)
		},
	})
}

export const useCommentProduct = (queryKey: any[]) => {
	const { user } = useUser()

	const queryClient = useQueryClient()
	return useMutation(createCommentProduct, {
		onMutate: async (payload) => {
			await queryClient.cancelQueries(queryKey)
			const previosData = queryClient.getQueryData<IProductDetail>(queryKey)
			queryClient.setQueryData<IProductDetail>(
				queryKey,
				(oldQueryData: any) => {
					return {
						...oldQueryData,
						comments: [
							{
								content: payload.content,
								productId: payload.productId,
								createdAt: new Date().toISOString(),
								updatedAt: new Date().toISOString(),
								deletedAt: null,
								id: -1,
								user,
								userId: user?.id,
							},
							...oldQueryData!.comments,
						],
					}
				}
			)
			return { previosData }
		},
		onError: (error, _payload, context: any) => {
			console.log('error', error)
			toast.error('Có lỗi xảy ra khi thêm đánh giá')
			queryClient.setQueryData(queryKey, context.previosData)
		},
		onSettled: () => {
			queryClient.invalidateQueries(queryKey)
		},
	})
}

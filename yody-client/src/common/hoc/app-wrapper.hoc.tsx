import { useEffect } from 'react'
import { useAppDispatch } from '../../../redux/hook'
import { fetchUserThunk } from '../../../redux/slices/auth.slice'
import { fetchBrandsThunk } from '../../../redux/slices/brand.slice'
import { fetchCategoriesThunk } from '../../../redux/slices/category.slice'
import { fetchColorsThunk } from '../../../redux/slices/color.slice'
import { fetchSizesThunk } from '../../../redux/slices/size.slice'
import { useClearCart, useFetchCart } from '../../cart/hooks/cart-query.hook'
import { useUser } from '../hooks/use-auth'

export const AppWrapper = ({ children }: { children: any }) => {
	const dispatch = useAppDispatch()
	const { refetch } = useFetchCart()
	const { clearCart } = useClearCart()
	const { user } = useUser()

	useEffect(() => {
		if (user) refetch()
		else clearCart()
	}, [user])

	useEffect(() => {
		;(async () => {
			dispatch(fetchUserThunk())
			dispatch(fetchColorsThunk())
			dispatch(fetchBrandsThunk())
			dispatch(fetchSizesThunk())
			dispatch(fetchCategoriesThunk())
		})()
	}, [])

	return children
}

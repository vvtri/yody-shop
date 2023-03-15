import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useAppSelector } from '../../../redux/hook'
import { RootState } from '../../../redux/store'

const mapState = ({ auth }: RootState) => ({
	user: auth.user,
	isLoading: auth.isLoading,
})

export const useUser = () => {
	return useAppSelector(mapState)
}

export const useSigninRedirect = (redirectPath: string = '/') => {
	const { isLoading, user } = useAppSelector(mapState)
	const router = useRouter()

	useEffect(() => {
		if (isLoading) return
		if (user) router.push(redirectPath)
	}, [isLoading])
}

export const useNotSigninRedirect = (redirectPath: string = '/') => {
	const { isLoading, user } = useAppSelector(mapState)
	const router = useRouter()

	useEffect(() => {
		if (isLoading) return
		if (!user) router.push(redirectPath)
	}, [isLoading])
}

import { useRouter } from 'next/router'
import { useAppSelector } from '../../../redux/hook'

interface PrivatePageProps {
	children: JSX.Element
}

export const PrivatePage = ({ children }: PrivatePageProps) => {
	const router = useRouter()

	const { isLoading, user } = useAppSelector(({ auth }) => ({
		isLoading: auth.isLoading,
		user: auth.user,
	}))

	if (isLoading) return <div>'loading'</div>

	if (!user) return router.push('/')

	if (user) return children
}

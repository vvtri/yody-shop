import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useAppDispatch } from '../../../redux/hook'
import { setUser, fetchUserThunk } from '../../../redux/slices/auth.slice'
import { verifyUser } from '../../../src/auth/apis/index.api'
import AuthFormContainer from '../../../src/auth/components/auth-form-container'
import BeatLoader from 'react-spinners/BeatLoader'
import { Center, Text } from '@chakra-ui/react'
import { BiErrorCircle } from 'react-icons/bi'
import { toast } from 'react-toastify'

const Verify = () => {
	const router = useRouter()
	const dispatch = useAppDispatch()

	const [errorVerify, setErrorVerify] = useState('')
	const [isLoading, setIsLoading] = useState(true)
	const [secret, setSecret] = useState('')
	const [userId, setUserId] = useState('')
	const [isClient, setIsClient] = useState(false)

	useEffect(() => {
		if (typeof window !== 'undefined' || !isClient) {
			const searchParams = new URLSearchParams(window.location.search)
			setSecret(searchParams.get('secret') || '')
			setUserId(searchParams.get('userId') || '')
			setIsClient(true)
		}
	}, [])

	useEffect(() => {
		;(async () => {
			if (!isClient) return

			if (!secret || !userId) return

			try {
				setIsLoading(true)
				const { data: user } = await verifyUser({ secret, userId: +userId })
				dispatch(fetchUserThunk())
				toast('Xác thực tài khoản thành công! Đang quay lại trang chủ')
				router.push('/', undefined, {})
			} catch (error) {
				setIsLoading(false)
				setErrorVerify('Có lỗi xảy ra')
			}
		})()
	}, [isClient])

	return (
		<AuthFormContainer title='Đang xác thực tài khoản, vui lòng chờ'>
			{isLoading && (
				<Center>
					<BeatLoader size={20} margin={4} />
				</Center>
			)}
			{errorVerify && (
				<Center color='red.400'>
					<BiErrorCircle fontSize='24px' />{' '}
					<Text ml='4' fontSize='lg' fontWeight='bold'>
						{errorVerify}
					</Text>
				</Center>
			)}
		</AuthFormContainer>
	)
}

export default Verify

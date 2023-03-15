import {
	Button,
	Center,
	Flex,
	FormControl,
	FormErrorMessage,
	FormLabel,
	Input,
	InputGroup,
	InputRightElement,
	Link as ChakraLink,
	Text,
	VStack,
} from '@chakra-ui/react'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { BiErrorCircle } from 'react-icons/bi'
import { BsInfoSquare } from 'react-icons/bs'
import { IoMdArrowRoundBack } from 'react-icons/io'
import { resetPassword } from '../../../src/auth/apis/index.api'
import AuthFormContainer from '../../../src/auth/components/auth-form-container'

interface ResetPasswordForm {
	password: string
}

const ResetPassword = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<ResetPasswordForm>({})

	const router = useRouter()

	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [info, setInfo] = useState('')
	const [errorResetPassword, setErrorResetPassword] = useState('')
	const [isShowPassword, setIsShowPassword] = useState(false)

	const handleResetPassword = async (data: ResetPasswordForm) => {
		setIsLoading(true)
		setErrorResetPassword('')
		setInfo('')
		const { userId, secret } = router.query as {
			userId: string
			secret: string
		}
		try {
			await resetPassword({
				userId: +userId,
				secret,
				password: data.password,
			})
			setInfo('Đổi mật khẩu thành công')
			router.push('/auth/signin')
		} catch (error) {
			if (!axios.isAxiosError(error)) {
				setErrorResetPassword('Có lỗi xảy ra')
			} else {
				switch (error.response?.status) {
					default:
						setErrorResetPassword('Có lỗi xảy ra')
						break
				}
			}
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<AuthFormContainer
			handleSubmit={handleSubmit(handleResetPassword)}
			title='Khôi phục mật khẩu'
		>
			<FormControl isInvalid={Boolean(errors.password)} mt='6'>
				<FormLabel htmlFor='password'>Mật khẩu</FormLabel>
				<InputGroup size='md'>
					<Input
						id='password'
						placeholder='Nhập mật khẩu'
						type={isShowPassword ? 'text' : 'password'}
						{...register('password', { required: true, minLength: 6 })}
					/>
					<InputRightElement>
						<Center onClick={() => setIsShowPassword(!isShowPassword)}>
							{isShowPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
						</Center>
					</InputRightElement>
				</InputGroup>
				{errors.password && (
					<FormErrorMessage>
						Vui lòng nhập mật khẩu ít nhất 6 ký tự
					</FormErrorMessage>
				)}
			</FormControl>

			<VStack mt='8'>
				{info && (
					<Center color='blue.400'>
						<BsInfoSquare fontSize='24px' /> <Text ml='4'>{info}</Text>
					</Center>
				)}
				{errorResetPassword && (
					<Center color='red.400'>
						<BiErrorCircle fontSize='24px' />{' '}
						<Text ml='4'>{errorResetPassword}</Text>
					</Center>
				)}
				<Button
					type='submit'
					bg='yellow'
					color='white'
					_hover={{ bg: 'yellow' }}
					isLoading={isLoading}
				>
					Đổi mật khẩu
				</Button>
			</VStack>

			<Flex
				justifyContent='space-between'
				mt='6'
				whiteSpace='nowrap'
				flexWrap='wrap'
			>
				<Center color='yellow'>
					<Center>
						<IoMdArrowRoundBack />
					</Center>
					<Link href='/auth/signup'>
						<ChakraLink ml={{base: '1', lg: '2'}} >Quay lại đăng ký</ChakraLink>
					</Link>
				</Center>

				<Flex mt={{ base: '2' }}>
					<Link href='/auth/signin'>
						<ChakraLink color='yellow'>Đăng nhập</ChakraLink>
					</Link>
				</Flex>
			</Flex>
		</AuthFormContainer>
	)
}

export default ResetPassword

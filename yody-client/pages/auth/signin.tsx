import {
	Box,
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
import { useAppDispatch } from '../../redux/hook'
import { setUser } from '../../redux/slices/auth.slice'
import { signinUser } from '../../src/auth/apis/index.api'
import AuthFormContainer from '../../src/auth/components/auth-form-container'
import { emailRegex } from '../../src/common/constant/global.constant'

interface SigninForm {
	email: string
	password: string
}

const Signin = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<SigninForm>({})
	const router = useRouter()

	const dispatch = useAppDispatch()

	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [errorSignin, setErrorSignin] = useState('')
	const [isShowPassowrd, setIsShowPassowrd] = useState(false)

	const handleSignin = async (data: SigninForm) => {
		setIsLoading(true)
		setErrorSignin('')
		try {
			const { data: user } = await signinUser({
				email: data.email,
				password: data.password,
			})

			dispatch(setUser({ user, isLoading: false }))

			router.push('/')
		} catch (error) {
			if (!axios.isAxiosError(error)) {
				setErrorSignin('Có lỗi xảy ra')
			} else {
				switch (error.response?.status) {
					case 499:
						setErrorSignin('Email chưa được xác minh')
						break
					case 401:
						setErrorSignin('Tên đăng nhập hoặc mật khẩu không hợp lệ')
						break
					default:
						setErrorSignin('Có lỗi xảy ra, vui lòng thử lại sau')
						break
				}
			}
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<AuthFormContainer
			handleSubmit={handleSubmit(handleSignin)}
			title='Đăng nhập'
		>
			<FormControl isInvalid={Boolean(errors.email)}>
				<FormLabel htmlFor='email'>Email</FormLabel>
				<Input
					id='email'
					placeholder='Nhập email'
					type='email'
					{...register('email', { required: true, pattern: emailRegex })}
				/>
				{errors.email && (
					<FormErrorMessage>Vui lòng nhập email hợp lệ</FormErrorMessage>
				)}
			</FormControl>

			<FormControl isInvalid={Boolean(errors.password)} mt='6'>
				<FormLabel htmlFor='password'>Mật khẩu</FormLabel>
				<InputGroup size='md'>
					<Input
						id='password'
						placeholder='Nhập mật khẩu'
						type={isShowPassowrd ? 'text' : 'password'}
						{...register('password', { required: true, minLength: 6 })}
					/>
					<InputRightElement>
						<Center onClick={() => setIsShowPassowrd(!isShowPassowrd)}>
							{isShowPassowrd ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
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
				{errorSignin && (
					<Center color='red.400'>
						<BiErrorCircle fontSize='24px' /> <Text ml='4'>{errorSignin}</Text>
					</Center>
				)}
				<Button
					type='submit'
					bg='yellow'
					color='white'
					_hover={{ bg: 'yellow' }}
					isLoading={isLoading}
				>
					Đăng nhập
				</Button>
			</VStack>

			<Box mt='6' whiteSpace='nowrap'>
				<Flex justifyContent='space-between' flexWrap='wrap'>
					<Flex flexWrap='wrap'>
						<Text mr='2'>Chưa có tài khoản?</Text>
						<Link href='/auth/signup'>
							<ChakraLink color='yellow'>Đăng ký</ChakraLink>
						</Link>
					</Flex>

					<Flex>
						<Link href='/auth/reset-password/request'>
							<ChakraLink color='yellow'>Quên mật khẩu</ChakraLink>
						</Link>
					</Flex>
				</Flex>

				<Link href='/auth/verify/resend'>
					<ChakraLink display='flex' color='yellow' mt='1' whiteSpace='normal'>
						Gửi lại mã xác nhận email
					</ChakraLink>
				</Link>
			</Box>
		</AuthFormContainer>
	)
}

export default Signin

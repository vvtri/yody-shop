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
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { BiErrorCircle } from 'react-icons/bi'
import { BsInfoSquare } from 'react-icons/bs'
import { signupUser } from '../../src/auth/apis/index.api'
import AuthFormContainer from '../../src/auth/components/auth-form-container'
import { emailRegex } from '../../src/common/constant/global.constant'
import { useSigninRedirect } from '../../src/common/hooks/use-auth'

interface SignUpForm {
	email: string
	password: string
	rePassword: string
}

const Signup = () => {
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<SignUpForm>({})

	useSigninRedirect('/')

	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [info, setInfo] = useState<string>('')
	const [errorSignup, setErrorSignup] = useState('')
	const [isShowPassowrd, setIsShowPassowrd] = useState(false)
	const [isShowRePassword, setIsShowRePassword] = useState(false)

	const handleSignup = async (data: SignUpForm) => {
		setIsLoading(true)
		setErrorSignup('')
		setInfo('')
		try {
			await signupUser({
				email: data.email,
				password: data.password,
			})
			setInfo('Đăng ký thành công, vui lòng kiểm tra email của bạn')
		} catch (error) {
			if (!axios.isAxiosError(error)) {
				setErrorSignup('Có lỗi xảy ra')
			} else {
				switch (error.response?.status) {
					case 409:
						setErrorSignup('Email đã được sử dụng')
						break
					default:
						setErrorSignup('Có lỗi xảy ra')
						break
				}
			}
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<AuthFormContainer
			handleSubmit={handleSubmit(handleSignup)}
			title='Đăng ký'
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

			<FormControl isInvalid={Boolean(errors.rePassword)} mt='6'>
				<FormLabel htmlFor='rePassword'>Xác thực mật khẩu</FormLabel>
				<InputGroup size='md'>
					<Input
						id='rePassword'
						type={isShowRePassword ? 'text' : 'password'}
						placeholder='Nhập lại mật khẩu'
						{...register('rePassword', {
							required: true,
							validate: {
								matchPassword: (value) => {
									if (watch('password') !== value)
										return 'Mật khẩu nhập lại không đúng'
								},
							},
						})}
					/>
					<InputRightElement>
						<Center onClick={() => setIsShowRePassword(!isShowRePassword)}>
							{isShowRePassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
						</Center>
					</InputRightElement>
				</InputGroup>

				{errors.rePassword && (
					<FormErrorMessage>Mật khẩu nhập lại không đúng</FormErrorMessage>
				)}
			</FormControl>

			<VStack mt='8'>
				{info && (
					<Center color='blue.400'>
						<BsInfoSquare fontSize='24px' /> <Text ml='4'>{info}</Text>
					</Center>
				)}
				{errorSignup && (
					<Center color='red.400'>
						<BiErrorCircle fontSize='24px' /> <Text ml='4'>{errorSignup}</Text>
					</Center>
				)}
				<Button
					type='submit'
					bg='yellow'
					color='white'
					_hover={{ bg: 'yellow' }}
					isLoading={isLoading}
				>
					Đăng ký
				</Button>
			</VStack>

			<Flex
				justifyContent='space-between'
				mt='6'
				flexWrap='wrap'
				whiteSpace='nowrap'
			>
				<Flex flexWrap='wrap'>
					<Text mr='2'>Đã có tài khoản?</Text>
					<Link href='/auth/signin'>
						<ChakraLink color='yellow'>Đăng nhập</ChakraLink>
					</Link>
				</Flex>

				<Flex>
					<Link href='/auth/reset-password/request'>
						<ChakraLink color='yellow'>Quên mật khẩu</ChakraLink>
					</Link>
				</Flex>
			</Flex>
		</AuthFormContainer>
	)
}

export default Signup

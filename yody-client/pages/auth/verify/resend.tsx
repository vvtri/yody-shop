import {
	FormControl,
	FormLabel,
	Input,
	FormErrorMessage,
	Button,
	Center,
	VStack,
	Text,
} from '@chakra-ui/react'
import axios from 'axios'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { BiErrorCircle } from 'react-icons/bi'
import { BsInfoSquare } from 'react-icons/bs'
import { resendVerifyEmail } from '../../../src/auth/apis/index.api'
import AuthFormContainer from '../../../src/auth/components/auth-form-container'
import { emailRegex } from '../../../src/common/constant/global.constant'

interface ResendVerifyForm {
	email: string
}

const Resend = () => {
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<ResendVerifyForm>({})
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [info, setInfo] = useState<string>('')
	const [errorResendVerify, setErrorResendVerify] = useState('')

	const handleResendVerify = async (data: ResendVerifyForm) => {
		setIsLoading(true)
		setErrorResendVerify('')
		setInfo('')
		try {
			await resendVerifyEmail({
				email: data.email,
			})
			setInfo('Gửi lại mã xác nhận thành công, vui lòng kiểm tra email của bạn')
		} catch (error) {
			if (!axios.isAxiosError(error)) {
				setErrorResendVerify('Có lỗi xảy ra')
			} else {
				switch (error.response?.status) {
					case 404:
						setErrorResendVerify('Email không hợp lệ!')
						break
					case 423:
						setErrorResendVerify(
							'Vượt quá số lần yêu cầu xác thực tài khoản trong ngày!'
						)
						break
					default:
						setErrorResendVerify('Có lỗi xảy ra')
						break
				}
			}
		} finally {
			setIsLoading(false)
		}
	}
	return (
		<AuthFormContainer
			handleSubmit={handleSubmit(handleResendVerify)}
			title='Gửi lại mã xác thực'
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

			<VStack mt='8'>
				{info && (
					<Center color='blue.400'>
						<BsInfoSquare fontSize='24px' /> <Text ml='4'>{info}</Text>
					</Center>
				)}
				{errorResendVerify && (
					<Center color='red.400'>
						<BiErrorCircle fontSize='24px' />{' '}
						<Text ml='4'>{errorResendVerify}</Text>
					</Center>
				)}
				<Button
					type='submit'
					bg='yellow'
					color='white'
					_hover={{ bg: 'yellow' }}
					isLoading={isLoading}
				>
					Gửi lại mã xác nhận email
				</Button>
			</VStack>
		</AuthFormContainer>
	)
}

export default Resend

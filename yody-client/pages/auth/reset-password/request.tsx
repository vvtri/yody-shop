import {
	FormControl,
	FormLabel,
	Input,
	FormErrorMessage,
	VStack,
	Center,
	Button,
	Text,
} from '@chakra-ui/react'
import axios from 'axios'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { BiErrorCircle } from 'react-icons/bi'
import { BsInfoSquare } from 'react-icons/bs'
import { info } from 'sass'
import { requestResetPassword } from '../../../src/auth/apis/index.api'
import AuthFormContainer from '../../../src/auth/components/auth-form-container'
import { emailRegex } from '../../../src/common/constant/global.constant'

interface RequestResetPasswordForm {
	email: string
}

const Request = () => {
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<RequestResetPasswordForm>({})
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [info, setInfo] = useState<string>('')
	const [errorRequestResetPassword, setErrorRequestResetPassword] = useState('')

	const handleRequestResetPassword = async (data: RequestResetPasswordForm) => {
		setIsLoading(true)
		setErrorRequestResetPassword('')
		setInfo('')
		try {
			await requestResetPassword({
				email: data.email,
			})
			setInfo(
				'Gửi yêu cầu khôi phục mật khẩu thành công, vui lòng kiểm tra email của bạn'
			)
		} catch (error) {
			if (!axios.isAxiosError(error)) {
				setErrorRequestResetPassword('Có lỗi xảy ra')
			} else {
				switch (error.response?.status) {
					case 404:
						setErrorRequestResetPassword('Email không hợp lệ!')
						break
					case 423:
						setErrorRequestResetPassword(
							'Vượt quá số lần yêu cầu khôi phục mật khẩu'
						)
						break
					default:
						setErrorRequestResetPassword('Có lỗi xảy ra')
						break
				}
			}
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<AuthFormContainer
			handleSubmit={handleSubmit(handleRequestResetPassword)}
			title='Khôi phục mật khẩu'
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
				{errorRequestResetPassword && (
					<Center color='red.400'>
						<BiErrorCircle fontSize='24px' />{' '}
						<Text ml='4'>{errorRequestResetPassword}</Text>
					</Center>
				)}
				<Button
					type='submit'
					bg='yellow'
					color='white'
					_hover={{ bg: 'yellow' }}
					isLoading={isLoading}
					maxW='100%'
          whiteSpace='normal'
          h='max-content'
          p={{base: '2'}}
				>
					Gửi email khôi phục mật khẩu
				</Button>
			</VStack>
		</AuthFormContainer>
	)
}

export default Request

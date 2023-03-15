import {
	Box,
	Button,
	Center,
	Flex,
	Heading,
	HStack,
	Input,
	InputGroup,
	InputRightElement,
	Text,
} from '@chakra-ui/react'
import axios from 'axios'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { BiErrorCircle } from 'react-icons/bi'
import { toast } from 'react-toastify'
import { useChangeUserPassword } from '../hooks/user-query.hook'

interface ChangePasswordForm {
	password: string
	newPassword: string
	reNewPassword: string
}

const ChangePasswordTab = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		watch,
		reset,
	} = useForm<ChangePasswordForm>({})

	const [isShowPassword, setIsShowPassword] = useState(false)
	const [isShowNewPassword, setIsShowNewPassword] = useState(false)
	const [isShowReNewPassword, setIsShowReNewPassword] = useState(false)
	const [errorChangePassword, setErrorChangePassword] = useState('')

	const { mutateAsync: changePassword } = useChangeUserPassword()

	const handleChangePassword = async (data: ChangePasswordForm) => {
		const { password, newPassword } = data
		setErrorChangePassword('')
		try {
			await changePassword({ password, newPassword })
			reset()
			toast.success('Đổi mật khẩu thành công')
		} catch (error) {
			if (!axios.isAxiosError(error)) {
				return toast.error('Có lỗi xảy ra khi đổi mật khẩu')
			}
			if (error.response?.status === 401) {
				setErrorChangePassword('Mật khẩu không đúng')
			}
		}
	}

	return (
		<Center flexGrow='1'>
			<Box as='form' onSubmit={handleSubmit(handleChangePassword)}>
				<Flex alignItems='flex-start' h='fit-content' mb='4'>
					<Heading fontSize='18px' fontWeight='500' mr='4' w='200px' mt='2'>
						Mật khẩu hiện tại:
					</Heading>
					<Box w='350px'>
						<InputGroup size='md'>
							<Input
								placeholder='Nhập mật khẩu hiện tại'
								type={isShowPassword ? 'text' : 'password'}
								{...register('password', { required: true, minLength: 6 })}
								isInvalid={!!errors.password}
							/>
							<InputRightElement>
								<Center onClick={() => setIsShowPassword(!isShowPassword)}>
									{isShowPassword ? (
										<AiOutlineEyeInvisible />
									) : (
										<AiOutlineEye />
									)}
								</Center>
							</InputRightElement>
						</InputGroup>
						{errors.password?.type === 'required' && (
							<HStack color='red' ml='4' mt='2'>
								<BiErrorCircle />
								<Text ml='2'>Vui lòng nhập mật khẩu</Text>
							</HStack>
						)}
						{errors.password?.type === 'minLength' && (
							<HStack color='red' ml='4' mt='2'>
								<BiErrorCircle />
								<Text ml='2'>Vui lòng nhập mật khẩu ít nhất 6 ký tự</Text>
							</HStack>
						)}
					</Box>
				</Flex>

				<Flex alignItems='flex-start' h='fit-content' mb='4'>
					<Heading fontSize='18px' fontWeight='500' mr='4' w='200px' mt='2'>
						Mật khẩu mới:
					</Heading>
					<Box w='350px'>
						<InputGroup size='md'>
							<Input
								placeholder='Nhập mật khẩu mới'
								type={isShowNewPassword ? 'text' : 'password'}
								{...register('newPassword', { required: true, minLength: 6 })}
								isInvalid={!!errors.newPassword}
							/>
							<InputRightElement>
								<Center
									onClick={() => setIsShowNewPassword(!isShowNewPassword)}
								>
									{isShowNewPassword ? (
										<AiOutlineEyeInvisible />
									) : (
										<AiOutlineEye />
									)}
								</Center>
							</InputRightElement>
						</InputGroup>
						{errors.newPassword?.type === 'required' && (
							<HStack color='red' ml='4' mt='2'>
								<BiErrorCircle />
								<Text ml='2'>Vui lòng nhập mật khẩu mới</Text>
							</HStack>
						)}
						{errors.newPassword?.type === 'minLength' && (
							<HStack color='red' ml='4' mt='2'>
								<BiErrorCircle />
								<Text ml='2'>Vui lòng nhập mật khẩu mới ít nhất 6 ký tự</Text>
							</HStack>
						)}
					</Box>
				</Flex>

				<Flex alignItems='flex-start' h='fit-content' mb='4'>
					<Heading fontSize='18px' fontWeight='500' mr='4' w='200px' mt='2'>
						Xác nhận mật khẩu mới:
					</Heading>
					<Box w='350px'>
						<InputGroup size='md'>
							<Input
								placeholder='Nhập lại mật khẩu mới'
								type={isShowReNewPassword ? 'text' : 'password'}
								{...register('reNewPassword', {
									required: true,
									minLength: 6,
									validate: {
										matchNewPassword: (value) => {
											if (watch('newPassword') !== value)
												return 'Mật khẩu nhập lại không đúng'
										},
									},
								})}
								isInvalid={!!errors.reNewPassword}
							/>
							<InputRightElement>
								<Center
									onClick={() => setIsShowReNewPassword(!isShowReNewPassword)}
								>
									{isShowReNewPassword ? (
										<AiOutlineEyeInvisible />
									) : (
										<AiOutlineEye />
									)}
								</Center>
							</InputRightElement>
						</InputGroup>
						{errors.reNewPassword?.type === 'required' && (
							<HStack color='red' ml='4' mt='2'>
								<BiErrorCircle />
								<Text ml='2'>Vui lòng nhập lại mật khẩu mới</Text>
							</HStack>
						)}
						{errors.reNewPassword?.type === 'minLength' && (
							<HStack color='red' ml='4' mt='2'>
								<BiErrorCircle />
								<Text ml='2'>
									Vui lòng nhập lại mật khẩu mới ít nhất 6 ký tự
								</Text>
							</HStack>
						)}
						{errors.reNewPassword?.type === 'matchNewPassword' && (
							<HStack color='red' ml='4' mt='2'>
								<BiErrorCircle />
								<Text ml='2'>Mật khẩu nhập lại không đúng</Text>
							</HStack>
						)}
					</Box>
				</Flex>
				{errorChangePassword && (
					<HStack color='red' mt='4'>
						<BiErrorCircle />
						<Text ml='2'>{errorChangePassword}</Text>
					</HStack>
				)}
				<Center mt='5'>
					<Button
						bg='yellow'
						color='white'
						_hover={{ bg: 'yellow', color: 'white' }}
						type='submit'
					>
						Lưu
					</Button>
				</Center>
			</Box>
		</Center>
	)
}

export default ChangePasswordTab

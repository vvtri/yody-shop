import {
	Box,
	Button,
	ButtonGroup,
	Center,
	Circle,
	Flex,
	Heading,
	HStack,
	IconButton,
	Input,
	Radio,
	RadioGroup,
	Stack,
	Text,
} from '@chakra-ui/react'
import Image, { StaticImageData } from 'next/image'
import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import { AiOutlineCheck, AiOutlineClose, AiOutlineUpload } from 'react-icons/ai'
import blankAvatar from '../../../public/images/blank_avatar.png'
import { Gender } from '../../common/constant/global.constant'
import { useUser } from '../../common/hooks/use-auth'
import { useChangeUserInfo } from '../hooks/user-query.hook'
import { BiErrorCircle } from 'react-icons/bi'
import { toast } from 'react-toastify'
import axios, { AxiosError } from 'axios'
import { ChangeUserInfoPayload } from '../interfaces/payload.interface'

function InfoTab() {
	const { user } = useUser()
	const fileRef = useRef<HTMLInputElement>(null)

	const [userName, setUserName] = useState('')
	const [phoneNumber, setPhoneNumber] = useState('')
	const [address, setAddress] = useState('')
	const [gender, setGender] = useState<Gender | ''>('')
	const [userAvatar, setUserAvatar] = useState<string | StaticImageData>('')
	const [email, setEmail] = useState('')

	const { mutateAsync: changeUserName, isLoading: isChangingUserName } =
		useChangeUserInfo()
	const { mutateAsync: changeUserPhone, isLoading: isChangingUserPhone } =
		useChangeUserInfo()
	const { mutateAsync: changeUserAddress, isLoading: isChangingUserAddress } =
		useChangeUserInfo()
	const { mutateAsync: changeUserGender, isLoading: isChangingUserGender } =
		useChangeUserInfo()
	const { mutateAsync: changeUserInfo, isLoading: isChangingUserInfo } =
		useChangeUserInfo()

	const handleUploadAvatar = (e: ChangeEvent<HTMLInputElement>) => {
		const fileReader = new FileReader()
		fileReader.readAsDataURL(e.target.files![0])
		fileReader.onload = (e) => {
			let result = e.target!.result as string
			setUserAvatar(result)
			fileRef.current!.value = ''
		}
		fileReader.onerror = (error) => {
			console.log('error :>> ', error)
			fileRef.current!.value = ''
		}
	}

	const handleChangeUserName = async () => {
		if (userName === user?.name) return
		try {
			await changeUserName({ name: userName })
		} catch (error) {
			if (!axios.isAxiosError(error)) {
				return toast.error('Có lỗi xảy ra khi đổi tên')
			}
			if (error.response?.status === 400) toast.error('Tên không hợp lệ')
		}
	}
	const handleChangePhone = async () => {
		if (phoneNumber === user?.phoneNumber) return
		try {
			await changeUserPhone({ phoneNumber })
		} catch (error) {
			console.log('error', error)
			if (!axios.isAxiosError(error)) {
				return toast.error('Có lỗi xảy ra khi đổi số điện thoại')
			}
			if (error.response?.status === 400)
				toast.error('Số điện thoại không hợp lệ')
		}
	}
	const handleChangeAddress = async () => {
		if (address === user?.address) return
		try {
			await changeUserAddress({ address })
		} catch (error) {
			if (!axios.isAxiosError(error)) {
				return toast.error('Có lỗi xảy ra khi đổi địa chỉ')
			}
			if (error.response?.status === 400) toast.error('Địa chỉ không hợp lệ')
		}
	}
	const handleChangeGender = async () => {
		if (gender === user?.gender || gender === '') return
		try {
			await changeUserGender({ gender })
		} catch (error) {
			toast.error('Có lỗi xảy ra khi đổi thông tin')
		}
	}

	const handleChangeInfo = async () => {
		try {
			const objUpdate: ChangeUserInfoPayload = {
				...(userName && { name: userName }),
				...(address && { address }),
				...(phoneNumber && { phoneNumber }),
				...(gender && { gender }),
				...(userAvatar &&
					typeof userAvatar === 'string' && { avatar: userAvatar }),
			}
			await changeUserInfo(objUpdate)
		} catch (error) {
			if (!axios.isAxiosError(error)) {
				return toast.error('Có lỗi xảy ra khi đổi thông tin')
			}
			if (error.response?.status === 400) toast.error('Thông tin không hợp lệ')
		}
	}

	useEffect(() => {
		if (!user) return
		setUserName(user.name || '')
		setPhoneNumber(user.phoneNumber || '')
		setAddress(user.address || '')
		setGender(user.gender || '')
		setUserAvatar(user.userAvatar?.url || blankAvatar)
		setEmail(user.email)
	}, [user])

	return (
		<Flex ml='8' flexGrow='1' flexDir='column'>
			<Flex>
				<Box flexShrink='0'>
					<Flex alignItems='flex-start' h='fit-content' mb='4'>
						<Heading fontSize='18px' fontWeight='500' mr='4' w='140px' mt='2'>
							Email:
						</Heading>
						<HStack>
							<Input value={email} readOnly w='300px' cursor='not-allowed' />
						</HStack>
					</Flex>
					<Flex alignItems='flex-start' h='fit-content' mb='4'>
						<Heading fontSize='18px' fontWeight='500' mr='4' w='140px' mt='2'>
							Tên người dùng:
						</Heading>
						<HStack>
							<Input
								value={userName}
								onChange={(e) => setUserName(e.target.value)}
								w='300px'
								placeholder='Nhập tên người dùng'
							/>
							<ButtonGroup justifyContent='center' size='sm'>
								<IconButton
									bg='green.300'
									color='white'
									_hover={{ bg: 'green.300', color: 'white' }}
									icon={<AiOutlineCheck />}
									aria-label=''
									onClick={handleChangeUserName}
									isLoading={isChangingUserName}
								/>
								<IconButton
									bg='red.300'
									color='white'
									_hover={{ bg: 'red.300', color: 'white' }}
									icon={<AiOutlineClose />}
									aria-label=''
									disabled={isChangingUserName}
									onClick={() => setUserName(user?.name || '')}
								/>
							</ButtonGroup>
						</HStack>
					</Flex>
					<Flex alignItems='flex-start' h='fit-content' mb='4'>
						<Heading fontSize='18px' fontWeight='500' mr='4' w='140px' mt='2'>
							Số điện thoại:
						</Heading>
						<HStack>
							<Input
								type='tel'
								value={phoneNumber}
								onChange={(e) => setPhoneNumber(e.target.value)}
								w='300px'
								placeholder='Nhập số điện thoại của bạn'
							/>
							<ButtonGroup justifyContent='center' size='sm'>
								<IconButton
									bg='green.300'
									color='white'
									_hover={{ bg: 'green.300', color: 'white' }}
									icon={<AiOutlineCheck />}
									aria-label=''
									onClick={handleChangePhone}
									isLoading={isChangingUserPhone}
								/>
								<IconButton
									bg='red.300'
									color='white'
									_hover={{ bg: 'red.300', color: 'white' }}
									icon={<AiOutlineClose />}
									aria-label=''
									disabled={isChangingUserPhone}
									onClick={() => setPhoneNumber(user?.phoneNumber || '')}
								/>
							</ButtonGroup>
						</HStack>
					</Flex>
					<Flex alignItems='flex-start' h='fit-content' mb='4'>
						<Heading fontSize='18px' fontWeight='500' mr='4' w='140px' mt='2'>
							Địa chỉ:
						</Heading>
						<HStack>
							<Input
								value={address}
								onChange={(e) => setAddress(e.target.value)}
								w='300px'
								placeholder='Nhập địa chỉ của bạn'
							/>
							<ButtonGroup justifyContent='center' size='sm'>
								<IconButton
									bg='green.300'
									color='white'
									_hover={{ bg: 'green.300', color: 'white' }}
									icon={<AiOutlineCheck />}
									aria-label=''
									onClick={handleChangeAddress}
									isLoading={isChangingUserAddress}
								/>
								<IconButton
									bg='red.300'
									color='white'
									_hover={{ bg: 'red.300', color: 'white' }}
									icon={<AiOutlineClose />}
									aria-label=''
									disabled={isChangingUserAddress}
									onClick={() => setAddress(user?.address || '')}
								/>
							</ButtonGroup>
						</HStack>
					</Flex>
					<Flex alignItems='flex-start' h='fit-content'>
						<Heading fontSize='18px' fontWeight='500' mr='4' w='140px' mt='1'>
							Giới tính:
						</Heading>
						<HStack>
							<RadioGroup
								onChange={(value: Gender) => setGender(value)}
								value={gender}
								w='300px'
							>
								<Stack direction='row' justifyContent='space-evenly'>
									<Radio value={Gender.MALE}>Nam</Radio>
									<Radio value={Gender.FEMALE}>Nữ</Radio>
								</Stack>
							</RadioGroup>
							<ButtonGroup justifyContent='center' size='sm'>
								<IconButton
									bg='green.300'
									color='white'
									_hover={{ bg: 'green.300', color: 'white' }}
									icon={<AiOutlineCheck />}
									aria-label=''
									onClick={handleChangeGender}
									isLoading={isChangingUserGender}
								/>
								<IconButton
									bg='red.300'
									color='white'
									_hover={{ bg: 'red.300', color: 'white' }}
									icon={<AiOutlineClose />}
									aria-label=''
									disabled={isChangingUserGender}
									onClick={() => setGender(user?.gender || '')}
								/>
							</ButtonGroup>
						</HStack>
					</Flex>
				</Box>
				<Flex
					alignItems='center'
					justifyContent='center'
					flex='1'
					flexDir='column'
				>
					<Circle size='100' pos='relative' overflow='hidden'>
						<Image src={userAvatar || blankAvatar} layout='fill' />
					</Circle>
					<Center
						border='2px gray'
						_hover={{ borderColor: 'yellow', color: 'yellow' }}
						borderStyle='dashed'
						px='4'
						py='2'
						mt='10'
						cursor='pointer'
						onClick={() => fileRef.current?.click()}
					>
						<input
							type='file'
							ref={fileRef}
							accept='image/*'
							style={{ display: 'none' }}
							onChange={handleUploadAvatar}
						/>
						<AiOutlineUpload fontSize='20px' />
						<Text ml='2'>Tải ảnh lên</Text>
					</Center>
				</Flex>
			</Flex>
			<Center mt='10'>
				<Button
					bg='yellow'
					color='white'
					_hover={{ bg: 'yellow', color: 'white' }}
					onClick={handleChangeInfo}
					isLoading={isChangingUserInfo}
				>
					Lưu
				</Button>
			</Center>
		</Flex>
	)
}

export default InfoTab

import {
	Box,
	Flex,
	Heading,
	Text,
	Link as ChakraLink,
	List,
	ListIcon,
	ListItem,
} from '@chakra-ui/react'
import Link from 'next/link'
import React from 'react'
import { MdOutlineLocationOn } from 'react-icons/md'
import { BsTelephone } from 'react-icons/bs'
import { AiOutlineMail } from 'react-icons/ai'
import { useResponsive } from '../hooks/use-responsive'

const about = [
	{
		display: 'Giới thiệu',
		path: '/',
	},
	{
		display: 'Liên hệ',
		path: '/',
	},
	{
		display: 'Tuyển dụng',
		path: '/',
	},
	{
		display: 'Tin tức',
		path: '/',
	},
	{
		display: 'Hệ thống cửa hàng',
		path: '/',
	},
]

const support = [
	{
		display: 'Hướng dẫn chọn size',
		path: '/',
	},
	{
		display: 'Chính sách khách hàng thân thiết',
		path: '/',
	},
	{
		display: 'Chính sách đổi/trả',
		path: '/',
	},
	{
		display: 'Chính sách bảo mật',
		path: '/',
	},
	{
		display: 'Thanh toán giao nhận',
		path: '/',
	},
]

export const Footer = () => {
	const { isTablet } = useResponsive()

	return (
		<Box bg='#1E1C56' color='white'>
			<Flex
				maxW={{ xl: 'container.xl' }}
				gap='40px'
				mx='auto'
				py='6'
				px='2'
				flexWrap={{ base: 'wrap', lg: 'nowrap' }}
				justifyContent={{ base: 'space-evenly' }}
			>
				<Box w={{ sm: '40%', lg: '30%' }}>
					<Text fontSize='sm' mt='5'>
						“Đặt sự hài lòng của khách hàng là ưu tiên số 1 trong mọi suy nghĩ
						hành động của mình” là sứ mệnh, là triết lý, chiến lược.. luôn cùng
						YODY tiến bước”
					</Text>
				</Box>
				<Box w={{ sm: '40%', lg: '20%' }}>
					<Heading textTransform='uppercase' fontSize='md' mb='4' color='white'>
						Về Yody
					</Heading>
					{about.map((item, index) => (
						<Link href={item.path} passHref key={index}>
							<ChakraLink display='block' fontSize='sm'>
								{item.display}
							</ChakraLink>
						</Link>
					))}
				</Box>
				<Box w={{ sm: '40%', lg: '20%' }}>
					<Heading textTransform='uppercase' fontSize='md' mb='4' color='white'>
						Hỗ trợ khách hàng
					</Heading>
					{support.map((item, index) => (
						<Link href={item.path} passHref key={index}>
							<ChakraLink display='block' fontSize='sm'>
								{item.display}
							</ChakraLink>
						</Link>
					))}
				</Box>
				<Box w={{ sm: '40%', lg: '30%' }} fontSize='sm'>
					<List spacing='3'>
						<ListItem display='flex' alignItems='center'>
							{isTablet && (
								<ListIcon
									as={MdOutlineLocationOn}
									color='white'
									fontSize='xl'
								/>
							)}
							<Box>
								<Text>Công ty cổ phần Thời trang YODY</Text>
								<Text>Mã số thuế: adasdasddsa</Text>
								<Text>
									Địa chỉ: Đường An Định - Phường Việt Hoa - Thành phố Hải Dương
									- Hải Dương
								</Text>
							</Box>
						</ListItem>
						<ListItem display='flex' alignItems='center'>
							{isTablet && (
								<ListIcon as={BsTelephone} color='white' fontSize='xl' />
							)}
							<Box>
								<Text>Liên hệ đặt hàng: 024 730 56665</Text>
								<Text>Thắc mắc đơn hàng: 024 730 16661</Text>
								<Text>Góp ý khiếu nại: 1800 2086</Text>
							</Box>
						</ListItem>
						<ListItem display='flex' alignItems='center'>
							{isTablet && (
								<ListIcon as={AiOutlineMail} color='white' fontSize='xl' />
							)}
							<Box>
								<Text>Email: chamsockhachhang@yody.vn</Text>
							</Box>
						</ListItem>
					</List>
				</Box>
			</Flex>
		</Box>
	)
}

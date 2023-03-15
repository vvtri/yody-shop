import {
	Box,
	Center,
	Drawer,
	DrawerBody,
	DrawerCloseButton,
	DrawerContent,
	Flex,
	Input,
	InputGroup,
	InputRightAddon,
	Link as ChakraLink,
	Spinner,
	Text,
	useDisclosure,
	useMediaQuery,
	VStack,
} from '@chakra-ui/react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { ReactEventHandler, useEffect, useState } from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import { BiUser } from 'react-icons/bi'
import { BsHandbag } from 'react-icons/bs'
import { BeatLoader } from 'react-spinners'
import { useAppDispatch, useAppSelector } from '../../../../redux/hook'
import { setUser } from '../../../../redux/slices/auth.slice'
import { RootState } from '../../../../redux/store'
import { signoutUser } from '../../../auth/apis/index.api'
import { useFetchCart } from '../../../cart/hooks/cart-query.hook'
import blankAvatar from '../../../../public/images/blank_avatar.png'
import blankCart from '../../../../public/images/blank_cart.svg'
import logo from '../../../../public/images/logo.webp'
import ProductInCart from './product-in-cart'
import { useResponsive } from '../../hooks/use-responsive'
import { AiOutlineMenu } from 'react-icons/ai'

const headerMenu = [
	{
		display: 'Trang chủ',
		path: '/',
	},
	{
		display: 'Sản phẩm',
		path: '/product',
	},
	{
		display: 'Về Yody',
		path: '#',
	},
	{
		display: 'Liên hệ',
		path: '#',
	},
]

const mapState = ({ auth }: RootState) => ({
	user: auth.user,
	isLoadingUser: auth.isLoading,
})

export const Header = () => {
	const router = useRouter()
	const dispatch = useAppDispatch()

	const {
		isOpen: isOpenCart,
		onClose: onCloseCart,
		onOpen: onOpenCart,
	} = useDisclosure()
	const {
		isOpen: isOpenUser,
		onClose: onCloseUser,
		onOpen: onOpenUser,
	} = useDisclosure()

	const { user, isLoadingUser } = useAppSelector(mapState)
	const { isLoading: isLoadingCart, data: carts } = useFetchCart()

	const [isShow, setIsShow] = useState<boolean>(true)
	const [search, setSearch] = useState<string>('')
	const {
		isOpen: isOpenMenu,
		onClose: onCloseMenu,
		onOpen: onOpenMenu,
	} = useDisclosure()
	const { isDesktop, isMobile, isTablet } = useResponsive()

	const handleSignout = async () => {
		await signoutUser()
		dispatch(setUser({ user: null, isLoading: false }))
		router.push('/')
	}

	const handleSearchProduct: ReactEventHandler<HTMLFormElement> = (e) => {
		e.preventDefault()
		router.push(`/product?search=${search}`)
	}

	useEffect(() => {
		let oldScroll = window.scrollY
		const handleScroll = () => {
			if (oldScroll > window.scrollY || window.scrollY === 0) {
				setIsShow(true)
			} else {
				setIsShow(false)
			}
			oldScroll = window.scrollY
		}
		window.addEventListener('scroll', handleScroll)
		return () => {
			window.removeEventListener('scroll', handleScroll)
		}
	}, [])

	return (
		<Box
			w='100%'
			pos='fixed'
			top='0'
			left='0'
			right='0'
			zIndex={100}
			visibility={isShow ? 'visible' : 'hidden'}
			opacity={isShow ? '1' : '0'}
			transition='all 0.1s ease-in'
			bg='white'
			boxShadow='0 6px 12px 0 rgb(0 0 0 / 4%)'
		>
			<Box maxW={{ xl: 'container.xl' }} mx='auto'>
				<Flex
					h={{ base: '70px', xl: '90px' }}
					alignItems='center'
					mx='8'
					justifyContent='space-between'
				>
					<Link href='/' passHref>
						<Box
							as='a'
							display='block'
							position='relative'
							w={{ base: '74px', lg: '110px' }}
							h={{ base: '33px', lg: '50px' }}
							mr={{ base: '4', lg: '12' }}
							flexShrink='0'
						>
							<Image src={logo} layout='fill' />
						</Box>
					</Link>

					{!isTablet && (
						<Center
							mr='4'
							cursor='pointer'
							p='2'
							_hover={{ bg: 'blackAlpha.50', borderRadius: '50%' }}
							onClick={onOpenMenu}
							fontSize='20px'
						>
							<AiOutlineMenu />
						</Center>
					)}
					{!isTablet && (
						<Drawer isOpen={isOpenMenu} placement='left' onClose={onCloseMenu}>
							<DrawerContent>
								<DrawerCloseButton />
								<DrawerBody>
									<VStack justifyContent='center' mt='20'>
										{headerMenu.map((menu) => (
											<Link
												href={menu.path ? menu.path : '#'}
												passHref
												key={menu.display}
											>
												<Box
													as='a'
													fontSize='md'
													textTransform='uppercase'
													fontWeight='500'
													py='3'
													px='1'
													pos='relative'
													onClick={onCloseMenu}
													_after={{
														content: '""',
														w: '0',
														h: '2px',
														transition: 'width 0.3s ease-in',
														bg: 'yellow',
														pos: 'absolute',
														bottom: '0',
														left: '0',
													}}
													_hover={{
														_after: {
															w: '100%',
														},
													}}
												>
													{menu.display}
												</Box>
											</Link>
										))}
									</VStack>
								</DrawerBody>
							</DrawerContent>
						</Drawer>
					)}
					{isTablet && (
						<Flex justifyContent='space-between' flexShrink='0'>
							{headerMenu.map((menu) => (
								<Link
									href={menu.path ? menu.path : '#'}
									passHref
									key={menu.display}
								>
									<Box
										as='a'
										fontSize='md'
										textTransform='uppercase'
										fontWeight='500'
										py='3'
										px='1'
										mr='30px'
										pos='relative'
										_after={{
											content: '""',
											w: '0',
											h: '2px',
											transition: 'width 0.3s ease-in',
											bg: 'yellow',
											pos: 'absolute',
											bottom: '0',
											left: '0',
										}}
										_hover={{
											_after: {
												w: '100%',
											},
										}}
									>
										{menu.display}
									</Box>
								</Link>
							))}
						</Flex>
					)}

					{isTablet && (
						<Flex flex='1' mr={{ base: '6', lg: '12' }}>
							<form onSubmit={handleSearchProduct} style={{ flexGrow: '1' }}>
								<Box width='100%'>
									<InputGroup>
										<Input
											placeholder='Tìm sản phẩm'
											value={search}
											onChange={(e) => setSearch(e.target.value)}
										/>
										<InputRightAddon
											bg='yellow'
											color='white'
											as='button'
											p={{ base: '3', lg: '4' }}
											fontSize={{ base: 'sm', xl: 'xl' }}
										>
											<AiOutlineSearch />
										</InputRightAddon>
									</InputGroup>
								</Box>
							</form>
						</Flex>
					)}

					<Center
						pos='relative'
						mr='28px'
						h='100%'
						alignItems='center'
						onMouseEnter={onOpenCart}
						onMouseLeave={onCloseCart}
					>
						<Link passHref href='/cart'>
							<Center
								as='a'
								display='flex'
								fontSize={{ base: '24px', lg: '30px' }}
								h='100%'
								px='2'
							>
								<BsHandbag />
							</Center>
						</Link>
						{isTablet && (
							<VStack
								w={{ base: '100vw', lg: '500px' }}
								pos={{ base: 'fixed', lg: 'absolute' }}
								top={{ base: '70px', lg: '100%' }}
								right='0'
								maxH='500px'
								overflowY='auto'
								overscrollBehaviorY='contain'
								bg='white'
								border='1px solid gray'
								borderRadius='5px'
								opacity={isOpenCart ? 1 : 0}
								visibility={isOpenCart ? 'visible' : 'hidden'}
								transition='all 0.3s ease-in'
								zIndex={100}
							>
								{isLoadingCart && (
									<Center py='8'>
										<BeatLoader size={20} margin={4} />
									</Center>
								)}
								{!isLoadingCart && !carts?.length && (
									<VStack py='4'>
										<Box w='400px' h='150px' pos='relative'>
											<Image src={blankCart} layout='fill' />
										</Box>
										<Text
											color='yellow'
											fontWeight='bold'
											textTransform='capitalize'
										>
											Giỏ hàng trống
										</Text>
									</VStack>
								)}
								{!isLoadingCart &&
									carts?.length &&
									carts?.map((cart) => (
										<ProductInCart productCart={cart} key={cart.id} />
									))}
							</VStack>
						)}
					</Center>

					<Center
						onMouseEnter={onOpenUser}
						onMouseLeave={onCloseUser}
						pos='relative'
            h='100%'
            p='2'
					>
						{isLoadingUser && (
							<Spinner
								thickness='4px'
								speed='0.65s'
								emptyColor='gray.200'
								color='blue.500'
								size='lg'
							/>
						)}
						{!isLoadingUser && user && (
							<>
								<Link passHref href='/user/info'>
									<Center as='a' h='100%'>
										<Center
											w={{ base: '35px', lg: '40px' }}
											h={{ base: '35px', lg: '40px' }}
                      pos='relative'
										>
											<Image
												src={user.userAvatar?.url || blankAvatar}
												layout='fill'
												style={{ borderRadius: '50%' }}
											/>
										</Center>
									</Center>
								</Link>
								{isTablet && (
									<VStack
										top='100%'
										right='0'
										pos='absolute'
										border='1px solid gray'
										bg='white'
										borderRadius='5px'
										opacity={isOpenUser ? 1 : 0}
										visibility={isOpenUser ? 'visible' : 'hidden'}
										transition='all 0.3s ease-in'
										px='6'
										py='3'
										w='fit-content'
										zIndex={100}
										alignItems='flex-start'
									>
										<Text
											whiteSpace='nowrap'
											color='gray'
											_hover={{ color: 'yellow', textDecor: 'underline' }}
											transition='all 0.2s ease-in'
											cursor='pointer'
										>
											<Link passHref href='/user/info'>
												Thông tin cá nhân
											</Link>
										</Text>
										<Text
											whiteSpace='nowrap'
											color='gray'
											_hover={{ color: 'yellow', textDecor: 'underline' }}
											transition='all 0.2s ease-in'
											cursor='pointer'
											onClick={handleSignout}
										>
											Đăng xuất
										</Text>
									</VStack>
								)}
							</>
						)}
						{!isLoadingUser && !user && (
							<>
								<Link href='/auth/signin'>
									<Center
										as='a'
										display='flex'
										fontSize={{ base: '24px', lg: '32px' }}
										cursor='pointer'
									>
										<BiUser />
									</Center>
								</Link>
								{isTablet && (
									<VStack
										top='100%'
										right='0'
										pos='absolute'
										border='1px solid gray'
										bg='white'
										borderRadius='5px'
										opacity={isOpenUser ? 1 : 0}
										visibility={isOpenUser ? 'visible' : 'hidden'}
										transition='all 0.3s ease-in'
										px='6'
										py='3'
										w='fit-content'
										zIndex={100}
										alignItems='flex-start'
									>
										<Link href='/auth/signup' passHref>
											<ChakraLink
												whiteSpace='nowrap'
												color='gray'
												_hover={{ color: 'yellow', textDecor: 'underline' }}
												transition='all 0.2s ease-in'
											>
												Đăng ký
											</ChakraLink>
										</Link>
										<Link href='/auth/signin' passHref>
											<ChakraLink
												whiteSpace='nowrap'
												color='gray'
												_hover={{ color: 'yellow', textDecor: 'underline' }}
												transition='all 0.2s ease-in'
											>
												Đăng nhập
											</ChakraLink>
										</Link>
									</VStack>
								)}
							</>
						)}
					</Center>
				</Flex>
			</Box>
		</Box>
	)
}

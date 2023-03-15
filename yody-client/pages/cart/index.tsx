import {
	Box,
	Button,
	Center,
	Flex,
	Grid,
	Heading,
	HStack,
	Text,
	VStack,
} from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { ProductInCart } from '../../src/cart/components/product-in-cart'
import { useFetchCart } from '../../src/cart/hooks/cart-query.hook'
import { LoadingScreen } from '../../src/common/components/loading-screen/loading-screen'
import { formatPrice } from '../../src/common/utils/index.utils'
import { usePurchaseCart } from '../../src/purchase/hooks/purchase-query.hook'
import { BiErrorCircle } from 'react-icons/bi'
import Image from 'next/image'
import blankCart from '../../public/images/blank_cart.svg'
import { useRouter } from 'next/router'
import { useUser } from '../../src/common/hooks/use-auth'

function CartPage() {
	const router = useRouter()

	const { isLoading: isLoadingUser, user } = useUser()

	const { data: carts, isLoading: isLoadingCart } = useFetchCart()
	const { mutate: purchaseCart, error: purchaseError } = usePurchaseCart()

	const calculateTotalPrice = (): number => {
		if (!carts?.length) return 0
		return carts.reduce(
			(total, cart) =>
				total + cart.quantity * cart.productVariation.product.price,
			0
		)
	}

	const calculateTotalItem = (): number => {
		if (!carts?.length) return 0
		return carts.reduce((total, cart) => total + cart.quantity, 0)
	}

	return (
		<Box
			bg='blackAlpha.50'
			minH='calc(100vh - 90px - 240px)'
			p={{ base: '8' }}
			pt={{ lg: '60px' }}
			pb={{ lg: '100px' }}
		>
			{isLoadingCart && <LoadingScreen />}
			{!isLoadingCart && carts && user && (
				<Flex
					maxW={{ xl: 'container.xl' }}
					mx='auto'
					flexWrap='wrap'
					justifyContent='space-between'
				>
					{purchaseError && (
						<Box
							w='100%'
							bg='white'
							boxShadow='rgba(100, 100, 111, 0.2) 0px 7px 29px 0px'
							py='4'
							px='8'
							mb='10'
						>
							{purchaseError.response?.data.map((item, index) => (
								<HStack color='red' mb='1' key={index}>
									<BiErrorCircle fontSize='18px' />
									<Text ml='2'>{item}</Text>
								</HStack>
							))}
						</Box>
					)}
					<Box
						flexShrink='0'
						w={{ base: '100%', xl: '72%' }}
						overflowX={{ base: 'auto', lg: 'hidden' }}
						bg='white'
						boxShadow='rgba(100, 100, 111,  0.2) 0px 7px 29px 0px'
						py='4'
					>
						{!!carts.length ? (
							<>
								<Grid
									px='6'
									py='3'
									templateColumns={{
										base: 'repeat(4, minmax(min-content, 100vw))',
									}}
									gap={{ base: '4', lg: '4' }}
									overflowX='auto'
									w='100%'
								>
									<Heading flexGrow='1' fontSize='md'>
										Sản phẩm
									</Heading>
									<Heading
										w='150px'
										px='2'
										flexShrink='0'
										fontSize='md'
										textAlign='center'
									>
										Đơn giá
									</Heading>
									<Heading
										w='150px'
										px='2'
										flexShrink='0'
										fontSize='md'
										textAlign='center'
									>
										Số lượng
									</Heading>
									<Heading
										w='150px'
										px='2'
										flexShrink='0'
										fontSize='md'
										textAlign='center'
									>
										Thành tiền
									</Heading>

									{carts.map((cart) => (
										<ProductInCart key={cart.id} cart={cart} />
									))}
								</Grid>
							</>
						) : (
							<VStack>
								<Image src={blankCart} />
								<Text>Giỏ hàng của bạn trống</Text>
								<Button
									bg='yellow'
									color='white'
									_hover={{ bg: 'yellow', color: 'white' }}
									py='3'
									px='6'
									onClick={() => router.push('/product')}
								>
									Tiếp tục mua hàng
								</Button>
							</VStack>
						)}
					</Box>

					<Box
						flexShrink='0'
						w={{ base: '100%', xl: '25%' }}
						mt={{ base: '6', xl: '0' }}
						px='6'
						py='8'
						bg='white'
						boxShadow='rgba(100, 100, 111, 0.2) 0px 7px 29px 0px'
						h='fit-content'
					>
						<HStack justifyContent='space-between'>
							<Text>Tổng cộng:</Text>
							<Text fontSize='lg' color='yellow' fontWeight='500'>
								{formatPrice(calculateTotalPrice())}đ
							</Text>
						</HStack>
						<Button
							bg='yellow'
							color='white'
							_hover={{ bg: 'yellow', color: 'white' }}
							w='100%'
							fontSize='lg'
							mt='4'
							fontWeight='500'
							onClick={() => purchaseCart()}
							disabled={!carts.length}
						>
							Thanh toán ({calculateTotalItem()})
						</Button>
					</Box>
				</Flex>
			)}
			{!isLoadingUser && !user && (
				<Flex maxW={{ xl: 'container.xl' }} mx='auto'>
					<Flex
						w='100%'
						bg='white'
						boxShadow='rgba(100, 100, 111, 0.2) 0px 7px 29px 0px'
						py='4'
						px='8'
						alignItems='center'
						flexDir='column'
						mb='10'
					>
						<Flex w='200px' h='200px' pos='relative'>
							<Image src={blankCart} layout='fill' />
						</Flex>
						<Text textAlign='center' color='red.300'>
							Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng
						</Text>
					</Flex>
				</Flex>
			)}
		</Box>
	)
}

export default CartPage

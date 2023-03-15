import {
	Box,
	Button,
	Center,
	Circle,
	Flex,
	Heading,
	HStack,
	Square,
	Text,
	Textarea,
	Tooltip,
	useNumberInput,
} from '@chakra-ui/react'
import momentjs from 'moment'
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useEffect, useMemo, useState } from 'react'
import { BiErrorCircle } from 'react-icons/bi'
import { BsCartPlus } from 'react-icons/bs'
import { FiSend } from 'react-icons/fi'
import { toast } from 'react-toastify'
import defaultAvt from '../../public/images/blank_avatar.png'
import { useAppSelector } from '../../redux/hook'
import { RootState } from '../../redux/store'
import { useAddCart } from '../../src/cart/hooks/cart-query.hook'
import NumberSpinner from '../../src/common/components/number-spinner'
import Rating from '../../src/common/components/rating'
import { Gender } from '../../src/common/constant/global.constant'
import { formatPrice, roundHalf } from '../../src/common/utils/index.utils'
import { fetchProductById } from '../../src/product/apis/index.api'
import { fetchProductDetailQueryKey } from '../../src/product/constants/index.constant'
import {
	useCommentProduct,
	useFetchProductDetail,
	useRatingProduct,
} from '../../src/product/hooks/product-query.hook'
import { IColor } from '../../src/product/interfaces/color.interface'
import { IProductDetail } from '../../src/product/interfaces/product-detail.interface'
import { ISize } from '../../src/product/interfaces/size.interface'

interface ProductDetailProps {
	product: IProductDetail
}

interface ErrorAddProduct {
	color?: string
	size?: string
}

const mapState = ({ color, size, auth }: RootState) => ({
	colors: color.colors,
	sizes: size.sizes,
	...auth,
})

const ProductDetail = (props: ProductDetailProps) => {
	const router = useRouter()
	const { data: product } = useFetchProductDetail(props.product)
	if (!product) return

	const queryKey = [fetchProductDetailQueryKey, product.id]

	const { mutate: ratingProduct, isLoading: isRatingProduct } =
		useRatingProduct(queryKey)
	const { mutateAsync: addCartAsync, isLoading: isAddingCart } = useAddCart()
	const { mutate: commentProduct } = useCommentProduct(queryKey)

	const { user, sizes, colors } = useAppSelector(mapState)

	const {
		getInputProps,
		getIncrementButtonProps,
		getDecrementButtonProps,
		valueAsNumber,
	} = useNumberInput({ step: 1, defaultValue: 1, min: 1 })

	const [activeImage, setActiveImage] = useState<number>(0)
	const [color, setColor] = useState<IColor | undefined>()
	const [size, setSize] = useState<ISize | undefined>()
	const [comment, setComment] = useState('')
	const [errorAddProduct, setErrorAddProduct] = useState<ErrorAddProduct>({
		color: '',
		size: '',
	})

	const { uniqueColors, uniqueSizes } = useMemo(() => {
		const uniqueColors = new Map<number, IColor>()
		const uniqueSizes = new Map<number, ISize>()
		product.productVariations.forEach((variation) => {
			uniqueColors.set(variation.colorId, variation.color)
			uniqueSizes.set(variation.sizeId, variation.size)
		})
		return {
			uniqueColors: Array.from(uniqueColors.values()),
			uniqueSizes: Array.from(uniqueSizes.values()),
		}
	}, [product])

	const getUserRatingValues = product.productRatings.find(
		(productRating) => productRating.userId === user?.id
	)?.rating

	const { validSizes, inValidSizes } = useMemo(() => {
		const validSizes = new Map<number, ISize>()

		if (!color) {
			return {
				validSizes: uniqueSizes,
				inValidSizes: [],
			}
		}
		product.productVariations.forEach((variation) => {
			if (variation.color.id === color.id)
				validSizes.set(variation.sizeId, variation.size)
		})
		return {
			validSizes: Array.from(validSizes.values()),
			inValidSizes: uniqueSizes.filter((item) => !validSizes.has(item.id)),
		}
	}, [color, size, uniqueSizes, product])

	const handleCommentProduct = () => {
		commentProduct({ content: comment, productId: product.id })
		setComment('')
	}

	const handleAddCart = async (isToast: boolean = true): Promise<Boolean> => {
		let currentError: ErrorAddProduct = {}
		if (!color) currentError.color = 'Vui lòng chọn màu sắc'
		if (!size) currentError.size = 'Vui lòng chọn kích cỡ'
		if (!color || !size) {
			setErrorAddProduct(currentError)
			return false
		}
		const productVariationId = product.productVariations.find(
			(item) => item.color.id === color.id && item.size.id === size.id
		)?.id
		if (!productVariationId) {
			toast.error('Có lỗi xảy ra khi thêm sản phẩm vào giỏ hàng!')
			return false
		}
		if (!user) {
			toast.error('Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng!')
			return false
		}
		await addCartAsync({ quantity: valueAsNumber, productVariationId })
		if (isToast)
			toast.success(
				`Thêm ${valueAsNumber} sản phẩm ${product.name} vào giỏ hàng`,
				{ position: 'top-center' }
			)
		return true
	}

	const handleAddCartAndPurchase = async () => {
		const isSuccess = await handleAddCart(false)
		if (isSuccess) router.push('/cart')
	}

	useEffect(() => {
		if (color) setErrorAddProduct((state) => ({ ...state, color: '' }))
		if (size) setErrorAddProduct((state) => ({ ...state, size: '' }))
	}, [color, size])

	useEffect(() => {
		if (!color) return
		// Current size is not valid
		if (!validSizes.some((item) => item.id === size?.id)) {
			setSize(undefined)
		}
	}, [color])

	return (
		<Box maxW={{ xl: 'container.xl' }} mx='auto' pt='10'>
			<Flex alignItems='flex-start'>
				<Flex w='50%' flexShrink='0' alignSelf='stretch'>
					<Box
						w='18%'
						flexShrink='0'
						css={{
							'&::-webkit-scrollbar': {
								display: 'none',
							},
						}}
						h='100%'
						overflowY='scroll'
						overflowX='hidden'
					>
						{product.productImages.map((image, index) => (
							<Box
								w='100%'
								h='20%'
								pos='relative'
								mb='2'
								_hover={{ border: '1px solid yellow' }}
								cursor='pointer'
								key={image.id}
								border={index === activeImage ? '1px solid yellow' : ''}
								onClick={() => setActiveImage(index)}
							>
								<Image src={image.url} layout='fill' />
							</Box>
						))}
					</Box>
					<Box flexGrow='1' flexShrink='0' ml='2'>
						<Box w='100%' h='100%' pos='relative'>
							<Image
								src={product.productImages[activeImage].url}
								layout='fill'
							/>
						</Box>
					</Box>
				</Flex>
				<Box ml='8' w='50%' alignSelf='stretch' flexShrink='0'>
					<Heading size='md' fontWeight='500' mb='2'>
						{product.name}
					</Heading>
					<Flex justifyContent='flex-start' alignItems='center'>
						<Rating
							size='3xl'
							ratingValue={product.rating}
							readonly={!user || isRatingProduct}
							onClick={(rating) =>
								ratingProduct({ rating, productId: product.id })
							}
						/>
						{getUserRatingValues && (
							<Text color='yellow' fontSize='sm' ml='2'>
								(Bạn đã đánh giá {roundHalf(getUserRatingValues / 20)} sao)
							</Text>
						)}
					</Flex>
					<Text color='yellow' fontSize='xl' fontWeight='500'>
						{formatPrice(product.price)}đ
					</Text>
					<Box height='1px' w='100%' bg='gray' my='6' opacity='0.5' />
					<HStack mb='4' alignItems='flex-end'>
						<Text>Giới tính: </Text>
						<Text color='yellow' fontWeight='500' fontSize='18px'>
							{product.gender === Gender.MALE ? 'Nam' : 'Nữ'}
						</Text>
					</HStack>
					<HStack mb='4' alignItems='flex-end'>
						<Text>Loại sản phẩm: </Text>
						<Text color='yellow' fontWeight='500' fontSize='18px'>
							{product.category.name}
						</Text>
					</HStack>
					<HStack mb='4' alignItems='flex-end'>
						<Text>Thương hiệu: </Text>
						<Text color='yellow' fontWeight='500' fontSize='18px'>
							{product.brand.name}
						</Text>
					</HStack>
					<Text mb='2'>Màu sắc: {color?.name}</Text>
					<Flex gap='2'>
						{uniqueColors.map((item) => (
							<Tooltip label={item.name} key={item.id}>
								<Circle
									size='50px'
									bg={item.hexCode}
									_hover={{ outline: '2px solid blue' }}
									cursor='pointer'
									onClick={() => setColor(item)}
									outline={
										color?.id === item.id ? '2px solid blue' : '2px solid gray'
									}
								/>
							</Tooltip>
						))}
					</Flex>
					<Text mb='2' mt='4'>
						Kích cỡ: {size?.name}
					</Text>
					<Flex gap='2'>
						{validSizes.map((item) => (
							<Tooltip label={item.name} key={item.id}>
								<Circle
									key={item.id}
									size='50px'
									_hover={{ outline: '2px solid blue' }}
									cursor='pointer'
									onClick={() => setSize(item)}
									outline={
										size?.id === item.id ? '2px solid blue' : '2px solid gray'
									}
									children={item.name}
									fontSize='xl'
								/>
							</Tooltip>
						))}
						{inValidSizes.map((item) => (
							<Tooltip
								label={`Không có size ${item.name} với màu ${color?.name}`}
								key={item.id}
							>
								<Circle
									key={item.id}
									size='50px'
									_hover={{ outline: '2px solid black' }}
									cursor='not-allowed'
									outline={'2px solid gray'}
									children={item.name}
									pos='relative'
									fontSize='xl'
									_before={{
										content: '""',
										position: 'absolute',
										w: '100%',
										h: '2px',
										transform: 'rotate(45deg)',
										bg: 'black',
									}}
									_after={{
										content: '""',
										position: 'absolute',
										w: '100%',
										h: '2px',
										bg: 'black',
										transform: 'rotate(-45deg)',
									}}
								/>
							</Tooltip>
						))}
					</Flex>
					<Text mb='2' mt='4'>
						Số lượng:
					</Text>
					<NumberSpinner
						getDecrementButtonProps={getDecrementButtonProps}
						getIncrementButtonProps={getIncrementButtonProps}
						getInputProps={getInputProps}
						width='160px'
						boxSize='40px'
					/>
					{!!Object.values(errorAddProduct).length && (
						<Box mt='3'>
							{Object.values(errorAddProduct)
								.filter(Boolean)
								.map((item, index) => (
									<HStack key={index}>
										<Center color='red'>
											<BiErrorCircle />
										</Center>
										<Text color='red'>{item}</Text>
									</HStack>
								))}
						</Box>
					)}
					<Flex mt='4' h='16' gap='6'>
						<Button
							bg='yellow'
							color='purple'
							_hover={{ color: 'white' }}
							transition='color 0.2s ease-in'
							borderRadius='5px'
							h='100%'
							w='60%'
							isLoading={isAddingCart}
							onClick={handleAddCartAndPurchase}
						>
							Mua ngay
						</Button>
						<Button
							borderRadius='5px'
							border='1px solid gray'
							color='purple'
							h='100%'
							bg='white'
							transition='color 0.2s ease-in'
							_hover={{ color: 'white', bg: 'yellow' }}
							isLoading={isAddingCart}
							onClick={() => handleAddCart()}
						>
							<BsCartPlus /> <Text ml='2'>Thêm vào giỏ hàng</Text>
						</Button>
					</Flex>
				</Box>
			</Flex>
			<Box my='10'>
				<Heading textAlign='center' size='lg' color='yellow' mb='4'>
					Chi tiết sản phẩm
				</Heading>
				<Box dangerouslySetInnerHTML={{ __html: product.description }} />
			</Box>
			<Box mb='10'>
				<Heading color='yellow' size='lg' mb='8'>
					Đánh giá của khách hàng
				</Heading>
				<Flex gap='4'>
					<Circle size='50px' pos='relative' overflow='hidden'>
						<Image src={user?.userAvatar?.url || defaultAvt} layout='fill' />
					</Circle>
					<Box flex='1'>
						<Textarea
							placeholder={
								user
									? 'Hãy nêu đánh giá của bạn'
									: 'Hãy đăng nhập để đánh giá sản phẩm'
							}
							size='md'
							mb='4'
							value={comment}
							onChange={(e) => setComment(e.target.value)}
							disabled={!user}
						/>
						<Button
							color='white'
							bg='yellow'
							_hover={{ bg: 'yellow', color: 'white' }}
							display='flex'
							justifyContent='center'
							alignItems='center'
							isDisabled={!user || comment === ''}
							onClick={handleCommentProduct}
						>
							<FiSend /> <Text ml='2'>Gửi</Text>
						</Button>
					</Box>
				</Flex>

				{product.comments.map((item) => (
					<Flex gap='4' mt='8' key={item.id}>
						<Circle size='50px' pos='relative' overflow='hidden'>
							<Image
								src={item.user.userAvatar?.url || defaultAvt}
								layout='fill'
							/>
						</Circle>
						<Box flex='1'>
							<Flex alignItems='center'>
								<Heading size='md' color='yellow' fontWeight='400' mb='1'>
									{item.user.name || item.user.email}
								</Heading>
								<Text ml='2' fontSize='sm'>
									{momentjs(item.updatedAt).format('DD/MM/YYYY HH:mm')}
								</Text>
							</Flex>
							<Text>{item.content}</Text>
						</Box>
					</Flex>
				))}
			</Box>
		</Box>
	)
}

export async function getServerSideProps(
	context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<ProductDetailProps>> {
	const id = context.query.id as string
	const { data } = await fetchProductById(+id)
	return {
		props: { product: data },
	}
}

export default ProductDetail

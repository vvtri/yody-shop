import {
	Box,
	Center,
	Flex,
	Heading,
	HStack,
	Spinner,
	Tag,
	Text,
	useNumberInput,
} from '@chakra-ui/react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { BsTrash } from 'react-icons/bs'
import NumberSpinner from '../../common/components/number-spinner'
import { formatPrice } from '../../common/utils/index.utils'
import {
	useRemoveProductFromCart,
	useUpdateCart,
} from '../hooks/cart-query.hook'
import { ICart } from '../interfaces/cart.interface'

interface ProductInCartProps {
	cart: ICart
}

export const ProductInCart = ({ cart }: ProductInCartProps) => {
	const { getDecrementButtonProps, getInputProps, getIncrementButtonProps } =
		useNumberInput({
			step: 1,
			min: 1,
			value: cart.quantity,
			onChange: (_, valueAsNumber) => {
				if (valueAsNumber !== cart.quantity)
					updateCart({
						quantity: valueAsNumber,
						productVariationId: cart.productVariation.id,
					})
			},
		})

	const { mutate: removeProduct, isLoading: isRemovingProduct } =
		useRemoveProductFromCart()
	const { mutate: updateCart, isLoading: isUpdatingCart } = useUpdateCart()

	return (
		<>
			<Flex overflowY='auto'>
				<Link href={`/product/${cart.productVariation.productId}`} passHref>
					<Box
						as='a'
						display='flex'
						pos='relative'
						w={{ base: '140px', lg: '140px' }}
						h='auto'
					>
						<Image
							src={cart.productVariation.product.productImages[0].url}
							layout='fill'
						/>
					</Box>
				</Link>
				<Box w='80%' ml='5'>
					<Heading fontSize='lg' fontWeight='500'>
						<Link href={`/product/${cart.productVariation.productId}`}>
							{cart.productVariation.product.name}
						</Link>
					</Heading>
					<HStack mt='2'>
						<Tag mr='2' whiteSpace='nowrap'>
							Màu {cart.productVariation.color.name}
						</Tag>
						<Tag whiteSpace={'nowrap'}>
							Size {cart.productVariation.size.name}
						</Tag>
					</HStack>
					{isRemovingProduct ? (
						<Spinner thickness='3px' />
					) : (
						<HStack
							color='red'
							mt='8'
							cursor='pointer'
							onClick={() => removeProduct({ cartIds: [cart.id] })}
						>
							<BsTrash fontSize='18px' /> <Text ml='2'>Xoá</Text>
						</HStack>
					)}
				</Box>
			</Flex>
			<Text
				color='yellow'
				fontSize='lg'
				fontWeight='500'
				w='150px'
				px='2'
				flexShrink='0'
				textAlign='center'
			>
				{formatPrice(cart.productVariation.product.price)}
			</Text>
			<Center w='150px' px='2' flexShrink='0' alignItems='flex-start'>
				<NumberSpinner
					getDecrementButtonProps={getDecrementButtonProps}
					getIncrementButtonProps={getIncrementButtonProps}
					getInputProps={getInputProps}
					boxSize='30px'
					width='120px'
				/>
			</Center>
			<Text
				color='yellow'
				fontSize='lg'
				fontWeight='500'
				w='150px'
				px='2'
				flexShrink='0'
				textAlign='center'
			>
				{formatPrice(cart.productVariation.product.price * cart.quantity)}
			</Text>
		</>
	)
}

import {
	Box,
	Center,
	Flex,
	Heading,
	Spinner,
	Tag,
	Text,
	useNumberInput,
} from '@chakra-ui/react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { BsTrash } from 'react-icons/bs'
import {
	useRemoveProductFromCart,
	useUpdateCart,
} from '../../../cart/hooks/cart-query.hook'
import { ICart } from '../../../cart/interfaces/cart.interface'
import { formatPrice } from '../../utils/index.utils'
import NumberSpinner from '../number-spinner'

interface ProductInCartProps {
	productCart: ICart
}

function ProductInCart({ productCart }: ProductInCartProps) {
	const { mutate: removeProduct, isLoading: isRemovingProduct } =
		useRemoveProductFromCart()
	const { mutate: updateCart, isLoading: isUpdatingCart } = useUpdateCart()

	const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
		useNumberInput({
			step: 1,
			value: productCart.quantity,
			min: 1,
			onChange: (_, valueAsNumber) => {
				if (valueAsNumber !== productCart.quantity)
					updateCart({
						quantity: valueAsNumber,
						productVariationId: productCart.productVariation.id,
					})
			},
		})

	return (
		<Flex p='4' w='100%'>
			<Link
				href={`/product/${productCart.productVariation.productId}`}
				passHref
			>
				<Box
					as='a'
					display='flex'
					cursor='pointer'
					pos='relative'
					w='100px'
					alignSelf='stretch'
					flexShrink='0'
				>
					<Image
						src={productCart.productVariation.product.productImages[0].url}
						layout='fill'
					/>
				</Box>
			</Link>
			<Box ml='4' w='100%'>
				<Flex justifyContent='space-between' mb='1'>
					<Link
						href={`/product/${productCart.productVariation.productId}`}
						passHref
					>
						<Flex as='a' cursor='pointer'>
							<Heading size='md'>
								{productCart.productVariation.product.name}
							</Heading>
						</Flex>
					</Link>
					{isRemovingProduct ? (
						<Spinner thickness='3px' />
					) : (
						<Flex
							fontSize='20px'
							cursor='pointer'
							onClick={() => removeProduct({ cartIds: [productCart.id] })}
							color='red'
						>
							<BsTrash />
						</Flex>
					)}
				</Flex>
				<Text color='yellow' fontWeight='500' mb='2'>
					{formatPrice(productCart.productVariation.product.price)}đ
				</Text>
				<Flex mb='2'>
					<Tag mr='2'>Màu {productCart.productVariation.color.name}</Tag>
					<Tag>Size {productCart.productVariation.size.name}</Tag>
				</Flex>
				<Flex justifyContent='space-between'>
					<NumberSpinner
						getDecrementButtonProps={getDecrementButtonProps}
						getIncrementButtonProps={getIncrementButtonProps}
						getInputProps={getInputProps}
						boxSize='30px'
						width='120px'
					/>
					<Center>
						<Text mr='2'>Tổng cộng: </Text>
						<Text fontSize='18px' color='yellow'>
							{formatPrice(
								productCart.productVariation.product.price *
									productCart.quantity
							)}
							đ
						</Text>
					</Center>
				</Flex>
			</Box>
		</Flex>
	)
}

export default ProductInCart

import { Box, Flex, Grid, Heading, HStack, VStack } from '@chakra-ui/react'
import React from 'react'
import { ProductCard } from '../../product/components/product-card'
import { IProductCard } from '../../product/interfaces/product-card.interface'

interface ProductContainerProps {
	products: IProductCard[]
	title: string
}

export const ProductContainer = ({
	products,
	title,
}: ProductContainerProps) => {
	return (
		<Flex
			maxW={{ sm: '100%', lg: 'container.lg', xl: 'container.xl' }}
			mx='auto'
			flexDir='column'
		>
			<Heading
				as='h5'
				color='yellow'
				textTransform='uppercase'
				textAlign='center'
			>
				{title}
			</Heading>
			<Grid
				templateColumns={{ sm: 'repeat(2, 1fr)', xl: 'repeat(5, 1fr)' }}
				rowGap='8'
				columnGap='5'
				mx={{ base: '8', lg: '0' }}
			>
				{products.map((product) => (
					<ProductCard product={product} key={product.id} />
				))}
			</Grid>
		</Flex>
	)
}

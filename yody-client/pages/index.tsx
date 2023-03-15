import { Box } from '@chakra-ui/react'
import type {
  GetStaticPropsContext,
  GetStaticPropsResult,
  NextPage
} from 'next'
import 'swiper/css'
import { HeroSlide } from '../src/home/components/hero-slide'
import { ProductContainer } from '../src/home/components/products-container'
import { fetchHotProduct } from '../src/product/apis/index.api'
import { IProductCard } from '../src/product/interfaces/product-card.interface'

interface HomeProps {
	products: IProductCard[]
}

const Home: NextPage<HomeProps> = ({ products }) => {
	return (
		<Box>
			<HeroSlide />
			<Box mt='14' />
			<ProductContainer products={products} title='Sản phẩm hot' />
			<Box mt='14' />
		</Box>
	)
}

export async function getStaticProps(
	context: GetStaticPropsContext
): Promise<GetStaticPropsResult<HomeProps>> {
  console.log('process.env.NEXT_PUBLIC_BASE_URL', process.env.NEXT_PUBLIC_BASE_URL)
	const { data: products } = await fetchHotProduct()
	return {
		props: { products: products },
		revalidate: 10,
	}
}

export default Home

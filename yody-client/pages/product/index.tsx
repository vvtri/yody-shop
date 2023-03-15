import {
	Box,
	Button,
	Center,
	Drawer,
	DrawerBody,
	DrawerCloseButton,
	DrawerContent,
	DrawerOverlay,
	Flex,
	FormControl,
	FormLabel,
	Grid,
	Heading,
	HStack,
	IconButton,
	Input,
	InputGroup,
	InputRightElement,
	Text,
	useDisclosure,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { BiSearch } from 'react-icons/bi'
import Select from 'react-select'
import { BeatLoader } from 'react-spinners'
import { useAppSelector } from '../../redux/hook'
import { RootState } from '../../redux/store'
import { LoadingScreen } from '../../src/common/components/loading-screen/loading-screen'
import { Gender } from '../../src/common/constant/global.constant'
import { ProductCard } from '../../src/product/components/product-card'
import { useFetchProducts } from '../../src/product/hooks/product-query.hook'
import { IBrand } from '../../src/product/interfaces/brand.interface'
import { ICategory } from '../../src/product/interfaces/category.interface'
import { IColor } from '../../src/product/interfaces/color.interface'
import { FilterProductPayload } from '../../src/product/interfaces/payload.interface'
import { ISize } from '../../src/product/interfaces/size.interface'
import { RiEmotionSadLine } from 'react-icons/ri'
import { useResponsive } from '../../src/common/hooks/use-responsive'

const mapState = ({ brand, category, color, size }: RootState) => ({
	brands: brand.brands,
	categories: category.categories,
	colors: color.colors,
	sizes: size.sizes,
})

interface GenderFilter {
	key: Gender
}

const genders: GenderFilter[] = [{ key: Gender.MALE }, { key: Gender.FEMALE }]

const Product = () => {
	const router = useRouter()
	const { isDesktop } = useResponsive()
	const {
		onClose: onCloseFilter,
		onOpen: onOpenFilter,
		isOpen: isOpenFilter,
	} = useDisclosure()

	const { brands, categories, colors, sizes } = useAppSelector(mapState)

	const [search, setSearch] = useState('')
	const [categoryFilter, setCategoryFilter] = useState<ICategory[]>([])
	const [brandFilter, setBrandFilter] = useState<IBrand[]>([])
	const [colorFilter, setColorFilter] = useState<IColor[]>([])
	const [sizeFilter, setSizeFilter] = useState<ISize[]>([])
	const [genderFilter, setGenderFilter] = useState<GenderFilter[]>([])

	const listRef = useRef<HTMLDivElement>(null)

	const mapStateToFilter = (): FilterProductPayload => ({
		brandIds: brandFilter.map((item) => item.id),
		colorIds: colorFilter.map((item) => item.id),
		categoryIds: categoryFilter.map((item) => item.id),
		sizeIds: sizeFilter.map((item) => item.id),
		genders: genderFilter.map((item) => item.key),
		keyword: search,
	})

	const { data, isFetching, fetchNextPage, isLoading, hasNextPage } =
		useFetchProducts(mapStateToFilter())

	useEffect(() => {
		if (!router.isReady) return
		if (router.query.search) setSearch(router.query.search as string)
	}, [router.isReady, router.query])

	useEffect(() => {
		const loadMore = () => {
			if (
				window.scrollY + window.innerHeight >=
				Number(listRef?.current?.offsetTop) +
					Number(listRef?.current?.clientHeight) +
					200
			) {
				if (hasNextPage && !isLoading && !isFetching) fetchNextPage()
			}
		}
		window.addEventListener('scroll', loadMore)
		return () => {
			window.removeEventListener('scroll', loadMore)
		}
	}, [hasNextPage, fetchNextPage, isLoading, isFetching])

	return (
		<Box
			maxW={{ xl: 'container.xl' }}
			mx='auto'
			minHeight='100vh'
			overflowY='auto'
			p={{ base: 6, lg: '0' }}
			pt={{ base: '0', lg: '6' }}
		>
			<Heading
				textTransform='capitalize'
				size='lg'
				fontWeight='600'
				textAlign='center'
				mb='10'
			>
				Danh sách sản phẩm
			</Heading>
			<Flex mb='16' flexDir={{ sm: 'column', lg: 'row' }}>
				{!isDesktop && (
					<Button
						w='fit-content'
						color='white'
						bg='yellow'
						_hover={{ color: 'white', bg: 'yellow' }}
						onClick={onOpenFilter}
            mb='4'
					>
						Mở bộ lọc
					</Button>
				)}

				{!isDesktop && (
					<Drawer
						isOpen={isOpenFilter}
						placement='right'
						onClose={onCloseFilter}
					>
						<DrawerOverlay />
						<DrawerContent>
							<DrawerCloseButton />
							<DrawerBody>
								<Box flexShrink='0' pt='20' overflowY='auto' h='100%'>
									<Box px='4' py='8'>
										<FormControl mb='4'>
											<FormLabel>Tìm kiếm</FormLabel>
											<InputGroup size='md'>
												<Input
													placeholder='Nhập để tìm kiếm'
													value={search}
													onChange={(e) => setSearch(e.target.value)}
												/>
											</InputGroup>
										</FormControl>
										<FormControl mb='4'>
											<FormLabel>Danh mục</FormLabel>
											<Select
												isMulti
												getOptionLabel={(category: ICategory) => category.name}
												getOptionValue={(category: ICategory) =>
													String(category.id)
												}
												options={categories}
												value={categoryFilter}
												onChange={(selections) =>
													setCategoryFilter([...selections])
												}
												placeholder='Chọn danh mục'
											/>
										</FormControl>
										<FormControl mb='4'>
											<FormLabel>Thương hiệu</FormLabel>
											<Select
												isMulti
												getOptionLabel={(brand: IBrand) => brand.name}
												getOptionValue={(brand: IBrand) => String(brand.id)}
												options={brands}
												value={brandFilter}
												onChange={(selections) =>
													setBrandFilter([...selections])
												}
												placeholder='Chọn thương hiệu'
											/>
										</FormControl>
										<FormControl mb='4'>
											<FormLabel>Màu sắc</FormLabel>
											<Select
												isMulti
												getOptionLabel={(color: IColor) => color.name}
												getOptionValue={(color: IColor) => String(color.id)}
												options={colors}
												value={colorFilter}
												onChange={(selections) =>
													setColorFilter([...selections])
												}
												placeholder='Chọn màu sắc'
											/>
										</FormControl>
										<FormControl>
											<FormLabel>Kích cỡ</FormLabel>
											<Select
												isMulti
												getOptionLabel={(size: ISize) => size.name}
												getOptionValue={(size: ISize) => String(size.id)}
												options={sizes}
												value={sizeFilter}
												onChange={(selections) =>
													setSizeFilter([...selections])
												}
												placeholder='Chọn kích cỡ'
											/>
										</FormControl>
										<FormControl>
											<FormLabel>Giới tính</FormLabel>
											<Select
												isMulti
												getOptionLabel={(gender: GenderFilter) => gender.key}
												getOptionValue={(gender: GenderFilter) => gender.key}
												options={genders}
												value={genderFilter}
												onChange={(selections) =>
													setGenderFilter([...selections])
												}
												placeholder='Chọn giới tính'
											/>
										</FormControl>
									</Box>
								</Box>
							</DrawerBody>
						</DrawerContent>
					</Drawer>
				)}

				{isDesktop && (
					<Box
						flexShrink='0'
						w='25%'
						mr='6'
						pos='sticky'
						top='100px'
						maxHeight='1000vh'
						height='max-content'
						mb='10'
						ml='6'
					>
						<Box
							px='4'
							py='8'
							borderRadius='5px'
							boxShadow='rgba(100, 100, 111, 0.2) 0px 7px 29px 0px'
						>
							<FormControl mb='4'>
								<FormLabel>Tìm kiếm</FormLabel>
								<InputGroup size='md'>
									<Input
										placeholder='Nhập để tìm kiếm'
										value={search}
										onChange={(e) => setSearch(e.target.value)}
									/>
								</InputGroup>
							</FormControl>
							<FormControl mb='4'>
								<FormLabel>Danh mục</FormLabel>
								<Select
									isMulti
									getOptionLabel={(category: ICategory) => category.name}
									getOptionValue={(category: ICategory) => String(category.id)}
									options={categories}
									value={categoryFilter}
									onChange={(selections) => setCategoryFilter([...selections])}
									placeholder='Chọn danh mục'
								/>
							</FormControl>
							<FormControl mb='4'>
								<FormLabel>Thương hiệu</FormLabel>
								<Select
									isMulti
									getOptionLabel={(brand: IBrand) => brand.name}
									getOptionValue={(brand: IBrand) => String(brand.id)}
									options={brands}
									value={brandFilter}
									onChange={(selections) => setBrandFilter([...selections])}
									placeholder='Chọn thương hiệu'
								/>
							</FormControl>
							<FormControl mb='4'>
								<FormLabel>Màu sắc</FormLabel>
								<Select
									isMulti
									getOptionLabel={(color: IColor) => color.name}
									getOptionValue={(color: IColor) => String(color.id)}
									options={colors}
									value={colorFilter}
									onChange={(selections) => setColorFilter([...selections])}
									placeholder='Chọn màu sắc'
								/>
							</FormControl>
							<FormControl>
								<FormLabel>Kích cỡ</FormLabel>
								<Select
									isMulti
									getOptionLabel={(size: ISize) => size.name}
									getOptionValue={(size: ISize) => String(size.id)}
									options={sizes}
									value={sizeFilter}
									onChange={(selections) => setSizeFilter([...selections])}
									placeholder='Chọn kích cỡ'
								/>
							</FormControl>
							<FormControl>
								<FormLabel>Giới tính</FormLabel>
								<Select
									isMulti
									getOptionLabel={(gender: GenderFilter) => gender.key}
									getOptionValue={(gender: GenderFilter) => gender.key}
									options={genders}
									value={genderFilter}
									onChange={(selections) => setGenderFilter([...selections])}
									placeholder='Chọn giới tính'
								/>
							</FormControl>
						</Box>
					</Box>
				)}

				<Box
					w={{ base: '100%', lg: '75%' }}
					ml={{ base: '0', lg: '6' }}
					ref={listRef}
				>
					<Grid
						templateColumns={{ base: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }}
						rowGap='8'
						columnGap='4'
						w='100%'
            
					>
						{data?.pages.map((page) => {
							return page.items.map((product) => (
								<ProductCard product={product} key={product.id} />
							))
						})}
					</Grid>
					{isLoading && <LoadingScreen />}
					{!isLoading && !data?.pages[0].items.length && (
						<HStack color='purple' justifyContent='center' mt='20'>
							<RiEmotionSadLine />
							<Text textAlign='center' py='8' fontSize='18px'>
								Oops không có sản phẩm bạn cần tìm
							</Text>
						</HStack>
					)}
					{!isLoading && isFetching && (
						<Center mt='14'>
							<BeatLoader size={20} margin={4} />
						</Center>
					)}
				</Box>
			</Flex>
		</Box>
	)
}

export default Product

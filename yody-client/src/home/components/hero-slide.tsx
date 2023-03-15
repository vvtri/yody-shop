import { Box } from '@chakra-ui/react'
import Image from 'next/image'
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import slide1 from '../../../public/images/slider_1.webp'
import slide2 from '../../../public/images/slider_2.webp'
import slide3 from '../../../public/images/slider_3.webp'
import slide4 from '../../../public/images/slider_4.webp'

export const HeroSlide = () => {
	return (
		<Box>
			<Swiper>
				<SwiperSlide>
					<Box
						width='100%'
						height={{ base: 'sm', lg: 'calc(70vh)' }}
						pos='relative'
					>
						<Image src={slide1} layout='fill' />
					</Box>
				</SwiperSlide>
				<SwiperSlide>
					<Box
						width='100%'
						height={{ base: 'sm', lg: 'calc(70vh)' }}
						pos='relative'
					>
						<Image src={slide2} layout='fill' />
					</Box>
				</SwiperSlide>
				<SwiperSlide>
					<Box
						width='100%'
						height={{ base: 'sm', lg: 'calc(70vh)' }}
						pos='relative'
					>
						<Image src={slide3} layout='fill' />
					</Box>
				</SwiperSlide>
				<SwiperSlide>
					<Box
						width='100%'
						height={{ base: 'sm', lg: 'calc(70vh)' }}
						pos='relative'
					>
						<Image src={slide4} layout='fill' />
					</Box>
				</SwiperSlide>
			</Swiper>
		</Box>
	)
}

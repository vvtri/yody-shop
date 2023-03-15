import { Box, ResponsiveValue } from '@chakra-ui/react'
import React from 'react'
import { Rating as RatingComp } from 'react-simple-star-rating'
import { AiFillStar, AiOutlineStar } from 'react-icons/ai'
import {
	Token,
	Union,
} from '@chakra-ui/styled-system/dist/declarations/src/utils'
import * as CSS from 'csstype'

interface RatingProps {
	readonly: boolean
	ratingValue?: number
	iconsCount?: number
	size?: Token<CSS.Property.FontSize | number, 'fontSizes'>
	allowHalfIcon?: boolean
	onClick?: (rate: number) => void
}

const Rating = ({
	ratingValue = 0,
	allowHalfIcon = true,
	iconsCount = 5,
	size = 'xl',
	onClick,
	...props
}: RatingProps) => {
	return (
		<RatingComp
			{...props}
			ratingValue={ratingValue}
			onClick={onClick}
			allowHalfIcon={allowHalfIcon}
			iconsCount={iconsCount}
			fullIcon={
				<Box as='span' fontSize={size} color='yellow'>
					<AiFillStar />
				</Box>
			}
			emptyIcon={
				<Box as='span' fontSize={size}>
					<AiOutlineStar />
				</Box>
			}
		/>
	)
}

export default Rating

import {
	PaginationContainer,
	PaginationPrevious,
	PaginationPageGroup,
	PaginationSeparator,
	PaginationPage,
	PaginationNext,
	Pagination,
} from '@ajna/pagination'
import { Flex, HStack, Select, Text } from '@chakra-ui/react'
import React from 'react'
import { IPaginateResult } from '../interfaces/paginate.interface'

interface CustomPaginationProps {
	setPageSize: React.Dispatch<React.SetStateAction<number>>
	data: IPaginateResult<any>
	setCurrentPage: React.Dispatch<React.SetStateAction<number>>
	isDisabled: boolean
	currentPage: number
	pages: number[]
	infoDisplay: string
}

export const CustomPagination = ({
	setPageSize,
	data,
	isDisabled = false,
	currentPage,
	pages,
	setCurrentPage,
	infoDisplay,
}: CustomPaginationProps) => {
	return (
		<Flex mt='10' justifyContent='flex-end' w='100%' alignItems='center'>
			<HStack>
				<Text whiteSpace='nowrap'>Số lượng hiển thị: </Text>
				<Select onChange={(e) => setPageSize(+e.target.value)}>
					<option value='10'>10</option>
					<option value='25'>25</option>
					<option value='50'>50</option>
					<option value='100'>100</option>
				</Select>
			</HStack>

			<Text mx='20'>{infoDisplay}</Text>

			{/* @ts-ignore */}
			<Pagination
				pagesCount={data!.meta.totalPages}
				onPageChange={(nextPage: number) => setCurrentPage(nextPage)}
				isDisabled={isDisabled}
				currentPage={currentPage}
			>
				<PaginationContainer>
					<PaginationPrevious
						bg='yellow'
						color='white'
						_hover={{ bg: 'yellow', color: 'white' }}
					>
						Previous
					</PaginationPrevious>
					<PaginationPageGroup
						mx='4'
						separator={
							<PaginationSeparator
								color='white'
								bg='yellow'
								fontSize='sm'
								w={7}
								jumpSize={5}
							/>
						}
					>
						{pages.map((page: number) => (
							<PaginationPage
								key={page}
								page={page}
								_current={{ bg: 'yellow', color: 'white' }}
								_hover={{ bg: 'yellow', color: 'white' }}
								w='7'
								mx='1'
							/>
						))}
					</PaginationPageGroup>
					<PaginationNext
						bg='yellow'
						color='white'
						_hover={{ bg: 'yellow', color: 'white' }}
					>
						Next
					</PaginationNext>
				</PaginationContainer>
			</Pagination>
		</Flex>
	)
}

import {
	Box,
	Center,
	Heading,
	HStack,
	Select,
	Table,
	TableContainer,
	Tbody,
	Td,
	Text,
	Tfoot,
	Th,
	Thead,
	Tr,
} from '@chakra-ui/react'
import { getCoreRowModel, useTableInstance } from '@tanstack/react-table'
import React, { useEffect, useState } from 'react'
import { useFetchPurchaseHistory } from '../hooks/user-query.hook'
import { columns, table } from '../react-table/purchase-history'

import { LoadingScreen } from '../../common/components/loading-screen/loading-screen'
import { CustomPagination } from '../../common/components/custom-pagination'
import { usePagination } from '@ajna/pagination'
import { useRouter } from 'next/router'

// Link pagination: https://codesandbox.io/s/ajna-pagination-forked-7mrtq?file=/src/App.tsx

const PurchaseHistoryTab = () => {
	const router = useRouter()

	const [totalItems, settotalItems] = useState<number | undefined>(undefined)

	const {
		currentPage,
		pageSize,
		pages,
		setCurrentPage,
		setPageSize,
		pagesCount,
	} = usePagination({
		total: totalItems,
		initialState: {
			currentPage: 1,
			pageSize: 10,
		},
		limits: {
			outer: 2,
			inner: 2,
		},
	})

	const { data, isLoading } = useFetchPurchaseHistory({
		page: String(currentPage),
		size: String(pageSize),
	})

	const tableIns = useTableInstance(table, {
		data: data?.items || [],
		columns: columns,
		getCoreRowModel: getCoreRowModel(),
	})

	useEffect(() => {
		if (!data) return
		settotalItems(data.meta.totalItems)
	}, [data])

	return (
		<Center
			ml='8'
			flexGrow='1'
			flexDir='column'
			justifyContent='flex-start'
			overflow='auto'
			py='4'
		>
			{isLoading && <LoadingScreen />}
			{!isLoading && !data && <Heading> Có lỗi xảy ra</Heading>}
			{!isLoading && data && (
				<>
					<TableContainer w='100%'>
						<Table variant='simple'>
							<Thead>
								{tableIns.getHeaderGroups().map((headerGroup) => (
									<Tr key={headerGroup.id} bg='green.100'>
										{headerGroup.headers.map((header) => (
											<Th key={header.id} colSpan={header.colSpan}>
												{header.renderHeader()}
											</Th>
										))}
									</Tr>
								))}
							</Thead>

							<Tbody>
								{tableIns.getRowModel().rows.map((row) => (
									<Tr
										key={row.id}
										cursor='pointer'
										onClick={() =>
											router.push(
												`/user/purchase/${row.original?.id}`,
												undefined,
												{ shallow: true }
											)
										}
										_hover={{ bg: '#f5f5f5' }}
									>
										{row.getVisibleCells().map((cell) => (
											<Td key={cell.id}>{cell.renderCell()}</Td>
										))}
									</Tr>
								))}
							</Tbody>
						</Table>
					</TableContainer>

					<CustomPagination
						currentPage={currentPage}
						data={data}
						isDisabled={isLoading}
						pages={pages}
						setCurrentPage={setCurrentPage}
						setPageSize={setPageSize}
						infoDisplay={`${(currentPage - 1) * pageSize + 1} - ${
							currentPage * pageSize
						} của trang ${pagesCount === 0? '1': pagesCount}`}
					/>
				</>
			)}
		</Center>
	)
}

export default PurchaseHistoryTab

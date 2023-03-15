import { usePagination } from '@ajna/pagination'
import {
	Button,
	Center,
	Heading,
	Table,
	TableContainer,
	Tbody,
	Td,
	Text,
	Th,
	Thead,
	Tr,
	VStack,
} from '@chakra-ui/react'
import { getCoreRowModel, useTableInstance } from '@tanstack/react-table'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { LoadingScreen } from '../../common/components/loading-screen/loading-screen'
import { CustomPagination } from '../../common/components/custom-pagination'
import { useFetchPurchaseDetail } from '../hooks/user-query.hook'
import { columns, table } from '../react-table/purchase-detail'
import { IoIosArrowBack } from 'react-icons/io'

interface PurchaseDetailTabProps {
	purchaseId: number
}

export const PurchaseDetailTab = ({ purchaseId }: PurchaseDetailTabProps) => {
	const router = useRouter()

	const { data, isLoading } = useFetchPurchaseDetail(purchaseId)

	const tableIns = useTableInstance(table, {
		data: data || [],
		columns,
		getCoreRowModel: getCoreRowModel(),
	})

	return (
		<VStack
			ml='8'
			flexGrow='1'
			justifyContent='flex-start'
			overflow='auto'
			py='4'
			alignItems='flex-start'
		>
			{isLoading && <LoadingScreen />}
			{!isLoading && !data && <Heading> Có lỗi xảy ra</Heading>}
			{!isLoading && data && (
				<>
					<Button
						ml='4'
						onClick={() =>
							router.push(`/user/purchase`, undefined, { shallow: true })
						}
					>
						<IoIosArrowBack />
						<Text ml='2'>Quay về</Text>
					</Button>

					<TableContainer w='100%'>
						<Table variant='simple' size='sm'>
							<Thead>
								{tableIns.getHeaderGroups().map((headerGroup) => (
									<Tr key={headerGroup.id} bg='green.100'>
										{headerGroup.headers.map((header) => (
											<Th key={header.id} colSpan={header.colSpan} py='3'>
												{header.renderHeader()}
											</Th>
										))}
									</Tr>
								))}
							</Thead>

							<Tbody>
								{tableIns.getRowModel().rows.map((row) => (
									<Tr key={row.id} _hover={{ bg: '#f5f5f5' }}>
										{row.getVisibleCells().map((cell) => (
											<Td key={cell.id}>{cell.renderCell()}</Td>
										))}
									</Tr>
								))}
							</Tbody>
						</Table>
					</TableContainer>
				</>
			)}
		</VStack>
	)
}

import { Box } from '@chakra-ui/react'
import {
	createTable,
	getCoreRowModel,
	useTableInstance,
} from '@tanstack/react-table'
import Image from 'next/image'
import { IPurchaseHistory } from '../interfaces/purchase-history.interface'
import moment from 'moment'

export const table = createTable().setRowType<IPurchaseHistory>()

export const columns = [
	table.createDataColumn('id', {
		header: 'Mã đơn hàng',
	}),
	table.createDataColumn('createdAt', {
		header: 'Ngày đặt hàng',
		cell: ({ getValue }) => moment(getValue()).format('DD/MM/YYYY HH:mm'),
	}),
	table.createDataColumn('itemCount', {
		header: 'Số lượng sản phẩm',
	}),
	table.createDataColumn('totalPrice', {
		header: 'Tổng tiền',
	}),
]

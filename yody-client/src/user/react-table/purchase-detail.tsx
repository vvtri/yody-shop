import { Box, Tag } from '@chakra-ui/react'
import { createTable } from '@tanstack/react-table'
import Image from 'next/image'
import { formatPrice } from '../../common/utils/index.utils'
import { IPurchaseDetail } from '../interfaces/purchase-detail.interface'

export const table = createTable({}).setRowType<IPurchaseDetail>()

export const columns = [
	table.createDisplayColumn({
		id: 'thumbnail',
		header: 'Ảnh',
		cell: ({ row }) => (
			<Box w='60px' h='60px' alignSelf='stretch' pos='relative' display='flex'>
				<Image
					src={
						row.original?.productVariation.product.productImages[0].url || ''
					}
					layout='fill'
				/>
			</Box>
		),
	}),
	table.createDataColumn('productVariation', {
		id: 'product-name',
		header: 'Tên sản phẩm',
		cell: ({ row }) => row.original?.productVariation.product.name,
	}),
	table.createDataColumn('price', {
		id: 'product-price',
		header: 'Giá sản phẩm',
		cell: ({ getValue }) => `${formatPrice(getValue())}đ`,
	}),
	table.createDataColumn('quantity', {
		id: 'product-quantity',
		header: 'Số lượng',
	}),
	table.createDataColumn('productVariation', {
		id: 'product-unit',
		header: 'Đơn vị',
		cell: () => 'cái',
	}),
	table.createDataColumn('productVariation', {
		id: 'product-color',
		header: 'Màu',
		cell: ({ row }) => <Tag bg='yellow' color='white' >{row.original?.productVariation.color.name}</Tag>,
	}),
	table.createDataColumn('productVariation', {
		id: 'product-size',
		header: 'Size',
		cell: ({ row }) => <Tag bg='blue.200' color='white'>
      {row.original?.productVariation.size.name}
    </Tag>,
	}),
	table.createDataColumn('productVariation', {
		id: 'product-brand',
		header: 'Thương hiệu',
		cell: ({ row }) => <Tag bg='green.300' color='white'>
      {row.original?.productVariation.product.brand.name}
    </Tag>,
	}),
	table.createDataColumn('productVariation', {
		id: 'product-brand',
		header: 'Loại',
		cell: ({ row }) => <Tag bg='red.300' color='white'>
      {row.original?.productVariation.product.category.name}
    </Tag>,
	}),
]

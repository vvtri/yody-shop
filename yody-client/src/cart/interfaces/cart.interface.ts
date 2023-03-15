import { Gender } from '../../common/constant/global.constant'
import { TimeModified } from '../../common/interfaces/time-modified.interface'
import { IColor } from '../../product/interfaces/color.interface'
import { IProductDetail } from '../../product/interfaces/product-detail.interface'
import { IProductImage } from '../../product/interfaces/product-image.interface'
import { ISize } from '../../product/interfaces/size.interface'

interface IProduct extends TimeModified {
	id: number
	name: string
	description: string
	available: boolean
	unit: string
	gender: Gender
	price: number
	rating: number
	categoryId: number
	brandId: number
	productImages: IProductImage[]
}

interface IProductVariation extends TimeModified {
	id: number
	colorId: number
	sizeId: number
	productId: number
	product: IProduct
  color: IColor
  size: ISize
}

export interface ICart extends TimeModified {
	id: number
	quantity: number
	userId: number
	productVariation: IProductVariation
}

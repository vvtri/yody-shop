import { Gender } from '../../common/constant/global.constant'
import { TimeModified } from '../../common/interfaces/time-modified.interface'
import { IBrand } from './brand.interface'
import { ICategory } from './category.interface'
import { IColor } from './color.interface'
import { IProductComment } from './product-comment.interface'
import { IProductImage } from './product-image.interface'
import { IProductRating } from './product-rating.interface'
import { ISize } from './size.interface'

interface IProductVariation extends TimeModified {
	id: number
	color: IColor
	colorId: number
	size: ISize
	sizeId: number
}

export interface IProductDetail extends TimeModified {
	id: number
	name: string
	description: string
	available: boolean
	unit: string
	gender: Gender
	price: number
	categoryId: number
	brandId: number
	category: ICategory
	brand: IBrand
	productRatings: IProductRating[]
	comments: IProductComment[]
	productVariations: IProductVariation[]
	productImages: IProductImage[]
	rating: number
}

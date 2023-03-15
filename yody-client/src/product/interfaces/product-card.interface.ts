import { Gender } from '../../common/constant/global.constant'
import { TimeModified } from '../../common/interfaces/time-modified.interface'
import { IBrand } from './brand.interface'
import { ICategory } from './category.interface'
import { IProductImage } from './product-image.interface'
import { IProductRating } from './product-rating.interface'

// This IProductVariation is IProductVariation not join
// This is different with IProductVariation in product detail
export interface IProductVariation extends TimeModified {
	id: number
	colorId: number
	sizeId: number
}

export interface IProductCard extends TimeModified {
	id: number
	name: string
	description: string
	available: boolean
	unit: string
	gender: Gender
	price: number
  categoryId: number
	category: ICategory
  brandId: number
	brand: IBrand
	productVariations: IProductVariation[]
	productImages: IProductImage[]
	productRatings?: IProductRating[]
  rating: number
}

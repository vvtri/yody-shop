import { TimeModified } from '../../common/interfaces/time-modified.interface'
import { IColor } from '../../product/interfaces/color.interface'
import { IProductDetail } from '../../product/interfaces/product-detail.interface'
import { ISize } from '../../product/interfaces/size.interface'

interface IProductVariation<P extends string | symbol | number>
	extends TimeModified {
	id: number
	productId: number
	colorId: number
	sizeId: number
	color: IColor
	size: ISize
	product: Omit<IProductDetail, P>
}

/**
 * Type P is omit property of product
 */
export interface IPurchaseDetail<
	P extends string | symbol | number =
		| 'productVariations'
		| 'comments'
		| 'productRatings'
> extends TimeModified {
	id: number
	quantity: number
	price: number
	productVariationId: number
	purchaseId: number
	productVariation: IProductVariation<P>
}

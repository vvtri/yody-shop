import { TimeModified } from '../../common/interfaces/time-modified.interface'
import { IPurchaseDetail } from './purchase-detail.interface'

export interface IPurchaseHistory extends TimeModified {
	id: number
	totalPrice: number
	itemCount: number
	// purchaseDetails: IPurchaseDetail<
	// 	'productVariations' | 'comments' | 'productRatings' | 'brand' | 'category'
	// >[]
}

import { TimeModified } from '../../common/interfaces/time-modified.interface'

export interface IProductRating extends TimeModified {
	id: number
	productId: number
	userId: number
	rating: number
}

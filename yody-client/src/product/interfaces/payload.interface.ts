import { Gender } from '../../common/constant/global.constant'

export enum Sort {
	PRICE_ASC = 'price:asc',
}

export interface FilterProductPayload {
	keyword?: string
	genders?: Gender[]
	categoryIds?: number[]
	brandIds?: number[]
	colorIds?: number[]
	sizeIds?: number[]
	sortBy?: Sort
}

export interface RatingProductPayload {
	productId: number
	rating: number
}

export interface CreateCommentProductPayload {
	productId: number
	content: string
}

export interface UpdateCommentProductPayload {
	content: string
	commentId: number
}

export interface DeleteCommentProductPayload {
	commentId: number
}

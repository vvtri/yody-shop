export interface AddCartPayload {
	productVariationId: number
	quantity: number
}

export interface RemoveCartPayload {
	cartIds: number[]
}

export interface UpdateCartPayload {
	productVariationId: number
	quantity: number
}

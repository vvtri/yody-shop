import axiosConfig from '../../common/config/axios.config'
import { ICart } from '../interfaces/cart.interface'
import {
	AddCartPayload,
	RemoveCartPayload,
	UpdateCartPayload,
} from '../interfaces/payload.interface'
import {
	addProductToCartUrl,
	getUserCartUrl,
	removeProductFromCartUrl,
	updateProductInCartUrl,
} from './url'

export const fetchUserCart = async () => {
	return axiosConfig.get<ICart[]>(getUserCartUrl)
}

export const addProductToCart = async (payload: AddCartPayload) => {
	return axiosConfig.post<ICart>(addProductToCartUrl, payload)
}

export const updateProductInCart = async (payload: UpdateCartPayload) => {
	return axiosConfig.patch<ICart>(updateProductInCartUrl, payload)
}

export const removeProductFromCart = async (payload: RemoveCartPayload) => {
	return axiosConfig.delete(removeProductFromCartUrl, { data: payload })
}

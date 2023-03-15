import axiosConfig from '../../common/config/axios.config'
import {
  IPaginateQuery,
  IPaginateResult
} from '../../common/interfaces/paginate.interface'
import { IBrand } from '../interfaces/brand.interface'
import { ICategory } from '../interfaces/category.interface'
import { IColor } from '../interfaces/color.interface'
import {
  CreateCommentProductPayload,
  DeleteCommentProductPayload,
  FilterProductPayload,
  RatingProductPayload,
  UpdateCommentProductPayload
} from '../interfaces/payload.interface'
import { IProductCard } from '../interfaces/product-card.interface'
import { IProductComment } from '../interfaces/product-comment.interface'
import { IProductDetail } from '../interfaces/product-detail.interface'
import { ISize } from '../interfaces/size.interface'
import {
  createCommentProductUrl,
  getBrandsUrl,
  getCategoriesUrl,
  getColorsUrl,
  getHotProductsUrl,
  getProductDetailUrl,
  getProductsUrl,
  getSizesUrl,
  ratingProductUrl
} from './url'

export const fetchHotProduct = async () => {
	return axiosConfig.get<IProductCard[]>(`${getHotProductsUrl}`)
}

export const fetchBrands = async () => {
	return axiosConfig.get<IBrand[]>(getBrandsUrl)
}
export const fetchCategories = async () => {
	return axiosConfig.get<ICategory[]>(getCategoriesUrl)
}
export const fetchColors = async () => {
	return axiosConfig.get<IColor[]>(getColorsUrl)
}
export const fetchSizes = async () => {
	return axiosConfig.get<ISize[]>(getSizesUrl)
}

export const fetchProducts = async (
	filter?: FilterProductPayload,
	paginate: IPaginateQuery = {}
) => {
	return axiosConfig.post<IPaginateResult<IProductCard[]>>(
		getProductsUrl,
		filter,
		{
			params: paginate,
		}
	)
}

export const fetchProductById = async (id: number) => {
	return axiosConfig.get<IProductDetail>(`${getProductDetailUrl}/${id}`)
}

export const ratingProduct = async (payload: RatingProductPayload) => {
	return axiosConfig.post(ratingProductUrl, payload)
}

export const createCommentProduct = async (
	payload: CreateCommentProductPayload
) => {
	return axiosConfig.post<IProductComment>(createCommentProductUrl, payload)
}

export const updateCommentProduct = async (
	payload: UpdateCommentProductPayload
) => {
	return axiosConfig.post(createCommentProductUrl, payload)
}

export const deleteCommentProduct = async (
	payload: DeleteCommentProductPayload
) => {
	return axiosConfig.post(createCommentProductUrl, payload)
}

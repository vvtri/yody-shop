import axios, { AxiosRequestConfig } from 'axios'
import { refreshTokenUrl } from '../../auth/apis/url'
import { baseURL } from '../constant/global.constant'

const axiosConfig = axios.create({
	baseURL,
	withCredentials: true,
})

interface AxiosRequestConfigRetry<D = any> extends AxiosRequestConfig<D> {
	__retry?: boolean
}

axiosConfig.interceptors.response.use(
	(res) => res,
	async (error) => {
		if (axios.isAxiosError(error) && error.response?.status === 401) {
			let originalRequest = error.config as AxiosRequestConfigRetry

			if (!originalRequest.__retry) {
				originalRequest.__retry = true

				// Refresh token without interceptor
				await axios.get(`${baseURL}${refreshTokenUrl}`, {
					withCredentials: true,
				})

				// Perform original request
				return axiosConfig(originalRequest)
			}
		}
		throw error
	}
)

export default axiosConfig

import axiosConfig from '../../common/config/axios.config'
import { purchaseCartUrl } from './url'

export const purchaseCart = () => {
	return axiosConfig.post(purchaseCartUrl)
}

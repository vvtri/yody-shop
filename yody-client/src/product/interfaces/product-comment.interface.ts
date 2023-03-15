import { IUser } from '../../auth/interfaces/user.interface'
import { TimeModified } from '../../common/interfaces/time-modified.interface'

export interface IProductComment extends TimeModified {
	id: number
	productId: number
	userId: number
	content: string
	user: IUser
}

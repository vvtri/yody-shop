import { TimeModified } from "../../common/interfaces/time-modified.interface"

export interface ICategory extends TimeModified {
	id: number
	name: string
	createdAt: string
	updatedAt: string
}

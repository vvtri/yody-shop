import { Permission } from "../interfaces/permission.interface"

export type JwtPayload = {
	userId: number
	permissions: Permission[]
}

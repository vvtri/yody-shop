import { Injectable, UnauthorizedException } from '@nestjs/common'
import { UploadApiResponse } from 'cloudinary'
import { UserAvatar } from '../../auth/entities/user-avatar.entity'
import { User } from '../../auth/entities/user.entity'
import { UserAvatarRepository } from '../../auth/repositories/user-avatar.repository'
import { UserRepository } from '../../auth/repositories/user.repository'
import { bcryptHash } from '../../common/utils/index.util'
import { CloudinaryService } from '../../utils/cloudinary.service'
import { ChangePasswordDto } from './dtos/change-password.dto'
import { ChangeUserInfoDto } from './dtos/change-user-info.dto'
import * as bcrypt from 'bcrypt'

@Injectable()
export class UserService {
	constructor(
		private userRepo: UserRepository,
		private cloudinary: CloudinaryService,
		private userAvatarRepo: UserAvatarRepository
	) {}

	async changeUserInfo(data: ChangeUserInfoDto, user: User) {
		const { address, phoneNumber, avatar, gender, name } = data

		let userAvatar: UserAvatar = null
		if (avatar) {
			userAvatar = await this.userAvatarRepo.findOne({ userId: user.id })
			let uploadResult: UploadApiResponse

			if (userAvatar) {
				uploadResult = await this.cloudinary.uploadImage(
					avatar,
					userAvatar.publicId
				)
				userAvatar.publicId = uploadResult.public_id
				userAvatar.url = uploadResult.url
			} else {
				uploadResult = await this.cloudinary.uploadImage(avatar)
				userAvatar = this.userAvatarRepo.create({
					publicId: uploadResult.public_id,
					url: uploadResult.url,
					userId: user.id,
				})
			}
		}

		user = {
			...user,
			...(address && { address }),
			...(gender && { gender }),
			...(name && { name }),
			...(phoneNumber && { phoneNumber }),
			...(userAvatar && { userAvatar }),
		}

		let promises: Promise<any>[] = [this.userRepo.save(user)]
		if (userAvatar) promises.push(this.userAvatarRepo.save(userAvatar))

		const [userResult] = await Promise.all(promises)
		return userResult
	}

	async changePassword(data: ChangePasswordDto, user: User) {
		const { password, newPassword } = data
		if (!bcrypt.compareSync(password, user.password))
			throw new UnauthorizedException()
		user.password = bcryptHash(newPassword)
		return this.userRepo.save(user)
	}
}

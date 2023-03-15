import { Injectable } from '@nestjs/common'
import { UploadApiOptions, v2 } from 'cloudinary'

@Injectable()
export class CloudinaryService {
	constructor() {
		v2.config({
			cloud_name: process.env.CLOUDINARY_NAME,
			api_key: process.env.CLOUDINARY_API,
			api_secret: process.env.CLOUDINARY_SECRET,
			secure: true,
		})
	}

	async uploadImage(image: string, publicId?: string) {
		const options: UploadApiOptions = {
			upload_preset: process.env.CLOUDINARY_PRESET,
			unique_filename: true,
			...(publicId && { public_id: publicId }),
		}
		return v2.uploader.upload(image, options)
	}

	async deleteImage(publicId: string) {
		await v2.uploader.destroy(publicId)
	}
}

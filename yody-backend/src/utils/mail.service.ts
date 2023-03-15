import { Injectable, OnModuleInit } from '@nestjs/common'
import * as sendgrid from '@sendgrid/mail'
import {
	resetPasswordTemplateId,
	rootEmail,
	verifyUserTemplateId,
} from '../common/constants/email.constant'
import { Mail } from '../common/interfaces/mail.interface'

@Injectable()
export class MailService {
	constructor() {
		sendgrid.setApiKey(process.env.SEND_GRID_API)
	}

	async sendResetPasswordEmail(email: string, resetPasswordLink: string) {
		return sendgrid.send({
			from: rootEmail,
			to: email,
			templateId: resetPasswordTemplateId,
			dynamicTemplateData: {
				// name: email,
				resetPasswordLink,
			},
		})
	}

	async sendVerifyUserEmail(email: string, verifyLink: string) {
		return sendgrid.send({
			from: rootEmail,
			to: email,
			templateId: verifyUserTemplateId,
			dynamicTemplateData: {
				name: email,
				verifyLink,
			},
		})
	}

	async sendMail(mail: Mail) {
		await sendgrid.send({
			from: mail.from,
			to: mail.to,
			subject: mail.subject,
			text: mail.text,
			html: mail.html,
		})
	}
}

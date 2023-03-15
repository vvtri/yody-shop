import { HttpException } from '@nestjs/common'

export class ExpectationFailedExc extends HttpException {
	constructor(msg: string = 'Expectation Failed') {
		super(msg, 417)
	}
}

export class LockedExc extends HttpException {
	constructor(msg: string = 'Locked') {
		super(msg, 423)
	}
}

export class NotVerifiedExc extends HttpException {
	constructor(msg: string = 'Not Verified') {
		super(msg, 499)
	}
}

export class OutOfStockCartExc extends HttpException {
	constructor(msg: string) {
		super(msg, 459)
	}
}

export class OutOfStockPurchaseExc extends HttpException {
	constructor(msg: string[]) {
		super(msg, 489)
	}
}

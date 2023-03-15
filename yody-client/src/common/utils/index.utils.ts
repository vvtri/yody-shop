export function formatPrice(price: number) {
	return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

export function roundHalf(num: number) {
	return Math.round(num * 2) / 2
}

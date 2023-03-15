export function formatAndParseJsonStringFromDb(value: string) {
	const formatedStr = value.slice(2, value.length - 2).replace(/""/gm, '"')
	if (formatedStr) return JSON.parse(formatedStr)
	return null
}

export function generateErrorOutOfStock(
	productName: string,
	productAmount: number,
	unit: string = 'cái'
) {
	if (productAmount) {
		return `Sản phẩm ${productName} chỉ còn ${productAmount} ${unit} trong kho!`
	} else {
		return `Sản phẩm ${productName} tạm hết hàng!`
	}
}

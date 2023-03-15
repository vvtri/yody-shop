/**
 * This file is used to perform plain sql query
 * But I found hydration way to handle pagination problem
 * This file is saved to be used like a reference code later
 */

import { GetProductsDto } from '../../product/client/dtos/get-products.dto'
import { PaginateQueryDto } from '../dtos/paginate-query.dto'

export const getProductsQuery = (
	filter: GetProductsDto,
	pagination: PaginateQueryDto
) => {
	const { page, size } = pagination
	const { sortBy, brandIds, categoryIds, colorIds, genders, keyword, sizeIds } =
		filter

	const filterArr = []

	if (keyword) filterArr.push(`product.name ILIKE '%${keyword}%'`)
	if (brandIds.length)
		filterArr.push(`product.brand_id IN (${brandIds.toString()})`)
	if (categoryIds.length)
		filterArr.push(`product.category_id IN (${categoryIds.toString()})`)
	if (colorIds.length)
		filterArr.push(`con.color_id IN (${colorIds.toString()})`)
	if (sizeIds.length) filterArr.push(`con.size_id IN (${sizeIds.toString()})`)
	if (genders.length) {
		const genderStr = Object.values(genders).reduce((accum, item) => {
			if (accum !== '') accum += ','
			return accum + `'${item}'`
		}, '')
		filterArr.push(`product.gender IN (${genderStr})`)
	}

	const filterStr = filterArr.length ? ` WHERE ${filterArr.join(` AND `)}` : ''
	// ORDER BY product.id

	return `
    SELECT "productVariation", "productImage", "productRating", product.*
    FROM product

    LEFT JOIN LATERAL
      (
        SELECT jsonb_agg(pv)
        FROM "product-variation" AS pv
        WHERE pv.product_id = product.id ) "productVariation" ON TRUE

    LEFT JOIN LATERAL
      (
        SELECT jsonb_agg(pi)
        FROM "product-image" AS pi
        WHERE pi.product_id = product.id ) "productImage" ON TRUE

    LEFT JOIN LATERAL
      (
        SELECT jsonb_agg(pr)
        FROM "product-rating" AS pr
        WHERE pr.product_id = product.id ) "productRating" ON TRUE
        
    LEFT JOIN "product-variation" con ON con.product_id = product.id

    ${filterStr}

    GROUP BY product.id, "productVariation", "productRating", "productImage"
    
    ${size ? `LIMIT  ${size}` : ''}
    ${page ? `OFFSET ${(page - 1) * size}` : ''}
    `
}

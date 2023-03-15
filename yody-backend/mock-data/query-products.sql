-- select jsonb_agg(product) 
-- from product

SELECT "product-variation", "product-image", "product-rating", product.*
    FROM product
    INNER JOIN LATERAL (
        SELECT jsonb_agg(pv)
        FROM "product-variation" AS pv
        WHERE pv.product_id = product.id
	  ) "product-variation" ON TRUE
    LEFT JOIN LATERAL
      (
        SELECT jsonb_agg(pi)
        FROM "product-image" AS pi
        WHERE pi.product_id = product.id ) "product-image" ON TRUE
	LEFT JOIN LATERAL
      (
        SELECT jsonb_agg(pr)
        FROM "product-rating" AS pr
        WHERE pr.product_id = product.id ) "product-rating" ON TRUE
	LEFT JOIN "product-variation" con ON con.product_id = product.id
	WHERE product.brand_id IN (1,2) 
	AND product.category_id IN (1,2) 
		AND con.color_id IN (1,2)
		AND product.name ILIKE '%%'
	GROUP BY product.id, "product-variation", "product-rating", "product-image"
    ORDER BY product.id
--     LIMIT 1
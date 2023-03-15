import { EntityRepository, Repository } from "typeorm";
import { ProductRating } from "../entities/product-rating.entity";

@EntityRepository(ProductRating)
export class ProductRatingRepository extends Repository<ProductRating> {}

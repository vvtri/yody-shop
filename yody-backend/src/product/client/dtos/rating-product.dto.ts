import { IsNumber, Max, Min } from "class-validator";

export class RatingProductDto {
  @IsNumber()
  productId: number

  @IsNumber()
  @Min(0)
  @Max(100)
  rating: number
}
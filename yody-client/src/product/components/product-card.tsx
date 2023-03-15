import { Box, Button, HStack, Text, VStack } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import image from "../../../public/images/blank_cart.svg";
import Rating from "../../common/components/rating";
import { formatPrice } from "../../common/utils/index.utils";
import { IProductCard } from "../interfaces/product-card.interface";

interface ProductProps {
  product: IProductCard;
}

export const ProductCard = ({ product }: ProductProps) => {
  const router = useRouter();

  const [ratingValue, setRatingValue] = useState(product.rating);

  return (
    <VStack alignItems="flex-start">
      <Link href={`/product/${product.id}`} passHref>
        <Box as="a" pos="relative" w="100%" h="300px">
          <Image src={product.productImages?.[0].url || image} layout="fill" />
        </Box>
      </Link>
      <Box onMouseLeave={() => setRatingValue(product.rating)}>
        {/* <Rating readonly={true} ratingValue={product.rating} /> */}
      </Box>
      <HStack justifyContent="space-between" alignItems="center" w="100%">
        <Text fontSize="md" fontWeight="600" _hover={{ color: "yellow" }}>
          <Link href={`/product/${product.id}`}>{product.name}</Link>
        </Text>
        <Text fontSize="16px" color="yellow" fontWeight="500">
          {formatPrice(product.price)} đ
        </Text>
      </HStack>
      <Button
        bg="yellow"
        color="white"
        _hover={{ bg: "yellow" }}
        onClick={() => router.push(`/product/${product.id}`)}
      >
        Xem sản phẩm
      </Button>
    </VStack>
  );
};

import React from "react";
import { ProductListItem } from "@/shared/interfaces/https/get-products";
import { useProductCardModel } from "./useProductCardModel";
import { ProductCardView } from "./ProductCardView";

interface ProductCardProps {
  product: ProductListItem;
  onPress: (product: ProductListItem) => void;
}

export const ProductCard: React.FC<ProductCardProps> = (props) => {
  const model = useProductCardModel(props);

  return <ProductCardView {...model} />;
};

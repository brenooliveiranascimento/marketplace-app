// app/product/[id].tsx
import { useCommentsModel } from "@/ViewModels/Product/useCommentsModel";
import { ProductView } from "@/ViewModels/Product/ProductView";
import { useProductModel } from "@/ViewModels/Product/useProductModel";
import { useLocalSearchParams } from "expo-router";

export default function Product() {
  const { id } = useLocalSearchParams();
  const productId = parseInt(id as string);
  
  const productModel = useProductModel(productId);
  const commentModel = useCommentsModel(productId);

  return <ProductView {...productModel} {...commentModel} />;
}
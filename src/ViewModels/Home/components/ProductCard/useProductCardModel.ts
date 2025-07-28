import { ProductListItem } from "@/shared/interfaces/https/get-products";

interface UseProductCardModelProps {
  product: ProductListItem;
  onPress: (product: ProductListItem) => void;
}

export const useProductCardModel = ({
  product,
  onPress,
}: UseProductCardModelProps) => {
  const formatRating = (rating: number): string => {
    return rating.toFixed(1);
  };

  const formatProductName = (name: string): string => {
    if (name.length >= 17) {
      return `${name.slice(0, 17)}...`;
    }
    return name;
  };

  const handlePress = () => {
    onPress(product);
  };

  const formattedRating = formatRating(product.averageRating);
  const displayName = formatProductName(product.name);

  return {
    product,
    formattedRating,
    displayName,
    handlePress,
  };
};

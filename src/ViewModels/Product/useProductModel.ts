import { Alert } from "react-native";
import { router } from "expo-router";
import { useCartStore } from "@/store/cartStore";
import { useProductQuery } from "@/shared/queries";

export const useProductModel = (productId: number) => {
  const { addItem } = useCartStore();

  const { product, isLoading, error, refetch, isRefetching } = useProductQuery({
    productId,
    enabled: !!productId,
  });

  const formatPrice = (value: string): string => {
    const numericValue = parseFloat(value);
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(numericValue);
  };

  const handleAddToCart = () => {
    if (!product) return;

    try {
      addItem({
        id: product.id,
        name: product.name,
        price: product.value,
        image: product.photo,
      });

      Alert.alert("Sucesso!", `${product.name} foi adicionado ao carrinho!`, [
        { text: "OK" },
      ]);
    } catch (error) {
      Alert.alert(
        "Erro",
        "Não foi possível adicionar o produto ao carrinho. Tente novamente.",
        [{ text: "OK" }]
      );
    }
  };

  const handleGoBack = () => {
    router.back();
  };

  return {
    product,
    isLoading,
    error,
    isRefreshing: isRefetching,
    formatPrice,
    onAddToCart: handleAddToCart,
    onGoBack: handleGoBack,
    refetch,
  };
};

import { useQuery } from "@tanstack/react-query";
import { Alert } from "react-native";
import { router } from "expo-router";
import { useCartStore } from "@/store/cartStore";
import { productService } from "@/shared/services/product.service";

export const useProductModel = (productId: number) => {
  const { addItem } = useCartStore();

  const {
    data: product,
    isLoading,
    error,
    refetch,
    isRefetching,
  } = useQuery({
    queryKey: ["product", productId],
    queryFn: async () => {
      try {
        const response = await productService.getProductById(productId);
        return response;
      } catch (error) {
        console.error("❌ Erro ao buscar produto:", error);
        throw error;
      }
    },
    enabled: !!productId,
    staleTime: 5 * 60 * 1000,
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
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

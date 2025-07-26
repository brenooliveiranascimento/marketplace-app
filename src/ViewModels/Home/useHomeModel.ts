import { useState, useCallback } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Alert } from "react-native";
import { router } from "expo-router";
import { useCartStore } from "@/store/cartStore";
import { Product } from "@/shared/interfaces/product";
import { ProductsRequest } from "@/shared/interfaces/https/get-products";
import { productService } from "@/shared/services/product.service";

export const useHomeModel = () => {
  const [searchText, setSearchText] = useState("");
  const [currentSearchText, setCurrentSearchText] = useState("");
  const { addItem } = useCartStore();

  const buildRequest = useCallback(
    (pageParam: number): ProductsRequest => {
      const request: ProductsRequest = {
        pagination: {
          page: pageParam,
          perPage: 15,
        },
        sort: {
          averageRating: "DESC",
        },
      };

      // Adicionar filtros apenas se houver busca
      if (currentSearchText.trim()) {
        request.filters = {
          searchText: currentSearchText.trim(),
        };
      }

      return request;
    },
    [currentSearchText]
  );

  const {
    data,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    refetch,
    isRefetching,
    error,
  } = useInfiniteQuery({
    queryKey: ["products", currentSearchText],
    queryFn: async ({ pageParam = 1 }) => {
      const request = buildRequest(pageParam);

      try {
        const response = await productService.getProducts(request);
        return response;
      } catch (error) {
        console.error("❌ Erro na requisição:", error);
        throw error;
      }
    },
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.totalPages) {
        return lastPage.page + 1;
      }
      return undefined;
    },
    initialPageParam: 1,
    staleTime: 5 * 60 * 1000, // 5 minutos
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });

  const products = data?.pages.flatMap((page) => page.data) || [];

  const handleSearchTextChange = (text: string) => {
    setSearchText(text);
  };

  const handleSearch = () => {
    const trimmedText = searchText.trim();
    setCurrentSearchText(trimmedText);
  };

  const handleClearSearch = () => {
    setSearchText("");
    setCurrentSearchText("");
  };

  const handleProductPress = (product: Product) => {
    Alert.alert(
      "Produto Selecionado",
      `${product.name}\n${product.description}\n\nPreço: R$ ${parseFloat(
        product.value
      ).toFixed(2)}\nAvaliação: ${product.averageRating}/5.0 (${
        product.ratingCount
      } avaliações)`
    );
  };

  const handleAddToCart = (product: Product) => {
    addItem({
      id: product.id.toString(),
      name: product.name,
      price: parseFloat(product.value),
      image: product.photo,
    });
  };

  const handleCartPress = () => {
    router.push("/(tabs)/cart");
  };

  const handleProfilePress = () => {
    Alert.alert(
      "Perfil",
      "Funcionalidade do perfil será implementada em breve!"
    );
  };

  const handleLoadMore = () => {
    if (hasNextPage && !isFetchingNextPage && !isLoading) {
      fetchNextPage();
    }
  };

  const handleRefresh = async () => {
    await refetch();
  };

  return {
    products,
    isLoading,
    isLoadingMore: isFetchingNextPage,
    hasNextPage: hasNextPage || false,
    searchText,
    onSearchTextChange: handleSearchTextChange,
    onSearch: handleSearch,
    onClearSearch: handleClearSearch,
    onProductPress: handleProductPress,
    onAddToCart: handleAddToCart,
    onCartPress: handleCartPress,
    onProfilePress: handleProfilePress,
    onLoadMore: handleLoadMore,
    onRefresh: handleRefresh,
    isRefreshing: isRefetching,
  };
};

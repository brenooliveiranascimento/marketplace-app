import { useState, useCallback } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Alert } from "react-native";
import {
  ProductListItem,
  ProductsRequest,
} from "@/shared/interfaces/https/get-products";
import { productService } from "@/shared/services/product.service";
import { router } from "expo-router";
import { useProductFilterStore } from "@/store/productFilterStore";
import { Toast } from "toastify-react-native";

export const useHomeModel = () => {
  const [currentSearchText, setCurrentSearchText] = useState("");

  const { getProductsRequest, appliedFilterState } = useProductFilterStore();

  const buildRequest = useCallback(
    (pageParam: number): ProductsRequest => {
      const request = getProductsRequest(pageParam, 15);

      if (currentSearchText.trim()) {
        request.filters = {
          ...request.filters,
          searchText: currentSearchText.trim(),
        };
      }

      return request;
    },
    [getProductsRequest, currentSearchText]
  );

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    refetch,
    isRefetching,
  } = useInfiniteQuery({
    queryKey: ["products", currentSearchText, appliedFilterState],
    queryFn: async ({ pageParam = 1 }) => {
      const request = buildRequest(pageParam);

      try {
        const response = await productService.getProducts(request);
        return response;
      } catch (error) {
        Toast.error("Erro ao buscar produtos");
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
    staleTime: 5 * 60 * 1000,
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });

  const products = data?.pages.flatMap((page) => page.data) || [];

  const handleSearchTextChange = useCallback((text: string) => {
    setCurrentSearchText(text);
  }, []);

  const handleSearch = useCallback(() => {
    setCurrentSearchText(currentSearchText);
    refetch();
  }, [currentSearchText, refetch]);

  const handleClearSearch = useCallback(() => {
    setCurrentSearchText("");
    refetch();
  }, [refetch]);

  const handleProductPress = (product: ProductListItem) => {
    router.push({
      pathname: "/product/[id]",
      params: { id: product.id },
    });
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

  const handleEndReached = () => {
    if (hasNextPage && !isFetchingNextPage && !isLoading) {
      handleLoadMore();
    }
  };

  return {
    products,
    currentSearchText,
    setCurrentSearchText,
    isLoading,
    isRefreshing: isRefetching,
    handleEndReached,
    handleSearchTextChange,
    handleSearch,
    handleClearSearch,
    handleProductPress,
    handleProfilePress,
    handleRefresh,
  };
};

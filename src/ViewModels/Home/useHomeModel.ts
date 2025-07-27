import { useState, useCallback } from "react";
import { Alert } from "react-native";
import {
  ProductListItem,
  ProductsRequest,
} from "@/shared/interfaces/https/get-products";
import { router } from "expo-router";
import { useProductFilterStore } from "@/store/productFilterStore";
import { useDebounce } from "@/shared/hooks/useDebounce";
import { useProductsInfiniteQuery } from "@/shared/queries";

export const useHomeModel = () => {
  const [searchInputText, setSearchInputText] = useState("");
  const currentSearchText = useDebounce(searchInputText, 500);

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
    products,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isInitialLoading,
    isFilterLoading,
    refetch,
    isRefetching,
  } = useProductsInfiniteQuery({
    searchText: currentSearchText,
    appliedFilterState,
    buildRequest,
  });

  const handleSearchTextChange = useCallback((text: string) => {
    setSearchInputText(text);
  }, []);

  const handleSearch = useCallback(() => {
    refetch();
  }, [refetch]);

  const handleClearSearch = useCallback(() => {
    setSearchInputText("");
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
    if (hasNextPage && !isFetchingNextPage && !isInitialLoading) {
      fetchNextPage();
    }
  };

  const handleRefresh = async () => {
    await refetch();
  };

  const handleEndReached = () => {
    if (hasNextPage && !isFetchingNextPage && !isInitialLoading) {
      handleLoadMore();
    }
  };

  return {
    products,
    currentSearchText: searchInputText, // Retorna o texto do input para a UI
    setCurrentSearchText: handleSearchTextChange, // Retorna a função que atualiza o input
    isLoading: isInitialLoading, // Apenas loading inicial
    isFilterLoading, // Loading específico para filtros
    isLoadingMore: isFetchingNextPage, // Loading para próximas páginas
    hasNextPage, // Se há próxima página
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

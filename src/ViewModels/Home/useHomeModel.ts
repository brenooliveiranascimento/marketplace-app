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
  }, []);

  const handleProductPress = (product: ProductListItem) => {
    router.push({
      pathname: "/product/[id]",
      params: { id: product.id },
    });
  };

  const handleProfilePress = () => {
    router.push("/profile");
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
    handleLoadMore();
  };

  return {
    products,
    currentSearchText: searchInputText,
    setCurrentSearchText: handleSearchTextChange,
    isLoading: isInitialLoading,
    isFilterLoading,
    isLoadingMore: isFetchingNextPage,
    hasNextPage,
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

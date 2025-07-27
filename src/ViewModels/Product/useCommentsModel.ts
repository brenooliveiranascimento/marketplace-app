import { useCommentsInfiniteQuery } from "@/shared/queries";
import { useCallback } from "react";
import { Alert } from "react-native";

export const useCommentsModel = (productId: number) => {
  const {
    comments,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    refetch,
    isRefetching,
    error,
    data,
  } = useCommentsInfiniteQuery({
    productId,
    enabled: !!productId,
  });

  const formatRating = (rating: string): string => {
    const numericRating = parseFloat(rating);
    return `${numericRating} /5`;
  };

  const formatName = (name: string) => {
    const splitedName = name.split(" ");
    if (splitedName.length === 1) {
      return splitedName[0];
    }
    return `${splitedName[0]} ${splitedName[1]?.[0] || ""}.`;
  };

  const handleLoadMore = () => {
    if (hasNextPage && !isFetchingNextPage && !isLoading) {
      fetchNextPage();
    }
  };

  const handleRefresh = async () => {
    await refetch();
  };

  const handleAddReview = () => {
    Alert.alert(
      "Avaliar Produto",
      "Funcionalidade de avaliação será implementada em breve!"
    );
  };

  const handleEndReached = () => {
    if (hasNextPage && !isFetchingNextPage && !isLoading) {
      handleLoadMore();
    }
  };

  return {
    comments,
    isLoading,
    isLoadingMore: isFetchingNextPage,
    hasNextPage,
    isRefreshing: isRefetching,
    error,
    totalComments: data?.pages[0]?.total || 0,
    onLoadMore: handleLoadMore,
    onRefresh: handleRefresh,
    onAddReview: handleAddReview,
    handleLoadMore,
    handleRefresh,
    handleAddReview,
    handleEndReached,
    formatRating,
    formatName,
  };
};

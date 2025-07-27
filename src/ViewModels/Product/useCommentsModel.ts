import { CommentsRequest } from "@/shared/interfaces/https/get-comments";
import { commentService } from "@/shared/services/comments.service";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useCallback } from "react";
import { Alert } from "react-native";
import ToastManager, { Toast } from "toastify-react-native";

export const useCommentsModel = (productId: number) => {
  const buildRequest = useCallback(
    (pageParam: number): CommentsRequest => ({
      productId,
      pagination: {
        page: pageParam,
        perPage: 10,
      },
    }),
    [productId]
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
    queryKey: ["comments", productId],
    queryFn: async ({ pageParam = 1 }) => {
      const request = buildRequest(pageParam);

      try {
        const response = await commentService.getComments(request);
        return response;
      } catch (error) {
        console.error("❌ Erro ao buscar comentários:", error);
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
    enabled: !!productId,
    staleTime: 5 * 60 * 1000,
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });

  const comments = data?.pages.flatMap((page) => page.data) || [];

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

  const formatRating = (rating: string): string => {
    const numericRating = parseFloat(rating);
    return `${numericRating} /5`;
  };

  const formatName = (name: string) => {
    const splitedName = name.split(" ");
    return `${splitedName[0]} ${splitedName[0][0]}.`;
  };

  return {
    comments,
    isLoading,
    isLoadingMore: isFetchingNextPage,
    hasNextPage,
    isRefreshing: isRefetching,
    onLoadMore: handleLoadMore,
    onRefresh: handleRefresh,
    onAddReview: handleAddReview,
    formatRating,
    totalComments: data?.pages[0]?.total || 0,
    formatName,
  };
};

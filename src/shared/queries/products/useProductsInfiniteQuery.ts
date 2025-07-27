import { useInfiniteQuery } from "@tanstack/react-query";
import {
  ProductListItem,
  ProductsRequest,
} from "@/shared/interfaces/https/get-products";
import { productService } from "@/shared/services/product.service";
import { Toast } from "toastify-react-native";
import { FilterState } from "@/store/productFilterStore";

interface UseProductsInfiniteQueryProps {
  searchText: string;
  appliedFilterState: FilterState;
  buildRequest: (pageParam: number) => ProductsRequest;
}

export const useProductsInfiniteQuery = ({
  searchText,
  appliedFilterState,
  buildRequest,
}: UseProductsInfiniteQueryProps) => {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    refetch,
    isRefetching,
  } = useInfiniteQuery({
    queryKey: ["products", searchText, appliedFilterState],
    queryFn: async ({ pageParam = 1 }) => {
      try {
        const request = buildRequest(pageParam);
        const response = await productService.getProducts(request);
        return response;
      } catch (error) {
        Toast.error("Erro ao buscar produtos");
        throw error;
      }
    },
    getNextPageParam: (lastPage) => {
      return lastPage.page < lastPage.totalPages
        ? lastPage.page + 1
        : undefined;
    },
    initialPageParam: 1,
  });

  const products: ProductListItem[] =
    data?.pages.flatMap((page) => page.data) ?? [];

  const isInitialLoading = isLoading && products.length === 0;
  const isFilterLoading = isRefetching && !isLoading && products.length > 0;

  return {
    products,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isInitialLoading,
    isFilterLoading,
    error,
    refetch,
    isRefetching,
  };
};

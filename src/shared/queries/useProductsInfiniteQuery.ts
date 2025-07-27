import { useInfiniteQuery } from "@tanstack/react-query";
import { ProductsRequest } from "@/shared/interfaces/https/get-products";
import { productService } from "@/shared/services/product.service";
import { Toast } from "toastify-react-native";
import { infiniteQueryConfig } from "./config";

interface UseProductsInfiniteQueryProps {
  searchText?: string;
  appliedFilterState?: any;
  buildRequest: (pageParam: number) => ProductsRequest;
}

export const useProductsInfiniteQuery = ({
  searchText = "",
  appliedFilterState,
  buildRequest,
}: UseProductsInfiniteQueryProps) => {
  const query = useInfiniteQuery({
    queryKey: ["products", searchText, appliedFilterState],
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
    ...infiniteQueryConfig,
  });

  const products = query.data?.pages.flatMap((page) => page.data) || [];

  const isInitialLoading = query.isLoading && products.length === 0;
  const isFilterLoading =
    query.isFetching && !query.isLoading && products.length > 0;

  return {
    ...query,
    products,
    isInitialLoading,
    isFilterLoading,
  };
};

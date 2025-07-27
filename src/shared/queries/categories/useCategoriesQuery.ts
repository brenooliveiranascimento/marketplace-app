import { useQuery } from "@tanstack/react-query";
import { productService } from "@/shared/services/product.service";

export const useCategoriesQuery = () => {
  const query = useQuery({
    queryKey: ["categories"],
    queryFn: () => productService.getCategories(),
    staleTime: 1000 * 60 * 15,
  });

  return {
    categories: query.data || [],
    isLoading: query.isLoading,
    error: query.error,
    refetch: query.refetch,
  };
};

import { useQuery } from "@tanstack/react-query";
import { productService } from "@/shared/services/product.service";

export const useCategoriesQuery = () => {
  const query = useQuery({
    queryKey: ["product-categories"],
    queryFn: productService.getCategories,
    staleTime: 1000 * 60 * 15,
    gcTime: 1000 * 60 * 30,
    retry: 3,
    retryDelay: (attemptIndex: number) =>
      Math.min(1000 * 2 ** attemptIndex, 30000),
  });

  const categories = query.data || [];

  return {
    ...query,
    categories,
  };
};

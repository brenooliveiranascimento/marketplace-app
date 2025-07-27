import { useQuery } from "@tanstack/react-query";
import { productService } from "@/shared/services/product.service";
import { queryConfig } from "@/shared/queries/config";
import { useErrorHandler } from "@/shared/hooks/errorHandler";

interface UseProductQueryProps {
  productId: number;
  enabled?: boolean;
}

export const useProductQuery = ({
  productId,
  enabled = true,
}: UseProductQueryProps) => {
  const { handleError } = useErrorHandler();

  const query = useQuery({
    queryKey: ["product", productId],
    queryFn: async () => {
      try {
        const response = await productService.getProductById(productId);
        return response;
      } catch (error) {
        handleError(error);
        throw error;
      }
    },
    enabled: enabled && !!productId,
    ...queryConfig,
  });

  return {
    ...query,
    product: query.data,
  };
};

import { useQuery } from "@tanstack/react-query";
import { commentService } from "@/shared/services/comments.service";

interface UseUserCommentQueryProps {
  productId: number;
  enabled?: boolean;
}

export const useUserCommentQuery = ({
  productId,
  enabled = true,
}: UseUserCommentQueryProps) => {
  const query = useQuery({
    queryKey: ["user-comment", productId],
    queryFn: () => commentService.getUserComment({ productId }),
    enabled: enabled && !!productId,
    staleTime: 1000 * 60 * 1,
  });

  return {
    ...query,
    userComment: query.data,
  };
};

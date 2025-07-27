import { useInfiniteQuery } from "@tanstack/react-query";
import { CommentsRequest } from "@/shared/interfaces/https/get-comments";
import { commentService } from "@/shared/services/comments.service";
import { useErrorHandler } from "@/shared/hooks/errorHandler";
import { infiniteQueryConfig } from "./config";
import { ProductComment } from "../interfaces/comments";

interface UseCommentsInfiniteQueryProps {
  productId: number;
  enabled?: boolean;
}

export const useCommentsInfiniteQuery = ({
  productId,
  enabled = true,
}: UseCommentsInfiniteQueryProps) => {
  const { handleError } = useErrorHandler();

  const buildRequest = (pageParam: number): CommentsRequest => ({
    productId,
    pagination: {
      page: pageParam,
      perPage: 10,
    },
  });

  const query = useInfiniteQuery({
    queryKey: ["comments", productId],
    queryFn: async ({ pageParam = 1 }) => {
      const request = buildRequest(pageParam);

      try {
        const response = await commentService.getComments(request);
        return response;
      } catch (error) {
        handleError(error);
        throw error;
      }
    },
    enabled: enabled && !!productId,
    ...infiniteQueryConfig,
  });

  const comments: ProductComment[] =
    query.data?.pages.flatMap((page) => page.data) ?? [];

  return {
    ...query,
    comments,
  };
};

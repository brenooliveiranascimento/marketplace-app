import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Toast } from "toastify-react-native";
import { commentService } from "@/shared/services/comments.service";
import { useErrorHandler } from "@/shared/hooks/errorHandler";
import { UpdateCommentRequest } from "@/shared/interfaces/https/update-comment";

interface UseUpdateCommentMutationProps {
  productId: number;
  onSuccess?: () => void;
}

export const useUpdateCommentMutation = ({
  productId,
  onSuccess,
}: UseUpdateCommentMutationProps) => {
  const queryClient = useQueryClient();
  const { handleError } = useErrorHandler();

  const mutation = useMutation({
    mutationFn: (params: UpdateCommentRequest) =>
      commentService.updateComment(params),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["comments", productId] });
      queryClient.invalidateQueries({ queryKey: ["user-comment", productId] });
      Toast.success(
        response.message || "Avaliação atualizada com sucesso!",
        "top"
      );
      onSuccess?.();
    },
    onError: (error: any) => {
      handleError(error, "Erro ao atualizar avaliação. Tente novamente.");
    },
  });

  return mutation;
};

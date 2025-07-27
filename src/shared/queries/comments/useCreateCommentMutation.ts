import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Toast } from "toastify-react-native";
import { commentService } from "@/shared/services/comments.service";
import { useErrorHandler } from "@/shared/hooks/errorHandler";
import { CreateCommentRequest } from "@/shared/interfaces/https/create-comment";

interface UseCreateCommentMutationProps {
  productId: number;
  onSuccess?: () => void;
}

export const useCreateCommentMutation = ({
  productId,
  onSuccess,
}: UseCreateCommentMutationProps) => {
  const queryClient = useQueryClient();
  const { handleError } = useErrorHandler();

  const mutation = useMutation({
    mutationFn: (params: CreateCommentRequest) =>
      commentService.createComment(params),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["comments", productId] });
      queryClient.invalidateQueries({ queryKey: ["user-comment", productId] });
      Toast.success(
        response.message || "Avaliação enviada com sucesso!",
        "top"
      );
      onSuccess?.();
    },
    onError: (error: any) => {
      handleError(error, "Erro ao enviar avaliação. Tente novamente.");
    },
  });

  return mutation;
};

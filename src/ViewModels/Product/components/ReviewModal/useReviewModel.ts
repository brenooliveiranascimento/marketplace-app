import { useState, useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Toast } from "toastify-react-native";
import { useBottomSheetStore } from "@/store/bottomsheetStore";
import { commentService } from "@/shared/services/comments.service";
import { useErrorHandler } from "@/shared/hooks/errorHandler";

interface UseReviewModelProps {
  productId: number;
}

export const useReviewModel = ({ productId }: UseReviewModelProps) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [commentId, setCommentId] = useState<number | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const { close } = useBottomSheetStore();
  const queryClient = useQueryClient();
  const { handleError } = useErrorHandler();
  const { data: userComment, isLoading: isLoadingUserComment } = useQuery({
    queryKey: ["user-comment", productId],
    queryFn: () => commentService.getUserComment({ productId }),
    staleTime: 0,
  });

  useEffect(() => {
    if (userComment) {
      if (userComment.comment && userComment.rating) {
        setComment(userComment.comment || "");
        setRating(userComment.rating || 0);
        setCommentId(userComment.commentId || null);
        setIsEditing(true);
      } else {
        setComment("");
        setRating(0);
        setIsEditing(false);
      }
    }
  }, [userComment]);

  const createCommentMutation = useMutation({
    mutationFn: () =>
      commentService.createComment({
        content: (comment || "").trim(),
        productId,
        rating,
      }),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["comments", productId] });
      queryClient.invalidateQueries({ queryKey: ["user-comment", productId] });
      Toast.success(
        response.message || "Avaliação enviada com sucesso!",
        "top"
      );
      handleClose();
    },
    onError: (error: any) => {
      handleError(error, "Erro ao enviar avaliação. Tente novamente.");
      handleClose();
    },
  });

  const updateCommentMutation = useMutation({
    mutationFn: () => {
      if (!commentId) throw new Error("ID do comentário não encontrado");
      return commentService.updateComment({
        commentId,
        content: (comment || "").trim(),
        rating,
      });
    },
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["comments", productId] });
      queryClient.invalidateQueries({ queryKey: ["user-comment", productId] });
      Toast.success(
        response.message || "Avaliação atualizada com sucesso!",
        "top"
      );
      handleClose();
    },
    onError: (error: any) => {
      handleError(error, "Erro ao atualizar avaliação. Tente novamente.");
    },
  });

  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
  };

  const handleCommentChange = (text: string) => {
    setComment(text);
  };

  const handleSubmitReview = () => {
    if (rating === 0) {
      Toast.warn("Por favor, selecione uma nota.", "top");
      return;
    }

    if (!comment || !comment.trim()) {
      Toast.warn("Por favor, escreva um comentário.", "top");
      return;
    }

    if (isEditing && commentId) {
      updateCommentMutation.mutate();
    } else {
      createCommentMutation.mutate();
    }
  };

  const handleClose = () => {
    setRating(0);
    setComment("");
    setCommentId(null);
    setIsEditing(false);
    close();
  };

  const isValid = rating > 0 && comment && comment?.trim()?.length > 0;
  const isLoading =
    createCommentMutation.isPending ||
    updateCommentMutation.isPending ||
    isLoadingUserComment;

  return {
    rating,
    comment,
    isValid,
    isLoading,
    isEditing,
    handleRatingChange,
    handleCommentChange,
    handleSubmitReview,
    handleClose,
  };
};

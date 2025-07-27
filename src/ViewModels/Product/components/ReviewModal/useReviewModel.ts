import { useState, useEffect } from "react";
import { Toast } from "toastify-react-native";
import { useBottomSheetStore } from "@/store/bottomsheetStore";
import {
  useUserCommentQuery,
  useCreateCommentMutation,
  useUpdateCommentMutation,
} from "@/shared/queries";

interface UseReviewModelProps {
  productId: number;
}

interface ReviewState {
  rating: number;
  comment: string;
  commentId: number | null;
  isEditing: boolean;
}

const initialState: ReviewState = {
  rating: 0,
  comment: "",
  commentId: null,
  isEditing: false,
};

export const useReviewModel = ({ productId }: UseReviewModelProps) => {
  const [reviewState, setReviewState] = useState<ReviewState>(initialState);
  const { close } = useBottomSheetStore();

  const { userComment, isLoading: isLoadingUserComment } = useUserCommentQuery({
    productId,
  });

  const createCommentMutation = useCreateCommentMutation({
    productId,
    onSuccess: handleClose,
  });

  const updateCommentMutation = useUpdateCommentMutation({
    productId,
    onSuccess: handleClose,
  });

  useEffect(() => {
    if (userComment) {
      if (userComment.comment && userComment.rating) {
        setReviewState({
          rating: userComment.rating,
          comment: userComment.comment.content,
          commentId: userComment.comment.id,
          isEditing: true,
        });
      } else {
        setReviewState(initialState);
      }
    }
  }, [userComment]);

  const handleRatingChange = (newRating: number) => {
    setReviewState((prev) => ({ ...prev, rating: newRating }));
  };

  const handleCommentChange = (text: string) => {
    setReviewState((prev) => ({ ...prev, comment: text }));
  };

  const handleSubmitReview = () => {
    if (reviewState.rating === 0) {
      Toast.warn("Por favor, selecione uma nota.", "top");
      return;
    }

    if (!reviewState.comment.trim()) {
      Toast.warn("Por favor, escreva um comentário.", "top");
      return;
    }

    if (reviewState.isEditing) {
      updateCommentMutation.mutate({
        commentId: reviewState.commentId!,
        content: reviewState.comment.trim(),
        rating: reviewState.rating,
      });
    } else {
      createCommentMutation.mutate({
        content: reviewState.comment.trim(),
        productId,
        rating: reviewState.rating,
      });
    }
  };

  function handleClose() {
    setReviewState(initialState);
    close();
  }

  const isValid =
    reviewState.rating > 0 && reviewState.comment.trim().length > 0;
  const isLoading =
    createCommentMutation.isPending ||
    updateCommentMutation.isPending ||
    isLoadingUserComment;

  return {
    rating: reviewState.rating,
    comment: reviewState.comment,
    isValid,
    isLoading,
    isEditing: reviewState.isEditing,
    isLoadingUserComment,
    handleRatingChange,
    handleCommentChange,
    handleSubmitReview,
    handleClose,
  };
};

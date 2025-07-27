import React from "react";
import { useReviewModel } from "./useReviewModel";
import { ReviewModalView } from "./ReviewModalView";

interface ReviewModalProps {
  productId: number;
}

export const ReviewModal: React.FC<ReviewModalProps> = ({ productId }) => {
  const model = useReviewModel({ productId });

  return <ReviewModalView {...model} />;
};

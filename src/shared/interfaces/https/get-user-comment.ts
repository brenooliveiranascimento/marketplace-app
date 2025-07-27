export interface GetUserCommentRequest {
  productId: number;
}

export interface GetUserCommentResponse {
  comment: string | null;
  rating: number | null;
  commentId?: number;
}

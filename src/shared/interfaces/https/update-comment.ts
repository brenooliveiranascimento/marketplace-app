export interface UpdateCommentRequest {
  commentId: number;
  content: string;
  rating: number;
}

export interface UpdateCommentResponse {
  message: string;
}

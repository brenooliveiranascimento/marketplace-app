export interface CreateCommentRequest {
  content: string;
  productId: number;
  rating: number;
}

export interface CreateCommentResponse {
  message: string;
}

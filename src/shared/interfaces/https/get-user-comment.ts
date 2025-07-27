export interface GetUserCommentRequest {
  productId: number;
}

export interface UserComment {
  id: number;
  content: string;
  createdAt: string;
  user: {
    id: number;
    name: string;
  };
}

export interface GetUserCommentResponse {
  comment: UserComment | null;
  rating: number | null;
}

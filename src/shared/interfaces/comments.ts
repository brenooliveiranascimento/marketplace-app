export interface CommentUser {
  id: number;
  name: string;
  email: string;
  avatarUrl: string;
  rating: {
    value: string;
  };
}

export interface ProductComment {
  id: number;
  content: string;
  productId: number;
  userId: string;
  createdAt: string;
  user: CommentUser;
}

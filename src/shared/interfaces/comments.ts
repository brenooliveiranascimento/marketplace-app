export interface CommentUser {
  id: number;
  name: string;
  email: string;
  avatar?: {
    url: string;
  };
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

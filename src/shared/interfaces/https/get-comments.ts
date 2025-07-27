export interface CommentsRequest {
  productId: number;
  pagination: {
    page: number;
    perPage: number;
  };
}

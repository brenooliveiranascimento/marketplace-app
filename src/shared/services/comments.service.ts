import { marketPlaceApiClient } from "../api/market-place";
import { Comment } from "../interfaces/comments";
import { CommentsRequest } from "../interfaces/https/get-comments";
import { Paginated } from "../interfaces/https/paginated";

class CommentService {
  async getComments(request: CommentsRequest): Promise<Paginated<Comment>> {
    const response = await marketPlaceApiClient.post<Paginated<Comment>>(
      "/products/comments",
      request
    );
    return response.data;
  }
}

export const commentService = new CommentService();

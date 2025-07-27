import { marketPlaceApiClient } from "../api/market-place";
import { CommentsRequest } from "../interfaces/https/get-comments";
import {
  CreateCommentRequest,
  CreateCommentResponse,
} from "../interfaces/https/create-comment";
import {
  GetUserCommentRequest,
  GetUserCommentResponse,
} from "../interfaces/https/get-user-comment";
import {
  UpdateCommentRequest,
  UpdateCommentResponse,
} from "../interfaces/https/update-comment";
import { Paginated } from "../interfaces/https/paginated";
import { ProductComment } from "../interfaces/comments";

class CommentsService {
  async getComments(
    params: CommentsRequest
  ): Promise<Paginated<ProductComment>> {
    const { data } = await marketPlaceApiClient.post<Paginated<ProductComment>>(
      "/products/comments",
      params
    );

    return data;
  }

  async createComment(
    params: CreateCommentRequest
  ): Promise<CreateCommentResponse> {
    const { data } = await marketPlaceApiClient.post<CreateCommentResponse>(
      "/products/create/comments",
      params
    );
    return data;
  }

  async getUserComment(
    params: GetUserCommentRequest
  ): Promise<GetUserCommentResponse> {
    const { data } = await marketPlaceApiClient.get<GetUserCommentResponse>(
      `/products/${params.productId}/user-comment`
    );
    return data;
  }

  async updateComment(
    params: UpdateCommentRequest
  ): Promise<UpdateCommentResponse> {
    const { data } = await marketPlaceApiClient.put<UpdateCommentResponse>(
      `/products/comments/${params.commentId}`,
      {
        content: params.content,
        rating: params.rating,
      }
    );
    return data;
  }
}

export const commentService = new CommentsService();

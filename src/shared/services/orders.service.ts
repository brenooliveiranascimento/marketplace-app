import { marketPlaceApiClient } from "../api/market-place";
import { OrdersResponse } from "../interfaces/https/get-orders";

export interface CreateOrderRequest {
  creditCardId: number;
  items: {
    productId: number;
    quantity: number;
  }[];
}

export interface CreateOrderResponse {
  id: number;
  userId: number;
  creditCardId: number;
  total: number;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export const ordersService = {
  getOrders: async (): Promise<OrdersResponse> => {
    const response = await marketPlaceApiClient.get<OrdersResponse>("/orders");
    return response.data;
  },

  createOrder: async (
    data: CreateOrderRequest
  ): Promise<CreateOrderResponse> => {
    const response = await marketPlaceApiClient.post<CreateOrderResponse>(
      "/orders",
      data
    );
    return response.data;
  },
};

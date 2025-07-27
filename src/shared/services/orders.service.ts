import { marketPlaceApiClient } from "../api/market-place";
import { OrdersResponse } from "../interfaces/https/get-orders";

class OrdersService {
  async getOrders(): Promise<OrdersResponse> {
    const { data } = await marketPlaceApiClient.get<OrdersResponse>("/orders");
    return data;
  }
}

export const ordersService = new OrdersService();

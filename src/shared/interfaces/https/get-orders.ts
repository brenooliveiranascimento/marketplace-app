export interface Order {
  id: number;
  productId: number;
  productName: string;
  productPhoto: string;
  quantity: number;
  totalPrice: number;
  createdAt: string;
  creditCard: {
    id: number;
    maskedNumber: string;
  };
}

export interface OrdersResponse {
  orders: Order[];
  totalOrders: number;
}

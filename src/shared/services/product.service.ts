import axios from "axios";
import { User } from "../../store/userStore";
import { marketPlaceApiClient } from "../api/market-place";
import {
  ProductsRequest,
  ProductsResponse,
} from "../interfaces/https/get-products";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  avatarUrl?: string;
  phone: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

class ProductService {
  async getProducts(params: ProductsRequest): Promise<ProductsResponse> {
    const { data } = await marketPlaceApiClient.post<ProductsResponse>(
      "/products",
      params
    );
    return data;
  }
}

export const productService = new ProductService();

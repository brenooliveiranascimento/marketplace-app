import axios from "axios";
import { User } from "../../store/userStore";
import { marketPlaceApiClient } from "../api/market-place";
import {
  ProductListItem,
  ProductsRequest,
  ProductCategory,
} from "../interfaces/https/get-products";
import { Paginated } from "../interfaces/https/paginated";
import { Product } from "../interfaces/product";

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
  async getProducts(
    params: ProductsRequest
  ): Promise<Paginated<ProductListItem>> {
    const { data } = await marketPlaceApiClient.post<
      Paginated<ProductListItem>
    >("/products", params);
    return data;
  }

  async getProductById(productId: number): Promise<Product> {
    const { data } = await marketPlaceApiClient.get<Product>(
      `/products/${productId}`
    );
    return data;
  }

  async getCategories(): Promise<ProductCategory[]> {
    const { data } = await marketPlaceApiClient.get<ProductCategory[]>(
      "/products/categories"
    );
    return data;
  }
}

export const productService = new ProductService();

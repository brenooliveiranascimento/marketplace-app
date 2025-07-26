import { Product, ProductSort } from "../product";

export interface ProductsResponse {
  data: Product[];
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
}

export interface ProductFilters {
  from?: string;
  to?: string;
  categoryIds?: number[];
  searchText?: string;
}

export interface ProductsRequest {
  pagination: {
    page: number;
    perPage: number;
  };
  filters?: ProductFilters;
  sort?: ProductSort;
}

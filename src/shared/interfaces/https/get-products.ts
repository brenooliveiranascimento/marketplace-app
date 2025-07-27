import { Category } from "../category";
import { ProductSort } from "../product";

export interface ProductListItem {
  id: number;
  value: string;
  name: string;
  categoryId: number;
  photo: string;
  averageRating: number;
  ratingCount: number;
  category: Category;
  createdAt: Date;
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

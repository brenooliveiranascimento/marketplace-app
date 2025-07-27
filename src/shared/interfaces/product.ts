import { Category } from "./category";

export interface Product {
  id: number;
  value: string;
  name: string;
  description: string;
  photo: string;
  height: string;
  width: string;
  weight: string;
  averageRating: number;
  ratingCount: number;
  categoryId: number;
  category: Category;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
}
export interface ProductSort {
  averageRating?: "ASC" | "DESC";
}

import { create } from "zustand";
import { ProductsRequest } from "@/shared/interfaces/https/get-products";

export interface FilterState {
  valueMin: string;
  valueMax: string;
  selectedCategories: number[];
  dateFrom: string | null;
  dateTo: string | null;
  searchText: string;
}

interface ProductFilterStore {
  filterState: FilterState;

  setFilterState: (state: Partial<FilterState>) => void;
  updateFilter: (
    key: keyof FilterState,
    value: string | number | string[] | number[]
  ) => void;
  toggleCategory: (categoryId: number) => void;
  resetFilter: () => void;
  getProductsRequest: (page?: number, perPage?: number) => ProductsRequest;
}

const initialFilterState: FilterState = {
  valueMin: "",
  valueMax: "",
  selectedCategories: [],
  dateFrom: null,
  dateTo: null,
  searchText: "",
};

export const useProductFilterStore = create<ProductFilterStore>((set, get) => ({
  filterState: initialFilterState,

  setFilterState: (newState) =>
    set((state) => ({
      filterState: { ...state.filterState, ...newState },
    })),

  updateFilter: (key, value) =>
    set((state) => ({
      filterState: { ...state.filterState, [key]: value },
    })),

  toggleCategory: (categoryId) =>
    set((state) => {
      const currentCategories = state.filterState.selectedCategories;
      const newCategories = currentCategories.includes(categoryId)
        ? currentCategories.filter((id) => id !== categoryId)
        : [...currentCategories, categoryId];

      return {
        filterState: {
          ...state.filterState,
          selectedCategories: newCategories,
        },
      };
    }),

  resetFilter: () => set({ filterState: initialFilterState }),

  getProductsRequest: (page = 1, perPage = 15) => {
    const { filterState } = get();
    return {
      pagination: { page, perPage },
      filters: {
        from: filterState.dateFrom || undefined,
        to: filterState.dateTo || undefined,
        categoryIds: filterState.selectedCategories,
        searchText: filterState.searchText || undefined,
        minValue: filterState.valueMin
          ? Number(filterState.valueMin)
          : undefined,
        maxValue: filterState.valueMax
          ? Number(filterState.valueMax)
          : undefined,
      },
      sort: { averageRating: "ASC" },
    };
  },
}));

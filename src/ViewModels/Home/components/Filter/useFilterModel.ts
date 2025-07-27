import { useQuery } from "@tanstack/react-query";
import { productService } from "@/shared/services/product.service";
import { useProductFilterStore } from "@/store/productFilterStore";

export const useFilterModel = () => {
  const {
    filterState,
    updateFilter,
    toggleCategory,
    resetFilter,
    applyFilters,
  } = useProductFilterStore();

  const { data: categories = [], isLoading: isLoadingCategories } = useQuery({
    queryKey: ["product-categories"],
    queryFn: productService.getCategories,
    staleTime: 1000 * 60 * 15,
    gcTime: 1000 * 60 * 30,
  });

  const handleValueMinChange = (value: string) => {
    updateFilter("valueMin", value);
  };

  const handleValueMaxChange = (value: string) => {
    updateFilter("valueMax", value);
  };

  const handleCategoryToggle = (categoryId: number) => {
    toggleCategory(categoryId);
  };

  return {
    valueMin: filterState.valueMin,
    valueMax: filterState.valueMax,
    selectedCategories: filterState.selectedCategories,
    categories,
    isLoadingCategories,
    handleValueMinChange,
    handleValueMaxChange,
    handleCategoryToggle,
    resetFilter,
    applyFilters,
  };
};

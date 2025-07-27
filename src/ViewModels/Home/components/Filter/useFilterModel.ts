import { useProductFilterStore } from "@/store/productFilterStore";
import { useCategoriesQuery } from "@/shared/queries";

export const useFilterModel = () => {
  const {
    filterState,
    updateFilter,
    toggleCategory,
    resetFilter,
    applyFilters,
  } = useProductFilterStore();

  const { categories, isLoading: isLoadingCategories } = useCategoriesQuery();

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

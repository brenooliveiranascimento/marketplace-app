import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Checkbox from "expo-checkbox";
import { Ionicons } from "@expo/vector-icons";
import { ProductCategory } from "@/shared/interfaces/https/get-products";
import { colors } from "@/styles/colors";
import { AppButton } from "@/shared/components/AppButton";
import { AppInput } from "@/shared/components/AppInput";
import { useBottomSheetStore } from "@/store/bottomsheetStore";
import { useFilterModel } from "./useFilterModel";

export const FilterView: React.FC<ReturnType<typeof useFilterModel>> = ({
  valueMin,
  valueMax,
  categories,
  selectedCategories,
  isLoadingCategories,
  handleValueMinChange,
  handleValueMaxChange,
  handleCategoryToggle,
  resetFilter,
  applyFilters,
}) => {
  const { close } = useBottomSheetStore();

  const handleApplyFilter = () => {
    applyFilters();
    close();
  };

  const handleClearFilter = () => {
    resetFilter();
  };

  return (
    <View className="bg-background rounded-t-2xl">
      <View className="flex-row items-center justify-between p-4 px-6">
        <Text className="text-lg font-bold text-gray-900">
          Filtrar anúncios
        </Text>

        <TouchableOpacity
          onPress={close}
          className="w-8 h-8 items-center justify-center border border-purple-base rounded-lg"
        >
          <Ionicons name="close" size={20} color={colors["purple-base"]} />
        </TouchableOpacity>
      </View>

      <View className="p-4 px-6">
        <Text className="font-semibold text-base text-gray-300">VALOR</Text>
        <View className="flex-row mb-4 w-[100%]">
          <View className="flex-1">
            <AppInput
              placeholder="De"
              keyboardType="numeric"
              value={valueMin}
              onChangeText={handleValueMinChange}
              containerClassName="w-[90%]"
            />
          </View>
          <View className="flex-1">
            <AppInput
              placeholder="Até"
              keyboardType="numeric"
              value={valueMax}
              onChangeText={handleValueMaxChange}
              containerClassName="w-[90%]"
            />
          </View>
        </View>

        <Text className="font-semibold text-base text-gray-300 mt-4">
          CATEGORIA
        </Text>

        {isLoadingCategories ? (
          <Text className="text-gray-400 text-center py-4">
            Carregando categorias...
          </Text>
        ) : (
          <View className="mb-6 space-y-3">
            {categories.map(({ id, name }) => (
              <TouchableOpacity
                onPress={() => handleCategoryToggle(id)}
                key={`category-${id}-${name}`}
                className="flex-row items-center py-2"
              >
                <Checkbox
                  value={selectedCategories.includes(id)}
                  onValueChange={() => handleCategoryToggle(id)}
                  color={
                    selectedCategories.includes(id)
                      ? colors["purple-base"]
                      : undefined
                  }
                  className="mr-3 rounded-full"
                />
                <Text className="text-base text-gray-400">{name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        <View className="flex-row gap-3 mt-4 mb-6">
          <View className="flex-1">
            <AppButton variant="outlined" onPress={handleClearFilter}>
              Limpar filtro
            </AppButton>
          </View>
          <View className="flex-1">
            <AppButton variant="filled" onPress={handleApplyFilter}>
              Filtrar
            </AppButton>
          </View>
        </View>
      </View>
    </View>
  );
};

import React from "react";
import { View, TextInput, TouchableOpacity, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/styles/colors";
import { AppInput } from "@/shared/components/AppInput";
import { useBottomSheetStore } from "@/store/bottomsheetStore";
import { Filter } from "../Filter";

interface SearchInputProps {
  value: string;
  onChangeText: (text: string) => void;
  onSearch: () => void;
  onClear?: () => void;
  placeholder?: string;
  disabled?: boolean;
}

export const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChangeText,
  onSearch,
  placeholder = "Buscar produtos...",
}) => {
  const handleSubmitEditing = () => {
    onSearch();
  };

  const { open } = useBottomSheetStore();

  return (
    <View className="mb-3">
      <Text className="text-xl font-bold  mt-6 mb-4">Explore Produtos</Text>
      <View className="flex-row items-center">
        <View className="flex-1 ">
          <AppInput
            placeholder={placeholder}
            leftIcon="search"
            value={value}
            onChangeText={onChangeText}
            onSubmitEditing={handleSubmitEditing}
            returnKeyType="search"
            className="text-lg"
          />
        </View>

        <TouchableOpacity
          className="ml-5 items-center justify-center rounded-lg border-10 border h-[40px] w-[40px]  border-purple-base"
          onPress={() => {
            open(<Filter />);
          }}
        >
          <Ionicons
            name="filter-outline"
            size={22}
            color={colors["purple-base"]}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

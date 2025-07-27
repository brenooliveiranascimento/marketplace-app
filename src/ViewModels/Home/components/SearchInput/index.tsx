import React from "react";
import { View, TextInput, TouchableOpacity, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/styles/colors";
import { AppInput } from "@/components/AppInput";

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
  onClear,
  placeholder = "Buscar produtos...",
  disabled = false,
}) => {
  const handleSubmitEditing = () => {
    onSearch();
  };

  return (
    <View className="mb-3">
      <Text className="text-xl font-bold px-4 mt-8 mb-4">Explore Produtos</Text>
      <View className="flex-row items-center">
        <View className="flex-1">
          <AppInput
            placeholder={placeholder}
            leftIcon="search"
            value={value}
            onChangeText={onChangeText}
            onSubmitEditing={handleSubmitEditing}
            returnKeyType="search"
          />
        </View>

        <TouchableOpacity
          className="ml-12 items-center justify-center rounded-lg border-10 border h-[40px] w-[40px] mr-4 border-purple-base"
          onPress={onSearch}
          disabled={disabled || value.trim().length === 0}
          activeOpacity={0.8}
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

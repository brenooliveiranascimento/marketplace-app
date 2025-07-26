import React from "react";
import { View, TextInput, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { styles } from "@/styles/colors";

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

  const handleClear = () => {
    onChangeText("");
    onClear?.();
  };

  return (
    <View
      style={{ backgroundColor: styles.white }}
      className="flex-row items-center mx-4 my-3 px-4 py-3 rounded-xl shadow-sm"
    >
      <MaterialIcons name="search" size={20} color={styles.grays["gray-200"]} />

      <TextInput
        style={{ color: styles.grays["gray-500"] }}
        className="flex-1 ml-3 text-base"
        placeholder={placeholder}
        placeholderTextColor={styles.grays["gray-200"]}
        value={value}
        onChangeText={onChangeText}
        onSubmitEditing={handleSubmitEditing}
        returnKeyType="search"
        editable={!disabled}
        autoCapitalize="none"
        autoCorrect={false}
      />

      {value.length > 0 && (
        <TouchableOpacity
          onPress={handleClear}
          className="p-1"
          disabled={disabled}
        >
          <MaterialIcons
            name="close"
            size={18}
            color={styles.grays["gray-200"]}
          />
        </TouchableOpacity>
      )}

      <TouchableOpacity
        style={{ backgroundColor: styles["blue-base"] }}
        className="ml-2 px-3 py-2 rounded-lg"
        onPress={onSearch}
        disabled={disabled || value.trim().length === 0}
      >
        <MaterialIcons name="search" size={16} color={styles.white} />
      </TouchableOpacity>
    </View>
  );
};

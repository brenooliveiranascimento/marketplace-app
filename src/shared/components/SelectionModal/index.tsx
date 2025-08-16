import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import clsx from "clsx";

interface SelectionOption {
  text: string;
  onPress: () => void;
  icon?: keyof typeof Ionicons.glyphMap;
  variant?: "primary" | "secondary" | "danger";
}

interface SelectionModalContentProps {
  title: string;
  message?: string;
  options: SelectionOption[];
  onCancel: () => void;
  showCancel?: boolean;
  cancelText?: string;
}

export const SelectionModalContent: React.FC<SelectionModalContentProps> = ({
  title,
  message,
  options,
  onCancel,
  showCancel = true,
  cancelText = "Cancelar",
}) => {
  const getButtonClass = (variant: SelectionOption["variant"] = "primary") => {
    return clsx(
      "w-full py-3 px-4 rounded-lg items-center flex-row justify-center mb-2",
      {
        "bg-red-600": variant === "danger",
        "bg-gray-200": variant === "secondary",
        "bg-purple-base": variant === "primary",
      }
    );
  };

  const getTextClass = (variant: SelectionOption["variant"] = "primary") => {
    return clsx(
      "font-semibold",
      variant === "secondary" ? "text-gray-800" : "text-white"
    );
  };

  return (
    <View className="bg-white rounded-2xl p-6 shadow-2xl w-[85%] max-w-sm mx-auto">
      <View className="items-center">
        <Text className="text-lg font-bold text-gray-900 text-center mb-3">
          {title}
        </Text>

        {message && (
          <Text className="text-base text-gray-600 text-center mb-6 leading-6">
            {message}
          </Text>
        )}

        <View className="w-full space-y-3 mb-2">
          {options.map((option, index) => (
            <TouchableOpacity
              key={index}
              onPress={option.onPress}
              className={getButtonClass(option.variant)}
            >
              {option.icon && (
                <Ionicons
                  name={option.icon}
                  size={20}
                  color={option.variant === "secondary" ? "#374151" : "white"}
                  className="mr-2"
                />
              )}
              <Text className={getTextClass(option.variant)}>
                {option.text}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {showCancel && (
          <TouchableOpacity
            onPress={onCancel}
            className="w-full py-3 px-4 border border-gray-300 rounded-lg items-center"
          >
            <Text className="text-gray-700 font-semibold">{cancelText}</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

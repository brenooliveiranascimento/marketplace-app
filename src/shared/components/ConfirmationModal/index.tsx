import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/styles/colors";
import clsx from "clsx";

interface ConfirmationModalContentProps {
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmVariant?: "primary" | "danger";
  icon?: keyof typeof Ionicons.glyphMap;
}

export const ConfirmationModalContent: React.FC<
  ConfirmationModalContentProps
> = ({
  title,
  message,
  confirmText = "Confirmar",
  cancelText = "Cancelar",
  onConfirm,
  onCancel,
  confirmVariant = "primary",
  icon,
}) => {
  const confirmButtonClass = clsx(
    "flex-1 py-3 px-4 rounded-lg items-center",
    confirmVariant === "danger" ? "bg-red-600" : "bg-purple-base"
  );

  const getIconColor = () => {
    return confirmVariant === "danger" ? colors.danger : colors["purple-base"];
  };

  return (
    <View className="bg-white rounded-2xl p-6 shadow-2xl w-[85%] max-w-sm mx-auto">
      <View className="items-center">
        {icon && (
          <View className="mb-4">
            <Ionicons name={icon} size={48} color={getIconColor()} />
          </View>
        )}

        <Text className="text-lg font-bold text-gray-900 text-center mb-3">
          {title}
        </Text>

        <Text className="text-base text-gray-600 text-center mb-6 leading-6">
          {message}
        </Text>

        <View className="flex-row space-x-3 w-full">
          <TouchableOpacity
            onPress={onCancel}
            className="flex-1 py-3 px-4 border border-gray-300 rounded-lg items-center"
          >
            <Text className="text-gray-700 font-semibold">{cancelText}</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={onConfirm} className={confirmButtonClass}>
            <Text className="text-white font-semibold">{confirmText}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/styles/colors";
import clsx from "clsx";

interface InfoModalContentProps {
  title: string;
  message: string;
  buttonText?: string;
  onButtonPress: () => void;
  icon?: keyof typeof Ionicons.glyphMap;
  variant?: "info" | "warning" | "error";
}

export const InfoModalContent: React.FC<InfoModalContentProps> = ({
  title,
  message,
  buttonText = "OK",
  onButtonPress,
  icon,
  variant = "info",
}) => {
  const getIconConfig = () => {
    switch (variant) {
      case "warning":
        return {
          name: icon || ("warning" as keyof typeof Ionicons.glyphMap),
          color: colors.warning,
          bgClass: "bg-yellow-100",
        };
      case "error":
        return {
          name: icon || ("alert-circle" as keyof typeof Ionicons.glyphMap),
          color: colors.danger,
          bgClass: "bg-red-100",
        };
      default:
        return {
          name:
            icon || ("information-circle" as keyof typeof Ionicons.glyphMap),
          color: colors["purple-base"],
          bgClass: "bg-purple-100",
        };
    }
  };

  const getButtonClass = () => {
    return clsx("w-full py-3 px-4 rounded-lg items-center", {
      "bg-yellow-600": variant === "warning",
      "bg-red-600": variant === "error",
      "bg-purple-600": variant === "info",
    });
  };

  const iconConfig = getIconConfig();

  return (
    <View className="bg-white rounded-2xl p-6 shadow-2xl w-[85%] max-w-sm mx-auto">
      <View className="items-center">
        <View
          className={clsx(
            "mb-4 w-16 h-16 rounded-full items-center justify-center",
            iconConfig.bgClass
          )}
        >
          <Ionicons name={iconConfig.name} size={40} color={iconConfig.color} />
        </View>

        <Text className="text-lg font-bold text-gray-900 text-center mb-3">
          {title}
        </Text>

        <Text className="text-base text-gray-600 text-center mb-6 leading-6">
          {message}
        </Text>

        <TouchableOpacity onPress={onButtonPress} className={getButtonClass()}>
          <Text className="text-white font-semibold text-base">
            {buttonText}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface SuccessModalContentProps {
  title: string;
  message: string;
  buttonText?: string;
  onButtonPress: () => void;
}

export const SuccessModalContent: React.FC<SuccessModalContentProps> = ({
  title,
  message,
  buttonText = "OK",
  onButtonPress,
}) => {
  return (
    <View className="bg-white rounded-2xl p-6 shadow-2xl w-[85%] max-w-sm mx-auto">
      <View className="items-center">
        <View className="mb-4 w-16 h-16 bg-green-100 rounded-full items-center justify-center">
          <Ionicons name="checkmark-circle" size={40} color="#059669" />
        </View>

        <Text className="text-xl font-bold text-gray-900 text-center mb-3">
          {title}
        </Text>

        <Text className="text-base text-gray-600 text-center mb-6 leading-6">
          {message}
        </Text>

        <TouchableOpacity
          onPress={onButtonPress}
          className="w-full py-3 px-4 bg-green-600 rounded-lg items-center"
        >
          <Text className="text-white font-semibold text-base">
            {buttonText}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

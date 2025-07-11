import React from "react";
import { View, Text } from "react-native";

export const SplashView: React.FC = () => {
  return (
    <View className="flex-1 bg-blue-600 items-center justify-center">
      <Text className="text-white text-2xl font-bold">Marketplace</Text>
      <Text className="text-white text-sm mt-2">Carregando...</Text>
    </View>
  );
};

import { View, Text } from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { ExploreButton } from "@/shared/components/ExploreButton";

export const EmptyList = () => (
  <View className="flex-1 items-center px-20 pt-16">
    <Ionicons name="clipboard-outline" size={80} color="#D1D5DB" />
    <Text className="text-xl font-bold text-gray-700 mt-4 mb-4 text-center">
      Você ainda não tem pedidos
    </Text>
    <Text className="text-base text-gray-400 text-center mb-8">
      Explore o catálogo de produtos e faça sua primeira compra!
    </Text>

    <ExploreButton />
  </View>
);

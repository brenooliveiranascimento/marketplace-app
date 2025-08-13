import { View, Text } from "react-native";

export const ListHeader = () => (
  <View className="px-4 py-3 gap-1 mb-4">
    <Text className="text-2xl font-bold text-gray-900">Pedidos</Text>
    <Text className="text-gray-300">
      Confira sua lista de produtos comprados
    </Text>
  </View>
);

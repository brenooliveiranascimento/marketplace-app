import { View, Text } from "react-native";

export const ListHeader = () => (
  <View className=" py-3 gap-1 mb-4">
    <Text className="text-[20px] font-bold text-gray-900">Pedidos</Text>
    <Text className="text-gray-400">
      Confira sua lista de produtos comprados
    </Text>
  </View>
);

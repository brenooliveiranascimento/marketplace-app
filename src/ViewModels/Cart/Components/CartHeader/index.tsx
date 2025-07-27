import { Text, View } from "react-native";

export const CartHeader = () => (
  <View className="px-4 py-3 gap-1">
    <Text className="text-[20px] font-bold text-gray-800">Carrinho</Text>
    <Text className="text-gray-400">Veja seu carrinho de compras</Text>
  </View>
);

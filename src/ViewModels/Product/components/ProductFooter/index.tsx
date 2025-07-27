import { Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Product } from "@/shared/interfaces/product";
import { FC } from "react";
interface Props {
  product: Product;
  onAddToCart: () => void;
}
export const ProductFooter: FC<Props> = ({ onAddToCart, product }) => {
  return (
    <View className="fixed bottom-0 left-0 right-0 flex-row items-center p-7 border-t border-gray-200 shadow-lg bg-white h-[96px]">
      <View className="flex-1">
        <Text className="text-xl font-bold">
          <Text className="text-sm ">R$</Text> {product.value}
        </Text>
      </View>
      <TouchableOpacity
        className="flex-row items-center bg-purple-600 px-6 py-3 rounded-lg"
        onPress={onAddToCart}
      >
        <Ionicons name="cart" size={20} color="white" />
        <Text className="text-white text-base font-bold ml-2">Adicionar</Text>
      </TouchableOpacity>
    </View>
  );
};

import { Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Product } from "@/shared/interfaces/product";
import { FC } from "react";
import { AppPriceText } from "@/shared/components/AppPriceText";
import { AppButton } from "@/shared/components";
interface Props {
  product: Product;
  onAddToCart: () => void;
}
export const ProductFooter: FC<Props> = ({ onAddToCart, product }) => {
  return (
    <View className="fixed bottom-0 left-0 right-0 flex-row items-center p-7 border-t border-gray-200 shadow-lg bg-white h-[96px]">
      <View className="flex-1">
        <AppPriceText value={Number(product.value)} />
      </View>
      <AppButton
        className="flex-row bg-purple-base px-6 py-3 w-[120px] h-[40px] rounded-[10px]"
        onPress={onAddToCart}
      >
        <Ionicons name="cart" size={16} color="white" />
        <Text className="text-white text-sm font-bold ml-2">Adicionar</Text>
      </AppButton>
    </View>
  );
};

import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/styles/colors";
import { CartHeader } from "../CartHeader";
import { FC } from "react";

interface Props {
  onGoBack: () => void;
}

export const EmptyCart: FC<Props> = ({ onGoBack }) => (
  <SafeAreaView className="flex-1 m-4">
    <CartHeader />
    <View className="flex-1 items-center px-20 pt-16">
      <Ionicons name="cart-outline" size={80} color="#D1D5DB" />
      <Text className="text-xl font-bold text-gray-700 mt-4 mb-4">
        Seu carrinho está vazio
      </Text>
      <Text className="text-base text-gray-400 text-center mb-8">
        Explore o catálogo de produtos e faça sua primeira compra!
      </Text>
      <TouchableOpacity
        onPress={onGoBack}
        className="border-2 border-purple-base bg-none p-4 rounded-[10px] flex-row items-center gap-3"
      >
        <Ionicons
          size={20}
          name="storefront-outline"
          color={colors["purple-base"]}
        />
        <Text className="text-purple-base text-lg font-bold">
          Explorar Produtos
        </Text>
      </TouchableOpacity>
    </View>
  </SafeAreaView>
);

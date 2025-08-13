import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AppButton } from "../AppButton";
import { colors } from "@/styles/colors";

interface AddToCartSuccessModalProps {
  productName: string;
  onGoToCart: () => void;
  onContinueShopping: () => void;
  onClose: () => void;
}

export const AddToCartSuccessModal: React.FC<AddToCartSuccessModalProps> = ({
  productName,
  onGoToCart,
  onContinueShopping,
  onClose,
}) => {
  return (
    <View className="bg-white rounded-2xl p-6 w-full max-w-sm">
      <View className="items-center mb-4">
        <View className="w-16 h-16 bg-green-100 rounded-full items-center justify-center mb-3">
          <Ionicons name="checkmark" size={32} color={colors.success} />
        </View>
        <Text className="text-xl font-bold text-gray-900 text-center">
          Produto adicionado!
        </Text>
      </View>

      <Text className="text-gray-600 text-center mb-6">
        <Text className="font-semibold">{productName}</Text> foi adicionado ao
        seu carrinho com sucesso.
      </Text>

      <View className="gap-3">
        <AppButton
          variant="filled"
          onPress={onGoToCart}
          className="flex-row items-center justify-center"
        >
          <Ionicons
            name="cart"
            size={20}
            color="white"
            style={{ marginRight: 8 }}
          />
          Ver carrinho
        </AppButton>

        <AppButton variant="outlined" onPress={onContinueShopping}>
          Continuar comprando
        </AppButton>
      </View>

      <TouchableOpacity
        onPress={onClose}
        className="absolute top-4 right-4 w-8 h-8 items-center justify-center"
      >
        <Ionicons name="close" size={20} color={colors.gray["500"]} />
      </TouchableOpacity>
    </View>
  );
};

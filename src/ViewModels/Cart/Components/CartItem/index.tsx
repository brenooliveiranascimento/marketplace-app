import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { CartItem as CartItemType } from "@/store/cartStore";
import { colors } from "@/styles/colors";

interface CartItemProps {
  item: CartItemType;
  formatPrice: (price: string) => string;
  onIncreaseQuantity: (id: number, currentQuantity: number) => void;
  onDecreaseQuantity: (id: number, currentQuantity: number) => void;
}

export function CartItem({
  item,
  formatPrice,
  onIncreaseQuantity,
  onDecreaseQuantity,
}: CartItemProps) {
  return (
    <View className="bg-white h-[71px] w-full flex-row items-center px-2 mb-2 rounded-lg">
      <Image
        source={{ uri: item.image }}
        className="w-16 h-16 rounded-md mr-3"
        resizeMode="cover"
      />

      <View className="flex-1 mr-3">
        <Text
          className="text-base font-medium text-gray-800 mb-1"
          numberOfLines={1}
        >
          {item.name}
        </Text>
        <Text className="text-sm font-bold text-purple-base">
          {formatPrice(item.price)}
        </Text>
      </View>

      <View className="flex-row items-center">
        <TouchableOpacity
          className="w-[18px] h-[18px] border-2 border-purple-base rounded-md items-center justify-center"
          onPress={() => onDecreaseQuantity(item.id, item.quantity)}
        >
          <Ionicons name="remove" size={12} color={colors["purple-base"]} />
        </TouchableOpacity>

        <View className="mx-3 items-center">
          <Text className="text-base font-medium text-gray-700 mb-1">
            {item.quantity}
          </Text>
          <View className="w-6 h-0.5 bg-gray-300" />
        </View>

        <TouchableOpacity
          className="w-[18px] h-[18px] border-2 border-purple-base rounded-md items-center justify-center"
          onPress={() => onIncreaseQuantity(item.id, item.quantity)}
        >
          <Ionicons name="add" size={12} color={colors["purple-base"]} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

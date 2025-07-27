import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/styles/colors";
import { ProductListItem } from "@/shared/interfaces/https/get-products";

interface ProductCardProps {
  product: ProductListItem;
  onPress: (product: ProductListItem) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onPress,
}) => {
  const formatRating = (rating: number) => {
    return rating.toFixed(1);
  };

  return (
    <TouchableOpacity
      style={{ backgroundColor: colors.white }}
      className="flex-1 m-2 rounded-xl shadow-sm overflow-hidden h-[157px] p-[4px]"
      onPress={() => onPress(product)}
      activeOpacity={0.8}
    >
      <View className="relative">
        <Image
          source={{ uri: product.photo }}
          className="w-full h-[96px] rounded-[6px]"
          resizeMode="cover"
        />

        <View className="absolute top-0 right-0 flex-row items-center px-2 py-1 rounded-b-lg rounded-r-none bg-white">
          <Ionicons name="star" size={12} color={colors["blue-base"]} />
          <Text className="text-sm font-semibold ml-1">
            {formatRating(product.averageRating)}
          </Text>
        </View>
      </View>

      <View className="p-3">
        <Text className="text-sm font-semibold mb-1 " numberOfLines={2}>
          {product.name.slice(0, 17)}
          {product.name.length >= 17 && "..."}
        </Text>

        <View className="flex-row items-center justify-between">
          <Text className="text-small font-semibold">R$</Text>
          <Text className="text-xl font-bold flex-1 " numberOfLines={1}>
            {product.value}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

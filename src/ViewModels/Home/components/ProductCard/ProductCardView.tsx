import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/styles/colors";
import { useProductCardModel } from "./useProductCardModel";

interface ProductCardViewProps {
  product: ReturnType<typeof useProductCardModel>["product"];
  formattedRating: string;
  cardWidth: number;
  displayName: string;
  handlePress: () => void;
}

export const ProductCardView: React.FC<ProductCardViewProps> = ({
  product,
  formattedRating,
  cardWidth,
  displayName,
  handlePress,
}) => {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: colors.white,
        width: cardWidth,
      }}
      className="m-2 rounded-xl shadow-sm overflow-hidden h-[157px] p-[4px]"
      onPress={handlePress}
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
          <Text className="text-sm font-semibold ml-1">{formattedRating}</Text>
        </View>
      </View>

      <View className="p-3">
        <Text className="text-sm font-semibold mb-1" numberOfLines={2}>
          {displayName}
        </Text>

        <View className="flex-row items-center justify-between">
          <Text className="text-small font-semibold">R$</Text>
          <Text className="text-xl font-bold flex-1" numberOfLines={1}>
            {product.value}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

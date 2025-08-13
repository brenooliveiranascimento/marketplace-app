import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/styles/colors";
import { useProductCardModel } from "./useProductCardModel";
import { AppPriceText } from "@/shared/components/AppPriceText";
import { buildImageUrl } from "@/shared/helpers/url.helper";

interface ProductCardViewProps {
  product: ReturnType<typeof useProductCardModel>["product"];
  formattedRating: string;
  displayName: string;
  handlePress: () => void;
}

export const ProductCardView: React.FC<ProductCardViewProps> = ({
  product,
  formattedRating,
  displayName,
  handlePress,
}) => {
  return (
    <TouchableOpacity
      className="w-[48%] my-1 rounded-xl shadow-sm overflow-hidden h-[157px] p-[4px] bg-white mb-2"
      onPress={handlePress}
      activeOpacity={0.8}
    >
      <View className="relative">
        <Image
          source={{ uri: buildImageUrl(product.photo) }}
          className="w-full h-[96px] rounded-[6px]"
          resizeMode="cover"
        />

        <View className="absolute top-0 right-0 flex-row items-center px-2 py-1 rounded-b-lg rounded-r-none bg-white">
          <Ionicons name="star" size={12} color={colors["blue-base"]} />
          <Text className="text-sm font-semibold ml-1">
            {formattedRating.replace(",", ".")}
          </Text>
        </View>
      </View>

      <View className="p-3">
        <Text className="text-xs font-semibold mb-1" numberOfLines={2}>
          {displayName}
        </Text>

        <View className="flex-row items-center justify-between">
          <AppPriceText
            classNameCurrency="text-small"
            classNameValue="text-lg font-bold flex-1"
            value={Number(product.value)}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

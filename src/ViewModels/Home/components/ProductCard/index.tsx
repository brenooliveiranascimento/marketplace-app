import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Product } from "@/shared/interfaces/product";
import { styles } from "@/styles/colors";

interface ProductCardProps {
  product: Product;
  onPress: (product: Product) => void;
  onAddToCart?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onPress,
  onAddToCart,
}) => {
  const formatPrice = (value: string) => {
    const numericValue = parseFloat(value);
    return numericValue.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  const formatRating = (rating: number) => {
    return rating.toFixed(1);
  };

  return (
    <TouchableOpacity
      style={{ backgroundColor: styles.white }}
      className="flex-1 m-2 rounded-xl shadow-sm overflow-hidden"
      onPress={() => onPress(product)}
      activeOpacity={0.8}
    >
      <View className="relative">
        <Image
          source={{ uri: product.photo }}
          className="w-full h-40"
          resizeMode="cover"
        />

        <View
          style={{ backgroundColor: styles["purple-base"] }}
          className="absolute top-2 left-2 flex-row items-center px-2 py-1 rounded-lg"
        >
          <MaterialIcons name="star" size={12} color={styles.white} />
          <Text
            style={{ color: styles.white }}
            className="text-xs font-semibold ml-1"
          >
            {formatRating(product.averageRating)}
          </Text>
        </View>
      </View>

      <View className="p-3">
        <Text
          style={{ color: styles.grays["gray-500"] }}
          className="text-sm font-semibold mb-1"
          numberOfLines={2}
        >
          {product.name}
        </Text>

        <Text
          style={{ color: styles.grays["gray-200"] }}
          className="text-xs mb-2"
          numberOfLines={1}
        >
          {product.category.name}
        </Text>

        <View className="flex-row items-center justify-between">
          <Text
            style={{ color: styles["blue-base"] }}
            className="text-base font-bold flex-1"
            numberOfLines={1}
          >
            {formatPrice(product.value)}
          </Text>

          {onAddToCart && (
            <TouchableOpacity
              style={{ backgroundColor: styles["blue-light"] }}
              className="w-8 h-8 rounded-full items-center justify-center"
              onPress={() => onAddToCart(product)}
            >
              <MaterialIcons
                name="add-shopping-cart"
                size={16}
                color={styles["blue-base"]}
              />
            </TouchableOpacity>
          )}
        </View>

        <Text
          style={{ color: styles.grays["gray-200"] }}
          className="text-xs mt-1"
        >
          {product.ratingCount} avaliações
        </Text>
      </View>
    </TouchableOpacity>
  );
};

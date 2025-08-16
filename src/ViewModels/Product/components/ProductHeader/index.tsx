import { Image, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Product } from "@/shared/interfaces/product";
import { FC } from "react";
import { colors } from "@/styles/colors";
import { AppButton } from "@/shared/components/AppButton";
import { buildImageUrl } from "@/shared/helpers/url.helper";

interface Props {
  product: Product;
  onGoBack: () => void;
  onOpenReviewModal: (productId: number) => void;
}

export const ProductHeader: FC<Props> = ({
  product,
  onGoBack,
  onOpenReviewModal,
}) => {
  return (
    <>
      <View className="pb-5 items-start">
        <AppButton variant="borderless" onPress={onGoBack} className="w-auto">
          <Ionicons name="arrow-back" size={24} color="#8B5CF6" />
          <Text className="text-base text-purple-base ml-1">Voltar</Text>
        </AppButton>
      </View>
      <View className="w-full rounded-lg shadow-xl shadow-gray-500/30 bg-white">
        <Image
          source={{ uri: buildImageUrl(product.photo) }}
          className="w-full h-[197px] rounded-lg"
          resizeMode="cover"
        />
        <View className="absolute top-0 right-0 flex-row items-center bg-white/90 px-2 py-1 rounded-lg">
          <Ionicons name="star" size={16} color={colors["blue-base"]} />
          <Text className="text-sm font-semibold ml-1 text-gray-800">
            {product.averageRating?.toFixed(1) || "0.0"}
          </Text>
          <Text className="text-[10px] font-semibold ml-1 text-gray-800">
            / 5
          </Text>
        </View>
      </View>

      <View className="bg-background py-8">
        <View className="flex-row justify-between items-baseline mb-4">
          <Text className="text-xl font-bold text-gray-800 flex-1 mr-3">
            {product.name}
          </Text>
          <View className="flex-row items-baseline">
            <Text className="text-sm">R$</Text>
            <Text className="text-xl font-bold text-gray-800 ml-1">
              {product.value}
            </Text>
          </View>
        </View>

        <View className="flex-row items-center bg-blue-light p-3 rounded-lg mb-4">
          <View className="bg-blue-base w-[36px] h-[36px] rounded-[6px] items-center justify-center">
            <Ionicons name="trending-up" size={20} color={colors.white} />
          </View>
          <Text className="text-sm text-gray-600 ml-2 flex-1 ml-5">
            <Text className="font-bold">{product.views ?? 0} pessoas</Text>{" "}
            visualizaram este produto nos últimos 7 dias
          </Text>
        </View>

        <View className="mb-4">
          <Text className="text-base leading-6 text-gray-500">
            {product.description}
          </Text>
        </View>

        {(product.width || product.height) && (
          <View className="mb-4">
            {product.width && (
              <Text className="text-base text-gray-500 mb-1">
                <Text className="text-gray-800">Largura:</Text> {product.width}
              </Text>
            )}
            {product.height && (
              <Text className="text-base text-gray-500 mb-1">
                <Text className="text-gray-800">Altura:</Text> {product.height}
              </Text>
            )}
          </View>
        )}

        <View className="mb-6">
          <Text className="text-base font-bold text-gray-800 mb-2">
            Categoria
          </Text>
          <Text className="text-base text-gray-600">
            {product.category.name}
          </Text>
        </View>
      </View>

      <View className="flex-row justify-between items-center py-4 border-t border-gray-200">
        <Text className="text-lg font-bold text-gray-800">Avaliações</Text>
        <TouchableOpacity onPress={() => onOpenReviewModal(product.id)}>
          <Text className="text-purple-base text-base font-medium">
            Avaliar
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

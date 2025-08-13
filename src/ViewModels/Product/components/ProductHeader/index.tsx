import { Image, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Product } from "@/shared/interfaces/product";
import { FC } from "react";
import { colors } from "@/styles/colors";

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
      <View className="px-4 py-3 pb-5 bg-background">
        <TouchableOpacity className="flex-row items-center" onPress={onGoBack}>
          <Ionicons name="arrow-back" size={24} color="#8B5CF6" />
          <Text className="text-base text-purple-base ml-1">Voltar</Text>
        </TouchableOpacity>
      </View>
      <View className="w-full rounded-lg shadow-xl shadow-gray-500/30">
        <Image
          source={{ uri: product.photo }}
          className="w-full h-[197px] rounded-lg"
          resizeMode="contain"
        />
      </View>

      <View className="bg-background py-8">
        <View className="flex-row justify-between items-start mb-4">
          <Text className="text-xl font-bold text-gray-800 flex-1 mr-3">
            {product.name}
          </Text>
          <Text className="text-lg font-bold">
            <Text className="text-sm">R$</Text>
            {product.value}
          </Text>
        </View>

        <View className="flex-row items-center bg-blue-50 p-3 rounded-lg mb-4">
          <View className="bg-blue-base w-[36px] h-[36px] rounded-[6px] items-center justify-center">
            <Ionicons name="trending-up" size={20} color={colors.white} />
          </View>
          <Text className="text-sm text-gray-600 ml-2 flex-1 ml-5">
            <Text>{product.views ?? 0} pessoas</Text> visualizaram este produto
            nos últimos 7 dias
          </Text>
        </View>

        <View className="mb-4">
          <Text className="text-base leading-6 text-gray-600">
            {product.description}
          </Text>
        </View>

        {(product.width || product.height) && (
          <View className="mb-4">
            {product.width && (
              <Text className="text-base text-gray-600 mb-1">
                <Text className="text-gray-800">Largura:</Text> {product.width}
              </Text>
            )}
            {product.height && (
              <Text className="text-base text-gray-600 mb-1">
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

      <View className="flex-row justify-between items-center py-4 border-b border-gray-100">
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

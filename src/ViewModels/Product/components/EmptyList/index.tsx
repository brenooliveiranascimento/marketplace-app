import { FC } from "react";
import { ActivityIndicator, Text, View } from "react-native";

interface Props {
  isLoadingComments: Boolean;
}

export const renderEmpty: FC<Props> = ({ isLoadingComments }) => {
  if (isLoadingComments) {
    return (
      <View className="py-8 items-center">
        <ActivityIndicator size="small" color="#8B5CF6" />
        <Text className="mt-2 text-gray-500">Carregando avaliações...</Text>
      </View>
    );
  }

  return (
    <View className="py-8 items-center">
      <Text className="text-gray-500 text-base">
        Ainda não há avaliações para este produto
      </Text>
      <Text className="text-gray-400 text-sm mt-1">
        Seja o primeiro a avaliar!
      </Text>
    </View>
  );
};

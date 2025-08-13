import { FC } from "react";
import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";

interface Props {
  onGoBack: () => void;
}

export const ProductLoadError: FC<Props> = ({ onGoBack }) => {
  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-1 justify-center items-center px-5">
        <Text className="text-base text-red-500 text-center mb-5">
          Produto não encontrado
        </Text>
        <TouchableOpacity
          className="bg-purple-base px-5 py-2.5 rounded-lg"
          onPress={onGoBack}
        >
          <Text className="text-white text-base">Voltar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

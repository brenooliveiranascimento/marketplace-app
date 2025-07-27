import { Header } from "@/ViewModels/Home/components/Header";
import { colors } from "@/styles/colors";
import { FC } from "react";
import { ActivityIndicator, SafeAreaView, Text, View } from "react-native";

interface Props {
  onProfilePress: () => void;
}

export const Loading: FC<Props> = ({ onProfilePress }) => {
  return (
    <SafeAreaView className="flex-1 bg-background">
      <Header onProfilePress={onProfilePress} />

      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" color={colors["blue-base"]} />
        <Text className="text-base mt-4 text-gray-300">
          Carregando produtos...
        </Text>
      </View>
    </SafeAreaView>
  );
};

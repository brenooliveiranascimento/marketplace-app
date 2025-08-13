import { ActivityIndicator, SafeAreaView, Text, View } from "react-native";

export const LoadingProduct = () => {
  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#8B5CF6" />
        <Text className="mt-4 text-base text-purple-base">
          Carregando produto...
        </Text>
      </View>
    </SafeAreaView>
  );
};

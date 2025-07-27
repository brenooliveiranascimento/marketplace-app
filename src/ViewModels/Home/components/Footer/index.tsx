import { colors } from "@/styles/colors";
import { ActivityIndicator, View } from "react-native";

export const RenderFooter = () => {
  return (
    <View className="py-4">
      <ActivityIndicator size="small" color={colors["blue-base"]} />
    </View>
  );
};

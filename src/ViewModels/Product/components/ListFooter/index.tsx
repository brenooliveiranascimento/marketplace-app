import { FC } from "react";
import { ActivityIndicator, View } from "react-native";

interface Props {
  isLoadingMore: boolean;
}

export const ListFooter: FC<Props> = ({ isLoadingMore }) => {
  if (!isLoadingMore) return null;

  return (
    <View className="py-4">
      <ActivityIndicator size="small" color="#8B5CF6" />
    </View>
  );
};

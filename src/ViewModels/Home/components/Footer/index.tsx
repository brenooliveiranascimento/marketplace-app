import { colors } from "@/styles/colors";
import { ActivityIndicator, View } from "react-native";

interface Props {
  isLoadingMore?: boolean;
  hasNextPage?: boolean;
}

export const RenderFooter: React.FC<Props> = ({
  isLoadingMore = false,
  hasNextPage = false,
}) => {
  if (!isLoadingMore || !hasNextPage) {
    return null;
  }

  return (
    <View className="py-4">
      <ActivityIndicator size="small" color={colors["blue-base"]} />
    </View>
  );
};

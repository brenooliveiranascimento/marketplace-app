import { colors } from "@/styles/colors";
import { FC } from "react";
import { Text, View } from "react-native";
interface Props {
  searchText: string;
  isLoading: boolean;
}

export const EmptyList: FC<Props> = ({ isLoading, searchText }) => {
  if (isLoading) return null;

  return (
    <View className="flex-1 items-center justify-center py-20">
      <Text
        style={{ color: colors.grays["gray-300"] }}
        className="text-lg text-center"
      >
        {searchText ? "Nenhum produto encontrado" : "Nenhum produto disponível"}
      </Text>
      {searchText && (
        <Text
          style={{ color: colors.grays["gray-200"] }}
          className="text-sm text-center mt-2"
        >
          Tente buscar por outro termo
        </Text>
      )}
    </View>
  );
};

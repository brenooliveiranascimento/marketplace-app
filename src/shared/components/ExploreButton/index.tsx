import { Text, TouchableOpacity } from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/styles/colors";
import { router } from "expo-router";

export const ExploreButton = () => {
  return (
    <TouchableOpacity
      onPress={() => router.push("/")}
      className="border-2 border-purple-base bg-none p-4 rounded-[10px] flex-row items-center gap-3"
    >
      <Ionicons
        size={20}
        name="storefront-outline"
        color={colors["purple-base"]}
      />
      <Text className="text-purple-base text-lg font-bold">
        Explorar Produtos
      </Text>
    </TouchableOpacity>
  );
};

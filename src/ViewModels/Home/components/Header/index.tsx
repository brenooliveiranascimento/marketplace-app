import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useUserStore } from "@/store/userStore";
import { colors } from "@/styles/colors";
import { router } from "expo-router";
import { buildImageUrl } from "@/shared/helpers/url.helper";

interface HeaderProps {
  onProfilePress?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onProfilePress }) => {
  const { user } = useUserStore();

  return (
    <View className="flex-row items-center justify-between  py-3 shadow-sm bg-background">
      <TouchableOpacity
        onPress={() => router.push("profile")}
        className="flex-row items-center gap-6"
      >
        <View className="relative">
          {user?.avatarUrl && user.avatarUrl.trim() !== "" ? (
            <Image
              source={{ uri: buildImageUrl(user.avatarUrl) }}
              className="w-[56px] h-[56px] rounded-[12px] border-2 border-gray-200"
            />
          ) : (
            <View className="w-[56px] h-[56px] rounded-[12px] items-center justify-center bg-shape border-2 border-gray-200">
              <Ionicons name="person" size={24} color={colors.gray["300"]} />
            </View>
          )}
        </View>

        <View>
          <Text className="text-base font-bold text-gray-500" numberOfLines={1}>
            Olá, {user?.name.split(" ")[0] || "Usuário"}!
          </Text>
          <View className="flex-row items-center gap-2">
            <Text className="color-purple-base font-bold text-sm">
              Ver perfil
            </Text>
            <Ionicons size={20} />
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

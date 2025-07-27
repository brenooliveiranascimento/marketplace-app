import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useUserStore } from "@/store/userStore";
import { colors } from "@/styles/colors";
import { router } from "expo-router";

interface HeaderProps {
  onProfilePress?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onProfilePress }) => {
  const { user } = useUserStore();

  return (
    <View className="flex-row items-center justify-between px-4 py-3 shadow-sm bg-background">
      <TouchableOpacity
        onPress={() => router.push("profile")}
        className="flex-row items-center gap-6"
      >
        <View className="relative">
          {user?.avatarUrl ? (
            <Image
              source={{ uri: user.avatarUrl }}
              className="w-[52px] h-[52px] rounded-[12px]"
            />
          ) : (
            <View className="w-[52px] h-[52px] rounded-[12px] items-center justify-center bg-shape">
              <Ionicons
                name="person"
                size={24}
                color={colors.grays["gray-300"]}
              />
            </View>
          )}
        </View>

        <View>
          <Text
            className="text-base font-semibold text-gray-500"
            numberOfLines={1}
          >
            Olá, {user?.name || "Usuário"}
          </Text>
          <View>
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

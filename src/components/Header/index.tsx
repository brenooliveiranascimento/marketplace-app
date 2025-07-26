import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useUserStore } from "@/store/userStore";
import { useCartStore } from "@/store/cartStore";
import { styles } from "@/styles/colors";

interface HeaderProps {
  onCartPress: () => void;
  onProfilePress?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onCartPress,
  onProfilePress,
}) => {
  const { user } = useUserStore();
  const { getItemCount } = useCartStore();
  const cartItemCount = getItemCount();

  return (
    <View
      style={{ backgroundColor: styles.white }}
      className="flex-row items-center justify-between px-4 py-3 shadow-sm"
    >
      <TouchableOpacity
        onPress={onProfilePress}
        className="flex-row items-center"
      >
        <View className="relative">
          {user?.avatarUrl ? (
            <Image
              source={{ uri: user.avatarUrl }}
              className="w-10 h-10 rounded-full"
            />
          ) : (
            <View
              style={{ backgroundColor: styles.shape }}
              className="w-10 h-10 rounded-full items-center justify-center"
            >
              <MaterialIcons
                name="person"
                size={24}
                color={styles.grays["gray-300"]}
              />
            </View>
          )}
        </View>

        <View className="ml-3">
          <Text style={{ color: styles.grays["gray-300"] }} className="text-xs">
            Olá,
          </Text>
          <Text
            style={{ color: styles.grays["gray-500"] }}
            className="text-sm font-semibold"
            numberOfLines={1}
          >
            {user?.name || "Usuário"}
          </Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={onCartPress} className="relative p-2">
        <MaterialIcons
          name="shopping-cart"
          size={28}
          color={styles["blue-base"]}
        />

        {cartItemCount > 0 && (
          <View
            style={{ backgroundColor: styles.danger }}
            className="absolute -top-1 -right-1 w-5 h-5 rounded-full items-center justify-center"
          >
            <Text style={{ color: styles.white }} className="text-xs font-bold">
              {cartItemCount > 99 ? "99+" : cartItemCount}
            </Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};

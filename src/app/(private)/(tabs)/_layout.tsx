import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/styles/colors";
import { useCartStore } from "@/store/cartStore";

export default function TabLayout() {
  const { items } = useCartStore();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: 100,
          paddingTop: 8,
        },
      }}
      initialRouteName="index"
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Produtos",
          tabBarActiveTintColor: colors["purple-base"],
          tabBarIcon: ({ color }) => (
            <Ionicons color={color} name="storefront-outline" size={30} />
          ),
          tabBarLabelStyle: {
            fontSize: 16,
            marginTop: 10,
          },
        }}
      />

      <Tabs.Screen
        name="orders"
        options={{
          title: "Pedidos",
          tabBarActiveTintColor: colors["purple-base"],
          tabBarIcon: ({ color }) => (
            <Ionicons color={color} name="clipboard-outline" size={30} />
          ),
          tabBarLabelStyle: {
            fontSize: 16,
            marginTop: 10,
          },
        }}
      />

      <Tabs.Screen
        name="cart"
        options={{
          title: "Carrinhoss",
          tabBarActiveTintColor: colors["purple-base"],
          tabBarIcon: ({ color }) => (
            <Ionicons color={color} name="cart-outline" size={30} />
          ),
          tabBarLabelStyle: {
            fontSize: 16,
            marginTop: 10,
          },
          tabBarBadge: items.length,
          tabBarBadgeStyle: {
            display: !items.length ? "none" : "flex",
            backgroundColor: colors["blue-base"],
          },
        }}
      />
    </Tabs>
  );
}

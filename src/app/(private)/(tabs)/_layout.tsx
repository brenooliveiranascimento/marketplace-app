import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/styles/colors";
import { useCartStore } from "@/store/cartStore";

export default function TabLayout() {
  const { products } = useCartStore();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: 110,
          paddingTop: 16,
        },
      }}
      initialRouteName="index"
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "PRODUTOS",
          tabBarActiveTintColor: colors["purple-base"],
          tabBarIcon: ({ color }) => (
            <Ionicons color={color} name="storefront-outline" size={25} />
          ),
          tabBarLabelStyle: {
            fontSize: 14,
            marginTop: 4,
          },
        }}
      />

      <Tabs.Screen
        name="orders"
        options={{
          title: "PEDIDOS",
          tabBarActiveTintColor: colors["purple-base"],
          tabBarIcon: ({ color }) => (
            <Ionicons color={color} name="clipboard-outline" size={25} />
          ),
          tabBarLabelStyle: {
            fontSize: 14,
            marginTop: 4,
          },
        }}
      />

      <Tabs.Screen
        name="cart"
        options={{
          title: "CARRINHOS",
          tabBarActiveTintColor: colors["purple-base"],
          tabBarIcon: ({ color }) => (
            <Ionicons color={color} name="cart-outline" size={25} />
          ),
          tabBarLabelStyle: {
            fontSize: 14,
            marginTop: 4,
          },
          tabBarBadge: products.length,
          tabBarBadgeStyle: {
            display: !products.length ? "none" : "flex",
            backgroundColor: colors["blue-dark"],
            top: -10,
            left: 20,
          },
        }}
      />
    </Tabs>
  );
}

import React from "react";
import {
  View,
  Text,
  FlatList,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useOrdersModel } from "./useOrdersModel";
import { OrderItem } from "./components/OrderItem";
import { Order } from "@/shared/interfaces/https/get-orders";
import { colors } from "@/styles/colors";
import { EmptyList } from "./components/EmptyList";
import { ListHeader } from "./components/ListHeader";

export const OrdersView: React.FC<ReturnType<typeof useOrdersModel>> = ({
  orders,
  isLoading,
  isRefreshing,
  formatDate,
  formatQuantity,
  formatCreditCard,
  onRefresh,
}) => {
  const renderOrderItem = ({ item }: { item: Order }) => (
    <OrderItem
      order={item}
      formatDate={formatDate}
      formatQuantity={formatQuantity}
      formatCreditCard={formatCreditCard}
    />
  );

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 bg-background">
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color={colors["purple-base"]} />
          <Text className="text-gray-600 mt-4">Carregando pedidos...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-background">
      <FlatList
        data={orders}
        renderItem={renderOrderItem}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={ListHeader}
        ListEmptyComponent={EmptyList}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 120,
        }}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={onRefresh}
            colors={[colors["purple-base"]]}
            tintColor={colors["purple-base"]}
          />
        }
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

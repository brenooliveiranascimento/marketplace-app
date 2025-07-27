import React from "react";
import { View, Text, Image } from "react-native";
import { Order } from "@/shared/interfaces/https/get-orders";
import { formatCurrency } from "@/shared/helpers/currency-helper";

interface OrderItemProps {
  order: Order;
  formatDate: (date: string) => string;
  formatQuantity: (quantity: number) => string;
  formatCreditCard: (maskedNumber: string) => string;
}

export const OrderItem: React.FC<OrderItemProps> = ({
  order,
  formatDate,
  formatQuantity,
  formatCreditCard,
}) => {
  return (
    <View className="flex-row items-center bg-white p-4 mb-3 rounded-lg shadow-sm border border-gray-100 h-[89px]">
      <Image
        source={{ uri: order.productPhoto }}
        className="w-[88px] h-[88px] rounded-lg mr-4"
        resizeMode="cover"
      />

      <View className="flex-1 justify-between py-4">
        <View className="flex-row justify-between items-start mb-2">
          <Text
            className="text-base font-semibold text-gray-900 flex-1 mr-2"
            numberOfLines={1}
          >
            {order.productName}
          </Text>
          <Text className="text-sm text-gray-600">
            {formatDate(order.createdAt)}
          </Text>
        </View>

        <Text className="text-sm text-gray-600 mb-1">
          {formatQuantity(order.quantity)} • {formatCurrency(order.totalPrice)}
        </Text>

        <Text className="text-sm text-gray-600">
          {formatCreditCard(order.creditCard.maskedNumber)}
        </Text>
      </View>
    </View>
  );
};

import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { CreditCard } from "@/shared/services/credit-cards.service";
import { colors } from "@/styles/colors";

interface CreditCardListItemProps {
  creditCard: CreditCard;
  isSelected: boolean;
  onSelect: (creditCard: CreditCard) => void;
  onEdit: (creditCard: CreditCard) => void;
}

export const CreditCardListItem: React.FC<CreditCardListItemProps> = ({
  creditCard,
  isSelected,
  onSelect,
  onEdit,
}) => {
  const formatCardNumber = (number: string) => {
    const last4 = number.slice(-4);
    return `Cartão final ${last4}`;
  };

  const formatExpirationDate = (dateString: string) => {
    const date = new Date(dateString);
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = String(date.getFullYear()).slice(-2);
    return `${month}/${year}`;
  };

  return (
    <TouchableOpacity
      onPress={() => onSelect(creditCard)}
      className={`p-4 rounded-lg border-2 ${
        isSelected ? "bg-purple-50" : "border-gray-200 bg-white"
      }`}
      style={{
        borderColor: isSelected ? colors["purple-base"] : "#e5e7eb",
        backgroundColor: isSelected ? "#f3f4f6" : "#ffffff",
      }}
    >
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center flex-1">
          <View className="mr-3">
            <Ionicons
              name="card-outline"
              size={24}
              color={isSelected ? colors["purple-base"] : "#6b7280"}
            />
          </View>

          <View className="flex-1">
            <Text
              className={`text-base font-semibold ${
                isSelected ? "text-purple-700" : "text-gray-900"
              }`}
            >
              {formatCardNumber(creditCard.number)}
            </Text>
            <Text className="text-sm text-gray-500 mt-1">
              Vencimento: {formatExpirationDate(creditCard.expirationDate)}
            </Text>
          </View>
        </View>

        <TouchableOpacity
          onPress={() => onEdit(creditCard)}
          className="ml-2 p-2"
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons name="pencil-outline" size={20} color="#6b7280" />
        </TouchableOpacity>
      </View>

      {isSelected && (
        <View className="mt-2 flex-row items-center">
          <Ionicons
            name="checkmark-circle"
            size={16}
            color={colors["purple-base"]}
          />
          <Text className="text-sm text-purple-base ml-1 font-medium">
            Cartão selecionado
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

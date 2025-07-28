import { FC } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/styles/colors";
import { useBottomSheetStore } from "@/store/bottomsheetStore";
import { AddCardBottomSheet } from "../AddCardBottomSheet";
import { CreditCardListItem } from "../CreditCardListItem";
import { CreditCard } from "@/shared/services/credit-cards.service";

interface Props {
  formatTotal: () => string;
  onCheckout: () => void;
  creditCards: CreditCard[];
  isLoadingCards: boolean;
  selectedCreditCard: CreditCard | null;
  isCreatingOrder: boolean;
  onSelectCreditCard: (creditCard: CreditCard) => void;
  onEditCreditCard: (creditCard: CreditCard) => void;
}

export const CartListFooter: FC<Props> = ({
  formatTotal,
  onCheckout,
  creditCards,
  isLoadingCards,
  selectedCreditCard,
  isCreatingOrder,
  onSelectCreditCard,
  onEditCreditCard,
}) => {
  const { open } = useBottomSheetStore();

  const handleAddCard = () => {
    open(<AddCardBottomSheet />);
  };

  return (
    <View className="bg-white p-4 rounded-lg mt-6">
      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-sm font-medium text-gray-600">VALOR TOTAL</Text>
        <Text className="text-xl font-bold text-gray-900">{formatTotal()}</Text>
      </View>

      <View className="mb-4">
        <View className="flex-row justify-between items-center mb-3">
          <Text className="text-sm font-medium text-gray-600">
            CARTÕES DE CRÉDITO
          </Text>
          <TouchableOpacity
            className="flex-row items-center"
            activeOpacity={0.7}
            onPress={handleAddCard}
          >
            <Ionicons
              name="card-outline"
              color={colors["purple-base"]}
              size={18}
            />
            <Text className="text-purple-base ml-2 text-sm font-bold">
              Adicionar cartão
            </Text>
          </TouchableOpacity>
        </View>

        {isLoadingCards ? (
          <View className="py-4 items-center">
            <ActivityIndicator size="small" color={colors["purple-base"]} />
            <Text className="text-gray-500 text-sm mt-2">
              Carregando cartões...
            </Text>
          </View>
        ) : (
          <FlatList
            data={creditCards}
            renderItem={({ item }) => (
              <CreditCardListItem
                creditCard={item}
                isSelected={selectedCreditCard?.id === item.id}
                onSelect={onSelectCreditCard}
                onEdit={onEditCreditCard}
              />
            )}
            keyExtractor={(item) => item.id.toString()}
            ItemSeparatorComponent={() => <View className="h-2" />}
            scrollEnabled={false}
          />
        )}
      </View>

      <TouchableOpacity
        className={`py-4 rounded-lg items-center ${
          isCreatingOrder ? "bg-gray-400" : "bg-purple-base"
        }`}
        onPress={onCheckout}
        disabled={isCreatingOrder}
      >
        {isCreatingOrder ? (
          <View className="flex-row items-center">
            <ActivityIndicator size="small" color="white" />
            <Text className="text-white text-lg font-bold ml-2">
              Processando...
            </Text>
          </View>
        ) : (
          <Text className="text-white text-lg font-bold">Confirmar Compra</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

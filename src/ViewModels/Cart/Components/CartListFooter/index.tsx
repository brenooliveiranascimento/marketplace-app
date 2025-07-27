import { FC } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/styles/colors";

interface Props {
  formatTotal: () => string;
  onCheckout: () => void;
}
export const CartListFooter: FC<Props> = ({ formatTotal, onCheckout }) => {
  return (
    <View className="bg-white p-3 rounded-lg h-[159px] justify-between mt-6">
      <View className="flex-row justify-between items-center">
        <Text className="text-sm">VALOR TOTAL</Text>
        <Text className="text-xl font-bold">{formatTotal()}</Text>
      </View>

      <View className="flex-row justify-between items-center">
        <Text className="text-sm">PAGAMENTO</Text>
        <TouchableOpacity className="flex-row items-center" activeOpacity={0.7}>
          <Ionicons
            name="card-outline"
            color={colors["purple-base"]}
            size={20}
          />
          <Text className="text-purple-base ml-3 text-[14px] font-bold">
            Adicionar cartão
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        className="bg-purple-600 py-4 rounded-lg items-center"
        onPress={onCheckout}
      >
        <Text className="text-white text-lg font-bold">Confirmar Compra</Text>
      </TouchableOpacity>
    </View>
  );
};

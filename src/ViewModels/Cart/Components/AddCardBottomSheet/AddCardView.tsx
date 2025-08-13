import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AppButton } from "@/shared/components";
import { AppInputController } from "@/shared/components/AppInput/InputController";
import { useAddCardModel } from "./useAddCardModel";
import { CreditCardVisual } from "./Card";
import { colors } from "@/styles/colors";
import { useBottomSheetStore } from "@/store/bottomsheetStore";

interface AddCardViewProps {
  control: ReturnType<typeof useAddCardModel>["control"];
  errors: ReturnType<typeof useAddCardModel>["errors"];
  isLoading: boolean;
  cardType: string;
  cardData: ReturnType<typeof useAddCardModel>["cardData"];
  handleCancel: () => void;
  handleSave: () => void;
  maxCVVLength: number;
}

const CARD_NUMBER_MASK = "#### #### #### ####";

export const AddCardView: React.FC<AddCardViewProps> = ({
  control,
  errors,
  isLoading,
  cardType,
  cardData,
  handleCancel,
  handleSave,
  maxCVVLength,
}) => {
  const [focusedField, setFocusedField] = useState<string>("");
  const { close } = useBottomSheetStore();

  const isFlipped = focusedField === "CVV";

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="p-8">
        <View className="flex-row items-center justify-between mb-6">
          <Text className="text-2xl font-bold text-center text-gray-900">
            Adicionar Cartão
          </Text>
          <TouchableOpacity
            onPress={close}
            className="w-8 h-8 items-center justify-center"
          >
            <Ionicons name="close" size={24} color={colors.gray[400]} />
          </TouchableOpacity>
        </View>

        <CreditCardVisual
          cardNumber={cardData.number}
          cardholderName={cardData.name}
          expiryDate={cardData.expiry}
          cvv={cardData.cvv}
          cardType={cardType}
          isFlipped={isFlipped}
          focused={focusedField.toLowerCase() as any}
        />

        <View className="mt-6 space-y-4">
          <AppInputController
            control={control}
            name="titularName"
            leftIcon="person-outline"
            label="NOME DO TITULAR"
            placeholder="Nome completo"
            autoCapitalize="words"
            onFocus={() => setFocusedField("name")}
            onBlur={() => setFocusedField("")}
          />

          <AppInputController
            control={control}
            name="number"
            leftIcon="card-outline"
            label="NÚMERO DO CARTÃO"
            placeholder={CARD_NUMBER_MASK}
            keyboardType="numeric"
            maxLength={19}
            mask={(value: string) => {
              const cleaned = value.replace(/\D/g, "");
              return cleaned.replace(/(\d{4})(?=\d)/g, "$1 ").trim();
            }}
            onFocus={() => setFocusedField("number")}
            onBlur={() => setFocusedField("")}
          />

          <View className="flex-row space-x-4">
            <View className="flex-1">
              <AppInputController
                control={control}
                name="expirationDate"
                leftIcon="calendar-outline"
                label="VENCIMENTO"
                placeholder="MM/AA"
                keyboardType="numeric"
                maxLength={5}
                mask={(value: string) => {
                  const cleaned = value.replace(/\D/g, "");
                  if (cleaned.length >= 2) {
                    return `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}`;
                  }
                  return cleaned;
                }}
                onFocus={() => setFocusedField("expiry")}
                onBlur={() => setFocusedField("")}
              />
            </View>

            <View className="flex-1">
              <AppInputController
                control={control}
                name="CVV"
                leftIcon="lock-closed-outline"
                label="CVV"
                placeholder="000"
                keyboardType="numeric"
                maxLength={maxCVVLength}
                secureTextEntry={true}
                mask={(value: string) => {
                  // Remove todos os caracteres não numéricos e limita a 3 dígitos
                  return value.replace(/\D/g, "").slice(0, 3);
                }}
                onFocus={() => setFocusedField("CVV")}
                onBlur={() => setFocusedField("")}
              />
            </View>
          </View>

          {errors.root && (
            <View className="bg-red-50 border border-red-200 rounded-lg p-4 mt-4">
              <View className="flex-row items-center">
                <View className="w-2 h-2 bg-red-500 rounded-full mr-2" />
                <Text className="text-red-800 text-sm flex-1">
                  {errors.root.message}
                </Text>
              </View>
            </View>
          )}
        </View>

        <View className="flex-row space-x-3 mt-8 gap-4 pb-5">
          <View className="flex-1">
            <AppButton
              onPress={handleCancel}
              variant="outlined"
              disabled={isLoading}
            >
              Cancelar
            </AppButton>
          </View>

          <View className="flex-1">
            <AppButton onPress={handleSave} isLoading={isLoading}>
              <Text className="text-white font-semibold">
                {isLoading ? "Salvando..." : "Salvar"}
              </Text>
            </AppButton>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

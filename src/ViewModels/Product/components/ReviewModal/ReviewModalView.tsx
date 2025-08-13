import React from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AppInput } from "@/shared/components/AppInput";
import { AppButton } from "@/shared/components/AppButton";
import { colors } from "@/styles/colors";
import { useReviewModel } from "./useReviewModel";
import { Stars } from "./Stars";

export const ReviewModalView: React.FC<ReturnType<typeof useReviewModel>> = ({
  rating,
  comment,
  isValid,
  isLoading,
  isEditing,
  isLoadingUserComment,
  handleRatingChange,
  handleCommentChange,
  handleSubmitReview,
  handleClose,
}) => {
  return (
    <View className="bg-background rounded-t-2xl">
      <View className="flex-row items-center justify-between p-6">
        <Text className="text-lg font-bold text-gray-900">
          {isEditing ? "Editar avaliação" : "Avaliar produto"}
        </Text>

        <TouchableOpacity
          onPress={handleClose}
          className="w-8 h-8 items-center justify-center"
        >
          <Ionicons name="close" size={24} color={colors.gray[400]} />
        </TouchableOpacity>
      </View>

      {isLoadingUserComment ? (
        <View className="p-6 items-center justify-center min-h-[300px]">
          <ActivityIndicator size="large" color={colors["purple-base"]} />
          <Text className="text-gray-600 mt-4 text-center">
            Verificando avaliação existente...
          </Text>
        </View>
      ) : (
        <View className="p-6">
          <Text className="font-semibold text-base text-gray-300 mb-3">
            NOTA
          </Text>
          <View className="flex-row items-center mb-6">
            <Stars rating={rating} handleRatingChange={handleRatingChange} />
          </View>

          <AppInput
            label="COMENTÁRIO"
            placeholder={
              isEditing ? "Edite sua avaliação" : "Descreva sua avaliação"
            }
            value={comment || ""}
            onChangeText={handleCommentChange}
            multiline
            numberOfLines={8}
            textAlignVertical="top"
            containerClassName="mb-8"
            className="h-[150px]"
          />

          <View className="flex-row gap-3 mb-6">
            <View className="flex-1">
              <AppButton
                variant="outlined"
                onPress={handleClose}
                className="flex-1"
              >
                Cancelar
              </AppButton>
            </View>
            <View className="flex-1">
              <AppButton
                variant="filled"
                onPress={handleSubmitReview}
                isDisabled={!isValid}
                isLoading={isLoading}
                className="flex-1"
              >
                {isEditing ? "Atualizar" : "Enviar"}
              </AppButton>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

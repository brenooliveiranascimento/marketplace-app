import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/styles/colors";
import { AppInputController } from "@/shared/components/AppInput/InputController";
import { AppButton } from "@/shared/components/AppButton";
import { useProfileModel } from "./useProfileModel";

export const ProfileView: React.FC<ReturnType<typeof useProfileModel>> = ({
  control,
  errors,
  isLoading,
  avatarUri,
  onSubmit,
  onSelectAvatar,
  onLogout,
  onGoBack,
}) => {
  console.log(avatarUri);
  return (
    <SafeAreaView style={{ backgroundColor: colors.white }} className="flex-1">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <View className="flex-row justify-between items-center px-4 py-3  border-gray-200">
          <TouchableOpacity
            className="flex-row items-center"
            onPress={onGoBack}
          >
            <Ionicons
              name="arrow-back"
              size={24}
              color={colors["purple-base"]}
            />
            <Text className="text-base text-purple-600 ml-1">Voltar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="flex-row items-center"
            onPress={onLogout}
          >
            <Ionicons name="log-out-outline" size={20} color={colors.danger} />
            <Text className="text-base text-red-500 ml-1">Sair</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1 }}
          className="flex-1"
        >
          <View className="flex-1 px-6 py-8">
            <View className="items-center mb-8">
              <TouchableOpacity
                onPress={onSelectAvatar}
                disabled={isLoading}
                className="items-center"
              >
                <View className="w-[120px] h-[120px] rounded-[12px] items-center justify-center bg-shape">
                  {avatarUri ? (
                    <Image
                      source={{ uri: avatarUri }}
                      className="w-full h-full rounded-[12px]"
                      resizeMode="cover"
                    />
                  ) : (
                    <Ionicons
                      name="person-outline"
                      size={32}
                      color={colors.grays["gray-300"]}
                    />
                  )}
                </View>
              </TouchableOpacity>
            </View>

            <View className="w-full mb-6">
              <Text className="text-gray-500 font-bold ml-3 text-base mt-6">
                Dados pessoais
              </Text>

              <AppInputController
                control={control}
                name="name"
                label="NOME"
                placeholder="Seu nome completo"
                leftIcon="person-outline"
                autoCapitalize="words"
                errors={errors}
              />

              <AppInputController
                control={control}
                name="phone"
                label="TELEFONE"
                placeholder="(00) 00000-0000"
                leftIcon="phone-portrait"
                keyboardType="numeric"
                maxLength={11}
                errors={errors}
              />

              <AppInputController
                control={control}
                name="email"
                label="E-MAIL"
                placeholder="seu@email.com"
                leftIcon="mail-outline"
                keyboardType="email-address"
                autoCapitalize="none"
                errors={errors}
              />

              <Text className="text-gray-500 font-bold ml-3 text-base mt-6">
                Alterar Senha (opcional)
              </Text>

              {/* <AppInputController
                control={control}
                name="password"
                label="SENHA ATUAL"
                placeholder="Sua senha"
                leftIcon="lock-closed-outline"
                secureTextEntry
                errors={errors}
              />

              <AppInputController
                control={control}
                name="newPassword"
                label="NOVA SENHA"
                placeholder="Mínimo 6 caracteres"
                leftIcon="lock-closed-outline"
                secureTextEntry
                errors={errors}
              /> */}

              <AppButton
                variant="filled"
                onPress={onSubmit}
                isLoading={isLoading}
                className="mt-6 mb-10"
              >
                {isLoading ? "Atualizando..." : "Atualizar cadastro"}
              </AppButton>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

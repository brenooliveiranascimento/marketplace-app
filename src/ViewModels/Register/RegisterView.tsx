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
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRegisterModel } from "./useRegisterModel";
import { colors } from "@/styles/colors";
import { AppInputController } from "@/components/AppInput/InputController";
import { AppButton } from "@/components/AppButton";

export const RegisterView: React.FC<ReturnType<typeof useRegisterModel>> = ({
  control,
  errors,
  isLoading,
  avatarUri,
  onSubmit,
  onSelectAvatar,
}) => {
  return (
    <SafeAreaView style={{ backgroundColor: colors.white }} className="flex-1">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1 }}
          className="flex-1"
        >
          <View className="flex-1 px-6 py-8">
            <TouchableOpacity
              onPress={() => router.back()}
              disabled={isLoading}
              className="mb-6"
            >
              <Ionicons
                name="arrow-back"
                size={24}
                color={colors.grays["gray-500"]}
              />
            </TouchableOpacity>

            <View className="items-center mb-8">
              <Image
                source={require("@/assets/images/Logo.png")}
                resizeMode="contain"
                className="w-[80px] h-[60px]"
              />
            </View>

            <View className="mb-8">
              <Text
                style={{ color: colors.grays["gray-500"] }}
                className="text-3xl font-bold text-center mb-3"
              >
                Criar sua conta
              </Text>
              <Text
                style={{ color: colors.grays["gray-200"] }}
                className="text-base text-center"
              >
                Preencha os dados abaixo para começar
              </Text>
            </View>

            <View className="items-center mb-8">
              <TouchableOpacity
                onPress={onSelectAvatar}
                disabled={isLoading}
                className="items-center"
              >
                <View
                  style={{
                    backgroundColor: colors.grays["gray-100"],
                    borderColor: colors["purple-base"],
                  }}
                  className="w-24 h-24 rounded-full border-2 border-dashed items-center justify-center mb-3"
                >
                  {avatarUri ? (
                    <Image
                      source={{ uri: avatarUri }}
                      className="w-[92px] h-[92px] rounded-full"
                    />
                  ) : (
                    <Ionicons
                      name="camera-outline"
                      size={32}
                      color={colors.grays["gray-300"]}
                    />
                  )}
                </View>
                <Text
                  style={{ color: colors["purple-base"] }}
                  className="text-sm font-medium"
                >
                  {avatarUri ? "Alterar foto" : "Adicionar foto"}
                </Text>
              </TouchableOpacity>
            </View>

            <View className="w-full mb-6">
              <AppInputController
                control={control}
                name="name"
                label="NOME COMPLETO"
                placeholder="Seu nome"
                leftIcon="person-outline"
                autoCapitalize="words"
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

              <AppInputController
                control={control}
                name="phone"
                label="TELEFONE"
                placeholder="(00) 00000-0000"
                leftIcon="phone"
                keyboardType="numeric"
                maxLength={11}
                errors={errors}
              />

              <AppInputController
                control={control}
                name="password"
                label="SENHA"
                placeholder="Mínimo 6 caracteres"
                leftIcon="lock-outline"
                secureTextEntry
                errors={errors}
              />

              <AppInputController
                control={control}
                name="confirmPassword"
                label="CONFIRMAR SENHA"
                placeholder="Digite a senha novamente"
                leftIcon="lock-outline"
                secureTextEntry
                errors={errors}
              />
            </View>

            <View className="w-full">
              <AppButton
                variant="filled"
                onPress={onSubmit}
                isLoading={isLoading}
                className="mb-4"
              >
                {isLoading ? "Criando conta..." : "Criar conta"}
              </AppButton>

              <View className="flex-row items-center justify-center">
                <Text
                  style={{ color: colors.grays["gray-300"] }}
                  className="text-base"
                >
                  Já tem conta?{" "}
                </Text>
                <TouchableOpacity
                  onPress={() => router.back()}
                  disabled={isLoading}
                >
                  <Text
                    style={{ color: colors["purple-base"] }}
                    className="text-base font-semibold"
                  >
                    Fazer login
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

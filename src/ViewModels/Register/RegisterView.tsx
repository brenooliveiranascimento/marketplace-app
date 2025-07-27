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
import { AppInputController } from "@/shared/components/AppInput/InputController";
import { AppButton } from "@/shared/components/AppButton";

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
            <View className="items-center mb-8">
              <Image
                source={require("@/assets/images/Logo.png")}
                resizeMode="contain"
                className="w-[80px] h-[60px]"
              />
            </View>

            <View className="mb-8">
              <Text className="text-3xl font-bold text-center mb-3 text-gray-500">
                Criar sua conta
              </Text>
              <Text className="text-base text-center text-gray-200">
                Informe seus dados pessoais e de acesso
              </Text>
            </View>

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
                      name="cloud-upload-outline"
                      size={32}
                      color={colors.grays["gray-300"]}
                    />
                  )}
                </View>
              </TouchableOpacity>
            </View>

            <View className="w-full mb-6">
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

              <Text className="text-gray-500 font-bold ml-3 text-base mt-6">
                Acesso
              </Text>

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
                name="password"
                label="SENHA"
                placeholder="Mínimo 6 caracteres"
                leftIcon="lock-closed-outline"
                secureTextEntry
                errors={errors}
              />

              <AppInputController
                control={control}
                name="confirmPassword"
                label="CONFIRMAR SENHA"
                placeholder="Digite a senha novamente"
                leftIcon="lock-closed-outline"
                secureTextEntry
                errors={errors}
              />
              <AppButton
                variant="filled"
                onPress={onSubmit}
                isLoading={isLoading}
                className="mt-6 mb-10"
              >
                {isLoading ? "Criando conta..." : "Criar conta"}
              </AppButton>
            </View>

            <View className="w-full flex-2 pb-16">
              <Text className="text-base mb-6 text-purple text-gray-300">
                Ainda não tem uma conta?
              </Text>

              <AppButton
                rightIcon="arrow-forward"
                variant="outlined"
                isLoading={isLoading}
                className="h-[50px]"
                onPress={() => router.push("login")}
              >
                Fazer login
              </AppButton>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

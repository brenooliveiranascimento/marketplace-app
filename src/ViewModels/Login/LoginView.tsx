import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Image,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { router } from "expo-router";
import { Control, Controller, FieldErrors } from "react-hook-form";
import { colors } from "@/styles/colors";
import { LoginFormData } from "@/shared/validations/login.schema";
import { AppInputController } from "@/shared/components/AppInput/InputController";
import { AppButton } from "@/shared/components/AppButton";

interface LoginViewProps {
  control: Control<LoginFormData>;
  errors: FieldErrors<LoginFormData>;
  isLoading: boolean;
  onSubmit: () => void;
}

export const LoginView: React.FC<LoginViewProps> = ({
  control,
  errors,
  isLoading,
  onSubmit,
}) => {
  return (
    <SafeAreaView style={{ backgroundColor: colors.white }} className="flex-1">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <View className="flex-1 px-6">
          <View className="flex-1 w-full items-center justify-center">
            <Image
              source={require("@/assets/images/Logo.png")}
              resizeMode="contain"
              className="w-[80px] h-[60px] mb-12"
            />

            <View className="mb-8">
              <Text className="text-3xl font-bold text-center mb-3 text-gray-500">
                Acesse sua conta
              </Text>
              <Text
                style={{ color: colors.gray["200"] }}
                className="text-base text-center"
              >
                Informe seu e-mail e senha para entrar
              </Text>
            </View>

            <View className="w-full mb-8">
              <AppInputController
                control={control}
                name="email"
                leftIcon="person-outline"
                label="E-MAIL"
                placeholder="mail@exemple.com.br"
                placeholderClassName="text"
              />

              <AppInputController
                control={control}
                name="password"
                leftIcon="lock-closed-outline"
                label="SENHA"
                placeholder="Sua senha"
              />

              <View className="mt-6">
                <AppButton
                  className="mt-6"
                  variant="filled"
                  onPress={onSubmit}
                  isLoading={isLoading}
                >
                  {isLoading ? "Acessando..." : "Acessar"}
                </AppButton>
              </View>
            </View>
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
              onPress={() => router.push("register")}
            >
              Criar conta
            </AppButton>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

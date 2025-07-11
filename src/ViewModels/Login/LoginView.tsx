import React from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { router } from "expo-router";
import { Control, Controller, FieldErrors } from "react-hook-form";
import { styles } from "@/styles/colors";
import { LoginFormData } from "@/shared/validations/login.schema";

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
    <View
      style={{ backgroundColor: styles.background }}
      className="flex-1 px-6 justify-center"
    >
      <View
        style={{ backgroundColor: styles.white }}
        className="rounded-2xl p-6 shadow-lg"
      >
        <Text
          style={{ color: styles.grays["gray-500"] }}
          className="text-2xl font-bold text-center mb-6"
        >
          Entrar
        </Text>

        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, onBlur, value } }) => (
            <View className="mb-4">
              <TextInput
                style={{
                  borderColor: errors.email ? styles.danger : styles.shape,
                  backgroundColor: styles.shape,
                  color: styles.grays["gray-500"],
                }}
                className="border rounded-lg px-4 py-3"
                placeholder="Email"
                placeholderTextColor={styles.grays["gray-200"]}
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                keyboardType="email-address"
                autoCapitalize="none"
                editable={!isLoading}
              />
              {errors.email && (
                <Text
                  style={{ color: styles.danger }}
                  className="text-sm mt-1 ml-2"
                >
                  {errors.email.message}
                </Text>
              )}
            </View>
          )}
        />

        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, onBlur, value } }) => (
            <View className="mb-6">
              <TextInput
                style={{
                  borderColor: errors.password ? styles.danger : styles.shape,
                  backgroundColor: styles.shape,
                  color: styles.grays["gray-500"],
                }}
                className="border rounded-lg px-4 py-3"
                placeholder="Senha"
                placeholderTextColor={styles.grays["gray-200"]}
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                secureTextEntry
                editable={!isLoading}
              />
              {errors.password && (
                <Text
                  style={{ color: styles.danger }}
                  className="text-sm mt-1 ml-2"
                >
                  {errors.password.message}
                </Text>
              )}
            </View>
          )}
        />

        <TouchableOpacity
          style={{
            backgroundColor: isLoading
              ? styles.grays["gray-200"]
              : styles["blue-base"],
          }}
          className="rounded-lg py-4 mb-4"
          onPress={onSubmit}
          disabled={isLoading}
        >
          <Text
            style={{ color: styles.white }}
            className="text-center font-semibold"
          >
            {isLoading ? "Entrando..." : "Entrar"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="py-2"
          onPress={() => router.push("/register")}
          disabled={isLoading}
        >
          <Text style={{ color: styles["blue-base"] }} className="text-center">
            Não tem conta? Cadastre-se
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

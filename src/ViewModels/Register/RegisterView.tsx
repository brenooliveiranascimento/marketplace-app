import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { router } from "expo-router";
import { Controller } from "react-hook-form";
import { MaterialIcons } from "@expo/vector-icons";
import { useRegisterModel } from "./useRegisterModel";
import { styles } from "@/styles/colors";

export const RegisterView: React.FC<ReturnType<typeof useRegisterModel>> = ({
  control,
  errors,
  isLoading,
  avatarUri,
  onSubmit,
  onSelectAvatar,
}) => {
  return (
    <ScrollView
      style={{ backgroundColor: styles.background }}
      className="flex-1"
    >
      <View className="px-6 py-12">
        <View
          style={{ backgroundColor: styles.white }}
          className="rounded-2xl p-6 shadow-lg"
        >
          <Text
            style={{ color: styles.grays["gray-500"] }}
            className="text-2xl font-bold text-center mb-6"
          >
            Criar Conta
          </Text>

          <View className="items-center mb-6">
            <TouchableOpacity
              onPress={onSelectAvatar}
              disabled={isLoading}
              className="items-center"
            >
              <View
                style={{
                  backgroundColor: styles.shape,
                  borderColor: styles["blue-base"],
                }}
                className="w-24 h-24 rounded-full border-2 border-dashed items-center justify-center mb-2"
              >
                {avatarUri ? (
                  <Image
                    source={{ uri: avatarUri }}
                    className="w-20 h-20 rounded-full"
                  />
                ) : (
                  <MaterialIcons
                    name="add-a-photo"
                    size={32}
                    color={styles.grays["gray-200"]}
                  />
                )}
              </View>
              <Text style={{ color: styles["blue-base"] }} className="text-sm">
                {avatarUri ? "Alterar foto" : "Adicionar foto"}
              </Text>
            </TouchableOpacity>
          </View>

          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, onBlur, value } }) => (
              <View className="mb-4">
                <TextInput
                  style={{
                    borderColor: errors.name ? styles.danger : styles.shape,
                    backgroundColor: styles.shape,
                    color: styles.grays["gray-500"],
                  }}
                  className="border rounded-lg px-4 py-3"
                  placeholder="Nome completo"
                  placeholderTextColor={styles.grays["gray-200"]}
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  autoCapitalize="words"
                  editable={!isLoading}
                />
                {errors.name && (
                  <Text
                    style={{ color: styles.danger }}
                    className="text-sm mt-1 ml-2"
                  >
                    {errors.name.message}
                  </Text>
                )}
              </View>
            )}
          />

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
            name="phone"
            render={({ field: { onChange, onBlur, value } }) => (
              <View className="mb-4">
                <TextInput
                  style={{
                    borderColor: errors.phone ? styles.danger : styles.shape,
                    backgroundColor: styles.shape,
                    color: styles.grays["gray-500"],
                  }}
                  className="border rounded-lg px-4 py-3"
                  placeholder="Telefone (11 dígitos)"
                  placeholderTextColor={styles.grays["gray-200"]}
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  keyboardType="numeric"
                  maxLength={11}
                  editable={!isLoading}
                />
                {errors.phone && (
                  <Text
                    style={{ color: styles.danger }}
                    className="text-sm mt-1 ml-2"
                  >
                    {errors.phone.message}
                  </Text>
                )}
              </View>
            )}
          />

          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, onBlur, value } }) => (
              <View className="mb-4">
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

          <Controller
            control={control}
            name="confirmPassword"
            render={({ field: { onChange, onBlur, value } }) => (
              <View className="mb-6">
                <TextInput
                  style={{
                    borderColor: errors.confirmPassword
                      ? styles.danger
                      : styles.shape,
                    backgroundColor: styles.shape,
                    color: styles.grays["gray-500"],
                  }}
                  className="border rounded-lg px-4 py-3"
                  placeholder="Confirmar senha"
                  placeholderTextColor={styles.grays["gray-200"]}
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  secureTextEntry
                  editable={!isLoading}
                />
                {errors.confirmPassword && (
                  <Text
                    style={{ color: styles.danger }}
                    className="text-sm mt-1 ml-2"
                  >
                    {errors.confirmPassword.message}
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
              {isLoading ? "Criando conta..." : "Criar conta"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="py-2"
            onPress={() => router.back()}
            disabled={isLoading}
          >
            <Text
              style={{ color: styles["blue-base"] }}
              className="text-center"
            >
              Já tem conta? Entrar
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

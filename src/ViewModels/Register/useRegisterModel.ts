import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { Alert } from "react-native";
import { useUserStore } from "@/store/userStore";
import {
  RegisterFormData,
  registerSchema,
} from "@/shared/validations/register.schema";
import { authService } from "@/shared/services/auth.service";
import * as ImagePicker from "expo-image-picker";

export interface RegisterModel {
  control: any;
  errors: any;
  isLoading: boolean;
  avatarUri: string | null;
  onSubmit: () => void;
  onSelectAvatar: () => void;
}

export const useRegisterModel = (): RegisterModel => {
  const [avatarUri, setAvatarUri] = useState<string | null>(null);
  const { setUser } = useUserStore();

  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<RegisterFormData>({
    resolver: yupResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
  });

  const uploadAvatarMutation = useMutation({
    mutationFn: authService.uploadAvatar,
    onError: (error: any) => {
      Alert.alert(
        "Erro no Upload",
        error.message || "Erro ao fazer upload da imagem"
      );
    },
  });

  const registerMutation = useMutation({
    mutationFn: authService.register,
    onSuccess: (response) => {
      setUser(response.user, response.token);
    },
    onError: (error: any) => {
      Alert.alert(
        "Erro no Cadastro",
        error.message || "Ocorreu um erro ao criar a conta"
      );
    },
  });

  const selectAvatar = async () => {
    try {
      // Solicitar permissão para acessar a galeria
      const permissionResult =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (permissionResult.granted === false) {
        Alert.alert(
          "Permissão negada",
          "É necessário permitir acesso à galeria para selecionar uma foto"
        );
        return;
      }

      // Abrir seletor de imagem
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        setAvatarUri(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert("Erro", "Erro ao selecionar imagem");
    }
  };

  const onSubmit = handleSubmit(async (data: RegisterFormData) => {
    try {
      let avatarUrl: string | undefined;

      if (avatarUri) {
        const uploadResult = await uploadAvatarMutation.mutateAsync(avatarUri);
        avatarUrl = uploadResult.avatarUrl;
      }

      const { confirmPassword, ...registerData } = data;

      await registerMutation.mutateAsync({
        ...registerData,
        avatarUrl,
      });
    } catch (error) {}
  });

  return {
    control,
    errors,
    isLoading: uploadAvatarMutation.isPending || registerMutation.isPending,
    avatarUri,
    onSubmit,
    onSelectAvatar: selectAvatar,
  };
};

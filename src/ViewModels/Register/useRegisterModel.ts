import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { Alert, Platform } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useUserStore } from "@/store/userStore";
import {
  RegisterFormData,
  registerSchema,
} from "@/shared/validations/register.schema";
import { authService } from "@/shared/services/auth.service";

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
    onSuccess: (response) => {
      console.log("Upload realizado com sucesso:", response);
    },
    onError: (error: any) => {
      console.error(
        "Erro no upload do avatar:",
        JSON.stringify(error, null, 2)
      );
      Alert.alert(
        "Erro no Upload",
        error.message || "Erro ao fazer upload da imagem"
      );
    },
  });

  const registerMutation = useMutation({
    mutationFn: authService.register,
    onSuccess: async (response) => {
      console.log("Usuário registrado com sucesso:", response.user);

      setUser(response.user, response.token);

      if (avatarUri) {
        console.log("Fazendo upload do avatar após registro...");
        try {
          const uploadResult = await uploadAvatarMutation.mutateAsync(
            avatarUri
          );
          console.log("Avatar uploaded:", uploadResult);

          const updatedUser = {
            ...response.user,
            avatarUrl: uploadResult.avatarUrl,
          };
          setUser(updatedUser, response.token);
        } catch (uploadError) {
          Alert.alert(
            "Aviso",
            "Conta criada com sucesso, mas houve um problema ao fazer upload da foto de perfil. Você pode tentar novamente mais tarde."
          );
        }
      }
    },
    onError: (error: any) => {
      console.error("Erro no registro:", JSON.stringify(error));
      Alert.alert(
        "Erro no Cadastro",
        error.message || "Ocorreu um erro ao criar a conta"
      );
    },
  });

  const requestPermissions = async () => {
    try {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (status !== "granted") {
          Alert.alert(
            "Permissão Negada",
            "Precisamos de permissão para acessar sua galeria de fotos para que você possa selecionar uma foto de perfil.",
            [
              { text: "Cancelar", style: "cancel" },
              {
                text: "Configurações",
                onPress: () => {
                  if (Platform.OS === "ios") {
                    Alert.alert(
                      "Como permitir acesso",
                      "Vá em Configurações > Privacidade e Segurança > Fotos e permita o acesso para este app."
                    );
                  }
                },
              },
            ]
          );
          return false;
        }
      }
      return true;
    } catch (error) {
      console.error("Erro ao solicitar permissões:", error);
      Alert.alert("Erro", "Erro ao solicitar permissões");
      return false;
    }
  };

  const selectAvatar = async () => {
    try {
      const hasPermission = await requestPermissions();
      if (!hasPermission) {
        return;
      }

      Alert.alert("Selecionar Foto", "Escolha uma opção:", [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Galeria",
          onPress: () => openImagePicker(),
        },
        {
          text: "Câmera",
          onPress: () => openCamera(),
        },
      ]);
    } catch (error) {
      console.error("Erro ao selecionar avatar:", error);
      Alert.alert("Erro", "Erro ao selecionar imagem");
    }
  };

  const openImagePicker = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
        exif: false,
      });

      if (!result.canceled && result.assets[0]) {
        setAvatarUri(result.assets[0].uri);
        console.log("Avatar selecionado:", result.assets[0].uri);
      }
    } catch (error) {
      console.error("Erro ao abrir galeria:", error);
      Alert.alert("Erro", "Erro ao abrir galeria de fotos");
    }
  };

  const openCamera = async () => {
    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();

      if (status !== "granted") {
        Alert.alert(
          "Permissão Negada",
          "Precisamos de permissão para acessar sua câmera."
        );
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
        exif: false,
      });

      if (!result.canceled && result.assets[0]) {
        setAvatarUri(result.assets[0].uri);
        console.log("Foto tirada:", result.assets[0].uri);
      }
    } catch (error) {
      console.error("Erro ao abrir câmera:", error);
      Alert.alert("Erro", "Erro ao abrir câmera");
    }
  };

  const onSubmit = handleSubmit(async (data: RegisterFormData) => {
    try {
      console.log("Iniciando processo de registro...");

      const { confirmPassword, ...registerData } = data;

      console.log("Registrando usuário...");
      await registerMutation.mutateAsync(registerData);
    } catch (error) {
      console.error("Erro no processo de registro:", JSON.stringify(error));
    }
  });

  return {
    control,
    errors,
    isLoading: registerMutation.isPending || uploadAvatarMutation.isPending,
    avatarUri,
    onSubmit,
    onSelectAvatar: selectAvatar,
  };
};

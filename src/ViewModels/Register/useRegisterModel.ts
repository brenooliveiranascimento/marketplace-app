import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { Alert } from "react-native";
import { Toast } from "toastify-react-native";
import { useUserStore } from "@/store/userStore";
import {
  RegisterFormData,
  registerSchema,
} from "@/shared/validations/register.schema";
import { authService } from "@/shared/services/auth.service";
import { useCamera } from "@/shared/hooks/useCamera";
import { useGallery } from "@/shared/hooks/useGallery";

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

  const camera = useCamera({
    aspect: [1, 1],
    quality: 0.8,
    allowsEditing: true,
    exif: false,
  });

  const gallery = useGallery({
    aspect: [1, 1],
    quality: 0.8,
    allowsEditing: true,
    exif: false,
  });

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
    onError: (error) => {
      Toast.error(error?.message || "Erro ao fazer upload da imagem", "top");
    },
  });

  const registerMutation = useMutation({
    mutationFn: authService.register,
    onSuccess: async (response) => {
      setUser(response.user, response.token);
      Toast.success("Conta criada com sucesso!", "top");

      if (avatarUri) {
        const { url } = await uploadAvatarMutation.mutateAsync(avatarUri);
        const updatedUser = {
          ...response.user,
          avatarUrl: url,
        };
        setUser(updatedUser, response.token);
      }
    },
    onError: (error: any) => {
      Toast.error(
        error?.message || "Ocorreu um erro ao criar sua conta",
        "top"
      );
    },
  });

  const handleSelectAvatar = () => {
    Alert.alert("Selecionar Foto", "Escolha uma opção:", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Galeria",
        onPress: async () => {
          const uri = await gallery.openGallery();
          if (uri) {
            setAvatarUri(uri);
          }
        },
      },
      {
        text: "Câmera",
        onPress: async () => {
          const uri = await camera.openCamera();
          if (uri) {
            setAvatarUri(uri);
          }
        },
      },
    ]);
  };

  const onSubmit = handleSubmit(async (data: RegisterFormData) => {
    const { confirmPassword, ...registerData } = data;
    await registerMutation.mutateAsync(registerData);
  });

  const isLoading =
    registerMutation.isPending ||
    uploadAvatarMutation.isPending ||
    camera.isLoading ||
    gallery.isLoading;

  return {
    control,
    errors,
    isLoading,
    avatarUri,
    onSubmit,
    onSelectAvatar: handleSelectAvatar,
  };
};

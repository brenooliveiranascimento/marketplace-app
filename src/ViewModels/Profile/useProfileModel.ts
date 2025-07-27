import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Alert } from "react-native";
import { router } from "expo-router";
import { useMutation } from "@tanstack/react-query";
import { Toast } from "toastify-react-native";
import { useUserStore } from "@/store/userStore";
import { authService } from "@/shared/services/auth.service";
import { profileService } from "@/shared/services/profile.service";
import { UpdateProfileRequest } from "@/shared/interfaces/https/profile";
import { profileSchema, ProfileFormData } from "./profile.schema";
import { useCartStore } from "@/store/cartStore";
import { useCamera } from "@/shared/hooks/useCamera";
import { useGallery } from "@/shared/hooks/useGallery";

export const useProfileModel = () => {
  const { user, updateUser, logout } = useUserStore();
  const { clearCart } = useCartStore();
  const [avatarUri, setAvatarUri] = useState<string | null>(
    user?.avatarUrl || null
  );

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
    setValue,
  } = useForm<ProfileFormData>({
    resolver: yupResolver(profileSchema),
    defaultValues: {
      email: "",
      name: "",
      phone: "",
    },
  });

  useEffect(() => {
    if (user) {
      setValue("name", user.name);
      setValue("email", user.email);
      setValue("phone", user.phone);
      setAvatarUri(user.avatarUrl ?? "");
    }
  }, [user, setValue]);

  const updateProfileMutation = useMutation({
    mutationFn: (data: UpdateProfileRequest) =>
      profileService.updateProfile(data),
    onSuccess: (response) => {
      console.log(response);
      updateUser(response.user);
      Toast.success("Perfil atualizado com sucesso!", "top");
    },
    onError: (error: any) => {
      console.log(error.response.data);
      const errorMessage =
        error?.response?.data?.message ||
        "Erro ao atualizar perfil. Tente novamente.";
      Toast.error(errorMessage, "top");
    },
  });

  const uploadAvatarMutation = useMutation({
    mutationFn: (imageUri: string) => authService.uploadAvatar(imageUri),
    onSuccess: ({ url }) => {
      setAvatarUri(url);
      if (url && user) {
        updateUser({ ...user, avatarUrl: url });
      }
      Toast.success("Foto de perfil atualizada com sucesso!", "top");
    },
    onError: (error: any) => {
      const errorMessage =
        error?.response?.data?.message ||
        "Erro ao atualizar foto. Tente novamente.";
      Toast.error(errorMessage, "top");
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
            uploadAvatarMutation.mutate(uri);
          }
        },
      },
      {
        text: "Câmera",
        onPress: async () => {
          const uri = await camera.openCamera();
          if (uri) {
            setAvatarUri(uri);
            uploadAvatarMutation.mutate(uri);
          }
        },
      },
    ]);
  };

  const validatePasswords = (data: ProfileFormData): boolean => {
    return true;
  };

  const handleSubmitData = handleSubmit(
    (data) => {
      if (!validatePasswords(data)) {
        return;
      }

      const updateData: UpdateProfileRequest = {
        name: data.name,
        email: data.email,
        phone: data.phone,
      };

      updateProfileMutation.mutate(updateData);
    },
    (errors) => {
      console.log(errors);
      const firstError = Object.values(errors)[0];
      if (firstError?.message) {
        Toast.warn(firstError.message, "top");
      }
    }
  );

  const handleLogout = () => {
    Alert.alert("Sair", "Tem certeza que deseja sair da sua conta?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Sair",
        style: "destructive",
        onPress: () => {
          clearCart();
          logout();
          router.replace("/login");
        },
      },
    ]);
  };

  const handleGoBack = () => {
    router.back();
  };

  const isLoading =
    updateProfileMutation.isPending ||
    uploadAvatarMutation.isPending ||
    camera.isLoading ||
    gallery.isLoading;

  return {
    control,
    errors,
    avatarUri,
    isLoading,
    onSubmit: handleSubmitData,
    onSelectAvatar: handleSelectAvatar,
    onLogout: handleLogout,
    onGoBack: handleGoBack,
  };
};

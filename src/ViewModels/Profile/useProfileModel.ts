import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { router } from "expo-router";
import { Toast } from "toastify-react-native";
import { useUserStore } from "@/store/userStore";
import { UpdateProfileRequest } from "@/shared/interfaces/https/profile";
import {
  useUploadAvatarMutation,
  useUpdateProfileMutation,
} from "@/shared/queries";
import { profileSchema, ProfileFormData } from "./profile.schema";
import { useCartStore } from "@/store/cartStore";
import { useCamera } from "@/shared/hooks/useCamera";
import { useGallery } from "@/shared/hooks/useGallery";
import { useAppModals } from "@/shared/hooks/useAppModals";

export const useProfileModel = () => {
  const { user, updateUser, logout } = useUserStore();
  const { clearCart } = useCartStore();
  const modals = useAppModals();
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

  const updateProfileMutation = useUpdateProfileMutation();

  const uploadAvatarMutation = useUploadAvatarMutation({
    onSuccess: ({ url }: { url: string }) => {
      setAvatarUri(url);
      if (url && user) {
        updateUser({ ...user, avatarUrl: url });
      }
    },
  });

  const handleSelectAvatar = () => {
    modals.showSelection({
      title: "Selecionar Foto",
      message: "Escolha uma opção:",
      options: [
        {
          text: "Galeria",
          icon: "images",
          variant: "secondary",
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
          icon: "camera",
          variant: "primary",
          onPress: async () => {
            const uri = await camera.openCamera();
            if (uri) {
              setAvatarUri(uri);
              uploadAvatarMutation.mutate(uri);
            }
          },
        },
      ],
    });
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
      const firstError = Object.values(errors)[0];
      if (firstError?.message) {
        Toast.warn(firstError.message, "top");
      }
    }
  );

  const handleLogout = () => {
    modals.showConfirmation({
      title: "Sair",
      message: "Tem certeza que deseja sair da sua conta?",
      confirmText: "Sair",
      confirmVariant: "danger",
      icon: "log-out",
      onConfirm: () => {
        clearCart();
        logout();
        router.replace("/login");
      },
    });
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

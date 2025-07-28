import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useUserStore } from "@/store/userStore";
import {
  RegisterFormData,
  registerSchema,
} from "@/shared/validations/register.schema";
import { useCamera } from "@/shared/hooks/useCamera";
import { useGallery } from "@/shared/hooks/useGallery";
import { useRegisterMutation, useUploadAvatarMutation } from "@/shared/queries";
import { useAppModals } from "@/shared/hooks/useAppModals";

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
  const modals = useAppModals();

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

  const uploadAvatarMutation = useUploadAvatarMutation({
    showSuccessToast: false,
  });

  const registerMutation = useRegisterMutation({
    onSuccess: async (response) => {
      if (avatarUri) {
        const { url } = await uploadAvatarMutation.mutateAsync(avatarUri);
        const updatedUser = {
          ...response.user,
          avatarUrl: url,
        };
        setUser(updatedUser, response.token, response.refreshToken);
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
            }
          },
        },
      ],
    });
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

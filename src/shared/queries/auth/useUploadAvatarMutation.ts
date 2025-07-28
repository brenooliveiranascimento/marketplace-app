import { useMutation } from "@tanstack/react-query";
import { authService } from "@/shared/services/auth.service";
import { UploadAvatarResponse } from "@/shared/interfaces/https/profile";
import { useErrorHandler } from "@/shared/hooks/errorHandler";
import { Toast } from "toastify-react-native";

interface UseUploadAvatarMutationProps {
  onSuccess?: (response: UploadAvatarResponse) => void;
  onError?: (error: any) => void;
  showSuccessToast?: boolean;
}

export const useUploadAvatarMutation = ({
  onSuccess,
  onError,
  showSuccessToast = true,
}: UseUploadAvatarMutationProps = {}) => {
  const { handleError } = useErrorHandler();

  const mutation = useMutation({
    mutationFn: (imageUri: string) => authService.uploadAvatar(imageUri),
    onSuccess: (response) => {
      if (showSuccessToast) {
        Toast.success("Foto de perfil atualizada com sucesso!", "top");
      }
      onSuccess?.(response);
    },
    onError: (error: any) => {
      handleError(error, "Erro ao fazer upload da imagem");
      onError?.(error);
    },
  });

  return mutation;
};
 
import { useMutation } from "@tanstack/react-query";
import { profileService } from "@/shared/services/profile.service";
import {
  UpdateProfileRequest,
  UpdateProfileResponse,
} from "@/shared/interfaces/https/profile";
import { useUserStore } from "@/store/userStore";
import { useErrorHandler } from "@/shared/hooks/errorHandler";
import { Toast } from "toastify-react-native";

interface UseUpdateProfileMutationProps {
  onSuccess?: (response: UpdateProfileResponse) => void;
  onError?: (error: any) => void;
  showSuccessToast?: boolean;
}

export const useUpdateProfileMutation = ({
  onSuccess,
  onError,
  showSuccessToast = true,
}: UseUpdateProfileMutationProps = {}) => {
  const { updateUser } = useUserStore();
  const { handleError } = useErrorHandler();

  const mutation = useMutation({
    mutationFn: (data: UpdateProfileRequest) =>
      profileService.updateProfile(data),
    onSuccess: (response) => {
      updateUser(response.user);
      if (showSuccessToast) {
        Toast.success("Perfil atualizado com sucesso!", "top");
      }
      onSuccess?.(response);
    },
    onError: (error: any) => {
      handleError(error);
      onError?.(error);
    },
  });

  return mutation;
};

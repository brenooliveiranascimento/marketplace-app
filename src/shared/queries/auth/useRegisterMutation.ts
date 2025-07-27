import { useMutation } from "@tanstack/react-query";
import {
  authService,
  RegisterRequest,
  AuthResponse,
} from "@/shared/services/auth.service";
import { useUserStore } from "@/store/userStore";
import { useErrorHandler } from "@/shared/hooks/errorHandler";
import { Toast } from "toastify-react-native";

interface UseRegisterMutationProps {
  onSuccess?: (response: AuthResponse) => void;
  onError?: (error: any) => void;
}

export const useRegisterMutation = ({
  onSuccess,
  onError,
}: UseRegisterMutationProps = {}) => {
  const { setUser } = useUserStore();
  const { handleError } = useErrorHandler();

  const mutation = useMutation({
    mutationFn: (userData: RegisterRequest) => authService.register(userData),
    onSuccess: (response) => {
      setUser(response.user, response.token, response.refreshToken);
      Toast.success("Conta criada com sucesso!", "top");
      onSuccess?.(response);
    },
    onError: (error: any) => {
      handleError(error, "Ocorreu um erro ao criar sua conta");
      onError?.(error);
    },
  });

  return mutation;
};

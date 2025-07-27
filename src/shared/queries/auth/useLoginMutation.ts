import { useMutation } from "@tanstack/react-query";
import {
  authService,
  LoginRequest,
  AuthResponse,
} from "@/shared/services/auth.service";
import { useUserStore } from "@/store/userStore";
import { useErrorHandler } from "@/shared/hooks/errorHandler";

interface UseLoginMutationProps {
  onSuccess?: (response: AuthResponse) => void;
  onError?: (error: any) => void;
}

export const useLoginMutation = ({
  onSuccess,
  onError,
}: UseLoginMutationProps = {}) => {
  const { setUser } = useUserStore();
  const { handleError } = useErrorHandler();

  const mutation = useMutation({
    mutationFn: (credentials: LoginRequest) => authService.login(credentials),
    onSuccess: (response) => {
      setUser(response.user, response.token, response.refreshToken);
      onSuccess?.(response);
    },
    onError: (error: any) => {
      handleError(error, "Ocorreu um erro ao fazer login");
      onError?.(error);
    },
  });

  return mutation;
};

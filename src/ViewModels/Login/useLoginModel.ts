import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { Alert } from "react-native";
import { useUserStore } from "@/store/userStore";
import { LoginFormData, loginSchema } from "@/shared/validations/login.schema";
import { authService } from "@/shared/services/auth.service";

export interface LoginModel {
  control: any;
  errors: any;
  isLoading: boolean;
  onSubmit: () => void;
}

export const useLoginModel = (): LoginModel => {
  const { setUser } = useUserStore();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const loginMutation = useMutation({
    mutationFn: authService.login,
    onSuccess: (response) => {
      setUser(response.user, response.token);
    },
    onError: (error: any) => {
      Alert.alert(
        "Erro no Login",
        error.message || "Ocorreu um erro ao fazer login"
      );
    },
  });

  const onSubmit = handleSubmit(async (data: LoginFormData) => {
    await loginMutation.mutateAsync(data);
  });

  return {
    control,
    errors,
    isLoading: loginMutation.isPending,
    onSubmit,
  };
};

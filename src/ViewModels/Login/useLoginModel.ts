import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoginFormData, loginSchema } from "@/shared/validations/login.schema";
import { useLoginMutation } from "@/shared/queries";

export interface LoginModel {
  control: any;
  errors: any;
  isLoading: boolean;
  onSubmit: () => void;
}

export const useLoginModel = (): LoginModel => {
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

  const loginMutation = useLoginMutation();

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

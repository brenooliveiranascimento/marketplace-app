import * as yup from "yup";

export const registerSchema = yup.object({
  name: yup
    .string()
    .required("Nome é obrigatório")
    .min(2, "Nome deve ter pelo menos 2 caracteres"),
  email: yup.string().required("Email é obrigatório").email("Email inválido"),
  phone: yup
    .string()
    .required("Telefone é obrigatório")
    .matches(/^\d{11}$/, "Telefone deve ter 11 dígitos (DDD + número)"),
  password: yup
    .string()
    .required("Senha é obrigatória")
    .min(6, "Senha deve ter pelo menos 6 caracteres"),
  confirmPassword: yup
    .string()
    .required("Confirmação de senha é obrigatória")
    .oneOf([yup.ref("password")], "Senhas não coincidem"),
});

export type RegisterFormData = yup.InferType<typeof registerSchema>;

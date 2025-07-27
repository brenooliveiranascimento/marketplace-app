import * as yup from "yup";

export const profileSchema = yup.object().shape({
  name: yup
    .string()
    .required("Nome é obrigatório")
    .min(2, "Nome deve ter pelo menos 2 caracteres"),
  email: yup.string().required("Email é obrigatório").email("Email inválido"),
  phone: yup
    .string()
    .required("Telefone é obrigatório")
    .matches(/^\d{11}$/, "Telefone deve ter 11 dígitos (DDD + número)"),
});

export type ProfileFormData = yup.InferType<typeof profileSchema>;

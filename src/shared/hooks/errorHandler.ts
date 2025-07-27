import { AppError } from "../helpers/AppError";
import { Toast } from "toastify-react-native";

export const useErrorHandler = () => {
  const handleError = (error: unknown, defaultMessage?: string) => {
    const isAppError = error instanceof AppError;
    const message = isAppError
      ? error.message
      : defaultMessage ?? "Falha na requisição";
    Toast.error(message, "top");
  };

  return { handleError };
};

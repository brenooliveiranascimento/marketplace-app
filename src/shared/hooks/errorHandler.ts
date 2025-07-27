import { AppError } from "../helpers/AppError";
import { isTokenRelatedError } from "../helpers/tokenErrorFilter";
import { Toast } from "toastify-react-native";

export const useErrorHandler = () => {
  const handleError = (
    error: unknown,
    defaultMessage?: string,
    isTop?: boolean
  ) => {
    const isAppError = error instanceof AppError;
    const message = isAppError
      ? error.message
      : defaultMessage ?? "Falha na requisição";

    if (!isTokenRelatedError(message)) {
      Toast.error(message, isTop ? "top" : "bottom");
    }
  };

  return { handleError };
};

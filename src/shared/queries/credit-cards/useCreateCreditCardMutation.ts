import { useMutation } from "@tanstack/react-query";
import {
  creditCardsService,
  CreateCreditCardRequest,
  CreateCreditCardResponse,
} from "@/shared/services/credit-cards.service";
import { useErrorHandler } from "@/shared/hooks/errorHandler";
import { Toast } from "toastify-react-native";

interface UseCreateCreditCardMutationProps {
  onSuccess?: (response: CreateCreditCardResponse) => void;
  onError?: (error: any) => void;
}

export const useCreateCreditCardMutation = ({
  onSuccess,
  onError,
}: UseCreateCreditCardMutationProps = {}) => {
  const { handleError } = useErrorHandler();

  const mutation = useMutation({
    mutationFn: (data: CreateCreditCardRequest) =>
      creditCardsService.createCreditCard(data),
    onSuccess: (response) => {
      Toast.success(
        response.message || "Cartão cadastrado com sucesso!",
        "top"
      );
      onSuccess?.(response);
    },
    onError: (error: any) => {
      handleError(error, "Erro ao cadastrar cartão");
      onError?.(error);
    },
  });

  return mutation;
};

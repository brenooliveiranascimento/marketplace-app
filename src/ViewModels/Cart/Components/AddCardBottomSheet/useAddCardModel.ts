import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState, useEffect } from "react";
import { useBottomSheetStore } from "@/store/bottomsheetStore";
import { useCreateCreditCardMutation } from "@/shared/queries/credit-cards";
import {
  creditCardSchema,
  CreditCardFormData,
} from "@/shared/validations/credit-card.schema";
import valid from "card-validator";
import { useQueryClient } from "@tanstack/react-query";
import { useErrorHandler } from "@/shared/hooks/errorHandler";
import { AppError } from "@/shared/helpers/AppError";

const formatExpirationDateForAPI = (dateString: string): string => {
  const [month, year] = dateString.split("/");
  
  const monthNum = parseInt(month, 10);
  const yearNum = parseInt(year, 10);
  
  if (isNaN(monthNum) || monthNum < 1 || monthNum > 12) {
    throw new AppError("Mês inválido");
  }
  
  if (isNaN(yearNum) || yearNum < 0 || yearNum > 99) {
    throw new AppError("Ano inválido");
  }
  
  const fullYear = 2000 + yearNum;
  
  const expirationDate = new Date(fullYear, monthNum - 1 + 1, 0); 
  
  const isoDate = expirationDate.toISOString().split('T')[0];
  
  return isoDate;
};

export const useAddCardModel = () => {
  const { close } = useBottomSheetStore();
  const queryClient = useQueryClient();
  const [cardType, setCardType] = useState<string>("");
  const {handleError} = useErrorHandler()

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    clearErrors,
  } = useForm<CreditCardFormData>({
    resolver: yupResolver(creditCardSchema),
    defaultValues: {
      titularName: "",
      number: "",
      expirationDate: "",
      CVV: "",
    },
  });
  
  const watchedNumber = watch("number");
  const watchedName = watch("titularName");
  const watchedExpiry = watch("expirationDate");
  const watchedCVV = watch("CVV");

  useEffect(() => {
    if (watchedNumber) {
      const cleaned = watchedNumber.replace(/\s/g, "");
      const cardValidation = valid.number(cleaned);
      
      if (cardValidation.card) {
        setCardType(cardValidation.card.type);
      } else {
        setCardType("");
      }
    } else {
      setCardType("");
    }
  }, [watchedNumber]);

  const createCardMutation = useCreateCreditCardMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["credit-cards"] });
      reset();
      setCardType("");
      close();
    },
    onError: (error: any) => {
      handleError(error, "Erro ao salvar cartão. Tente novamente1.");
    },
  });

  const handleCancel = () => {
    reset();
    setCardType("");
    clearErrors();
    close();
  };

  const handleSave = handleSubmit(async (data: CreditCardFormData) => {
    try {
      clearErrors("root");

      const cleanedNumber = data.number.replace(/\s/g, "");
      if (cleanedNumber.length !== 16) {
        throw new Error("Número do cartão deve ter exatamente 16 dígitos");
      }
      
      const formattedDate = formatExpirationDateForAPI(data.expirationDate);

      const payload = {
        number: cleanedNumber, 
        CVV: parseInt(data.CVV, 10), 
        expirationDate: formattedDate, 
      };
      await createCardMutation.mutateAsync(payload);
    } catch (error) {
      handleError(error, "Erro ao salvar cartão. Tente novamente2.");  
    }
  });

  return {
    control,
    errors,
    isLoading: createCardMutation.isPending,
    cardType,

    cardData: {
      number: watchedNumber || "",
      name: watchedName || "",
      expiry: watchedExpiry || "",
      cvv: watchedCVV || "",
    },

    handleCancel,
    handleSave,

    maxCVVLength: 3,
  };
};

import { useQuery } from "@tanstack/react-query";
import { creditCardsService } from "../../services/credit-cards.service";

export const useCreditCardsQuery = () => {
  return useQuery({
    queryKey: ["credit-cards"],
    queryFn: creditCardsService.getCreditCards,
    staleTime: 5 * 60 * 1000,
  });
};

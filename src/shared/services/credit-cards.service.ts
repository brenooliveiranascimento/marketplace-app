import { marketPlaceApiClient } from "../api/market-place";

export interface CreditCard {
  id: number;
  userId: number;
  titularName: string;
  number: string;
  CVV: number;
  expirationDate: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface CreateCreditCardRequest {
  number: string;
  CVV: number;
  expirationDate: string;
}

export interface CreateCreditCardResponse {
  id: number;
  userId: number;
  titularName: string;
  number: string;
  CVV: number;
  expirationDate: string;
  createdAt: string;
  updatedAt: string;
}

export const creditCardsService = {
  getCreditCards: async (): Promise<CreditCard[]> => {
    const response = await marketPlaceApiClient.get<CreditCard[]>(
      "/credit-cards"
    );
    return response.data;
  },

  createCreditCard: async (
    data: CreateCreditCardRequest
  ): Promise<CreateCreditCardResponse> => {
    const response = await marketPlaceApiClient.post<CreateCreditCardResponse>(
      "/credit-cards",
      data
    );
    return response.data;
  },
};

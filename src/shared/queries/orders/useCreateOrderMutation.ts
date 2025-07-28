import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import {
  ordersService,
  CreateOrderRequest,
  CreateOrderResponse,
} from "../../services/orders.service";

export const useCreateOrderMutation = (
  options?: UseMutationOptions<CreateOrderResponse, Error, CreateOrderRequest>
) => {
  return useMutation({
    mutationFn: ordersService.createOrder,
    ...options,
  });
};

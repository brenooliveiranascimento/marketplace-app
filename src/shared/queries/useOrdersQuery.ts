import { useQuery } from "@tanstack/react-query";
import { queryConfig } from "./config";
import { ordersService } from "../services/orders.service";

export const useOrdersQuery = () => {
  const query = useQuery({
    queryKey: ["orders"],
    queryFn: ordersService.getOrders,
    ...queryConfig,
  });

  const orders = query.data?.orders || [];
  const totalOrders = query.data?.totalOrders || 0;

  return {
    ...query,
    orders,
    totalOrders,
  };
};

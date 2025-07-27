import { useQuery } from "@tanstack/react-query";
import { ordersService } from "@/shared/services/orders.service";
import { queryConfig } from "./config";

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

import { useGetOrdersQuery } from "@/shared/queries/orders/useGetOrdersQuery";

export const useOrdersModel = () => {
  const { orders, totalOrders, isLoading, error, refetch, isRefetching } =
    useGetOrdersQuery();

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString().slice(-2);
    return `${day}/${month}/${year}`;
  };

  const formatQuantity = (quantity: number): string => {
    return quantity === 1 ? `${quantity} unidade` : `${quantity} unidades`;
  };

  const formatCreditCard = (maskedNumber: string): string => {
    const lastDigits = maskedNumber.slice(-3);
    return `Cartão com final ${lastDigits}`;
  };

  const handleRefresh = async () => {
    await refetch();
  };

  return {
    orders,
    totalOrders,
    isLoading,
    error,
    isRefreshing: isRefetching,
    formatDate,
    formatQuantity,
    formatCreditCard,
    onRefresh: handleRefresh,
  };
};

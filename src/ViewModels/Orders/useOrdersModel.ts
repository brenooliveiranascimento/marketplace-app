import { useGetOrdersQuery } from "@/shared/queries/orders/useGetOrdersQuery";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export const useOrdersModel = () => {
  const { orders, totalOrders, isLoading, error, refetch, isRefetching } =
    useGetOrdersQuery();

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return format(date, "dd/MM/yy", { locale: ptBR });
  };

  const formatDateFull = (dateString: string): string => {
    const date = new Date(dateString);
    return format(date, "dd 'de' MMMM 'de' yyyy", { locale: ptBR });
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
    formatDateFull,
    formatQuantity,
    formatCreditCard,
    onRefresh: handleRefresh,
  };
};

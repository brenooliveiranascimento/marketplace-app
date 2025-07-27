export const useAppPriceText = (children: number) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price);
  };

  const formattedPrice = formatPrice(Number(children));

  const parts = formattedPrice.split(" ");
  const currencySymbol = parts[0];
  const value = parts.slice(1).join(" ");

  return { formatPrice, currencySymbol, value };
};

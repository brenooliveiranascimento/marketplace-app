export const useAppPriceText = (value: number) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price);
  };

  const formattedPrice = String(formatPrice(Number(value)));

  const parts = formattedPrice.split("\u00A0");
  const currencySymbol = parts[0];
  const valueText = parts.slice(1).join("\u00A0");

  return { formatPrice, currencySymbol, valueText, value };
};

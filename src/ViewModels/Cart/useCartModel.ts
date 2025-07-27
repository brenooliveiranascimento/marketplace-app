import { useCartStore, CartItem } from "@/store/cartStore";
import { Alert } from "react-native";
import { router } from "expo-router";

export const useCartModel = () => {
  const {
    products,
    total,
    updateQuantity,
    removeItem,
    clearCart,
    getItemCount,
  } = useCartStore();

  const formatPrice = (price: string): string => {
    const numericValue = parseFloat(price);
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(numericValue);
  };

  const formatTotal = (): string => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(total);
  };

  const handleIncreaseQuantity = (id: number, currentQuantity: number) => {
    updateQuantity(id, currentQuantity + 1);
  };

  const handleDecreaseQuantity = (id: number, currentQuantity: number) => {
    if (currentQuantity === 1) {
      Alert.alert("Remover item", "Deseja remover este item do carrinho?", [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Remover",
          style: "destructive",
          onPress: () => removeItem(id),
        },
      ]);
    } else {
      updateQuantity(id, currentQuantity - 1);
    }
  };

  const handleRemoveItem = (id: number, itemName: string) => {
    Alert.alert("Remover item", `Deseja remover "${itemName}" do carrinho?`, [
      { text: "Cancelar", style: "cancel" },
      { text: "Remover", style: "destructive", onPress: () => removeItem(id) },
    ]);
  };

  const handleClearCart = () => {
    if (products.length === 0) return;

    Alert.alert(
      "Limpar carrinho",
      "Deseja remover todos os itens do carrinho?",
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Limpar", style: "destructive", onPress: clearCart },
      ]
    );
  };

  const handleCheckout = () => {
    if (products.length === 0) {
      Alert.alert(
        "Carrinho vazio",
        "Adicione itens ao carrinho para continuar."
      );
      return;
    }

    Alert.alert(
      "Finalizar compra",
      `Total: ${formatTotal()}\n\nDeseja prosseguir com a compra?`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Confirmar",
          onPress: () => {
            Alert.alert("Sucesso!", "Compra realizada com sucesso!");
            clearCart();
          },
        },
      ]
    );
  };

  const handleGoBack = () => {
    router.back();
  };

  const isEmpty = products.length === 0;
  const itemCount = getItemCount();

  return {
    products,
    total,
    isEmpty,
    itemCount,

    formatPrice,
    formatTotal,

    onIncreaseQuantity: handleIncreaseQuantity,
    onDecreaseQuantity: handleDecreaseQuantity,
    onRemoveItem: handleRemoveItem,
    onClearCart: handleClearCart,
    onCheckout: handleCheckout,
    onGoBack: handleGoBack,
  };
};

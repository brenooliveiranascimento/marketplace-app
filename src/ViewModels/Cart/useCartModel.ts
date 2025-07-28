import { useCartStore } from "@/store/cartStore";
import { Alert } from "react-native";
import { router } from "expo-router";
import { useState } from "react";
import { useCreditCardsQuery } from "@/shared/queries/credit-cards";
import { useCreateOrderMutation } from "@/shared/queries/orders";
import { CreditCard } from "@/shared/services/credit-cards.service";
import { useQueryClient } from "@tanstack/react-query";

export const useCartModel = () => {
  const {
    products,
    total,
    updateQuantity,
    removeItem,
    clearCart,
    getItemCount,
  } = useCartStore();

  const queryClient = useQueryClient();
  const [selectedCreditCard, setSelectedCreditCard] =
    useState<CreditCard | null>(null);

  const { data: creditCards = [], isLoading: isLoadingCards } =
    useCreditCardsQuery();

  const createOrderMutation = useCreateOrderMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });

      Alert.alert("Sucesso!", "Pedido criado com sucesso!", [
        {
          text: "OK",
          onPress: () => {
            clearCart();
            setSelectedCreditCard(null);
            router.push("/(private)/(tabs)/orders");
          },
        },
      ]);
    },
    onError: (error) => {
      Alert.alert(
        "Erro",
        error.message || "Erro ao criar pedido. Tente novamente."
      );
    },
  });

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

  const handleSelectCreditCard = (creditCard: CreditCard) => {
    setSelectedCreditCard(creditCard);
  };

  const handleEditCreditCard = (creditCard: CreditCard) => {
    Alert.alert("Em desenvolvimento", "Funcionalidade de edição em breve!");
  };

  const handleCheckout = () => {
    if (products.length === 0) {
      Alert.alert(
        "Carrinho vazio",
        "Adicione itens ao carrinho para continuar."
      );
      return;
    }

    if (!selectedCreditCard) {
      Alert.alert(
        "Cartão não selecionado",
        "Selecione um cartão de crédito para continuar."
      );
      return;
    }

    Alert.alert(
      "Confirmar compra",
      `Total: ${formatTotal()}\nCartão: **** ${selectedCreditCard.number.slice(
        -4
      )}\n\nDeseja prosseguir com a compra?`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Confirmar",
          onPress: () => {
            const orderData = {
              creditCardId: selectedCreditCard.id,
              items: products.map((product) => ({
                productId: product.id,
                quantity: product.quantity,
              })),
            };

            createOrderMutation.mutate(orderData);
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

    creditCards,
    isLoadingCards,
    selectedCreditCard,

    isCreatingOrder: createOrderMutation.isPending,

    formatPrice,
    formatTotal,

    onIncreaseQuantity: handleIncreaseQuantity,
    onDecreaseQuantity: handleDecreaseQuantity,
    onRemoveItem: handleRemoveItem,
    onClearCart: handleClearCart,
    onCheckout: handleCheckout,
    onGoBack: handleGoBack,

    onSelectCreditCard: handleSelectCreditCard,
    onEditCreditCard: handleEditCreditCard,
  };
};

import { useCartStore } from "@/store/cartStore";
import { router } from "expo-router";
import { useState } from "react";
import { useCreditCardsQuery } from "@/shared/queries/credit-cards";
import { useCreateOrderMutation } from "@/shared/queries/orders";
import { CreditCard } from "@/shared/services/credit-cards.service";
import { useQueryClient } from "@tanstack/react-query";
import { useAppModals } from "@/shared/hooks/useAppModals";

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
  const modals = useAppModals();
  const [selectedCreditCard, setSelectedCreditCard] =
    useState<CreditCard | null>(null);

  const { data: creditCards = [], isLoading: isLoadingCards } =
    useCreditCardsQuery();

  const createOrderMutation = useCreateOrderMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });

      modals.showSuccess({
        title: "Sucesso!",
        message: "Pedido criado com sucesso!",
        buttonText: "Ver Pedidos",
        onButtonPress: () => {
          clearCart();
          setSelectedCreditCard(null);
          router.push("/(private)/(tabs)/orders");
        },
      });
    },
    onError: (error) => {
      modals.showInfo({
        title: "Erro",
        message: error.message || "Erro ao criar pedido. Tente novamente.",
        variant: "error",
      });
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
      modals.showConfirmation({
        title: "Remover item",
        message: "Deseja remover este item do carrinho?",
        confirmText: "Remover",
        confirmVariant: "danger",
        icon: "trash",
        onConfirm: () => removeItem(id),
      });
    } else {
      updateQuantity(id, currentQuantity - 1);
    }
  };

  const handleRemoveItem = (id: number, itemName: string) => {
    modals.showConfirmation({
      title: "Remover item",
      message: `Deseja remover "${itemName}" do carrinho?`,
      confirmText: "Remover",
      confirmVariant: "danger",
      icon: "trash",
      onConfirm: () => removeItem(id),
    });
  };

  const handleClearCart = () => {
    if (products.length === 0) return;

    modals.showConfirmation({
      title: "Limpar carrinho",
      message: "Deseja remover todos os itens do carrinho?",
      confirmText: "Limpar",
      confirmVariant: "danger",
      icon: "trash",
      onConfirm: clearCart,
    });
  };

  const handleSelectCreditCard = (creditCard: CreditCard) => {
    setSelectedCreditCard(creditCard);
  };

  const handleEditCreditCard = (creditCard: CreditCard) => {
    modals.showInfo({
      title: "Em desenvolvimento",
      message: "Funcionalidade de edição em breve!",
      variant: "warning",
    });
  };

  const handleCheckout = () => {
    if (products.length === 0) {
      modals.showInfo({
        title: "Carrinho vazio",
        message: "Adicione itens ao carrinho para continuar.",
        variant: "warning",
      });
      return;
    }

    if (!selectedCreditCard) {
      modals.showInfo({
        title: "Cartão não selecionado",
        message: "Selecione um cartão de crédito para continuar.",
        variant: "warning",
      });
      return;
    }

    modals.showConfirmation({
      title: "Confirmar compra",
      message: `Total: ${formatTotal()}\nCartão: **** ${selectedCreditCard.number.slice(
        -4
      )}\n\nDeseja prosseguir com a compra?`,
      confirmText: "Confirmar",
      icon: "card",
      onConfirm: () => {
        const orderData = {
          creditCardId: selectedCreditCard.id,
          items: products.map((product) => ({
            productId: product.id,
            quantity: product.quantity,
          })),
        };

        createOrderMutation.mutate(orderData);
      },
    });
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

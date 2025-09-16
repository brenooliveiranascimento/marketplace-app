import React from "react";
import { router } from "expo-router";
import { useCartStore } from "@/store/cartStore";
import { useProductQuery } from "@/shared/queries";
import { useModalStore } from "@/store/modalStore";
import { AddToCartSuccessModal } from "@/shared/components";
import { useBottomSheetStore } from "@/store/bottomsheetStore";
import { ReviewModal } from "./components/ReviewModal";
import { useAppPriceText } from "@/shared/components/AppPriceText/useAppPriceText";

export const useProductModel = (productId: number) => {
  const { addItem } = useCartStore();
  const { open: openModal, close: closeModal } = useModalStore();

  const { product, isLoading, error, refetch, isRefetching } = useProductQuery({
    productId,
    enabled: !!productId,
  });

  const { open } = useBottomSheetStore();

  const handleOpenReviewModal = (productId: number) => {
    if (!product) return;

    open(
      React.createElement(ReviewModal, {
        productId,
      })
    );
  };

  const { formatPrice } = useAppPriceText(Number(product?.value));

  const handleAddToCart = () => {
    if (!product) return;

    addItem({
      id: product.id,
      name: product.name,
      price: product.value,
      image: product.photo,
    });

    openModal(
      React.createElement(AddToCartSuccessModal, {
        productName: product.name,
        onGoToCart: handleGoToCart,
        onContinueShopping: handleContinueShopping,
        onClose: closeModal,
      })
    );
  };

  const handleGoToCart = () => {
    closeModal();
    router.push("/(private)/(tabs)/cart");
  };

  const handleContinueShopping = () => {
    closeModal();
    router.push("/(private)/(tabs)/");
  };

  const handleGoBack = () => {
    router.back();
  };

  return {
    product,
    isLoading,
    error,
    isRefreshing: isRefetching,
    formatPrice,
    onAddToCart: handleAddToCart,
    onGoBack: handleGoBack,
    refetch,
    handleOpenReviewModal,
  };
};

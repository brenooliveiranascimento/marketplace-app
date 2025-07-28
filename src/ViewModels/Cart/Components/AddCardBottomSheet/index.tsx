import React from "react";
import { useAddCardModel } from "./useAddCardModel";
import { AddCardView } from "./AddCardView";

export const AddCardBottomSheet: React.FC = () => {
  const {
    control,
    errors,
    isLoading,
    cardType,
    cardData,
    handleCancel,
    handleSave,
    maxCVVLength,
  } = useAddCardModel();

  return (
    <AddCardView
      control={control}
      errors={errors}
      isLoading={isLoading}
      cardType={cardType}
      cardData={cardData}
      handleCancel={handleCancel}
      handleSave={handleSave}
      maxCVVLength={maxCVVLength}
    />
  );
};

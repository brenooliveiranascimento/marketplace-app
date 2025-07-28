import React from "react";
import { useModalStore } from "@/store/modalStore";
import {
  ConfirmationModalContent,
  SuccessModalContent,
  SelectionModalContent,
  InfoModalContent,
} from "@/shared/components";

interface SelectionOption {
  text: string;
  onPress: () => void;
  icon?: string;
  variant?: "primary" | "secondary" | "danger";
}

export const useAppModals = () => {
  const { open, close } = useModalStore();

  const showConfirmation = (config: {
    title: string;
    message: string;
    onConfirm: () => void;
    confirmText?: string;
    cancelText?: string;
    confirmVariant?: "primary" | "danger";
    icon?: string;
  }) => {
    open(
      React.createElement(ConfirmationModalContent, {
        title: config.title,
        message: config.message,
        confirmText: config.confirmText,
        cancelText: config.cancelText,
        confirmVariant: config.confirmVariant,
        icon: config.icon as any,
        onConfirm: () => {
          config.onConfirm();
          close();
        },
        onCancel: close,
      })
    );
  };

  const showSuccess = (config: {
    title: string;
    message: string;
    buttonText?: string;
    onButtonPress?: () => void;
  }) => {
    open(
      React.createElement(SuccessModalContent, {
        title: config.title,
        message: config.message,
        buttonText: config.buttonText,
        onButtonPress: () => {
          if (config.onButtonPress) {
            config.onButtonPress();
          }
          close();
        },
      })
    );
  };

  const showSelection = (config: {
    title: string;
    message?: string;
    options: SelectionOption[];
  }) => {
    open(
      React.createElement(SelectionModalContent, {
        title: config.title,
        message: config.message,
        options: config.options.map((option) => ({
          ...option,
          onPress: () => {
            option.onPress();
            close();
          },
        })) as any,
        onCancel: close,
      })
    );
  };

  const showInfo = (config: {
    title: string;
    message: string;
    buttonText?: string;
    variant?: "info" | "warning" | "error";
    icon?: string;
  }) => {
    open(
      React.createElement(InfoModalContent, {
        title: config.title,
        message: config.message,
        buttonText: config.buttonText,
        variant: config.variant,
        icon: config.icon as any,
        onButtonPress: close,
      })
    );
  };

  return {
    showConfirmation,
    showSuccess,
    showSelection,
    showInfo,
    close,
  };
};

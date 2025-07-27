import { create } from "zustand";
import { ReactNode } from "react";

interface ModalConfig {
  animationType?: "none" | "slide" | "fade";
  transparent?: boolean;
  statusBarTranslucent?: boolean;
}

interface ModalStore {
  isOpen: boolean;
  content: ReactNode | null;
  config?: ModalConfig;
  open: (content: ReactNode, config?: ModalConfig) => void;
  close: () => void;
}

const defaultConfig: ModalConfig = {
  animationType: "fade",
  transparent: true,
  statusBarTranslucent: false,
};

export const useModalStore = create<ModalStore>((set) => ({
  isOpen: false,
  content: null,
  config: defaultConfig,

  open: (content: ReactNode, config?: ModalConfig) => {
    set({
      isOpen: true,
      content,
      config: { ...defaultConfig, ...config },
    });
  },

  close: () => {
    set({
      isOpen: false,
      content: null,
    });
  },
}));

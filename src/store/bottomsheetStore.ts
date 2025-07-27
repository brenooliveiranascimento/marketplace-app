import { create } from "zustand";
import { ReactNode } from "react";

interface BottomSheetConfig {
  snapPoints?: string[];
  enablePanDownToClose?: boolean;
}

interface BottomSheetStore {
  isOpen: boolean;
  content: ReactNode | null;
  config: BottomSheetConfig;
  open: (content: ReactNode, config?: BottomSheetConfig) => void;
  close: () => void;
}

const defaultConfig: BottomSheetConfig = {
  snapPoints: ["80%", "90%"],
  enablePanDownToClose: true,
};

export const useBottomSheetStore = create<BottomSheetStore>((set, get) => ({
  isOpen: false,
  content: null,
  config: defaultConfig,

  open: (content, config) => {
    const mergedConfig = { ...defaultConfig, ...config };
    set({ isOpen: true, content, config: mergedConfig });
  },

  close: () => {
    set({ isOpen: false, content: null, config: defaultConfig });
  },
}));

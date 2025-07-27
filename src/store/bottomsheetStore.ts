import { create } from "zustand";
import BottomSheet from "@gorhom/bottom-sheet";
import { RefObject, useRef } from "react";

type BottomSheetStore = {
  isOpen: boolean;
  reference: React.RefObject<BottomSheet> | RefObject<null>;
  toggleModal: () => void;
};

export const useBottomSheetStore = create<BottomSheetStore>((set, get) => ({
  isOpen: false,
  reference: useRef(null),

  toggleModal: () => {
    set((state) => ({ isOpen: !state.isOpen }));
    if (!get().isOpen) {
      get().reference.current?.close();
    } else {
      get().reference.current?.expand();
    }
  },
}));

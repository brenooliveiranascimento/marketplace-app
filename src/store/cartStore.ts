import { create } from "zustand";

export interface CartItem {
  id: number;
  name: string;
  price: string;
  quantity: number;
  image?: string;
}

interface CartStore {
  items: CartItem[];
  total: number;
  addItem: (item: Omit<CartItem, "quantity">) => void;
  removeItem: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  getItemCount: () => number;
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  total: 0,

  addItem: (item) =>
    set((state) => {
      const existingItem = state.items.find((i) => i.id === item.id);

      if (existingItem) {
        const updatedItems = state.items.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
        const newTotal = updatedItems.reduce(
          (sum, i) => sum + Number(i.price) * i.quantity,
          0
        );
        return { items: updatedItems, total: newTotal };
      }

      const newItems = [...state.items, { ...item, quantity: 1 }];
      const newTotal = newItems.reduce(
        (sum, i) => sum + Number(i.price) * i.quantity,
        0
      );
      return { items: newItems, total: newTotal };
    }),

  removeItem: (id) =>
    set((state) => {
      const newItems = state.items.filter((i) => i.id !== id);
      const newTotal = newItems.reduce(
        (sum, i) => sum + Number(i.price) * i.quantity,
        0
      );
      return { items: newItems, total: newTotal };
    }),

  updateQuantity: (id, quantity) =>
    set((state) => {
      if (quantity <= 0) {
        const newItems = state.items.filter((i) => i.id !== id);
        const newTotal = newItems.reduce(
          (sum, i) => sum + Number(i.price) * i.quantity,
          0
        );
        return { items: newItems, total: newTotal };
      }

      const newItems = state.items.map((i) =>
        i.id === id ? { ...i, quantity } : i
      );
      const newTotal = newItems.reduce(
        (sum, i) => sum + Number(i.price) * i.quantity,
        0
      );
      return { items: newItems, total: newTotal };
    }),

  clearCart: () => set({ items: [], total: 0 }),

  getItemCount: () => {
    const { items } = get();
    return items.reduce((count, item) => count + item.quantity, 0);
  },
}));

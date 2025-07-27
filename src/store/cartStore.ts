import { create } from "zustand";

export interface CartItem {
  id: number;
  name: string;
  price: string;
  quantity: number;
  image?: string;
}

interface CartStore {
  products: CartItem[];
  total: number;
  addItem: (item: Omit<CartItem, "quantity">) => void;
  removeItem: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  getItemCount: () => number;
}

export const useCartStore = create<CartStore>((set, get) => ({
  products: [],
  total: 0,

  addItem: (item) =>
    set((state) => {
      const existingItem = state.products.find(
        (product) => product.id === item.id
      );

      if (existingItem) {
        const updatedItems = state.products.map((product) =>
          product.id === item.id
            ? { ...product, quantity: product.quantity + 1 }
            : product
        );
        const newTotal = updatedItems.reduce(
          (sum, product) => sum + Number(product.price) * product.quantity,
          0
        );
        return { products: updatedItems, total: newTotal };
      }

      const newItems = [...state.products, { ...item, quantity: 1 }];
      const newTotal = newItems.reduce(
        (sum, product) => sum + Number(product.price) * product.quantity,
        0
      );
      return { products: newItems, total: newTotal };
    }),

  removeItem: (id) =>
    set((state) => {
      const newItems = state.products.filter((product) => product.id !== id);
      const newTotal = newItems.reduce(
        (sum, product) => sum + Number(product.price) * product.quantity,
        0
      );
      return { products: newItems, total: newTotal };
    }),

  updateQuantity: (id, quantity) =>
    set((state) => {
      if (quantity <= 0) {
        const newItems = state.products.filter((product) => product.id !== id);
        const newTotal = newItems.reduce(
          (sum, product) => sum + Number(product.price) * product.quantity,
          0
        );
        return { products: newItems, total: newTotal };
      }

      const newItems = state.products.map((product) =>
        product.id === id ? { ...product, quantity } : product
      );
      const newTotal = newItems.reduce(
        (sum, product) => sum + Number(product.price) * product.quantity,
        0
      );
      return { products: newItems, total: newTotal };
    }),

  clearCart: () => set({ products: [], total: 0 }),

  getItemCount: () => {
    const { products } = get();
    return products.reduce((count, product) => count + product.quantity, 0);
  },
}));

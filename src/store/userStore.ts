import { create } from "zustand";

export interface User {
  id: number;
  name: string;
  email: string;
  avatarUrl?: string;
  phone: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
}

interface UserStore {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  setUser: (user: User, token: string) => void;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
  updateAvatar: (avatarUrl: string) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,

  setUser: (user, token) =>
    set({
      user,
      token,
      isAuthenticated: true,
    }),

  logout: () =>
    set({
      user: null,
      token: null,
      isAuthenticated: false,
    }),

  updateUser: (updates) =>
    set((state) => ({
      user: state.user ? { ...state.user, ...updates } : null,
    })),

  updateAvatar: (avatarUrl) =>
    set((state) => ({
      user: state.user ? { ...state.user, avatarUrl } : null,
    })),
}));

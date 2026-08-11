import { create } from "zustand";
import { persist } from "zustand/middleware";

type User = {
  name: string;
  surname: string;
  email: string;
  id: string;
};

type AuthStore = {
  isAuth: boolean;
  token?: string | null;
  setAuth: (val: boolean) => void;
  setUser: (val: User | null) => void;
  setToken: (val: string | null) => void;
  user?: User | null;
  clearAuth: () => void;
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      isAuth: false,
      setAuth: (val) => set({ isAuth: val }),
      setUser: (val) => set({ user: val }),
      setToken: (val) => {
        set({ token: val });
      },
      clearAuth: () =>
        set({ isAuth: false, token: undefined, user: undefined }),
    }),
    {
      name: "",
      partialize: (state) => ({
        isAuth: state.isAuth,
        user: state.user,
        token: state.token,
      }),
    },
  ),
);

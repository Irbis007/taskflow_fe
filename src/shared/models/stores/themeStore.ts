import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { AccentColor, Themes } from "../types";
import { LOCAL_STORAGE } from "@shared/consts";

type ThemeStore = {
  currentAccentColor: AccentColor;
  currentTheme: Themes;
  setAccentColor: (val: AccentColor) => void;
  setTheme: (val: Themes) => void;
};

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      currentAccentColor: "accent-default",
      currentTheme: "theme-default",
      setAccentColor: (val) => set({ currentAccentColor: val }),
      setTheme: (val) => set({ currentTheme: val }),
    }),
    {
      name: LOCAL_STORAGE.theme,
      partialize: (state) => ({
        currentAccentColor: state.currentAccentColor,
        currentTheme: state.currentTheme,
      }),
    },
  ),
);

import { useThemeStore } from "@shared/models";
import type { ReactNode } from "react";

export  function ThemeProvider({children}: {children: ReactNode}) {
  const accentColor = useThemeStore(state => state.currentAccentColor)
  const theme = useThemeStore(state => state.currentTheme)
  return (
    <div className={`${accentColor} ${theme}`}>
      {children}
    </div>
  )
}

"use client";

import * as React from "react";

export const THEME_STORAGE_KEY = "theme";

const themeValues = ["light", "dark"] as const;
type ThemeValue = (typeof themeValues)[number];

function isValidTheme(theme: string | null): theme is ThemeValue {
  return themeValues.includes(theme as ThemeValue);
}

type ThemeContextValue = {
  theme?: ThemeValue;
  setTheme: (theme: ThemeValue) => void;
};

const ThemeContext = React.createContext<ThemeContextValue | undefined>(
  undefined,
);

interface ThemeProviderProps extends React.PropsWithChildren {}

const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, rawSetTheme] = React.useState<ThemeValue>();

  React.useEffect(() => {
    const storedTheme = localStorage.getItem(THEME_STORAGE_KEY);

    if (isValidTheme(storedTheme)) {
      rawSetTheme(storedTheme);
    }
  }, [rawSetTheme]);

  const setTheme = (newTheme: ThemeValue) => {
    rawSetTheme(newTheme);

    localStorage.setItem(THEME_STORAGE_KEY, newTheme);

    const root = document.documentElement;
    const isDark = newTheme === "dark";

    root.classList.remove(isDark ? "light" : "dark");
    root.classList.add(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

function useThemeContext() {
  const context = React.useContext(ThemeContext);

  if (!context) {
    throw new Error(
      "`useThemeContext()` must be used inside a `ThemeProvider`",
    );
  }

  return context;
}

export { ThemeContext, ThemeProvider, useThemeContext };
export type { ThemeProviderProps };

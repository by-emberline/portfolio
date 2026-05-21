import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Theme = "ocean" | "violet" | "rose" | "emerald" | "amber";

export const THEME_ORDER: Theme[] = ["ocean", "violet", "rose", "emerald", "amber"];
const AUTO_ROTATE_MS = 5 * 60 * 1000;

interface ThemeContextValue {
  theme: Theme;
  setTheme: (t: Theme) => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: "ocean",
  setTheme: () => {},
});

export function useTheme() {
  return useContext(ThemeContext);
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(() => {
    return (localStorage.getItem("portfolio-theme") as Theme) ?? "ocean";
  });

  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("portfolio-theme", theme);
  }, [theme]);

  useEffect(() => {
    const interval = setInterval(() => {
      setThemeState((current) => {
        const idx = THEME_ORDER.indexOf(current);
        return THEME_ORDER[(idx + 1) % THEME_ORDER.length];
      });
    }, AUTO_ROTATE_MS);
    return () => clearInterval(interval);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme: setThemeState }}>
      {children}
    </ThemeContext.Provider>
  );
}

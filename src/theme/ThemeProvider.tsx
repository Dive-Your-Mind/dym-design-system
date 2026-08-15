import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type Theme = "light" | "dark";
export type ThemePreference = Theme | "system";

interface ThemeContextValue {
  /** The theme actually applied (system resolved to light/dark). */
  theme: Theme;
  /** What the consumer asked for — may be "system". */
  preference: ThemePreference;
  setPreference: (preference: ThemePreference) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

function getSystemTheme(): Theme {
  if (typeof window === "undefined" || !window.matchMedia) return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export interface ThemeProviderProps {
  children: ReactNode;
  /**
   * Initial theme preference. Defaults to "system", which follows the OS
   * color-scheme setting and updates live if it changes.
   */
  defaultPreference?: ThemePreference;
  /** Render the wrapper as a different element type. Defaults to "div". */
  as?: "div" | "span";
}

export function ThemeProvider({
  children,
  defaultPreference = "system",
  as = "div",
}: ThemeProviderProps) {
  const [preference, setPreference] = useState<ThemePreference>(defaultPreference);
  const [systemTheme, setSystemTheme] = useState<Theme>(getSystemTheme);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mql = window.matchMedia("(prefers-color-scheme: dark)");
    const listener = (e: MediaQueryListEvent) => setSystemTheme(e.matches ? "dark" : "light");
    mql.addEventListener("change", listener);
    return () => mql.removeEventListener("change", listener);
  }, []);

  const theme: Theme = preference === "system" ? systemTheme : preference;

  const value = useMemo<ThemeContextValue>(
    () => ({ theme, preference, setPreference }),
    [theme, preference],
  );

  const Wrapper = as;

  return (
    <ThemeContext.Provider value={value}>
      <Wrapper data-theme={theme} className="dym-ThemeRoot">
        {children}
      </Wrapper>
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used within a <ThemeProvider>");
  }
  return ctx;
}

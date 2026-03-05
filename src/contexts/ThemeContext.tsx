import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type ThemeName = "elegant-light" | "dark-academic" | "modern-blue" | "calm-mint";

interface ThemeContextType {
  theme: ThemeName;
  setTheme: (t: ThemeName) => void;
  isTransitioning: boolean;
}

const ThemeContext = createContext<ThemeContextType>({ theme: "elegant-light", setTheme: () => {}, isTransitioning: false });

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setThemeState] = useState<ThemeName>(() => 
    (localStorage.getItem("jg-theme") as ThemeName) || "elegant-light"
  );
  const [isTransitioning, setIsTransitioning] = useState(false);

  const setTheme = (t: ThemeName) => {
    if (t === theme) return;
    setIsTransitioning(true);
    // Add transition class to root for smooth CSS variable animation
    document.documentElement.classList.add("theme-transitioning");
    
    // Small delay to let transition start
    requestAnimationFrame(() => {
      setThemeState(t);
      setTimeout(() => {
        setIsTransitioning(false);
        document.documentElement.classList.remove("theme-transitioning");
      }, 400);
    });
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("jg-theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, isTransitioning }}>
      {children}
    </ThemeContext.Provider>
  );
};

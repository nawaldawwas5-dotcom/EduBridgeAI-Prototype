
import React, { createContext, useContext, useEffect, useState } from 'react';
import { ThemeType } from './types';

interface ThemeContextType {
  isDarkMode: boolean;
  theme: ThemeType;
  toggleDarkMode: () => void;
  setTheme: (theme: ThemeType) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('edubridge_dark_mode');
    return saved ? JSON.parse(saved) : false;
  });

  const [theme, setThemeState] = useState<ThemeType>(() => {
    const saved = localStorage.getItem('edubridge_theme_type');
    return (saved as ThemeType) || 'classic';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    root.setAttribute('data-theme', theme);
    localStorage.setItem('edubridge_dark_mode', JSON.stringify(isDarkMode));
    localStorage.setItem('edubridge_theme_type', theme);
  }, [isDarkMode, theme]);

  const toggleDarkMode = () => setIsDarkMode((prev) => !prev);
  const setTheme = (t: ThemeType) => setThemeState(t);

  return (
    <ThemeContext.Provider value={{ isDarkMode, theme, toggleDarkMode, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

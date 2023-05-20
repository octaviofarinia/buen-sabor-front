import { createContext, useContext, useState } from 'react';

interface ThemeContextProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
}
interface ThemeProviderProps {
  children: React.ReactNode;
}

const ThemeContext = createContext<ThemeContextProps>({} as ThemeContextProps);

const ThemeContextProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    console.log(isDarkMode)
  };

  const darkModeClass = isDarkMode ? 'dark' : ''; // Agrega la clase 'dark' si el modo oscuro está habilitado

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      <div className={`app ${darkModeClass}`}>{children}</div>
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextProps => {
  const context = useContext(ThemeContext);
  return context;
};
export { ThemeContext, ThemeContextProvider };

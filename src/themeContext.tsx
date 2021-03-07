import React, { useEffect, useState } from 'react';

interface IValue {
  theme: string;
  toggleTheme: () => void;
}

interface IProps {
  children: React.ReactNode;
}

const ThemeContext = React.createContext({} as IValue);

const ThemeContextProvider: React.FC<IProps> = ({ children }: IProps) => {
  const [theme, setTheme] = useState('Dark');

  useEffect(() => {
    console.log(theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'Light' ? 'Dark' : 'Light');
  };

  return (
    <ThemeContext.Provider value={{ theme: theme, toggleTheme: toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeContextProvider, ThemeContext };

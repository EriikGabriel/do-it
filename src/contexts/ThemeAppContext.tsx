import { createContext } from "react";
import { DefaultTheme } from "styled-components";
type ThemeAppContextProps = {
  theme: DefaultTheme;
  toggleTheme: () => void;
};

export const ThemeAppContext = createContext({} as ThemeAppContextProps);

import { createContext, ReactNode, useState } from "react";

type MenuContextType = {
  optionsName: string;
  setNewOptionsName: (name: string) => void;
};

type MenuContextProviderProps = {
  children: ReactNode;
};

export const MenuContext = createContext({} as MenuContextType);

export function MenuContextProvider(props: MenuContextProviderProps) {
  const [optionsName, setOptionsName] = useState("");

  function setNewOptionsName(name: string) {
    setOptionsName(name);
  }

  return <MenuContext.Provider value={{ optionsName, setNewOptionsName }}>{props.children}</MenuContext.Provider>;
}

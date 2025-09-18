"use client";
import { createContext, useContext, ReactNode } from "react";
import { useScroll, useMobileMenu, useSubmenu } from "../hooks";

interface HeaderContextType {
  // Scroll hook'undan
  scroll: boolean;

  // Mobile Menu hook'undan
  isMenuActive: boolean;
  toggleMenu: () => void;
  closeMenu: () => void;

  // Submenu hook'undan
  activeSubmenu: number | null;
  handleSubmenuClick: (index: number) => void;
}

const HeaderContext = createContext<HeaderContextType | undefined>(undefined);

interface HeaderProviderProps {
  children: ReactNode;
}

export const HeaderProvider = ({ children }: HeaderProviderProps) => {
  // Hook'ları burada çağırıyoruz
  const scroll = useScroll();
  const { isMenuActive, toggleMenu, closeMenu } = useMobileMenu();
  const { activeSubmenu, handleSubmenuClick } = useSubmenu();

  const value: HeaderContextType = {
    // Scroll durumu
    scroll,

    // Mobile Menu durumu ve metodları
    isMenuActive,
    toggleMenu,
    closeMenu,

    // Submenu durumu ve metodları
    activeSubmenu,
    handleSubmenuClick,
  };

  return (
    <HeaderContext.Provider value={value}>{children}</HeaderContext.Provider>
  );
};

// Context'i kullanmak için custom hook
export const useHeader = () => {
  const context = useContext(HeaderContext);

  if (context === undefined) {
    throw new Error("useHeader hook'u HeaderProvider içinde kullanılmalıdır");
  }

  return context;
};

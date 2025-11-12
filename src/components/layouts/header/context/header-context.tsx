"use client";
import { createContext, useContext, ReactNode, useMemo } from "react";
import {
  useScroll,
  useMobileMenu,
  useSubmenu,
  useDynamicLists,
  useDynamicFavoriteSearches,
} from "../hooks";
import { menuItems as staticMenuItems } from "../config";
import { MenuItem } from "../types";
import { Loading } from "@/components/ui";
import { useAuth } from "@/contexts";

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

  // Menu bilgileri (static)
  menuItems: MenuItem[];
}

const HeaderContext = createContext<HeaderContextType | undefined>(undefined);

interface HeaderProviderProps {
  children: ReactNode;
}

export const HeaderProvider = ({ children }: HeaderProviderProps) => {
  // Hook'ları burada çağırıyoruz

  const { isLoading, user } = useAuth();

  const scroll = useScroll();
  const { isMenuActive, toggleMenu, closeMenu } = useMobileMenu();
  const { activeSubmenu, handleSubmenuClick } = useSubmenu();
  const { listMenuLinks, loading: listsLoading } = useDynamicLists();
  const { favoriteSearchMenuLinks, loading: favSearchLoading } =
    useDynamicFavoriteSearches();

  // Dinamik menü öğeleri oluştur
  const menuItems = useMemo(() => {
    // Kullanıcı giriş yapmamışsa statik menü öğelerini kullan
    if (!user) {
      return staticMenuItems;
    }

    // Menü öğelerini dinamik olarak güncelle
    return staticMenuItems.map((item) => {
      // "Listelerim" menü öğesini bul ve güncelle
      if (item.label === "Listelerim" && listMenuLinks.length > 0) {
        return {
          ...item,
          links: listMenuLinks,
        };
      }

      // "Favori Aramalarım" menü öğesini bul ve güncelle
      if (
        item.label === "Favori Aramalarım" &&
        favoriteSearchMenuLinks.length > 0
      ) {
        return {
          ...item,
          links: favoriteSearchMenuLinks,
        };
      }

      return item;
    });
  }, [user, listMenuLinks, favoriteSearchMenuLinks]);

  if (isLoading) return <Loading />;

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

    // Menu bilgileri (dinamik)
    menuItems,
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

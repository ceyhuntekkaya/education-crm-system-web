import { useState } from "react";
import { HEADER_CONFIG } from "../config";
import { useWindowWidth } from "./use-window-width";

export const useSubmenu = () => {
  const [activeSubmenu, setActiveSubmenu] = useState<number | null>(null);
  const windowWidth = useWindowWidth();

  const handleSubmenuClick = (index: number) => {
    if (windowWidth < HEADER_CONFIG.MOBILE_BREAKPOINT) {
      setActiveSubmenu((prevIndex) => (prevIndex === index ? null : index));
    }
  };

  return {
    activeSubmenu,
    handleSubmenuClick,
  };
};

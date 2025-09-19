import { useState, useEffect } from "react";
import { HEADER_CONFIG } from "../config";

export const useScroll = () => {
  const [scroll, setScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset < HEADER_CONFIG.SCROLL_THRESHOLD) {
        setScroll(false);
      } else {
        setScroll(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return scroll;
};
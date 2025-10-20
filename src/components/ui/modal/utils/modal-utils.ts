import { ModalSize, ModalPosition } from "../types";

/**
 * Modal boyutlarını hesaplar
 */
export const getModalMaxWidth = (size: ModalSize): string => {
  switch (size) {
    case "sm":
      return "500px";
    case "md":
      return "700px";
    case "lg":
      return "900px";
    case "xl":
      return "1200px";
    case "fullscreen":
      return "100vw";
    default:
      return "700px";
  }
};

/**
 * Modal pozisyonunu hesaplar
 */
export const getAlignItems = (position: ModalPosition): string => {
  switch (position) {
    case "top":
      return "flex-start";
    case "bottom":
      return "flex-end";
    case "center":
    default:
      return "center";
  }
};

/**
 * Justify content pozisyonunu hesaplar
 */
export const getJustifyContent = (
  justify?: "start" | "center" | "end" | "between" | "around" | "evenly"
): string => {
  switch (justify) {
    case "start":
      return "flex-start";
    case "center":
      return "center";
    case "end":
      return "flex-end";
    case "between":
      return "space-between";
    case "around":
      return "space-around";
    case "evenly":
      return "space-evenly";
    default:
      return "flex-end";
  }
};

/**
 * Gap boyutunu hesaplar
 */
export const getGapSize = (gap?: "sm" | "md" | "lg"): string => {
  switch (gap) {
    case "sm":
      return "8px";
    case "md":
      return "12px";
    case "lg":
      return "16px";
    default:
      return "12px";
  }
};

/**
 * Modal animasyon transform'unu hesaplar
 */
export const getAnimationTransform = (
  animated: boolean,
  isOpen: boolean
): string => {
  if (!animated) return "scale(1)";
  return isOpen ? "scale(1)" : "scale(0.95)";
};

/**
 * Modal animasyon opacity'sini hesaplar
 */
export const getAnimationOpacity = (
  animated: boolean,
  isOpen: boolean
): number => {
  if (!animated) return 1;
  return isOpen ? 1 : 0;
};

/**
 * Modal animasyon transition'ını hesaplar
 */
export const getAnimationTransition = (animated: boolean): string => {
  return animated ? "all 0.2s ease" : "none";
};

/**
 * Body scroll durumunu yönetir
 */
export const setBodyScrollLock = (locked: boolean) => {
  if (locked) {
    document.body.style.overflow = "hidden";
    document.body.classList.add("modal-open");
  } else {
    document.body.style.overflow = "";
    document.body.classList.remove("modal-open");
  }
};

/**
 * Focus yönetimi için utility
 */
export const manageFocus = {
  save: (): Element | null => {
    return document.activeElement;
  },

  restore: (element: Element | null) => {
    if (element instanceof HTMLElement) {
      element.focus();
    }
  },

  setTo: (element: HTMLElement | null) => {
    if (element) {
      element.focus();
    }
  },
};

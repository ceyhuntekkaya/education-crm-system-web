"use client";

import { useCallback } from "react";

/**
 * Klavye event handler'larını yönetir
 */
export const useModalKeyboard = (
  isOpen: boolean,
  closeOnEscape: boolean,
  onClose: () => void
) => {
  // ESC tuşu event handler'ı
  const handleEscapeKey = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape" && closeOnEscape && isOpen) {
        onClose();
      }
    },
    [closeOnEscape, isOpen, onClose]
  );

  return { handleEscapeKey };
};

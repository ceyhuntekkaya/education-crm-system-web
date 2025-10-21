"use client";

import { useEffect, useCallback, useRef } from "react";
import { setBodyScrollLock, manageFocus } from "../utils/modal-utils";

/**
 * Modal'ın açılma/kapanma side effect'lerini yönetir
 */
export const useModalEffects = (
  isOpen: boolean,
  closeOnEscape: boolean,
  onOpen?: () => void,
  onClosed?: () => void
) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<Element | null>(null);

  // ESC tuşu event handler'ı
  const handleEscapeKey = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape" && closeOnEscape && isOpen) {
        // onClose'u parent'tan almalıyız, bu hook'u genişletebiliriz
      }
    },
    [closeOnEscape, isOpen]
  );

  // Modal açıldığında/kapandığında side effect'ler
  useEffect(() => {
    if (isOpen) {
      // Önceki aktif elementi kaydet
      previousActiveElement.current = manageFocus.save();

      // Body scroll'u engelle
      setBodyScrollLock(true);

      // Focus management
      manageFocus.setTo(modalRef.current);

      // onOpen callback'i çağır
      onOpen?.();
    } else {
      // Body scroll'u serbest bırak
      setBodyScrollLock(false);

      // Focus'u geri yükle
      manageFocus.restore(previousActiveElement.current);

      // onClosed callback'i çağır
      onClosed?.();
    }

    // Cleanup - Modal kapandığında her zaman scroll'u serbest bırak
    return () => {
      setBodyScrollLock(false);
    };
  }, [isOpen, onOpen, onClosed]);

  // ESC tuşu event listener'ı
  useEffect(() => {
    if (isOpen && closeOnEscape) {
      document.addEventListener("keydown", handleEscapeKey);
      return () => document.removeEventListener("keydown", handleEscapeKey);
    }
  }, [isOpen, closeOnEscape, handleEscapeKey]);

  // Component unmount olduğunda body scroll'u serbest bırak
  useEffect(() => {
    return () => {
      setBodyScrollLock(false);
    };
  }, []);

  return { modalRef };
};

/**
 * Modal event handler'larını yönetir
 */
export const useModalHandlers = (
  closeOnBackdropClick: boolean,
  onClose: () => void
) => {
  // Backdrop click handler'ı
  const handleBackdropClick = useCallback(
    (e: React.MouseEvent) => {
      // Sadece backdrop'a tıklanırsa (event target'ı modal overlay ise) çağır
      if (e.target === e.currentTarget && closeOnBackdropClick) {
        onClose();
      }
    },
    [closeOnBackdropClick, onClose]
  );

  return { handleBackdropClick };
};

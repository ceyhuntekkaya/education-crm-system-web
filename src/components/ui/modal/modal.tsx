"use client";

import React, { useEffect, useCallback, useRef } from "react";
import { createPortal } from "react-dom";
import { ModalProps, ModalSize } from "./types";
import { ModalBackdrop, ModalHeader, ModalBody, ModalFooter } from "./sections";
import { ModalProvider, ModalContextValue } from "./contexts";
import { setBodyScrollLock, manageFocus } from "./utils";
import { useModalKeyboard, useModalStyles } from "./hooks";

/**
 * Ana Modal Component
 * AppointmentDetailModal'daki yapıya dayalı, temiz ve modern modal component'i
 */
const ModalComponent: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  size = "md",
  position = "center",
  variant = "default",
  closeOnBackdropClick = true,
  closeOnEscape = true,
  scrollable = false,
  animated = true,
  className = "",
  zIndex = 9999,
  onOpen,
  onClosed,
  ariaLabel,
  ariaDescribedBy,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<Element | null>(null);

  // Keyboard hook'u kullan
  const { handleEscapeKey } = useModalKeyboard(isOpen, closeOnEscape, onClose);

  // Style hook'u kullan
  const { overlayStyles, contentStyles, contentClassName } = useModalStyles(
    size,
    position,
    animated,
    isOpen,
    zIndex,
    className
  );

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
      // Component unmount olurken her durumda scroll'u serbest bırak
      setBodyScrollLock(false);
    };
  }, []);

  // Modal context değerini hazırla
  const modalContextValue: ModalContextValue = {
    isOpen,
    onClose,
    size,
    position,
    variant,
    closeOnBackdropClick,
    closeOnEscape,
    scrollable,
    animated,
    className,
    zIndex,
    onOpen,
    onClosed,
    ariaLabel,
    ariaDescribedBy,
    modalRef,
  };

  // Modal content'i render et
  const renderModalContent = () => (
    <div
      className="modal-overlay"
      style={overlayStyles}
      onClick={handleBackdropClick}
    >
      {/* Modal Content */}
      <div
        ref={modalRef}
        className={contentClassName}
        style={contentStyles}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={ariaLabel}
        aria-describedby={ariaDescribedBy}
        tabIndex={-1}
      >
        <ModalProvider value={modalContextValue}>{children}</ModalProvider>
      </div>
    </div>
  );

  // Portal ile render et
  if (!isOpen) return null;

  return createPortal(renderModalContent(), document.body);
};

// Compound component interface
interface ModalWithSubComponents extends React.FC<ModalProps> {
  Header: typeof ModalHeader;
  Body: typeof ModalBody;
  Footer: typeof ModalFooter;
  Backdrop: typeof ModalBackdrop;
}

// Compound component oluştur
export const Modal = ModalComponent as ModalWithSubComponents;

// Sub-component'leri ekle
Modal.Header = ModalHeader;
Modal.Body = ModalBody;
Modal.Footer = ModalFooter;
Modal.Backdrop = ModalBackdrop;

// Default export as compound component
const ModalWithSubComponentsDefault = Modal as ModalWithSubComponents;
export default ModalWithSubComponentsDefault;

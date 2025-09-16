"use client";

import React, { useEffect, useCallback, useRef } from "react";
import { createPortal } from "react-dom";
import { ModalProps, ModalSize } from "./types";
import { ModalBackdrop } from "./modal-backdrop";
import { ModalHeader } from "./modal-header";
import { ModalBody } from "./modal-body";
import { ModalFooter } from "./modal-footer";

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

  // Modal boyutlarını hesapla
  const getModalMaxWidth = (modalSize: ModalSize): string => {
    switch (modalSize) {
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

  // Modal pozisyonunu hesapla
  const getAlignItems = (): string => {
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

  // ESC tuşu event handler'ı
  const handleEscapeKey = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape" && closeOnEscape && isOpen) {
        onClose();
      }
    },
    [closeOnEscape, isOpen, onClose]
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
      previousActiveElement.current = document.activeElement;

      // Body scroll'u engelle
      document.body.style.overflow = "hidden";
      document.body.classList.add("modal-open");

      // Focus management
      if (modalRef.current) {
        modalRef.current.focus();
      }

      // onOpen callback'i çağır
      onOpen?.();
    } else {
      // Body scroll'u serbest bırak
      document.body.style.overflow = "";
      document.body.classList.remove("modal-open");

      // Focus'u geri yükle
      if (previousActiveElement.current instanceof HTMLElement) {
        previousActiveElement.current.focus();
      }

      // onClosed callback'i çağır
      onClosed?.();
    }

    // Cleanup - Modal kapandığında her zaman scroll'u serbest bırak
    return () => {
      document.body.style.overflow = "";
      document.body.classList.remove("modal-open");
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
      document.body.style.overflow = "";
      document.body.classList.remove("modal-open");
    };
  }, []);

  // Modal content'i render et
  const renderModalContent = () => (
    <div
      className="modal-overlay"
      style={{
        zIndex,
        alignItems: getAlignItems(),
      }}
      onClick={handleBackdropClick}
    >
      {/* Modal Content */}
      <div
        ref={modalRef}
        className={`modal-content ${className}`}
        style={{
          backgroundColor: "white",
          borderRadius: "12px",
          maxWidth: getModalMaxWidth(size),
          width: "100%",
          maxHeight: size === "fullscreen" ? "100vh" : "90vh",
          overflow: "hidden",
          boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
          position: "relative",
          zIndex: zIndex + 1,
          transform: animated
            ? isOpen
              ? "scale(1)"
              : "scale(0.95)"
            : "scale(1)",
          opacity: animated ? (isOpen ? 1 : 0) : 1,
          transition: animated ? "all 0.2s ease" : "none",
          display: "flex",
          flexDirection: "column",
        }}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={ariaLabel}
        aria-describedby={ariaDescribedBy}
        tabIndex={-1}
      >
        {children}
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

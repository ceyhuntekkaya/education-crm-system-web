"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";

// Modal variant types
export type ModalVariant =
  | "default"
  | "success"
  | "warning"
  | "danger"
  | "info"
  | "dark";

// Modal size types
export type ModalSize = "sm" | "md" | "lg" | "xl" | "fullscreen";

// Modal position types
export type ModalPosition = "center" | "top" | "bottom";

export interface ModalProps {
  // Core functionality
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;

  // Header props
  title?: string;
  showHeader?: boolean;
  showCloseButton?: boolean;

  // Content props
  size?: ModalSize;
  variant?: ModalVariant;
  position?: ModalPosition;

  // Behavior props
  backdrop?: boolean | "static"; // true: closable backdrop, false: no backdrop, "static": non-closable backdrop
  keyboard?: boolean; // ESC key closes modal
  scrollable?: boolean; // enable scrolling in modal body
  centered?: boolean; // vertically center modal
  animation?: boolean; // enable animations

  // Layout props
  className?: string;
  modalClassName?: string;
  backdropClassName?: string;

  // Event handlers
  onShow?: () => void;
  onHide?: () => void;
  onBackdropClick?: () => void;
  onEscapePress?: () => void;

  // Accessibility
  ariaLabel?: string;
  ariaDescribedBy?: string;
  autoFocus?: boolean;

  // Footer props (optional)
  footer?: React.ReactNode;
  showFooter?: boolean;
}

// Modal Header Component
interface ModalHeaderProps {
  title?: string;
  onClose?: () => void;
  showCloseButton?: boolean;
  className?: string;
}

const ModalHeader: React.FC<ModalHeaderProps> = ({
  title,
  onClose,
  showCloseButton = true,
  className = "",
}) => (
  <div className={`modal-header ${className}`}>
    {title && <h5 className="modal-title">{title}</h5>}
    {showCloseButton && (
      <button
        type="button"
        className="modal-close-btn"
        onClick={onClose}
        aria-label="Kapat"
      >
        <i className="ph ph-x" aria-hidden="true"></i>
      </button>
    )}
  </div>
);

// Modal Body Component
interface ModalBodyProps {
  children: React.ReactNode;
  scrollable?: boolean;
  className?: string;
}

const ModalBody: React.FC<ModalBodyProps> = ({
  children,
  scrollable = false,
  className = "",
}) => (
  <div
    className={`modal-body ${
      scrollable ? "modal-body-scrollable" : ""
    } ${className}`}
  >
    {children}
  </div>
);

// Modal Footer Component
interface ModalFooterProps {
  children: React.ReactNode;
  className?: string;
}

const ModalFooter: React.FC<ModalFooterProps> = ({
  children,
  className = "",
}) => <div className={`modal-footer ${className}`}>{children}</div>;

// Main Modal Component
const ModalComponent: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  title,
  showHeader = true,
  showCloseButton = true,
  size = "md",
  variant = "default",
  position = "center",
  backdrop = true,
  keyboard = true,
  scrollable = false,
  centered = false,
  animation = true,
  className = "",
  modalClassName = "",
  backdropClassName = "",
  onShow,
  onHide,
  onBackdropClick,
  onEscapePress,
  ariaLabel,
  ariaDescribedBy,
  autoFocus = true,
  footer,
  showFooter = false,
}) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<Element | null>(null);

  // Modal gösterme işlemi
  const showModal = useCallback(() => {
    if (isOpen && !isVisible) {
      // Focus yönetimi
      previousActiveElement.current = document.activeElement;

      setIsVisible(true);
      setIsAnimating(true);

      // Body scroll'u engelle
      document.body.style.overflow = "hidden";
      document.body.classList.add("modal-open");

      // Animation süresince bekle
      if (animation) {
        setTimeout(() => setIsAnimating(false), 150);
      } else {
        setIsAnimating(false);
      }

      // Event callback
      onShow?.();
    }
  }, [isOpen, isVisible, animation, onShow]);

  // Modal gizleme işlemi
  const hideModal = useCallback(() => {
    if (isVisible) {
      setIsAnimating(true);

      // Animation süresince bekle
      const hideTimeout = setTimeout(
        () => {
          setIsVisible(false);
          setIsAnimating(false);

          // Body scroll'u serbest bırak
          document.body.style.overflow = "";
          document.body.classList.remove("modal-open");

          // Focus'u geri yükle
          if (previousActiveElement.current instanceof HTMLElement) {
            previousActiveElement.current.focus();
          }

          // Event callback
          onHide?.();
        },
        animation ? 150 : 0
      );

      return () => clearTimeout(hideTimeout);
    }
  }, [isVisible, animation, onHide]);

  // isOpen prop değişikliklerini dinle
  useEffect(() => {
    if (isOpen) {
      showModal();
    } else {
      hideModal();
    }
  }, [isOpen, showModal, hideModal]);

  // Keyboard events (ESC tuşu)
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && keyboard && isVisible) {
        onEscapePress?.();
        onClose();
      }
    };

    if (isVisible) {
      document.addEventListener("keydown", handleEscapeKey);
      return () => document.removeEventListener("keydown", handleEscapeKey);
    }
  }, [isVisible, keyboard, onClose, onEscapePress]);

  // Backdrop click handler
  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === backdropRef.current && backdrop === true) {
      onBackdropClick?.();
      onClose();
    }
  };

  // Focus trap (modal içinde focus'u yakala)
  useEffect(() => {
    if (isVisible && autoFocus && modalRef.current) {
      const focusableElements = modalRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );

      if (focusableElements.length > 0) {
        (focusableElements[0] as HTMLElement).focus();
      }
    }
  }, [isVisible, autoFocus]);

  // CSS class'ları oluştur
  const modalClasses = [
    "modal",
    `modal-${size}`,
    `modal-${variant}`,
    position !== "center" ? `modal-${position}` : "",
    centered ? "modal-centered" : "",
    scrollable ? "modal-scrollable" : "",
    animation ? "modal-animated" : "",
    isAnimating ? (isOpen ? "modal-entering" : "modal-leaving") : "",
    isVisible ? "modal-show" : "",
    modalClassName,
  ]
    .filter(Boolean)
    .join(" ");

  const backdropClasses = [
    "modal-backdrop",
    animation ? "modal-backdrop-animated" : "",
    isVisible ? "modal-backdrop-show" : "",
    backdropClassName,
  ]
    .filter(Boolean)
    .join(" ");

  // Modal content
  const modalContent = (
    <>
      {/* Backdrop */}
      {backdrop !== false && (
        <div
          ref={backdropRef}
          className={backdropClasses}
          onClick={handleBackdropClick}
          role="presentation"
        />
      )}

      {/* Modal Dialog */}
      <div
        ref={modalRef}
        className={`modal-dialog ${className}`}
        role="dialog"
        aria-modal="true"
        aria-label={ariaLabel || title}
        aria-describedby={ariaDescribedBy}
        tabIndex={-1}
      >
        <div className={modalClasses}>
          {/* Header */}
          {showHeader && (title || showCloseButton) && (
            <ModalHeader
              title={title}
              onClose={onClose}
              showCloseButton={showCloseButton}
            />
          )}

          {/* Body */}
          <ModalBody scrollable={scrollable}>{children}</ModalBody>

          {/* Footer */}
          {showFooter && footer && <ModalFooter>{footer}</ModalFooter>}
        </div>
      </div>
    </>
  );

  // Portal ile render et (document.body'ye)
  return isVisible ? createPortal(modalContent, document.body) : null;
};

// Extended Modal type with sub-components
interface ModalWithSubComponents extends React.FC<ModalProps> {
  Header: React.FC<ModalHeaderProps>;
  Body: React.FC<ModalBodyProps>;
  Footer: React.FC<ModalFooterProps>;
}

// Create the final Modal component with sub-components
export const Modal = ModalComponent as ModalWithSubComponents;

// Alt komponentleri export et
Modal.Header = ModalHeader;
Modal.Body = ModalBody;
Modal.Footer = ModalFooter;

export default Modal;

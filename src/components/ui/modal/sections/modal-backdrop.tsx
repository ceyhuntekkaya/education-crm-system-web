"use client";

import React from "react";
import { ModalBackdropProps } from "../types";
import { useModalContextOptional } from "../contexts";

/**
 * Modal Backdrop Component
 * Modal'ın arka plan overlay'ini render eder
 */
export const ModalBackdrop: React.FC<ModalBackdropProps> = ({
  onClick,
  className = "",
  animated,
  show = true,
}) => {
  // Modal context'ten props'lara erişim (opsiyonel)
  const modalContext = useModalContextOptional();

  // animated önceliği: prop > context > true
  const isAnimated =
    animated !== undefined ? animated : modalContext?.animated || true;

  // onClick önceliği: prop > context > undefined
  const handleOnClick =
    onClick ||
    (modalContext?.closeOnBackdropClick ? modalContext.onClose : undefined);

  if (!show) return null;

  const handleClick = (e: React.MouseEvent) => {
    // Sadece backdrop'a tıklanırsa çağır (event bubbling önlemek için)
    if (e.target === e.currentTarget && handleOnClick) {
      handleOnClick();
    }
  };

  return (
    <div
      className={`modal-backdrop ${className}`}
      onClick={handleClick}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.6)",
        backdropFilter: "blur(4px)",
        zIndex: 1040,
        cursor: handleOnClick ? "pointer" : "default",
        transition: isAnimated ? "opacity 0.2s ease" : "none",
      }}
      role="presentation"
      aria-hidden="true"
    />
  );
};

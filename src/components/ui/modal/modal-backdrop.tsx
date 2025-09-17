"use client";

import React from "react";
import { ModalBackdropProps } from "./types";

/**
 * Modal Backdrop Component
 * Modal'ın arka plan overlay'ini render eder
 */
export const ModalBackdrop: React.FC<ModalBackdropProps> = ({
  onClick,
  className = "",
  animated = true,
  show = true,
}) => {
  if (!show) return null;

  const handleClick = (e: React.MouseEvent) => {
    // Sadece backdrop'a tıklanırsa çağır (event bubbling önlemek için)
    if (e.target === e.currentTarget && onClick) {
      onClick();
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
        cursor: onClick ? "pointer" : "default",
        transition: animated ? "opacity 0.2s ease" : "none",
      }}
      role="presentation"
      aria-hidden="true"
    />
  );
};

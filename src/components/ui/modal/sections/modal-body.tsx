"use client";

import React from "react";
import { ModalBodyProps } from "../types";
import { useModalContext } from "../contexts";

/**
 * Modal Body Component
 * Modal'ın ana içerik bölümünü render eder
 */
export const ModalBody: React.FC<ModalBodyProps> = ({
  children,
  scrollable,
  className = "",
  noPadding = false,
}) => {
  // Modal context'ten props'lara erişim
  const modalContext = useModalContext();

  // scrollable önceliği: prop > context > false
  const isScrollable =
    scrollable !== undefined ? scrollable : modalContext.scrollable || false;

  const baseStyles: React.CSSProperties = {
    padding: noPadding ? "0" : "32px",
    flex: "1 1 auto",
  };

  const scrollableStyles: React.CSSProperties = isScrollable
    ? {
        overflow: "auto",
        maxHeight: "calc(90vh - 200px)",
      }
    : {};

  return (
    <div
      className={`modal-body ${
        isScrollable ? "modal-body-scrollable" : ""
      } ${className}`}
      style={{
        ...baseStyles,
        ...scrollableStyles,
      }}
    >
      {children}
    </div>
  );
};

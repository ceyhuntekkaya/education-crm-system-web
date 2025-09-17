"use client";

import React from "react";
import { ModalBodyProps } from "./types";

/**
 * Modal Body Component
 * Modal'ın ana içerik bölümünü render eder
 */
export const ModalBody: React.FC<ModalBodyProps> = ({
  children,
  scrollable = false,
  className = "",
  noPadding = false,
}) => {
  const baseStyles: React.CSSProperties = {
    padding: noPadding ? "0" : "32px",
    flex: "1 1 auto",
  };

  const scrollableStyles: React.CSSProperties = scrollable
    ? {
        overflow: "auto",
        maxHeight: "calc(90vh - 200px)",
      }
    : {};

  return (
    <div
      className={`modal-body ${
        scrollable ? "modal-body-scrollable" : ""
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

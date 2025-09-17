"use client";

import React from "react";
import { ModalFooterProps } from "./types";

/**
 * Modal Footer Component
 * Modal'ın alt kısım bölümünü render eder
 */
export const ModalFooter: React.FC<ModalFooterProps> = ({
  children,
  className = "",
  justify = "end",
  gap = "md",
}) => {
  const getJustifyContent = () => {
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

  const getGapSize = () => {
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

  return (
    <div
      className={`modal-footer ${className}`}
      style={{
        padding: "24px 32px",
        borderTop: "1px solid #e5e7eb",
        display: "flex",
        justifyContent: getJustifyContent(),
        alignItems: "center",
        gap: getGapSize(),
        minHeight: "80px",
        backgroundColor: "#fafafa",
      }}
    >
      {children}
    </div>
  );
};

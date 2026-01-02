"use client";

import React from "react";
import { QuotationsInfo, SortDropdown, ViewModeToggle } from "./sections";
import { useQuotationsContext } from "../../contexts";

/**
 * 📋 HEADER COMPONENT
 * Fiyat teklifleri header - info, sıralama ve görünüm kontrolü
 */
export const Header: React.FC = () => {
  const { showSortDropdown } = useQuotationsContext();

  return (
    <div
      className="bg-white rounded-16 mb-24 d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center transition-all"
      style={{
        border: "1.5px solid hsl(var(--neutral-40))",
        boxShadow:
          "0 4px 12px rgba(0, 0, 0, 0.08), 0 2px 4px rgba(0, 0, 0, 0.04)",
        padding: "16px",
        overflow: "visible",
        position: "relative",
        zIndex: showSortDropdown ? 10000 : "auto",
      }}
    >
      {/* Left Side - Info */}
      <QuotationsInfo />

      {/* Right Side - Sort & View Controls */}
      <div
        className="d-flex align-items-center gap-12 flex-shrink-0"
        style={{ overflow: "visible" }}
      >
        <SortDropdown />
        <ViewModeToggle />
      </div>
    </div>
  );
};

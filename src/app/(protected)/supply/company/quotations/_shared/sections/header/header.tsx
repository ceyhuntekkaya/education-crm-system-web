"use client";

import React from "react";
import {
  QuotationsInfo,
  AddQuotationButton,
  SortDropdown,
  ViewModeToggle,
} from "./sections";
import { useQuotationsContext } from "../../contexts";

/**
 * 📋 HEADER COMPONENT
 * Alım ilanları header - info, sıralama ve görünüm kontrolü
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

      {/* Right Side - Controls & Actions */}
      <div
        className="d-flex align-items-center gap-20 flex-shrink-0 flex-wrap"
        style={{ overflow: "visible" }}
      >
        {/* Content Controls Group - Sort & View */}
        <div
          className="d-flex align-items-center"
          style={{
            overflow: "visible",
            gap: "20px",
          }}
        >
          <SortDropdown />

          {/* Mini Divider between related controls */}
          <div
            className="d-none d-lg-block"
            style={{
              width: "1px",
              height: "24px",
              backgroundColor: "hsl(var(--neutral-100))",
            }}
          ></div>

          <ViewModeToggle />
        </div>

        {/* Main Divider - Separates controls from primary action */}
        <div
          className="d-none d-md-block"
          style={{
            width: "2px",
            height: "40px",
            background:
              "linear-gradient(180deg, transparent 0%, hsl(var(--neutral-200)) 20%, hsl(var(--neutral-200)) 80%, transparent 100%)",
            margin: "0 4px",
          }}
        ></div>

        {/* Primary Action - Create New Quotation (Most prominent position) */}
        <AddQuotationButton />
      </div>
    </div>
  );
};

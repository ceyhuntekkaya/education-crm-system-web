"use client";

import React, { useRef } from "react";
import { useSuppliersContext } from "../../../contexts";

/**
 * 🔍 SEARCH INPUT
 * Firma arama bileşeni
 */
export const SearchInput: React.FC = () => {
  const { filters, filterHandlers } = useSuppliersContext();
  const inputRef = useRef<HTMLInputElement>(null);
  const hasSearch = filters.searchQuery.trim().length > 0;

  return (
    <div
      className="d-flex align-items-center rounded-12 transition-all"
      style={{
        background: "rgba(255, 255, 255, 0.95)",
        border: "1px solid rgba(17, 24, 39, 0.06)",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)",
        padding: "2px",
        gap: "2px",
        height: "32px",
        minWidth: "180px",
      }}
    >
      <div
        className="d-flex align-items-center justify-content-center"
        style={{ width: "28px", height: "28px" }}
      >
        <i
          className="ph-duotone ph-magnifying-glass"
          style={{
            fontSize: "14px",
            color: hasSearch ? "#3b82f6" : "#9ca3af",
            transition: "color 0.2s ease",
          }}
        />
      </div>

      <input
        ref={inputRef}
        type="text"
        placeholder="Firmada ara..."
        value={filters.searchQuery}
        onChange={(e) => filterHandlers.setSearchQuery(e.target.value)}
        className="form-control flex-grow-1"
        style={{
          border: "none",
          background: "transparent",
          padding: "0 6px",
          fontSize: "11px",
          fontWeight: 500,
          color: "#374151",
          outline: "none",
          boxShadow: "none",
          height: "28px",
        }}
      />

      {hasSearch && (
        <button
          type="button"
          className="btn p-0 d-flex align-items-center justify-content-center transition-all rounded-8"
          onClick={() => {
            filterHandlers.setSearchQuery("");
            inputRef.current?.focus();
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "rgba(239, 68, 68, 0.1)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "transparent";
          }}
          style={{
            width: "28px",
            height: "28px",
            border: "none",
            color: "#ef4444",
            fontSize: "12px",
            background: "transparent",
          }}
        >
          <i className="ph-bold ph-x" />
        </button>
      )}
    </div>
  );
};

"use client";

import React from "react";

interface ResetFiltersButtonProps {
  activeCount: number;
  onReset: () => void;
}

/**
 * �️ RESET FILTERS BUTTON
 * Aktif filtreleri temizleme butonu
 */
export const ResetFiltersButton: React.FC<ResetFiltersButtonProps> = ({
  activeCount,
  onReset,
}) => {
  if (activeCount === 0) return null;

  return (
    <button
      type="button"
      className="d-flex align-items-center gap-6 transition-all rounded-12"
      onClick={onReset}
      style={{
        padding: "6px 10px",
        background: "rgba(239, 68, 68, 0.08)",
        border: "1px solid rgba(239, 68, 68, 0.2)",
        color: "#ef4444",
        fontSize: "11px",
        fontWeight: 500,
        height: "32px",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = "rgba(239, 68, 68, 0.12)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "rgba(239, 68, 68, 0.08)";
      }}
    >
      <i className="ph-bold ph-x-circle" style={{ fontSize: "14px" }} />
      <span
        className="rounded-pill d-flex align-items-center justify-content-center"
        style={{
          background: "#ef4444",
          color: "white",
          fontSize: "9px",
          fontWeight: 600,
          minWidth: "18px",
          height: "18px",
          padding: "0 5px",
        }}
      >
        {activeCount}
      </span>
    </button>
  );
};

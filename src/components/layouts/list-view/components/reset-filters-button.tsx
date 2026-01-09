"use client";

import React from "react";

interface ResetFiltersButtonProps {
  activeCount: number;
  onReset: () => void;
}

/**
 * 🔄 RESET FILTERS BUTTON
 * Filtreleri sıfırlama butonu
 */
export const ResetFiltersButton: React.FC<ResetFiltersButtonProps> = ({ activeCount, onReset }) => {
  if (activeCount === 0) return null;

  return (
    <button
      type="button"
      onClick={onReset}
      className="btn btn-text d-flex align-items-center gap-6 px-12 py-6"
      style={{
        height: "36px",
        borderRadius: "8px",
        fontSize: "14px",
        fontWeight: 500,
        color: "hsl(var(--danger-500))",
        border: "1px solid hsl(var(--danger-200))",
        background: "hsl(var(--danger-50))",
      }}
    >
      <i className="bi bi-x-circle" style={{ fontSize: "16px" }} />
      <span>Filtreleri Temizle</span>
      <span
        className="badge bg-danger-500 text-white"
        style={{
          fontSize: "11px",
          padding: "2px 6px",
          borderRadius: "12px",
          minWidth: "18px",
        }}
      >
        {activeCount}
      </span>
    </button>
  );
};

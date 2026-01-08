"use client";

import React from "react";
import { useWishlistContext } from "../../../contexts";

/**
 * ℹ️ SELECTION INFO BAR
 * Seçim modu bilgi badge'i - kompakt gösterim
 */
export const SelectionInfoBar: React.FC = () => {
  const { selectedCount, totalCount } = useWishlistContext();

  return (
    <div className="d-flex align-items-center gap-8 flex-wrap">
      <div
        className="d-inline-flex align-items-center gap-8 px-12 py-8 rounded-12"
        style={{
          backgroundColor: "hsl(var(--primary-50))",
          border: "1px solid hsl(var(--primary-200))",
        }}
      >
        <i
          className="ph-fill ph-info text-primary-600"
          style={{ fontSize: "16px" }}
        />
        <span className="text-xs fw-medium text-primary-700 d-none d-md-inline">
          Toplu alım ilanı için ürün seçin
        </span>
      </div>

      <div
        className="d-inline-flex align-items-center gap-6 px-12 py-8 rounded-12"
        style={{
          backgroundColor: "hsl(var(--primary-600))",
        }}
      >
        <span className="text-xs fw-semibold text-white">
          Seçilen: {selectedCount} / {totalCount}
        </span>
      </div>
    </div>
  );
};

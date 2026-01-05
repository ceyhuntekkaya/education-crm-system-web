"use client";

import React from "react";
import { useQuotationsContext } from "../../../contexts";

/**
 * 📊 QUOTATIONS INFO
 * Alım ilanları bilgi bölümü - başlık ve toplam sayı
 */
export const QuotationsInfo: React.FC = () => {
  const { totalElements } = useQuotationsContext();

  return (
    <div className="d-flex align-items-center gap-12 flex-grow-1">
      <div
        className="d-flex align-items-center justify-content-center rounded-8 bg-primary-100 text-primary-700 flex-shrink-0"
        style={{
          width: "48px",
          height: "48px",
          transition: "all 0.2s ease",
        }}
      >
        <i className="ph-bold ph-file-text" style={{ fontSize: "24px" }}></i>
      </div>
      <div className="flex-grow-1 min-w-0">
        <h5 className="mb-4 fw-semibold text-neutral-900">Alım İlanları</h5>
        <div className="d-flex align-items-center gap-8 flex-wrap">
          <span className="text-neutral-600 text-xs fw-medium">Toplam</span>
          <span className="d-inline-flex align-items-center gap-6 text-xs text-neutral-700 bg-neutral-50 px-10 py-6 rounded-8 fw-medium">
            <i className="ph-bold ph-file-text text-xs"></i>
            {totalElements} ilan
          </span>
        </div>
      </div>
    </div>
  );
};

"use client";

import React from "react";
import { useComparisonContext } from "../contexts";
import { Divider } from "@/components";

/**
 * Header Component
 *
 * Karşılaştırma sayfası başlığı
 */
export const Header: React.FC = () => {
  const { comparisons } = useComparisonContext();

  return (
    <div
      className="bg-white rounded-16 mb-24 transition-all"
      style={{
        border: "1.5px solid hsl(var(--neutral-40))",
        boxShadow:
          "0 4px 12px rgba(0, 0, 0, 0.08), 0 2px 4px rgba(0, 0, 0, 0.04)",
        padding: "16px",
      }}
    >
      {/* Row 1: Başlık Bilgisi */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-16 mb-16">
        {/* Left Info */}
        <div className="d-flex align-items-center gap-12 flex-grow-1">
          <div
            className="d-flex align-items-center justify-content-center rounded-8 bg-primary-100 text-primary-700"
            style={{ width: "48px", height: "48px" }}
          >
            <i className="ph-bold ph-scales" style={{ fontSize: "24px" }} />
          </div>
          <div className="flex-grow-1 min-w-0">
            <h5 className="mb-4 fw-semibold text-neutral-900">
              Teklif Karşılaştırma
            </h5>
            <div className="d-flex align-items-center gap-8">
              <span className="text-neutral-600 text-xs fw-medium">Toplam</span>
              <span className="d-inline-flex align-items-center gap-6 text-xs text-neutral-700 bg-neutral-50 px-10 py-6 rounded-8 fw-medium">
                <i className="ph-bold ph-file-text text-xs" />
                {comparisons.length} teklif
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <Divider size="xs" />

      {/* Row 2: Bilgi Mesajı */}
      <div className="d-flex align-items-center gap-8 text-neutral-600 text-sm">
        <i
          className="ph ph-info text-primary-600"
          style={{ fontSize: "18px" }}
        />
        <span>
          Bu sayfada gelen teklifler karşılaştırmalı olarak görüntülenmektedir.
        </span>
      </div>
    </div>
  );
};

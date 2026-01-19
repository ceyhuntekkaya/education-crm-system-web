"use client";

import React from "react";
import { useSuppliersContext } from "../../../contexts";

/**
 * 📊 LEFT INFO
 * Başlık ve toplam tedarikçi sayı gösterimi
 */
export const LeftInfo: React.FC = () => {
  const { totalElements } = useSuppliersContext();

  return (
    <div className="d-flex align-items-center gap-12 flex-grow-1">
      <div
        className="d-flex align-items-center justify-content-center rounded-8 bg-primary-100 text-primary-700"
        style={{ width: "48px", height: "48px" }}
      >
        <i className="ph-bold ph-buildings" style={{ fontSize: "24px" }} />
      </div>
      <div className="flex-grow-1 min-w-0">
        <h5 className="mb-4 fw-semibold text-neutral-900">Tedarikçiler</h5>
        <div className="d-flex align-items-center gap-8">
          <span className="text-neutral-600 text-xs fw-medium">Toplam</span>
          <span className="d-inline-flex align-items-center gap-6 text-xs text-neutral-700 bg-neutral-50 px-10 py-6 rounded-8 fw-medium">
            <i className="ph-bold ph-buildings text-xs" />
            {totalElements} tedarikçi
          </span>
        </div>
      </div>
    </div>
  );
};

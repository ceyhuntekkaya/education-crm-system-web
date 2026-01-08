"use client";

import React from "react";

export const EmptyState: React.FC = () => {
  return (
    <div
      className="d-flex flex-column align-items-center justify-content-center gap-16 py-40 bg-white rounded-16"
      style={{
        border: "1.5px solid hsl(var(--neutral-40))",
        minHeight: "400px",
      }}
    >
      <i
        className="ph ph-package"
        style={{
          fontSize: "64px",
          color: "hsl(var(--neutral-50))",
        }}
      />
      <div className="text-center">
        <h5 className="fw-semibold text-neutral-90 mb-8">
          Henüz Tedarikçi Bulunmuyor
        </h5>
        <p className="text-neutral-60 mb-0">
          Filtreleme kriterlerinize uygun tedarikçi bulunamadı.
        </p>
      </div>
    </div>
  );
};

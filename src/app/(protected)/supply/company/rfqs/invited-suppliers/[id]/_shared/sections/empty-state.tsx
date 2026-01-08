"use client";

import React from "react";

export const EmptyState: React.FC = () => {
  return (
    <div
      className="bg-white rounded-16 d-flex flex-column align-items-center justify-content-center text-center"
      style={{
        border: "1.5px solid hsl(var(--neutral-40))",
        boxShadow:
          "0 4px 12px rgba(0, 0, 0, 0.08), 0 2px 4px rgba(0, 0, 0, 0.04)",
        padding: "64px 32px",
        minHeight: "400px",
      }}
    >
      <div
        className="mb-20 d-flex align-items-center justify-content-center rounded-circle"
        style={{
          width: "80px",
          height: "80px",
          backgroundColor: "hsl(var(--neutral-50))",
        }}
      >
        <i
          className="ph-duotone ph-user-list"
          style={{
            fontSize: "48px",
            color: "hsl(var(--neutral-400))",
          }}
        ></i>
      </div>

      <h3
        className="mb-12"
        style={{
          fontSize: "1.5rem",
          fontWeight: 600,
          color: "hsl(var(--neutral-900))",
        }}
      >
        Davet Edilen Tedarikçi Bulunamadı
      </h3>

      <p
        className="mb-0"
        style={{
          fontSize: "1rem",
          color: "hsl(var(--neutral-600))",
          maxWidth: "500px",
        }}
      >
        Bu RFQ için henüz davet edilen tedarikçi bulunmamaktadır. Filtreleri
        kontrol edin veya yeni tedarikçi davet edin.
      </p>
    </div>
  );
};

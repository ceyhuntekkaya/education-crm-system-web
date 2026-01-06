"use client";

import React from "react";
import { useRouter, useParams } from "next/navigation";

/**
 * 🎬 HEADER ACTIONS
 * Geri dön ve yeni kalem ekle butonları
 */
export const HeaderActions: React.FC = () => {
  const router = useRouter();
  const params = useParams();
  const rfqId = params.id as string;

  const handleBack = () => {
    router.push(`/supply/company/rfqs/detail/${rfqId}`);
  };

  const handleAddItem = () => {
    router.push(`/supply/company/rfqs/items/${rfqId}/add-edit/new`);
  };

  return (
    <div className="d-flex align-items-center gap-8">
      {/* Geri Dön Butonu */}
      <button
        className="rfq-items-header__back-button"
        onClick={handleBack}
        aria-label="Detay sayfasına dön"
      >
        <i className="ph ph-arrow-left"></i>
        <span>Geri Dön</span>
      </button>

      {/* Yeni Kalem Ekle Butonu */}
      <button
        className="d-flex align-items-center gap-8 transition-all rounded-12 bg-primary-600 text-white fw-semibold border-0"
        style={{
          fontSize: "13px",
          height: "40px",
          padding: "0 16px",
          boxShadow: "0 2px 8px rgba(99, 102, 241, 0.25)",
          cursor: "pointer",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = "hsl(var(--primary-700))";
          e.currentTarget.style.transform = "translateY(-1px)";
          e.currentTarget.style.boxShadow =
            "0 4px 12px rgba(99, 102, 241, 0.3)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = "hsl(var(--primary-600))";
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow =
            "0 2px 8px rgba(99, 102, 241, 0.25)";
        }}
        onClick={handleAddItem}
        aria-label="Yeni kalem ekle"
      >
        <i className="ph-bold ph-plus-circle" style={{ fontSize: "18px" }} />
        <span className="d-none d-lg-inline">Yeni Kalem Ekle</span>
      </button>
    </div>
  );
};

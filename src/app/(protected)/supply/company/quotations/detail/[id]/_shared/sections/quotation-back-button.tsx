"use client";

import React from "react";
import { useRouter } from "next/navigation";

/**
 * Teklif detay sayfası için minimal geri dön butonu
 */
export const QuotationBackButton: React.FC = () => {
  const router = useRouter();

  return (
    <button
      className="quotation-detail-page__back-button"
      onClick={() => router.back()}
      aria-label="Geri dön"
    >
      <i className="ph ph-arrow-left"></i>
      <span>Geri Dön</span>
    </button>
  );
};

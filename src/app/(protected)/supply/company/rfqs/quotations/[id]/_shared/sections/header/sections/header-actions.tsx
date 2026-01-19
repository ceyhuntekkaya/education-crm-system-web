"use client";

import React from "react";
import { useRouter, useParams } from "next/navigation";

/**
 * 🎬 HEADER ACTIONS
 * Geri dön butonu - RFQ detay sayfası tasarımı
 */
export const HeaderActions: React.FC = () => {
  const router = useRouter();
  const params = useParams();
  const rfqId = params.id as string;

  const handleBack = () => {
    router.push(`/supply/company/rfqs/detail/${rfqId}`);
  };

  return (
    <button
      className="rfq-detail-page__back-button"
      onClick={handleBack}
      aria-label="Detay sayfasına dön"
    >
      <i className="ph ph-arrow-left" />
      <span>Geri Dön</span>
    </button>
  );
};

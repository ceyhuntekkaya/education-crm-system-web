"use client";

import React from "react";
import { useRouter } from "next/navigation";

/**
 * RFQ detay sayfası için minimal geri dön butonu
 */
export const RFQBackButton: React.FC = () => {
  const router = useRouter();

  const handleBack = () => {
    router.push("/supply/company/rfqs");
  };

  return (
    <button
      className="rfq-detail-page__back-button"
      onClick={handleBack}
      aria-label="Geri dön"
    >
      <i className="ph ph-arrow-left"></i>
      <span>Geri Dön</span>
    </button>
  );
};

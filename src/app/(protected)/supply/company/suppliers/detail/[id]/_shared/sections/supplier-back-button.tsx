"use client";

import React from "react";
import { useRouter } from "next/navigation";

/**
 * Supplier detay sayfası için minimal geri dön butonu
 */
export const SupplierBackButton: React.FC = () => {
  const router = useRouter();

  const handleBack = () => {
    router.push("/supply/company/suppliers");
  };

  return (
    <button
      className="supplier-detail-page__back-button"
      onClick={handleBack}
      aria-label="Geri dön"
    >
      <i className="ph ph-arrow-left"></i>
      <span>Geri Dön</span>
    </button>
  );
};

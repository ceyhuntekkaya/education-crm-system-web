import React from "react";
import { useRouter } from "next/navigation";

/**
 * Geri dön butonu
 */
export const BackButton: React.FC = () => {
  const router = useRouter();

  const handleBack = () => {
    router.push("/supply/supplier/products");
  };

  return (
    <button className="product-detail-page__back-button" onClick={handleBack}>
      <i className="ph ph-arrow-left"></i>
      <span>Geri Dön</span>
    </button>
  );
};

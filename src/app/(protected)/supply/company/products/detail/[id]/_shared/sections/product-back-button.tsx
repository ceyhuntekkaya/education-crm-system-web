import React from "react";
import { useRouter } from "next/navigation";

/**
 * Ürün detay sayfası için minimal geri dön butonu
 */
export const ProductBackButton: React.FC = () => {
  const router = useRouter();

  return (
    <button
      className="product-detail-page__back-button"
      onClick={() => router.push("/supply/company/products")}
    >
      <i className="ph ph-arrow-left"></i>
      <span>Geri Dön</span>
    </button>
  );
};

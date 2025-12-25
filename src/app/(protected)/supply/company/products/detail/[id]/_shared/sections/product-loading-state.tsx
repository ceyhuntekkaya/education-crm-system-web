import React from "react";

/**
 * Ürün yüklenirken gösterilen loading state component'i
 */
export const ProductLoadingState: React.FC = () => {
  return (
    <div className="product-detail-page__state-container">
      <i className="ph-bold ph-circle-notch animate-spin text-main-600 product-detail-page__state-icon"></i>
      <p className="text-neutral-600 mt-3">Ürün bilgisi yükleniyor...</p>
    </div>
  );
};

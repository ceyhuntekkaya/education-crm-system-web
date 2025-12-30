import React from "react";

/**
 * Wishlist yüklenirken gösterilecek loading state
 */
export const WishlistLoadingState: React.FC = () => {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center py-80 gap-24">
      <div
        className="spinner-border text-main-600"
        role="status"
        style={{ width: "48px", height: "48px" }}
      >
        <span className="visually-hidden">Yükleniyor...</span>
      </div>
      <div className="text-center">
        <h5 className="text-neutral-900 mb-8">Favoriler Yükleniyor</h5>
        <p className="text-neutral-600 text-base mb-0">
          Favori ürünleriniz getiriliyor...
        </p>
      </div>
    </div>
  );
};

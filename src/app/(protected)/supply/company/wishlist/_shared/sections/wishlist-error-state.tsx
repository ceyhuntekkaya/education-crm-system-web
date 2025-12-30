import React from "react";

interface WishlistErrorStateProps {
  error?: string;
}

/**
 * Wishlist yüklenirken hata oluştuğunda gösterilecek error state
 */
export const WishlistErrorState: React.FC<WishlistErrorStateProps> = ({
  error = "Favoriler yüklenirken bir hata oluştu",
}) => {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center py-80 gap-24">
      <div
        className="d-flex align-items-center justify-content-center rounded-circle bg-danger-50"
        style={{ width: "120px", height: "120px" }}
      >
        <i
          className="ph-duotone ph-warning-circle text-danger-600"
          style={{ fontSize: "64px" }}
        ></i>
      </div>
      <div className="text-center">
        <h4 className="text-neutral-900 mb-12">Bir Hata Oluştu</h4>
        <p className="text-neutral-600 text-base mb-0 max-w-400 mx-auto">
          {error}
        </p>
      </div>
      <button
        onClick={() => window.location.reload()}
        className="btn btn-main-600 px-24 py-12 rounded-8 d-inline-flex align-items-center gap-8"
      >
        <i className="ph-duotone ph-arrow-clockwise" style={{ fontSize: "20px" }}></i>
        Tekrar Dene
      </button>
    </div>
  );
};

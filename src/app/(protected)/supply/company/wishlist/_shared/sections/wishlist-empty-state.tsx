import React from "react";

/**
 * Wishlist boş olduğunda gösterilecek empty state
 */
export const WishlistEmptyState: React.FC = () => {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center py-80 gap-24">
      <div
        className="d-flex align-items-center justify-content-center rounded-circle bg-main-50"
        style={{ width: "120px", height: "120px" }}
      >
        <i
          className="ph-duotone ph-heart text-main-600"
          style={{ fontSize: "64px" }}
        ></i>
      </div>
      <div className="text-center">
        <h4 className="text-neutral-900 mb-12">Favori Ürününüz Yok</h4>
        <p className="text-neutral-600 text-base mb-0 max-w-400 mx-auto">
          Beğendiğiniz ürünleri favorilere ekleyerek hızlıca ulaşabilir ve
          takip edebilirsiniz.
        </p>
      </div>
      <a
        href="/supply/company/products"
        className="btn btn-main-600 px-24 py-12 rounded-8 d-inline-flex align-items-center gap-8"
      >
        <i className="ph-duotone ph-magnifying-glass" style={{ fontSize: "20px" }}></i>
        Ürünleri Keşfet
      </a>
    </div>
  );
};

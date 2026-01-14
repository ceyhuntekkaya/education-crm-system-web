import React from "react";

export const EmptyStateSection: React.FC = () => {
  return (
    <section className="product-detail-page__variants-empty-section">
      <div className="product-detail-page__variants-empty">
        <div className="d-flex flex-column align-items-center justify-content-center py-5">
          <div className="mb-3">
            <i className="ph-package text-4xl text-neutral-400"></i>
          </div>
          <h6 className="text-sm fw-semibold text-neutral-700 mb-2">
            Varyant Bulunamadı
          </h6>
          <p className="text-xs text-neutral-500 mb-0">
            Bu ürünün henüz varyantı bulunmamaktadır.
          </p>
        </div>
      </div>
    </section>
  );
};

import React from "react";

export const LoadingSection: React.FC = () => {
  return (
    <section className="product-detail-page__variants-loading-section">
      <div className="product-detail-page__variants-loading">
        <div className="d-flex flex-column align-items-center justify-content-center py-5">
          <div className="mb-3">
            <div className="spinner-border text-main-600" role="status">
              <span className="visually-hidden">Yükleniyor...</span>
            </div>
          </div>
          <h6 className="text-sm fw-semibold text-neutral-700 mb-2">
            Varyantlar Yükleniyor
          </h6>
          <p className="text-xs text-neutral-500 mb-0">
            Ürün varyantları getiriliyor, lütfen bekleyiniz.
          </p>
        </div>
      </div>
    </section>
  );
};

import React from "react";

export const ErrorSection: React.FC = () => {
  return (
    <section className="product-detail-page__variants-error-section">
      <div className="product-detail-page__variants-error">
        <div className="d-flex flex-column align-items-center justify-content-center py-5">
          <div className="mb-3">
            <div className="bg-danger-50 rounded-circle p-3 d-inline-flex align-items-center justify-content-center">
              <i className="ph-warning-circle text-2xl text-danger-600"></i>
            </div>
          </div>
          <h6 className="text-sm fw-semibold text-neutral-700 mb-2">
            Varyantlar Yüklenemedi
          </h6>
          <p className="text-xs text-neutral-500 mb-3 text-center">
            Ürün varyantları yüklenirken bir hata oluştu. Lütfen sayfayı
            yenileyin veya tekrar deneyin.
          </p>
          <button
            className="btn btn-sm btn-outline-danger"
            onClick={() => window.location.reload()}
          >
            <i className="ph-arrow-clockwise me-1"></i>
            Tekrar Dene
          </button>
        </div>
      </div>
    </section>
  );
};

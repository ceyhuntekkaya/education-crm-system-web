"use client";

import React from "react";

const InitialSearchState: React.FC = () => {
  return (
    <div className="initial-search-state">
      <div className="empty-state-card bg-white rounded-20 p-24 p-md-48 text-center position-relative overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="decoration-circle decoration-circle-1"></div>
        <div className="decoration-circle decoration-circle-2"></div>
        <div className="decoration-circle decoration-circle-3"></div>

        {/* Icon Section */}
        <div className="empty-state-icon-wrapper mb-24 mb-md-40 position-relative">
          <div className="icon-container rounded-circle p-20 p-md-32 d-inline-flex align-items-center justify-content-center position-relative">
            <div className="icon-pulse position-absolute w-100 h-100 rounded-circle"></div>
            <i
              className="ph-bold ph-magnifying-glass text-white position-relative"
              style={{ fontSize: "56px" }}
            ></i>
          </div>
        </div>

        {/* Content Section */}
        <div className="empty-state-content mb-24 mb-md-40 position-relative">
          <h2 className="text-neutral-900 mb-12 mb-md-16 fw-bold">
            Arama Sonuçlarını Görmek İçin
          </h2>
          <h3 className="text-primary-600 mb-16 mb-md-24 fw-bold">
            Filtre Seçimi Yapınız
          </h3>
          <p className="text-neutral-600 mb-0 mx-auto description-text px-3 px-md-0">
            <span className="d-none d-md-inline">
              Sol taraftaki filtreleme seçeneklerini kullanarak size en uygun
              eğitim kurumlarını kolayca bulabilirsiniz.
            </span>
            <span className="d-inline d-md-none">
              Sayfanın altındaki{" "}
              <span className="text-primary-600 fw-semibold">Filtrele</span>{" "}
              butonuna tıklayarak açılan menüden filtreleme yapabilir ve size en
              uygun eğitim kurumlarını bulabilirsiniz.
            </span>
          </p>
        </div>

        {/* Features Grid */}
        <div className="search-features-grid mb-24 mb-md-40 position-relative">
          <div className="search-feature-card bg-gradient-primary-subtle rounded-16">
            <div className="feature-icon bg-primary-600 rounded-circle p-12 p-md-16 d-inline-flex align-items-center justify-content-center mb-16 mb-md-24 shadow-sm">
              <i
                className="ph-bold ph-buildings text-white"
                style={{ fontSize: "28px" }}
              ></i>
            </div>
            <h6 className="text-neutral-900 mb-8 mb-md-12 fw-bold">
              Kurum Türü
            </h6>
            <p className="text-neutral-600 mb-0">
              Anaokulu, ilkokul, lise gibi kurum türlerinden seçim yapın
            </p>
          </div>

          <div className="search-feature-card bg-gradient-success-subtle rounded-16">
            <div className="feature-icon bg-success-600 rounded-circle p-12 p-md-16 d-inline-flex align-items-center justify-content-center mb-16 mb-md-24 shadow-sm">
              <i
                className="ph-bold ph-map-pin text-white"
                style={{ fontSize: "28px" }}
              ></i>
            </div>
            <h6 className="text-neutral-900 mb-12 mb-md-16 fw-bold">Konum</h6>
            <p className="text-neutral-600 mb-0">
              Size en yakın kurumları bulmak için konum seçin
            </p>
          </div>

          <div className="search-feature-card bg-gradient-warning-subtle rounded-16">
            <div className="feature-icon bg-warning-600 rounded-circle p-12 p-md-16 d-inline-flex align-items-center justify-content-center mb-16 mb-md-24 shadow-sm">
              <i
                className="ph-bold ph-sliders text-white"
                style={{ fontSize: "28px" }}
              ></i>
            </div>
            <h6 className="text-neutral-900 mb-12 mb-md-16 fw-bold">
              Özellikler
            </h6>
            <p className="text-neutral-600 mb-0">
              Ücret, yaş aralığı, özellikler ile filtreleme yapın
            </p>
          </div>
        </div>

        {/* Quick Tips */}
        <div className="quick-tips bg-gradient-info-subtle rounded-16 p-24 p-md-32 position-relative">
          <div className="d-flex align-items-start gap-12 gap-md-16 text-start">
            <div className="tip-icon flex-shrink-0">
              <div className="bg-info-600 rounded-circle p-10 p-md-14 d-inline-flex align-items-center justify-content-center shadow-sm">
                <i
                  className="ph-bold ph-lightbulb text-white"
                  style={{ fontSize: "24px" }}
                ></i>
              </div>
            </div>
            <div>
              <h6 className="text-neutral-900 mb-12 mb-md-16 fw-bold">
                💡 İpucu
              </h6>
              <p className="text-neutral-700 mb-0">
                <span className="d-none d-md-inline">
                  Daha spesifik sonuçlar için birden fazla filtreyi birlikte
                  kullanabilirsiniz. Sol taraftaki{" "}
                  <span className="text-primary-600 fw-semibold">Filtrele</span>{" "}
                  butonuna basarak arama yapabilirsiniz.
                </span>
                <span className="d-inline d-md-none">
                  Daha spesifik sonuçlar için birden fazla filtreyi birlikte
                  kullanabilirsiniz. Sayfanın altındaki{" "}
                  <span className="text-primary-600 fw-semibold">Filtrele</span>{" "}
                  butonuna tıklayarak filtreleme menüsünü açabilirsiniz.
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InitialSearchState;

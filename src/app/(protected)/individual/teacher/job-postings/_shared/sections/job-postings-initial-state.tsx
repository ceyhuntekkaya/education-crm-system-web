"use client";

import React from "react";

/**
 * JobPostingsInitialState
 * Henüz filtre uygulanmamışken sağ panelde gösterilen bileşen.
 * Kullanıcıyı sol taraftaki filtre formunu doldurmaya yönlendirir.
 */
const JobPostingsInitialState: React.FC = () => {
  return (
    <div className="initial-search-state">
      <div className="empty-state-card bg-white rounded-20 p-24 p-md-48 text-center position-relative overflow-hidden">
        {/* Dekoratif arka plan */}
        <div className="decoration-circle decoration-circle-1"></div>
        <div className="decoration-circle decoration-circle-2"></div>
        <div className="decoration-circle decoration-circle-3"></div>

        {/* İkon */}
        <div className="empty-state-icon-wrapper mb-24 mb-md-40 position-relative">
          <div className="icon-container rounded-circle p-20 p-md-32 d-inline-flex align-items-center justify-content-center position-relative">
            <div className="icon-pulse position-absolute w-100 h-100 rounded-circle"></div>
            <i
              className="ph-bold ph-magnifying-glass text-white position-relative"
              style={{ fontSize: "56px" }}
            ></i>
          </div>
        </div>

        {/* İçerik */}
        <div className="empty-state-content mb-24 mb-md-40 position-relative">
          <h2 className="text-neutral-900 mb-12 mb-md-16 fw-bold">
            İş İlanlarını Bulmak İçin
          </h2>
          <h3 className="text-primary-600 mb-16 mb-md-24 fw-bold">
            Filtre Seçimi Yapınız
          </h3>
          <p className="text-neutral-600 mb-0 mx-auto description-text px-3 px-md-0">
            <span className="d-none d-md-inline">
              Sol taraftaki filtreleme seçeneklerini kullanarak branş, istihdam
              tipi ve deneyim gibi kriterlere göre size uygun iş ilanlarını
              kolayca bulabilirsiniz.
            </span>
            <span className="d-inline d-md-none">
              Sayfanın altındaki{" "}
              <span className="text-primary-600 fw-semibold">Filtrele</span>{" "}
              butonuna tıklayarak filtreleme menüsünü açabilirsiniz.
            </span>
          </p>
        </div>

        {/* Özellikler Grid */}
        <div className="search-features-grid mb-24 mb-md-40 position-relative">
          <div className="search-feature-card bg-gradient-primary-subtle rounded-16">
            <div className="feature-icon bg-primary-600 rounded-circle p-12 p-md-16 d-inline-flex align-items-center justify-content-center mb-16 mb-md-24 shadow-sm">
              <i
                className="ph-bold ph-books text-white"
                style={{ fontSize: "28px" }}
              ></i>
            </div>
            <h6 className="text-neutral-900 mb-8 mb-md-12 fw-bold">Branş</h6>
            <p className="text-neutral-600 mb-0">
              Matematik, Türkçe, İngilizce gibi branşa göre filtreleyin
            </p>
          </div>

          <div className="search-feature-card bg-gradient-success-subtle rounded-16">
            <div className="feature-icon bg-success-600 rounded-circle p-12 p-md-16 d-inline-flex align-items-center justify-content-center mb-16 mb-md-24 shadow-sm">
              <i
                className="ph-bold ph-briefcase text-white"
                style={{ fontSize: "28px" }}
              ></i>
            </div>
            <h6 className="text-neutral-900 mb-12 mb-md-16 fw-bold">
              İstihdam Tipi
            </h6>
            <p className="text-neutral-600 mb-0">
              Tam zamanlı, yarı zamanlı veya sözleşmeli pozisyonlar
            </p>
          </div>

          <div className="search-feature-card bg-gradient-warning-subtle rounded-16">
            <div className="feature-icon bg-warning-600 rounded-circle p-12 p-md-16 d-inline-flex align-items-center justify-content-center mb-16 mb-md-24 shadow-sm">
              <i
                className="ph-bold ph-medal text-white"
                style={{ fontSize: "28px" }}
              ></i>
            </div>
            <h6 className="text-neutral-900 mb-12 mb-md-16 fw-bold">
              Deneyim & Maaş
            </h6>
            <p className="text-neutral-600 mb-0">
              Deneyim yılı ve maaş aralığına göre uygun ilanları bulun
            </p>
          </div>
        </div>

        {/* İpucu */}
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
              <h6 className="text-neutral-900 mb-8 fw-bold">💡 İpucu</h6>
              <p className="text-neutral-700 mb-0">
                <span className="d-none d-md-inline">
                  Daha spesifik sonuçlar için birden fazla filtreyi birlikte
                  kullanabilirsiniz. Sol taraftaki{" "}
                  <span className="text-primary-600 fw-semibold">Filtrele</span>{" "}
                  butonuna basarak arama yapabilirsiniz.
                </span>
                <span className="d-inline d-md-none">
                  Birden fazla filtreyi aynı anda kullanarak daha isabetli
                  sonuçlara ulaşabilirsiniz.
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobPostingsInitialState;

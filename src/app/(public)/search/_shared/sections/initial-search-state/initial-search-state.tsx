"use client";

import React, { useEffect, useState } from "react";

const InitialSearchState: React.FC = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // CSS'in tamamen yüklenmesini garantilemek için küçük bir gecikme
    const timer = setTimeout(() => {
      setIsMounted(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className="initial-search-state"
      style={{ opacity: isMounted ? 1 : 0, transition: "opacity 0.2s ease-in" }}
    >
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
              className="ph-bold ph-magnifying-glass text-white position-relative d-none d-md-inline"
              style={{ fontSize: "72px" }}
            ></i>
            <i
              className="ph-bold ph-magnifying-glass text-white position-relative d-inline d-md-none"
              style={{ fontSize: "48px" }}
            ></i>
          </div>
        </div>

        {/* Content Section */}
        <div className="empty-state-content mb-24 mb-md-40 position-relative">
          <h2
            className="text-neutral-900 mb-12 mb-md-16 fw-bold"
            style={{ fontSize: "1.5rem" }}
          >
            <span className="d-none d-md-inline" style={{ fontSize: "2rem" }}>
              Arama Sonuçlarını Görmek İçin
            </span>
            <span className="d-inline d-md-none">
              Arama Sonuçlarını Görmek İçin
            </span>
          </h2>
          <h3
            className="text-primary-600 mb-16 mb-md-24 fw-bold"
            style={{ fontSize: "1.25rem" }}
          >
            <span
              className="d-none d-md-inline"
              style={{ fontSize: "1.75rem" }}
            >
              Filtre Seçimi Yapınız
            </span>
            <span className="d-inline d-md-none">Filtre Seçimi Yapınız</span>
          </h3>
          <p
            className="text-neutral-600 mb-0 mx-auto description-text px-3 px-md-0"
            style={{
              maxWidth: "560px",
              lineHeight: "1.7",
              fontSize: "0.875rem",
            }}
          >
            <span
              className="d-none d-md-inline"
              style={{ fontSize: "1.125rem" }}
            >
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
        <div className="row row-cols-1 row-cols-md-3 g-12 g-md-20 mb-24 mb-md-40 position-relative features-grid">
          <div className="col">
            <div className="feature-card bg-gradient-primary-subtle rounded-16 p-20 p-md-28 h-100">
              <div className="feature-icon bg-primary-600 rounded-circle p-10 p-md-14 d-inline-flex align-items-center justify-content-center mb-12 mb-md-20 shadow-sm">
                <i
                  className="ph-bold ph-buildings text-white d-none d-md-inline"
                  style={{ fontSize: "28px" }}
                ></i>
                <i
                  className="ph-bold ph-buildings text-white d-inline d-md-none"
                  style={{ fontSize: "20px" }}
                ></i>
              </div>
              <h6
                className="text-neutral-900 mb-8 mb-md-12 fw-bold"
                style={{ fontSize: "0.95rem" }}
              >
                <span
                  className="d-none d-md-inline"
                  style={{ fontSize: "1.125rem" }}
                >
                  Kurum Türü
                </span>
                <span className="d-inline d-md-none">Kurum Türü</span>
              </h6>
              <p
                className="text-neutral-600 mb-0"
                style={{ lineHeight: "1.6", fontSize: "0.8rem" }}
              >
                <span
                  className="d-none d-md-inline"
                  style={{ fontSize: "0.875rem" }}
                >
                  Anaokulu, ilkokul, lise gibi kurum türlerinden seçim yapın
                </span>
                <span className="d-inline d-md-none">
                  Anaokulu, ilkokul, lise gibi kurum türlerinden seçim yapın
                </span>
              </p>
            </div>
          </div>

          <div className="col">
            <div className="feature-card bg-gradient-success-subtle rounded-16 p-20 p-md-28 h-100">
              <div className="feature-icon bg-success-600 rounded-circle p-10 p-md-14 d-inline-flex align-items-center justify-content-center mb-12 mb-md-20 shadow-sm">
                <i
                  className="ph-bold ph-map-pin text-white d-none d-md-inline"
                  style={{ fontSize: "28px" }}
                ></i>
                <i
                  className="ph-bold ph-map-pin text-white d-inline d-md-none"
                  style={{ fontSize: "20px" }}
                ></i>
              </div>
              <h6
                className="text-neutral-900 mb-8 mb-md-12 fw-bold"
                style={{ fontSize: "0.95rem" }}
              >
                <span
                  className="d-none d-md-inline"
                  style={{ fontSize: "1.125rem" }}
                >
                  Konum
                </span>
                <span className="d-inline d-md-none">Konum</span>
              </h6>
              <p
                className="text-neutral-600 mb-0"
                style={{ lineHeight: "1.6", fontSize: "0.8rem" }}
              >
                <span
                  className="d-none d-md-inline"
                  style={{ fontSize: "0.875rem" }}
                >
                  Size en yakın kurumları bulmak için konum seçin
                </span>
                <span className="d-inline d-md-none">
                  Size en yakın kurumları bulmak için konum seçin
                </span>
              </p>
            </div>
          </div>

          <div className="col">
            <div className="feature-card bg-gradient-warning-subtle rounded-16 p-20 p-md-28 h-100">
              <div className="feature-icon bg-warning-600 rounded-circle p-10 p-md-14 d-inline-flex align-items-center justify-content-center mb-12 mb-md-20 shadow-sm">
                <i
                  className="ph-bold ph-sliders text-white d-none d-md-inline"
                  style={{ fontSize: "28px" }}
                ></i>
                <i
                  className="ph-bold ph-sliders text-white d-inline d-md-none"
                  style={{ fontSize: "20px" }}
                ></i>
              </div>
              <h6
                className="text-neutral-900 mb-8 mb-md-12 fw-bold"
                style={{ fontSize: "0.95rem" }}
              >
                <span
                  className="d-none d-md-inline"
                  style={{ fontSize: "1.125rem" }}
                >
                  Özellikler
                </span>
                <span className="d-inline d-md-none">Özellikler</span>
              </h6>
              <p
                className="text-neutral-600 mb-0"
                style={{ lineHeight: "1.6", fontSize: "0.8rem" }}
              >
                <span
                  className="d-none d-md-inline"
                  style={{ fontSize: "0.875rem" }}
                >
                  Ücret, yaş aralığı, özellikler ile filtreleme yapın
                </span>
                <span className="d-inline d-md-none">
                  Ücret, yaş aralığı, özellikler ile filtreleme yapın
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Quick Tips */}
        <div className="quick-tips bg-gradient-info-subtle rounded-16 p-20 p-md-28 position-relative">
          <div className="d-flex align-items-start gap-12 gap-md-16 text-start">
            <div className="tip-icon flex-shrink-0">
              <div className="bg-info-600 rounded-circle p-8 p-md-12 d-inline-flex align-items-center justify-content-center shadow-sm">
                <i
                  className="ph-bold ph-lightbulb text-white d-none d-md-inline"
                  style={{ fontSize: "24px" }}
                ></i>
                <i
                  className="ph-bold ph-lightbulb text-white d-inline d-md-none"
                  style={{ fontSize: "18px" }}
                ></i>
              </div>
            </div>
            <div>
              <h6
                className="text-neutral-900 mb-8 mb-md-12 fw-bold"
                style={{ fontSize: "0.95rem" }}
              >
                <span
                  className="d-none d-md-inline"
                  style={{ fontSize: "1.125rem" }}
                >
                  💡 İpucu
                </span>
                <span className="d-inline d-md-none">💡 İpucu</span>
              </h6>
              <p
                className="text-neutral-700 mb-0"
                style={{ lineHeight: "1.6", fontSize: "0.8rem" }}
              >
                <span
                  className="d-none d-md-inline"
                  style={{ fontSize: "1rem" }}
                >
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

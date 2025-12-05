"use client";

import React from "react";

const InitialSearchState: React.FC = () => {
  return (
    <div className="initial-search-state">
      <div className="empty-state-card bg-white rounded-20 p-48 text-center position-relative overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="decoration-circle decoration-circle-1"></div>
        <div className="decoration-circle decoration-circle-2"></div>
        <div className="decoration-circle decoration-circle-3"></div>

        {/* Icon Section */}
        <div className="empty-state-icon-wrapper mb-40 position-relative">
          <div className="icon-container bg-gradient-primary rounded-circle p-32 d-inline-flex align-items-center justify-content-center position-relative">
            <div className="icon-pulse position-absolute w-100 h-100 rounded-circle"></div>
            <i
              className="ph-bold ph-magnifying-glass text-white position-relative"
              style={{ fontSize: "72px" }}
            ></i>
          </div>
        </div>

        {/* Content Section */}
        <div className="empty-state-content mb-40 position-relative">
          <h2 className="text-neutral-900 mb-16 fw-bold">
            Arama Sonuçlarını Görmek İçin
          </h2>
          <h3 className="text-primary-600 mb-24 fw-bold">
            Filtre Seçimi Yapınız
          </h3>
          <p
            className="text-neutral-600 text-lg mb-0 mx-auto"
            style={{ maxWidth: "560px", lineHeight: "1.7" }}
          >
            Sol taraftaki filtreleme seçeneklerini kullanarak size en uygun
            eğitim kurumlarını kolayca bulabilirsiniz.
          </p>
        </div>

        {/* Features Grid */}
        <div className="row g-20 mb-40 position-relative">
          <div className="col-md-4">
            <div className="feature-card bg-gradient-primary-subtle rounded-16 p-28 h-100">
              <div className="feature-icon bg-primary-600 rounded-circle p-14 d-inline-flex align-items-center justify-content-center mb-20 shadow-sm">
                <i
                  className="ph-bold ph-buildings text-white"
                  style={{ fontSize: "28px" }}
                ></i>
              </div>
              <h6 className="text-neutral-900 mb-12 fw-bold">Kurum Türü</h6>
              <p
                className="text-neutral-600 text-sm mb-0"
                style={{ lineHeight: "1.6" }}
              >
                AnaKurumu, ilkKurum, lise gibi kurum türlerinden seçim yapın
              </p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="feature-card bg-gradient-success-subtle rounded-16 p-28 h-100">
              <div className="feature-icon bg-success-600 rounded-circle p-14 d-inline-flex align-items-center justify-content-center mb-20 shadow-sm">
                <i
                  className="ph-bold ph-map-pin text-white"
                  style={{ fontSize: "28px" }}
                ></i>
              </div>
              <h6 className="text-neutral-900 mb-12 fw-bold">Konum</h6>
              <p
                className="text-neutral-600 text-sm mb-0"
                style={{ lineHeight: "1.6" }}
              >
                Size en yakın kurumları bulmak için konum seçin
              </p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="feature-card bg-gradient-warning-subtle rounded-16 p-28 h-100">
              <div className="feature-icon bg-warning-600 rounded-circle p-14 d-inline-flex align-items-center justify-content-center mb-20 shadow-sm">
                <i
                  className="ph-bold ph-sliders text-white"
                  style={{ fontSize: "28px" }}
                ></i>
              </div>
              <h6 className="text-neutral-900 mb-12 fw-bold">Özellikler</h6>
              <p
                className="text-neutral-600 text-sm mb-0"
                style={{ lineHeight: "1.6" }}
              >
                Ücret, yaş aralığı, özellikler ile filtreleme yapın
              </p>
            </div>
          </div>
        </div>

        {/* Quick Tips */}
        <div className="quick-tips bg-gradient-info-subtle rounded-16 p-28 position-relative">
          <div className="d-flex align-items-start gap-16 text-start">
            <div className="tip-icon flex-shrink-0">
              <div className="bg-info-600 rounded-circle p-12 d-inline-flex align-items-center justify-content-center shadow-sm">
                <i
                  className="ph-bold ph-lightbulb text-white"
                  style={{ fontSize: "24px" }}
                ></i>
              </div>
            </div>
            <div>
              <h6 className="text-neutral-900 mb-12 fw-bold">💡 İpucu</h6>
              <p
                className="text-neutral-700 mb-0"
                style={{ lineHeight: "1.6" }}
              >
                Daha spesifik sonuçlar için birden fazla filtreyi birlikte
                kullanabilirsiniz. Sol taraftaki{" "}
                <span className="text-primary-600 fw-semibold">Filtrele</span>{" "}
                butonuna basarak arama yapabilirsiniz.
              </p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .empty-state-card {
          animation: fadeIn 0.8s ease-out;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.06);
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Decorative Circles */
        .decoration-circle {
          position: absolute;
          border-radius: 50%;
          opacity: 0.04;
          pointer-events: none;
        }

        .decoration-circle-1 {
          width: 400px;
          height: 400px;
          background: linear-gradient(135deg, #487fee 0%, #6366f1 100%);
          top: -200px;
          right: -100px;
        }

        .decoration-circle-2 {
          width: 300px;
          height: 300px;
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          bottom: -150px;
          left: -100px;
        }

        .decoration-circle-3 {
          width: 200px;
          height: 200px;
          background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
          top: 50%;
          left: -50px;
          transform: translateY(-50%);
        }

        /* Icon Animation */
        @keyframes pulse {
          0%,
          100% {
            transform: scale(1);
            opacity: 0.3;
          }
          50% {
            transform: scale(1.15);
            opacity: 0.15;
          }
        }

        .icon-pulse {
          background: rgba(255, 255, 255, 0.3);
          animation: pulse 2.5s ease-in-out infinite;
        }

        .bg-gradient-primary {
          background: linear-gradient(135deg, #487fee 0%, #6366f1 100%);
          box-shadow: 0 8px 24px rgba(72, 127, 238, 0.3);
        }

        /* Feature Cards */
        .feature-card {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.04);
        }

        .feature-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 12px 32px rgba(0, 0, 0, 0.12);
        }

        .bg-gradient-primary-subtle {
          background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
        }

        .bg-gradient-success-subtle {
          background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
        }

        .bg-gradient-warning-subtle {
          background: linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%);
        }

        .bg-gradient-info-subtle {
          background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
        }

        /* Icon Container */
        .feature-icon {
          transition: all 0.3s ease;
        }

        .feature-card:hover .feature-icon {
          transform: scale(1.1) rotate(5deg);
        }

        /* Quick Tips */
        .quick-tips {
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.04);
        }
      `}</style>
    </div>
  );
};

export default InitialSearchState;

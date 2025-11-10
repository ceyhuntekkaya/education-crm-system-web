"use client";

import React from "react";

const NoResults: React.FC = () => {
  return (
    <div className="row justify-content-center mt-20">
      <div className="col-lg-10">
        <div className="no-results-wrapper">
          <div className="no-results bg-white rounded-20 p-48 text-center position-relative overflow-hidden">
            {/* Decorative Background */}
            <div className="no-results-bg-circle no-results-bg-circle-1"></div>
            <div className="no-results-bg-circle no-results-bg-circle-2"></div>

            <div className="no-results-icon mb-32 position-relative">
              <div className="icon-wrapper bg-gradient-neutral rounded-circle p-32 d-inline-flex align-items-center justify-content-center position-relative">
                <div className="icon-ring position-absolute w-100 h-100 rounded-circle"></div>
                <i
                  className="ph-bold ph-magnifying-glass text-white position-relative"
                  style={{ fontSize: "64px" }}
                ></i>
              </div>
            </div>

            <div className="position-relative">
              <h4 className="text-neutral-900 mb-16 fw-bold">
                Sonuç Bulunamadı
              </h4>
              <p
                className="text-neutral-600 mb-32 mx-auto"
                style={{ maxWidth: "480px", lineHeight: "1.6" }}
              >
                Arama kriterlerinize uygun sonuç bulunamadı. Lütfen farklı
                filtreler deneyiniz.
              </p>

              {/* Suggestions */}
              <div
                className="suggestions-box bg-gradient-info-subtle rounded-16 p-24 mx-auto"
                style={{ maxWidth: "560px" }}
              >
                <h6 className="text-neutral-900 mb-16 fw-bold">
                  🔍 Arama İpuçları
                </h6>
                <div className="d-flex flex-column gap-12 text-start">
                  <div className="d-flex align-items-start gap-12">
                    <i
                      className="ph ph-check-circle text-success-600 mt-4"
                      style={{ fontSize: "18px" }}
                    ></i>
                    <span className="text-neutral-700 text-sm">
                      Daha geniş bir konum alanı seçmeyi deneyin
                    </span>
                  </div>
                  <div className="d-flex align-items-start gap-12">
                    <i
                      className="ph ph-check-circle text-success-600 mt-4"
                      style={{ fontSize: "18px" }}
                    ></i>
                    <span className="text-neutral-700 text-sm">
                      Bazı filtreleri kaldırarak arama alanınızı genişletin
                    </span>
                  </div>
                  <div className="d-flex align-items-start gap-12">
                    <i
                      className="ph ph-check-circle text-success-600 mt-4"
                      style={{ fontSize: "18px" }}
                    ></i>
                    <span className="text-neutral-700 text-sm">
                      Ücret aralığını veya yaş aralığını değiştirin
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <style jsx>{`
            .no-results-wrapper {
              animation: fadeIn 0.6s ease-out;
            }

            .no-results {
              box-shadow: 0 10px 40px rgba(0, 0, 0, 0.06);
            }

            @keyframes fadeIn {
              from {
                opacity: 0;
                transform: translateY(20px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }

            /* Decorative Circles */
            .no-results-bg-circle {
              position: absolute;
              border-radius: 50%;
              opacity: 0.04;
              pointer-events: none;
            }

            .no-results-bg-circle-1 {
              width: 300px;
              height: 300px;
              background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
              top: -150px;
              right: -100px;
            }

            .no-results-bg-circle-2 {
              width: 250px;
              height: 250px;
              background: linear-gradient(135deg, #ec4899 0%, #f43f5e 100%);
              bottom: -100px;
              left: -80px;
            }

            /* Icon Animation */
            @keyframes ring {
              0%,
              100% {
                transform: scale(1);
                opacity: 0.3;
              }
              50% {
                transform: scale(1.2);
                opacity: 0.1;
              }
            }

            .icon-ring {
              background: rgba(255, 255, 255, 0.3);
              animation: ring 2s ease-in-out infinite;
            }

            .bg-gradient-neutral {
              background: linear-gradient(135deg, #6b7280 0%, #4b5563 100%);
              box-shadow: 0 8px 24px rgba(107, 114, 128, 0.3);
            }

            .bg-gradient-info-subtle {
              background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
              box-shadow: 0 4px 16px rgba(0, 0, 0, 0.04);
            }

            .suggestions-box {
              animation: slideUp 0.6s ease-out 0.2s both;
            }

            @keyframes slideUp {
              from {
                opacity: 0;
                transform: translateY(20px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }
          `}</style>
        </div>
      </div>
    </div>
  );
};

export default NoResults;

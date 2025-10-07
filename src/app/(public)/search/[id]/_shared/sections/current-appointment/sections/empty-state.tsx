"use client";

import React from "react";

interface EmptyStateProps {
  onCreateAppointment?: () => void;
  onCallSchool?: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  onCreateAppointment,
  onCallSchool,
}) => {
  return (
    <div className="tutor-details__content">
      <div className="border border-neutral-30 rounded-12 bg-white p-8 mt-24">
        <div className="border border-neutral-30 rounded-12 bg-main-25 p-32">
          <h5 className="mb-0">
            <i className="ph ph-calendar me-8 text-main-600"></i>
            Randevum
          </h5>
          <span className="d-block border border-neutral-30 my-32 border-dashed" />

          <div className="bg-white rounded-8 p-32">
            {/* Empty State - Consistent with other tabs */}
            <div className="empty-state text-center py-48">
              <div className="empty-state-icon mb-32">
                <div
                  className="d-inline-flex align-items-center justify-content-center bg-neutral-50 rounded-circle"
                  style={{ width: "96px", height: "96px" }}
                >
                  <i
                    className="ph ph-calendar-x text-neutral-400"
                    style={{ fontSize: "40px" }}
                  ></i>
                </div>
              </div>

              <div className="empty-state-content mb-40">
                <h5 className="text-neutral-800 mb-16">
                  Aktif randevunuz bulunmuyor
                </h5>
                <p
                  className="text-neutral-600 mb-0 mx-auto"
                  style={{ maxWidth: "480px", lineHeight: "1.6" }}
                >
                  Bu okulla ilgili aktif bir randevunuz bulunmuyor. Yeni bir
                  randevu oluşturmak için aşağıdaki seçenekleri
                  kullanabilirsiniz.
                </p>
              </div>

              <div className="empty-state-actions mb-48">
                <div className="d-flex flex-column flex-sm-row align-items-center justify-content-center gap-16">
                  <button
                    className="btn btn-main btn-lg"
                    onClick={onCreateAppointment}
                  >
                    <i className="ph ph-plus me-8"></i>
                    Yeni Randevu Oluştur
                  </button>
                  <button
                    className="btn btn-outline-main btn-lg"
                    onClick={onCallSchool}
                  >
                    <i className="ph ph-phone me-8"></i>
                    Okulu Ara
                  </button>
                </div>
              </div>

              {/* Yardımcı bilgiler */}
              <div className="helpful-info pt-32 border-top border-neutral-100">
                <div className="row g-20">
                  <div className="col-md-4">
                    <div className="info-card bg-main-25 p-20 rounded-12 text-center">
                      <i
                        className="ph ph-calendar-plus text-main-600 mb-12"
                        style={{ fontSize: "28px" }}
                      ></i>
                      <h6 className="text-main-700 mb-8">Kolay Randevu</h6>
                      <p className="text-main-600 mb-0 text-sm">
                        Birkaç tıkla randevu oluşturun
                      </p>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="info-card bg-success-25 p-20 rounded-12 text-center">
                      <i
                        className="ph ph-phone text-success-600 mb-12"
                        style={{ fontSize: "28px" }}
                      ></i>
                      <h6 className="text-success-700 mb-8">Anlık İletişim</h6>
                      <p className="text-success-600 mb-0 text-sm">
                        Okulla direkt konuşun
                      </p>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="info-card bg-info-25 p-20 rounded-12 text-center">
                      <i
                        className="ph ph-clock text-info-600 mb-12"
                        style={{ fontSize: "28px" }}
                      ></i>
                      <h6 className="text-info-700 mb-8">Esnek Saatler</h6>
                      <p className="text-info-600 mb-0 text-sm">
                        Size uygun saatleri seçin
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmptyState;

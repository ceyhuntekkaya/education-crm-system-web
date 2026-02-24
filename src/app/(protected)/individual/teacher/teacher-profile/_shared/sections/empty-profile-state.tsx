"use client";

import React from "react";
import { Button } from "@/components";

interface EmptyProfileStateProps {
  onCreateProfile: () => void;
}

/**
 * Profil yoksa gösterilen empty state ekranı
 */
export const EmptyProfileState: React.FC<EmptyProfileStateProps> = ({
  onCreateProfile,
}) => {
  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-10">
          <div className="border border-neutral-30 rounded-12 bg-white p-8">
            <div className="border border-neutral-30 rounded-12 bg-main-25 p-32">
              <h5 className="mb-0">
                <i className="ph ph-user-circle me-8 text-main-600"></i>
                Öğretmen Profilim
              </h5>
              <span className="d-block border border-neutral-30 my-32 border-dashed" />

              <div className="bg-white rounded-8 p-32">
                {/* Empty State */}
                <div className="empty-state text-center py-48">
                  <div className="empty-state-icon mb-32">
                    <div
                      className="d-inline-flex align-items-center justify-content-center bg-main-50 rounded-circle"
                      style={{ width: "120px", height: "120px" }}
                    >
                      <i
                        className="ph ph-identification-card text-main-600"
                        style={{ fontSize: "56px" }}
                      ></i>
                    </div>
                  </div>

                  <div className="empty-state-content mb-40">
                    <h4 className="text-neutral-800 mb-16">
                      Profilinizi Oluşturun
                    </h4>
                    <p
                      className="text-neutral-600 mb-0 mx-auto"
                      style={{ maxWidth: "560px", lineHeight: "1.6" }}
                    >
                      Öğretmen profilinizi oluşturarak kariyer fırsatlarını
                      keşfedin. İş ilanlarına başvurun, okullarla doğrudan
                      iletişim kurun ve profesyonel kimliğinizi oluşturun.
                    </p>
                  </div>

                  <div className="empty-state-actions mb-48 d-flex justify-content-center">
                    <Button
                      onClick={onCreateProfile}
                      variant="inline"
                      leftIcon="ph ph-plus"
                    >
                      Profilimi Oluştur
                    </Button>
                  </div>

                  {/* Yardımcı bilgiler */}
                  <div className="helpful-info pt-32 border-top border-neutral-100">
                    <div className="row g-20">
                      <div className="col-md-4">
                        <div className="info-card bg-main-25 p-20 rounded-12 text-center">
                          <i
                            className="ph ph-briefcase text-main-600 mb-12"
                            style={{ fontSize: "32px" }}
                          ></i>
                          <h6 className="text-main-700 mb-8">İş Fırsatları</h6>
                          <p className="text-main-600 mb-0 text-sm">
                            Size uygun iş ilanlarına hemen başvurun
                          </p>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="info-card bg-success-25 p-20 rounded-12 text-center">
                          <i
                            className="ph ph-handshake text-success-600 mb-12"
                            style={{ fontSize: "32px" }}
                          ></i>
                          <h6 className="text-success-700 mb-8">
                            Okul İletişimi
                          </h6>
                          <p className="text-success-600 mb-0 text-sm">
                            Eğitim kurumlarıyla doğrudan bağlantı kurun
                          </p>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="info-card bg-purple-25 p-20 rounded-12 text-center">
                          <i
                            className="ph ph-certificate text-purple-600 mb-12"
                            style={{ fontSize: "32px" }}
                          ></i>
                          <h6 className="text-purple-700 mb-8">
                            Profesyonel Profil
                          </h6>
                          <p className="text-purple-600 mb-0 text-sm">
                            Deneyiminizi ve yeteneklerinizi sergileyin
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
      </div>
    </div>
  );
};

"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { CustomCard, Icon } from "@/components";

/**
 * Register Selection Page
 * Kurum veya Veli kayıt seçimi
 */
const RegisterPage: React.FC = () => {
  const router = useRouter();

  const handleInstitutionClick = () => {
    router.push("/auth/register/institution");
  };

  const handleUserClick = () => {
    router.push("/auth/register/user");
  };

  return (
    <div className="register-selection-page">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-48">
          <h2 className="mb-16">Hesap Oluştur</h2>
          <p className="text-neutral-600 mb-0">
            Devam etmek için hesap türünüzü seçin
          </p>
        </div>

        {/* Selection Cards */}
        <div className="row justify-content-center g-24">
          {/* Kurum Kaydı */}
          <div className="col-lg-5 col-md-6">
            <div
              className="hover-card-wrapper cursor-pointer h-100"
              onClick={handleInstitutionClick}
            >
              <CustomCard className="h-100 transition-all">
                <div className="text-center">
                  {/* Icon */}
                  <div className="icon-container institution-icon d-inline-flex align-items-center justify-content-center mb-24">
                    <Icon
                      icon="ph-buildings"
                      className="text-main-600 icon-lg"
                    />
                  </div>

                  {/* Title */}
                  <h4 className="mb-12">Kurum Kaydı</h4>

                  {/* Description */}
                  <p className="text-neutral-600 mb-24">
                    Eğitim kurumu olarak kaydolun ve sistemi kullanmaya başlayın
                  </p>

                  {/* Features */}
                  <ul className="list-unstyled text-start mb-0">
                    <li className="d-flex align-items-center mb-12">
                      <Icon
                        icon="ph-check-circle"
                        className="text-success-600 me-8 flex-shrink-0 feature-icon"
                      />
                      <span className="text-neutral-700">
                        Kurumsal yönetim paneli
                      </span>
                    </li>
                    <li className="d-flex align-items-center mb-12">
                      <Icon
                        icon="ph-check-circle"
                        className="text-success-600 me-8 flex-shrink-0 feature-icon"
                      />
                      <span className="text-neutral-700">
                        Öğrenci ve veli yönetimi
                      </span>
                    </li>
                    <li className="d-flex align-items-center mb-12">
                      <Icon
                        icon="ph-check-circle"
                        className="text-success-600 me-8 flex-shrink-0 feature-icon"
                      />
                      <span className="text-neutral-700">
                        Kampanya ve paket sistemi
                      </span>
                    </li>
                    <li className="d-flex align-items-center">
                      <Icon
                        icon="ph-check-circle"
                        className="text-success-600 me-8 flex-shrink-0 feature-icon"
                      />
                      <span className="text-neutral-700">
                        Detaylı raporlama
                      </span>
                    </li>
                  </ul>
                </div>
              </CustomCard>
            </div>
          </div>

          {/* Veli Kaydı */}
          <div className="col-lg-5 col-md-6">
            <div
              className="hover-card-wrapper cursor-pointer h-100"
              onClick={handleUserClick}
            >
              <CustomCard className="h-100 transition-all">
                <div className="text-center">
                  {/* Icon */}
                  <div className="icon-container user-icon d-inline-flex align-items-center justify-content-center mb-24">
                    <Icon
                      icon="ph-users-three"
                      className="text-danger-600 icon-lg"
                    />
                  </div>

                  {/* Title */}
                  <h4 className="mb-12">Veli Kaydı</h4>

                  {/* Description */}
                  <p className="text-neutral-600 mb-24">
                    Veli olarak kaydolun ve çocuğunuzun eğitim sürecini takip
                    edin
                  </p>

                  {/* Features */}
                  <ul className="list-unstyled text-start mb-0">
                    <li className="d-flex align-items-center mb-12">
                      <Icon
                        icon="ph-check-circle"
                        className="text-success-600 me-8 flex-shrink-0 feature-icon"
                      />
                      <span className="text-neutral-700">
                        Çocuk bilgilerini yönetin
                      </span>
                    </li>
                    <li className="d-flex align-items-center mb-12">
                      <Icon
                        icon="ph-check-circle"
                        className="text-success-600 me-8 flex-shrink-0 feature-icon"
                      />
                      <span className="text-neutral-700">
                        Eğitim ilerlemesini takip edin
                      </span>
                    </li>
                    <li className="d-flex align-items-center mb-12">
                      <Icon
                        icon="ph-check-circle"
                        className="text-success-600 me-8 flex-shrink-0 feature-icon"
                      />
                      <span className="text-neutral-700">
                        Kurumlarla iletişim kurun
                      </span>
                    </li>
                    <li className="d-flex align-items-center">
                      <Icon
                        icon="ph-check-circle"
                        className="text-success-600 me-8 flex-shrink-0 feature-icon"
                      />
                      <span className="text-neutral-700">
                        Ödemeleri yönetin
                      </span>
                    </li>
                  </ul>
                </div>
              </CustomCard>
            </div>
          </div>
        </div>

        {/* Footer Link */}
        <div className="text-center mt-48 pt-24 border-top">
          <p className="text-neutral-600 mb-0">
            Zaten hesabınız var mı?{" "}
            <a href="/auth/login" className="text-main-600 fw-semibold">
              Giriş Yapın
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;

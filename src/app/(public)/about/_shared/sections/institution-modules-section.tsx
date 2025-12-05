import React from "react";
import { CustomCard } from "@/components";

export const InstitutionModulesSection: React.FC = () => {
  return (
    <CustomCard
      title="Yönetim Modülleri"
      subtitle="Kurumunuz için tüm araçlar"
      className="mb-40"
    >
      <div className="row row-gap-24">
        <div className="col-lg-6">
          <div className="module-card">
            <div className="module-card__header">
              <div className="module-card__icon module-card__icon--main">
                <i className="ph-bold ph-buildings"></i>
              </div>
              <div className="module-card__content">
                <h3 className="module-card__title">Kurum & Kampüs Yönetimi</h3>
                <p className="module-card__description">
                  Tüm şubelerinizi, kampüslerinizi ve yaş gruplarınızı organize
                  edin.
                </p>
              </div>
            </div>
            <ul className="module-card__features">
              <li className="module-card__feature-item">
                <i className="ph-bold ph-check-circle"></i>
                <span>Çoklu kampüs yönetimi</span>
              </li>
              <li className="module-card__feature-item">
                <i className="ph-bold ph-check-circle"></i>
                <span>Detaylı Kurum profilleri</span>
              </li>
              <li className="module-card__feature-item">
                <i className="ph-bold ph-check-circle"></i>
                <span>Fiyat yapılandırması</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="col-lg-6">
          <div className="module-card">
            <div className="module-card__header">
              <div className="module-card__icon module-card__icon--success">
                <i className="ph-bold ph-chart-bar"></i>
              </div>
              <div className="module-card__content">
                <h3 className="module-card__title">Analitik & Raporlama</h3>
                <p className="module-card__description">
                  Performansınızı ölçün, stratejilerinizi geliştirin.
                </p>
              </div>
            </div>
            <ul className="module-card__features">
              <li className="module-card__feature-item">
                <i className="ph-bold ph-check-circle"></i>
                <span>Ziyaretçi analizi</span>
              </li>
              <li className="module-card__feature-item">
                <i className="ph-bold ph-check-circle"></i>
                <span>Randevu istatistikleri</span>
              </li>
              <li className="module-card__feature-item">
                <i className="ph-bold ph-check-circle"></i>
                <span>Kampanya performansı</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </CustomCard>
  );
};

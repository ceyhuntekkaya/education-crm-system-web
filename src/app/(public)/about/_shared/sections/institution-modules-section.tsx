import React from "react";

const modules = [
  {
    icon: "ph-buildings",
    title: "Kurum & Kampüs Yönetimi",
    description:
      "Tüm şubelerinizi, kampüslerinizi ve yaş gruplarınızı organize edin.",
    iconClass: "feature-card__icon--main",
  },
  {
    icon: "ph-chart-bar",
    title: "Analitik & Raporlama",
    description: "Performansınızı ölçün, stratejilerinizi geliştirin.",
    iconClass: "feature-card__icon--primary",
  },
  {
    icon: "ph-users",
    title: "Kullanıcı Yönetimi",
    description:
      "Ekip üyelerinizi, rollerini ve yetkilerini merkezi olarak kontrol edin.",
    iconClass: "feature-card__icon--success",
  },
  {
    icon: "ph-megaphone",
    title: "Kampanya Yönetimi",
    description:
      "İndirim kampanyaları ve pazarlama stratejilerinizi planlayın.",
    iconClass: "feature-card__icon--warning",
  },
  {
    icon: "ph-calendar-check",
    title: "Randevu Sistemi",
    description:
      "Veli görüşmelerini ve kampüs ziyaretlerini profesyonelce organize edin.",
    iconClass: "feature-card__icon--info",
  },
  {
    icon: "ph-image",
    title: "Galeri & Medya",
    description:
      "Etkinlik fotoğrafları ve kurumsal görsellerinizi organize edin.",
    iconClass: "feature-card__icon--danger",
  },
];

export const InstitutionModulesSection: React.FC = () => {
  return (
    <div className="about-features-wrap">
      <div className="section-header" data-aos="fade-up">
        <div
          className="category-hero__badge category-hero__badge--dark"
          style={{ marginBottom: 12, display: "inline-flex" }}
        >
          <i className="ph-bold ph-stack" />
          Yönetim Araçları
        </div>
        <h2 className="section-header__title">Yönetim Modülleri</h2>
        <p className="section-header__subtitle">Kurumunuz için tüm araçlar</p>
      </div>
      <div className="row row-gap-24">
        {modules.map((mod, i) => (
          <div
            key={i}
            className="col-lg-4 col-md-6"
            data-aos="fade-up"
            data-aos-delay={Math.floor(i / 3) * 80 + (i % 3) * 60}
          >
            <div className="feature-card">
              <div className="feature-card__icon-wrapper">
                <div className={`feature-card__icon ${mod.iconClass}`}>
                  <i className={`ph-bold ${mod.icon}`} />
                </div>
              </div>
              <h4 className="feature-card__title">{mod.title}</h4>
              <p className="feature-card__description">{mod.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

import React from "react";

const values = [
  {
    icon: "ph-bold ph-shield-check",
    title: "Güvenilirlik",
    description: "Verileriniz en yüksek güvenlik standartlarıyla korunur.",
    iconClass: "category-advantages__card-icon",
  },
  {
    icon: "ph-bold ph-rocket-launch",
    title: "İnovasyon",
    description: "Sürekli gelişen teknoloji ile her zaman güncel kalın.",
    iconClass: "category-advantages__card-icon",
  },
  {
    icon: "ph-bold ph-handshake",
    title: "Müşteri Odaklı",
    description: "İhtiyaçlarınızı dinliyor ve en iyi çözümleri sunuyoruz.",
    iconClass: "category-advantages__card-icon",
  },
  {
    icon: "ph-bold ph-medal",
    title: "Kalite",
    description: "En yüksek standartlarda hizmet kalitesi sunuyoruz.",
    iconClass: "category-advantages__card-icon",
  },
  {
    icon: "ph-bold ph-globe",
    title: "Erişilebilirlik",
    description: "Türkiye genelinde her yerden, her cihazdan ulaşılabilir.",
    iconClass: "category-advantages__card-icon",
  },
  {
    icon: "ph-bold ph-trend-up",
    title: "Şeffaflık",
    description: "Açık fiyatlandırma, net süreçler, herkes için eşit erişim.",
    iconClass: "category-advantages__card-icon",
  },
];

export const AboutValuesSection: React.FC = () => {
  return (
    <div className="category-advantages">
      <div className="section-header" data-aos="fade-up">
        <h2 className="section-header__title">Değerlerimiz</h2>
        <p className="section-header__subtitle">
          Bizi biz yapan temel prensipler ve anlayış
        </p>
      </div>
      <div className="category-advantages__grid">
        {values.map((v, i) => (
          <div
            key={i}
            className="category-advantages__card"
            data-aos="fade-up"
            data-aos-delay={i * 70}
          >
            <div className={v.iconClass}>
              <i className={v.icon} />
            </div>
            <h5 className="category-advantages__card-title">{v.title}</h5>
            <p className="category-advantages__card-desc">{v.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

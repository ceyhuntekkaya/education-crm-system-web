import React from "react";

export const MissionVisionSection: React.FC = () => {
  return (
    <div className="row row-gap-24 mb-40">
      {/* Misyon */}
      <div className="col-lg-6" data-aos="fade-right">
        <div className="mission-vision-card mission-vision-card--mission">
          <div className="mission-vision-card__icon-wrapper">
            <div className="mission-vision-card__icon bg-main-100">
              <i className="ph-bold ph-target text-main-600"></i>
            </div>
          </div>
          <h3 className="mission-vision-card__title">Misyonumuz</h3>
          <p className="mission-vision-card__description">
            Veliler ve eğitim kurumları arasında köprü kurarak, eğitim sürecini
            daha şeffaf, erişilebilir ve verimli hale getirmek. Teknoloji ile
            eğitim dünyasını buluşturmak.
          </p>
          <ul className="mission-vision-card__list">
            <li className="mission-vision-card__list-item">
              <i className="ph-bold ph-check-circle text-success-600"></i>
              <span>Velilere en uygun kurumu bulmada yardımcı olmak</span>
            </li>
            <li className="mission-vision-card__list-item">
              <i className="ph-bold ph-check-circle text-success-600"></i>
              <span>Eğitim kurumlarının dijital görünürlüğünü artırmak</span>
            </li>
            <li className="mission-vision-card__list-item">
              <i className="ph-bold ph-check-circle text-success-600"></i>
              <span>Şeffaf ve güvenilir bir platform sunmak</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Vizyon */}
      <div className="col-lg-6" data-aos="fade-left">
        <div className="mission-vision-card mission-vision-card--vision">
          <div className="mission-vision-card__icon-wrapper">
            <div className="mission-vision-card__icon bg-main-two-100">
              <i className="ph-bold ph-eye text-main-two-600"></i>
            </div>
          </div>
          <h3 className="mission-vision-card__title">Vizyonumuz</h3>
          <p className="mission-vision-card__description">
            Türkiye&apos;nin en kapsamlı ve tercih edilen eğitim platformu
            olmak. Her veli ve eğitim kurumunun dijital dönüşüm yolculuğunda
            yanında olmak.
          </p>
          <ul className="mission-vision-card__list">
            <li className="mission-vision-card__list-item">
              <i className="ph-bold ph-check-circle text-success-600"></i>
              <span>
                Tüm Türkiye&apos;deki eğitim kurumlarını tek platformda toplamak
              </span>
            </li>
            <li className="mission-vision-card__list-item">
              <i className="ph-bold ph-check-circle text-success-600"></i>
              <span>Yapay zeka destekli akıllı eşleştirme geliştirmek</span>
            </li>
            <li className="mission-vision-card__list-item">
              <i className="ph-bold ph-check-circle text-success-600"></i>
              <span>Eğitim sektöründe dijital standartları belirlemek</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

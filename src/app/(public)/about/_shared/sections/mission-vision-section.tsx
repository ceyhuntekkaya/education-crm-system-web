import React from "react";
import { CustomCard } from "@/components";

export const MissionVisionSection: React.FC = () => {
  return (
    <div className="row row-gap-24 mb-40">
      <div className="col-lg-6">
        <CustomCard title="Misyonumuz" className="mission-vision-card">
          <div className="mission-vision-card__content mission-vision-card__content--main">
            <p className="mission-vision-card__description">
              Veliler ve eğitim kurumları arasında köprü kurarak, eğitim
              sürecini daha şeffaf, erişilebilir ve verimli hale getirmek.
              Teknoloji ile eğitim dünyasını buluşturmak.
            </p>
            <ul className="mission-vision-card__list">
              <li className="mission-vision-card__list-item">
                <i className="ph-bold ph-check-circle"></i>
                <span>Velilere en uygun okulu bulmada yardımcı olmak</span>
              </li>
              <li className="mission-vision-card__list-item">
                <i className="ph-bold ph-check-circle"></i>
                <span>Eğitim kurumlarının dijital görünürlüğünü artırmak</span>
              </li>
              <li className="mission-vision-card__list-item">
                <i className="ph-bold ph-check-circle"></i>
                <span>Şeffaf ve güvenilir bir platform sunmak</span>
              </li>
            </ul>
          </div>
        </CustomCard>
      </div>
      <div className="col-lg-6">
        <CustomCard title="Vizyonumuz" className="mission-vision-card">
          <div className="mission-vision-card__content mission-vision-card__content--success">
            <p className="mission-vision-card__description">
              Türkiye&apos;nin en kapsamlı ve tercih edilen eğitim platformu
              olmak. Her veli ve eğitim kurumunun dijital dönüşüm yolculuğunda
              yanında olmak.
            </p>
            <ul className="mission-vision-card__list">
              <li className="mission-vision-card__list-item">
                <i className="ph-bold ph-check-circle"></i>
                <span>
                  Tüm Türkiye&apos;deki eğitim kurumlarını tek platformda
                  toplamak
                </span>
              </li>
              <li className="mission-vision-card__list-item">
                <i className="ph-bold ph-check-circle"></i>
                <span>Yapay zeka destekli akıllı eşleştirme geliştirmek</span>
              </li>
              <li className="mission-vision-card__list-item">
                <i className="ph-bold ph-check-circle"></i>
                <span>Eğitim sektöründe dijital standartları belirlemek</span>
              </li>
            </ul>
          </div>
        </CustomCard>
      </div>
    </div>
  );
};

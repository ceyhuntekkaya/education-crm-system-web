"use client";

import React from "react";

const serviceCards = [
  {
    icon: "ph-presentation-chart",
    title: "Ücretsiz Demo",
    description: "Platformu canlı olarak keşfedin",
    colorClass: "main",
  },
  {
    icon: "ph-rocket-launch",
    title: "Hızlı Kurulum",
    description: "Aynı gün yayına başlayın",
    colorClass: "success",
  },
  {
    icon: "ph-graduation-cap",
    title: "Eğitim Desteği",
    description: "Ekibinize özel eğitim",
    colorClass: "warning",
  },
  {
    icon: "ph-currency-circle-dollar",
    title: "Esnek Fiyatlandırma",
    description: "Kurumunuza özel paketler",
    colorClass: "info",
  },
];

const platformFeatures = [
  {
    icon: "ph-buildings",
    title: "Çoklu kampüs ve şube yönetimi",
    colorClass: "main",
  },
  {
    icon: "ph-users",
    title: "Ekip ve yetki yönetimi",
    colorClass: "primary",
  },
  {
    icon: "ph-calendar-check",
    title: "Randevu ve görüşme takibi",
    colorClass: "success",
  },
  {
    icon: "ph-megaphone",
    title: "Kampanya ve indirim yönetimi",
    colorClass: "warning",
  },
  {
    icon: "ph-image",
    title: "Galeri ve medya yönetimi",
    colorClass: "info",
  },
  {
    icon: "ph-chart-bar",
    title: "Analitik raporlar ve istatistikler",
    colorClass: "danger",
  },
];

export const InstitutionInfoSection: React.FC = () => {
  return (
    <div className="pe-lg-4">
      {/* Başlık */}
      <div className="flex-align d-inline-flex gap-8 mb-16">
        <span className="text-main-600 text-2xl d-flex">
          <i className="ph-bold ph-buildings" />
        </span>
        <h5 className="text-main-600 mb-0">Kurumlar İçin</h5>
      </div>
      <h2 className="mb-24">Eğitim Kurumunuzu Dijitale Taşıyın</h2>
      <p className="text-neutral-500 mb-32">
        Eğitim İste, okullar, kurslar ve eğitim kurumları için tasarlanmış
        kapsamlı bir yönetim platformudur. Kurumunuzu binlerce veliye ulaştırın,
        randevularınızı yönetin ve online başvuru alın. Ekibimiz size özel bir
        demo sunarak tüm özellikleri tanıtacaktır.
      </p>

      {/* Hizmetler Kartları */}
      <div className="row g-3 mb-32">
        {serviceCards.map((card, index) => (
          <div key={index} className="col-6">
            <div className="p-16 bg-white rounded-12 border border-neutral-30 h-100 hover-shadow-sm transition-2">
              <div
                className={`w-48 h-48 rounded-circle bg-${card.colorClass}-100 flex-center mb-12`}
              >
                <i
                  className={`ph ${card.icon} text-${card.colorClass}-600 text-xl`}
                />
              </div>
              <h6 className="mb-4 text-neutral-700">{card.title}</h6>
              <small className="text-neutral-500">{card.description}</small>
            </div>
          </div>
        ))}
      </div>

      {/* Özellik Listesi */}
      <div className="p-20 bg-white rounded-12 border border-neutral-30">
        <h6 className="mb-16 text-neutral-700">
          <i className="ph ph-star-four text-main-600 me-8" />
          Platform Özellikleri
        </h6>
        <div className="d-flex flex-column gap-12">
          {platformFeatures.map((feature, index) => (
            <div key={index} className="d-flex align-items-center gap-12">
              <span
                className={`w-32 h-32 flex-center rounded-circle bg-${feature.colorClass}-100 text-${feature.colorClass}-600 flex-shrink-0`}
              >
                <i className={`ph-bold ${feature.icon}`} />
              </span>
              <span className="text-neutral-700">{feature.title}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

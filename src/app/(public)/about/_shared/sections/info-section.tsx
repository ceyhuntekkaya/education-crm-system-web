"use client";

import React from "react";
import { Button } from "@/components/ui";
import { ParentAppSection } from "./parent-app-section";

interface InfoSectionProps {
  activeTab?: "parent-tab" | "institution-tab";
}

const institutionServices = [
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

export const InfoSection: React.FC<InfoSectionProps> = ({
  activeTab = "institution-tab",
}) => {
  // Veliler sekmesi için App Store/Play Store bölümü göster
  if (activeTab === "parent-tab") {
    return (
      <div className="row">
        <div className="col-12">
          <ParentAppSection />
        </div>
      </div>
    );
  }

  // Kurumlar sekmesi için zengin tasarım
  return (
    <div className="row">
      <div className="col-12">
        <div className="institution-info-section">
          {/* Başlık */}
          <div className="institution-info-section__header">
            <div className="institution-info-section__icon-wrapper">
              <i className="ph-bold ph-buildings"></i>
            </div>
            <h3 className="institution-info-section__title">
              Kurumunuzu Dijitale Taşıyın
            </h3>
            <p className="institution-info-section__description">
              Eğitim İste platformu ile kurumunuzu binlerce veliye ulaştırın,
              randevularınızı yönetin ve online başvuru alın.
            </p>
          </div>

          {/* Hizmet Kartları */}
          <div className="institution-info-section__services">
            {institutionServices.map((service, index) => (
              <div key={index} className="service-card">
                <div
                  className={`service-card__icon bg-${service.colorClass}-100`}
                >
                  <i
                    className={`ph ${service.icon} text-${service.colorClass}-600`}
                  ></i>
                </div>
                <div className="service-card__content">
                  <h6 className="service-card__title">{service.title}</h6>
                  <small className="service-card__description">
                    {service.description}
                  </small>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Buton */}
          <div className="institution-info-section__cta">
            <Button
              variant="inline"
              size="md"
              href="/contact?scrollToForm=true"
            >
              <i className="ph ph-envelope-simple me-8"></i>
              Bizimle İletişime Geçin
            </Button>
            <p className="institution-info-section__cta-note">
              <i className="ph ph-clock me-4"></i>
              Ekibimiz en kısa sürede size dönüş yapacaktır
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

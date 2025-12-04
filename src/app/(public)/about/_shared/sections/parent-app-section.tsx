"use client";

import React from "react";

const appFeatures = [
  {
    icon: "ph-magnifying-glass",
    text: "Okul Arama",
  },
  {
    icon: "ph-scales",
    text: "Karşılaştırma",
  },
  {
    icon: "ph-calendar-check",
    text: "Randevu",
  },
  {
    icon: "ph-chat-circle-dots",
    text: "Mesajlaşma",
  },
];

export const ParentAppSection: React.FC = () => {
  return (
    <div className="parent-app-section">
      {/* Sol Taraf - İçerik */}
      <div className="parent-app-section__content">
        <div className="parent-app-section__badge">
          <i className="ph ph-device-mobile"></i>
          <span>Mobil Uygulama</span>
        </div>

        <h3 className="parent-app-section__title">
          Eğitim İste&apos;yi
          <br />
          <span className="text-main-600">Cebinize İndirin</span>
        </h3>

        <p className="parent-app-section__description">
          Çocuğunuz için en uygun eğitim kurumunu kolayca bulun, karşılaştırın
          ve tek tıkla randevu alın.
        </p>

        {/* Özellikler */}
        <div className="parent-app-section__features">
          {appFeatures.map((feature, index) => (
            <div key={index} className="app-feature">
              <i className={`ph ${feature.icon}`}></i>
              <span>{feature.text}</span>
            </div>
          ))}
        </div>

        {/* Store Badges */}
        <div className="parent-app-section__stores">
          <a
            href="https://apps.apple.com/app"
            target="_blank"
            rel="noopener noreferrer"
            className="store-badge store-badge--apple"
          >
            <i className="ph-fill ph-apple-logo store-badge__icon"></i>
            <div className="store-badge__text">
              <span className="store-badge__small">Download on the</span>
              <span className="store-badge__large">App Store</span>
            </div>
          </a>

          <a
            href="https://play.google.com/store/apps"
            target="_blank"
            rel="noopener noreferrer"
            className="store-badge store-badge--google"
          >
            <i className="ph-fill ph-google-play-logo store-badge__icon"></i>
            <div className="store-badge__text">
              <span className="store-badge__small">GET IT ON</span>
              <span className="store-badge__large">Google Play</span>
            </div>
          </a>
        </div>

        <p className="parent-app-section__note">
          <i className="ph-fill ph-star me-6"></i>
          <span>Yakında yayında! Bizi takipte kalın.</span>
        </p>
      </div>

      {/* Sağ Taraf - QR Kodlar */}
      <div className="parent-app-section__qr-section">
        <div className="qr-card">
          <div className="qr-card__header">
            <i className="ph-fill ph-apple-logo"></i>
            <span>iOS</span>
          </div>
          <div className="qr-card__code">
            <i className="ph ph-qr-code"></i>
          </div>
          <span className="qr-card__label">Yakında</span>
        </div>

        <div className="qr-card">
          <div className="qr-card__header">
            <i className="ph-fill ph-google-play-logo"></i>
            <span>Android</span>
          </div>
          <div className="qr-card__code">
            <i className="ph ph-qr-code"></i>
          </div>
          <span className="qr-card__label">Yakında</span>
        </div>
      </div>
    </div>
  );
};

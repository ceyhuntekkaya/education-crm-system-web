import React from "react";
import Link from "next/link";

export const VideoCTASection: React.FC = () => {
  return (
    <div className="video-cta mb-40" data-aos="fade-up">
      <div className="video-cta__content">
        <div className="video-cta__icon">
          <i className="ph-fill ph-rocket-launch"></i>
        </div>
        <h2 className="video-cta__title">Hemen Keşfetmeye Başlayın</h2>
        <p className="video-cta__description">
          Size en uygun eğitim kurumunu bulmak için arama yapmaya başlayın.
          Ücretsiz üyelik ile tüm özelliklere erişin!
        </p>
        <div className="video-cta__buttons">
          <Link
            href="/search"
            className="btn btn-main rounded-pill flex-align gap-8"
          >
            <i className="ph-bold ph-magnifying-glass"></i>
            Aramaya Başla
          </Link>
          <Link
            href="/about"
            className="btn btn-outline-main rounded-pill flex-align gap-8"
          >
            <i className="ph-bold ph-info"></i>
            Hakkımızda
          </Link>
        </div>
      </div>
    </div>
  );
};


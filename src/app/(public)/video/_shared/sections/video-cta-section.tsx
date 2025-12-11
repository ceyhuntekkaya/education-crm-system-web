import React from "react";
import Link from "next/link";

export const VideoCTASection: React.FC = () => {
  return (
    <div className="video-cta-section mb-40" data-aos="fade-up">
      <div className="video-cta-section__content">
        <div className="video-cta-section__icon">
          <i className="ph-fill ph-rocket-launch"></i>
        </div>
        <h2 className="video-cta-section__title">Hemen Keşfetmeye Başlayın</h2>
        <p className="video-cta-section__description">
          Size en uygun eğitim kurumunu bulmak için arama yapmaya başlayın.
          Ücretsiz üyelik ile tüm özelliklere erişin!
        </p>
        
        {/* Simple Buttons */}
        <div className="video-cta-section__buttons">
          <Link
            href="/search"
            className="btn btn-white btn-lg rounded-pill flex-align gap-8"
          >
            <i className="ph-bold ph-magnifying-glass"></i>
            Aramaya Başla
            <i className="ph-bold ph-arrow-right"></i>
          </Link>
          
          <Link
            href="/about"
            className="btn btn-outline-white btn-lg rounded-pill flex-align gap-8"
          >
            <i className="ph-bold ph-info"></i>
            Hakkımızda
          </Link>
        </div>
      </div>
    </div>
  );
};


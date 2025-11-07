import React from "react";
import Logo from "@/components/layouts/header/sections/logo";

export const AboutHeroSection: React.FC = () => {
  return (
    <div className="row">
      <div className="col-12">
        <div className="about-hero">
          <div className="about-hero__logo">
            <Logo className="about-hero__logo-image" />
          </div>
          <h1 className="about-hero__title">
            <span className="highlight">Hakkımızda</span>
          </h1>
          <p className="about-hero__description">
            Veliler ve eğitim kurumları için tasarlanmış, modern ve kapsamlı bir
            platform. Her iki taraf için de en iyi deneyimi sunuyoruz.
          </p>
        </div>
      </div>
    </div>
  );
};

import React from "react";
import Logo from "@/components/layouts/header/sections/logo";

export const BrandSection: React.FC = () => {
  return (
    <div className="row mb-40">
      <div className="col-12">
        <div className="brand-section">
          <div className="brand-section__logo-wrapper">
            <Logo />
          </div>
          <p className="brand-section__description">
            Modern eğitim yönetimi için güvenilir çözüm ortağınız. Eğitim
            kurumları ve veliler için tasarlanmış, kullanımı kolay ve güvenli
            platform.
          </p>
        </div>
      </div>
    </div>
  );
};

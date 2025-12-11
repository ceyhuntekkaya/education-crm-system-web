import React from "react";
import Image from "next/image";

export const AboutHeroSection: React.FC = () => {
  return (
    <div className="row">
      <div className="col-12">
        <div className="about-hero" data-aos="fade-up">
          <div className="flex-align gap-8 mb-16 justify-content-center">
            <span className="w-8 h-8 bg-main-600 rounded-circle" />
            <h5 className="text-main-600 mb-0">
              <span className="text-main-two-600">Eğitim İste</span>{" "}
              <span className="text-main-600">Hakkında</span>
            </h5>
          </div>
          <h1
            className="about-hero__title"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            Eğitim Dünyasını{" "}
            <span className="text-main-600">Birleştiren</span>{" "}
            <span className="text-main-two-600">Platform</span>
          </h1>
          <p
            className="about-hero__description"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            Veliler ve eğitim kurumları için tasarlanmış, modern ve kapsamlı bir
            platform. Eğitim sürecini daha şeffaf, erişilebilir ve verimli hale
            getiriyoruz.
          </p>
        </div>
      </div>
    </div>
  );
};

import React from "react";
import Link from "next/link";

export const AboutHeroSection: React.FC = () => {
  return (
    <div className="category-hero" data-aos="fade-up">
      <div className="category-hero__badge">
        <i className="ph-bold ph-info" />
        Hakkımızda
      </div>
      <h1
        className="category-hero__title"
        data-aos="fade-up"
        data-aos-delay="100"
      >
        Eğitim Dünyasını <span className="text-gradient-main">Birleştiren</span>{" "}
        Platform
      </h1>
      <p
        className="category-hero__desc"
        data-aos="fade-up"
        data-aos-delay="200"
      >
        Veliler ve eğitim kurumları için tasarlanmış, modern ve kapsamlı bir
        platform. Eğitim sürecini daha şeffaf, erişilebilir ve verimli hale
        getiriyoruz.
      </p>
      <div
        className="category-hero__actions"
        data-aos="fade-up"
        data-aos-delay="300"
      >
        <Link
          href="/search"
          className="btn btn-main rounded-pill flex-align gap-8 d-inline-flex shimmer-btn"
        >
          <i className="ph-bold ph-magnifying-glass d-flex text-lg" />
          Eğitim Ara
        </Link>
        <Link
          href="/contact"
          className="btn btn-outline-main rounded-pill flex-align gap-8 d-inline-flex"
        >
          <i className="ph-bold ph-envelope d-flex text-lg" />
          Bize Ulaşın
        </Link>
      </div>
    </div>
  );
};

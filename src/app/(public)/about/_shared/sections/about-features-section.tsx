import React from "react";
import type { Feature } from "../config";

interface AboutFeaturesSectionProps {
  title: string;
  subtitle: string;
  features: Feature[];
  targetAudience: "parent" | "institution";
}

export const AboutFeaturesSection: React.FC<AboutFeaturesSectionProps> = ({
  title,
  subtitle,
  features,
  targetAudience,
}) => {
  const audienceIcon =
    targetAudience === "parent" ? "ph-users" : "ph-buildings";
  const audienceColor = targetAudience === "parent" ? "main" : "main-two";

  return (
    <div className="about-features-section mb-40" data-aos="fade-up">
      {/* Header with gradient background */}
      <div className={`about-features-section__header about-features-section__header--${audienceColor}`}>
        <div className="about-features-section__header-content">
          <div className={`about-features-section__icon bg-white`}>
            <i className={`ph-bold ${audienceIcon} text-${audienceColor}-600`}></i>
          </div>
          <h2 className="about-features-section__title">{title}</h2>
          <p className="about-features-section__subtitle">{subtitle}</p>
        </div>
      </div>

      {/* Features Grid */}
      <div className="about-features-section__content">
        <div className="row row-gap-24">
          {features.map((feature, index) => (
            <div key={index} className="col-lg-4 col-md-6">
              <div className="feature-card">
                <div className="feature-card__icon-wrapper">
                  <div className={`feature-card__icon ${feature.iconClass}`}>
                    <i className={`ph-bold ${feature.icon}`}></i>
                  </div>
                </div>
                <h4 className="feature-card__title">{feature.title}</h4>
                <p className="feature-card__description">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};


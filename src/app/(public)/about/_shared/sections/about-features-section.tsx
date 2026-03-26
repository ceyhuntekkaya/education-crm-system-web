import React from "react";
import type { Feature } from "../config";

interface AboutFeaturesSectionProps {
  title: string;
  subtitle: string;
  features: Feature[];
  targetAudience: "parent" | "institution";
  badgeLabel: string;
}

export const AboutFeaturesSection: React.FC<AboutFeaturesSectionProps> = ({
  title,
  subtitle,
  features,
  targetAudience,
  badgeLabel,
}) => {
  const badgeIcon =
    targetAudience === "parent" ? "ph-bold ph-users" : "ph-bold ph-buildings";
  const badgeModifier =
    targetAudience === "institution" ? "category-hero__badge--dark" : "";

  return (
    <div className="about-features-wrap">
      <div className="section-header" data-aos="fade-up">
        <div
          className={`category-hero__badge ${badgeModifier}`}
          style={{ marginBottom: 12, display: "inline-flex" }}
        >
          <i className={badgeIcon} />
          {badgeLabel}
        </div>
        <h2 className="section-header__title">{title}</h2>
        <p className="section-header__subtitle">{subtitle}</p>
      </div>

      <div className="row row-gap-24">
        {features.map((feature, index) => (
          <div
            key={index}
            className="col-lg-4 col-md-6"
            data-aos="fade-up"
            data-aos-delay={Math.floor(index / 3) * 80 + (index % 3) * 60}
          >
            <div className="feature-card">
              <div className="feature-card__icon-wrapper">
                <div className={`feature-card__icon ${feature.iconClass}`}>
                  <i className={`ph-bold ${feature.icon}`} />
                </div>
              </div>
              <h4 className="feature-card__title">{feature.title}</h4>
              <p className="feature-card__description">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};


import React from "react";
import { CustomCard } from "@/components";
import type { PlatformFeature } from "../types";

interface VideoFeaturesSectionProps {
  features: readonly PlatformFeature[];
}

export const VideoFeaturesSection: React.FC<VideoFeaturesSectionProps> = ({
  features,
}) => {
  return (
    <CustomCard
      title="Platform Özellikleri"
      subtitle="Eğitim İste ile neler yapabilirsiniz?"
      size="lg"
      className="mb-40"
      data-aos="fade-up"
    >
      <div className="row row-gap-24">
        {features.map((feature, index) => (
          <div key={index} className="col-lg-4 col-md-6">
            <div className="feature-card">
              <div className="feature-card__icon-wrapper">
                <div className="feature-card__icon bg-main-100">
                  <i className={`ph-bold ${feature.icon}`}></i>
                </div>
              </div>
              <h4 className="feature-card__title">{feature.title}</h4>
              <p className="feature-card__description">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </CustomCard>
  );
};


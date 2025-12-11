import React from "react";
import type { PlatformFeature } from "../types";

interface VideoFeaturesSectionProps {
  features: readonly PlatformFeature[];
}

export const VideoFeaturesSection: React.FC<VideoFeaturesSectionProps> = ({
  features,
}) => {
  return (
    <div className="video-features-section mb-40" data-aos="fade-up">
      {/* Header with gradient background */}
      <div className="video-features-section__header">
        <div className="video-features-section__header-content">
          <div className="video-features-section__icon bg-white">
            <i className="ph-bold ph-sparkle text-main-600"></i>
          </div>
          <h2 className="video-features-section__title">Platform Özellikleri</h2>
          <p className="video-features-section__subtitle">
            Eğitim İste ile neler yapabilirsiniz?
          </p>
        </div>
      </div>

      {/* Features Grid */}
      <div className="video-features-section__content">
        <div className="row row-gap-24">
          {features.map((feature, index) => (
            <div key={index} className="col-lg-4 col-md-6">
              <div className="feature-card">
                <div className="feature-card__icon-wrapper">
                  <div className="feature-card__icon feature-card__icon--main">
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
      </div>
    </div>
  );
};


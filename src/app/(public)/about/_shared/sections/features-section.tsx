import React from "react";
import { CustomCard } from "@/components";
import type { Feature } from "../config";

interface FeaturesSectionProps {
  features: Feature[];
  title?: string;
  subtitle?: string;
}

export const FeaturesSection: React.FC<FeaturesSectionProps> = ({
  features,
  title = "Özellikler",
  subtitle = "Size sunduğumuz tüm imkanlar",
}) => {
  return (
    <CustomCard title={title} subtitle={subtitle} className="mb-40">
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
    </CustomCard>
  );
};

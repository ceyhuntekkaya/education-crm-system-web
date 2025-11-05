import React from "react";
import { CustomCard } from "@/components";
import type { Advantage } from "../config";

interface AdvantagesSectionProps {
  advantages: Advantage[];
  title?: string;
  subtitle?: string;
}

export const AdvantagesSection: React.FC<AdvantagesSectionProps> = ({
  advantages,
  title = "Neden Eğitim İste?",
  subtitle = "Özel avantajlar",
}) => {
  return (
    <CustomCard title={title} subtitle={subtitle} className="mb-40">
      <div className="row row-gap-24">
        {advantages.map((advantage, index) => (
          <div key={index} className="col-lg-4 col-md-6">
            <div className="advantage-card">
              <div className={`advantage-card__icon ${advantage.iconClass}`}>
                <i className={`ph-bold ${advantage.icon}`}></i>
              </div>
              <h5 className="advantage-card__title">{advantage.title}</h5>
              <p className="advantage-card__description">
                {advantage.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </CustomCard>
  );
};

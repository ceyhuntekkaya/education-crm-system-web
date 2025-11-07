import React from "react";
import { CustomCard } from "@/components";

interface ProcessStep {
  number: number;
  title: string;
  description: string;
  colorVariant: "main" | "primary" | "success";
}

interface HowItWorksSectionProps {
  steps: ProcessStep[];
  title?: string;
  subtitle?: string;
}

export const HowItWorksSection: React.FC<HowItWorksSectionProps> = ({
  steps,
  title = "Nasıl Kullanırım?",
  subtitle = "3 basit adımda başlayın",
}) => {
  return (
    <CustomCard title={title} subtitle={subtitle} className="mb-40">
      <div className="row row-gap-24">
        {steps.map((step, index) => (
          <div key={index} className="col-lg-4">
            <div className="process-card">
              <div
                className={`process-card__number process-card__number--${step.colorVariant}`}
              >
                {step.number}
              </div>
              <h4 className="process-card__title">{step.title}</h4>
              <p className="process-card__description">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </CustomCard>
  );
};

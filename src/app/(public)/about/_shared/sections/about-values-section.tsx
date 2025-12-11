import React from "react";

interface PlatformValue {
  icon: string;
  title: string;
  description: string;
  color: string;
}

interface AboutValuesSectionProps {
  values: PlatformValue[];
}

export const AboutValuesSection: React.FC<AboutValuesSectionProps> = ({
  values,
}) => {
  return (
    <div className="about-values-section mb-40" data-aos="fade-up">
      {/* Header */}
      <div className="about-values-section__header">
        <div className="about-values-section__icon">
          <i className="ph-bold ph-heart"></i>
        </div>
        <h2 className="about-values-section__title">Değerlerimiz</h2>
        <p className="about-values-section__subtitle">Bizi biz yapan prensipler</p>
      </div>

      {/* Values Grid */}
      <div className="about-values-section__content">
        <div className="row row-gap-24">
          {values.map((value, index) => (
            <div key={index} className="col-lg-3 col-md-6">
              <div className="value-card">
                <div className={`value-card__icon bg-${value.color}-100`}>
                  <i className={`ph-bold ${value.icon} text-${value.color}-600`}></i>
                </div>
                <h4 className="value-card__title">{value.title}</h4>
                <p className="value-card__description">{value.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};


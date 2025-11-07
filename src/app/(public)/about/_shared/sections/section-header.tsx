import React from "react";

interface SectionHeaderProps {
  title: string;
  highlightedText: string;
  description: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  highlightedText,
  description,
}) => {
  return (
    <div className="row mb-40">
      <div className="col-12">
        <div className="section-header">
          <h2 className="section-header__title">
            {title} <span className="highlight">{highlightedText}</span>
          </h2>
          <p className="section-header__description">{description}</p>
        </div>
      </div>
    </div>
  );
};

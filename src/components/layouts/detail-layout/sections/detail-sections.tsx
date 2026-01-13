"use client";

import React from "react";
import type { DetailSection } from "../types";

interface DetailSectionsProps {
  sections?: DetailSection[];
  spacing?: "sm" | "md" | "lg";
  className?: string;
}

/**
 * Detail layout detail sections (detay section'ları)
 */
export const DetailSections: React.FC<DetailSectionsProps> = ({
  sections = [],
  spacing = "md",
  className = "",
}) => {
  if (sections.length === 0) {
    return null;
  }

  const getSpacingClass = () => {
    switch (spacing) {
      case "sm":
        return "gx-3 gy-3";
      case "lg":
        return "gx-5 gy-5";
      default:
        return "gx-4 gy-4";
    }
  };

  const sectionsClassName = ["detail-layout-detail-sections", className]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={sectionsClassName}>
      <div className={`row ${getSpacingClass()}`}>
        {sections.map((section) => {
          const {
            id,
            title,
            children,
            className: sectionClassName = "",
            colSpan = "col-12",
            card = true,
            padding = true,
          } = section;

          const content = (
            <div className={`detail-layout-detail-section ${sectionClassName}`}>
              {title && (
                <div className="detail-layout-detail-section__title">
                  <h5 className="mb-3">{title}</h5>
                </div>
              )}
              <div
                className={`detail-layout-detail-section__content ${
                  padding ? "p-0" : ""
                }`}
              >
                {children}
              </div>
            </div>
          );

          const wrappedContent = card ? (
            <div className="card h-100">
              <div className="card-body">{content}</div>
            </div>
          ) : (
            content
          );

          return (
            <div key={id} className={colSpan}>
              {wrappedContent}
            </div>
          );
        })}
      </div>
    </div>
  );
};

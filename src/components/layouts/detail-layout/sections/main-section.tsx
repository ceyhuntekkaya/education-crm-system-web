"use client";

import React from "react";
import type { DetailSection } from "../types";

interface MainSectionProps {
  config?: DetailSection;
  className?: string;
}

/**
 * Detail layout main section (ana bilgi section'ı)
 */
export const MainSection: React.FC<MainSectionProps> = ({
  config,
  className = "",
}) => {
  if (!config) {
    return null;
  }

  const {
    title,
    children,
    className: configClassName = "",
    colSpan = "col-12",
    card = false,
    padding = true,
  } = config;

  const sectionClassName = [
    "detail-layout-main-section",
    configClassName,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const content = (
    <div className={sectionClassName}>
      {title && (
        <div className="detail-layout-main-section__title">
          <h4 className="mb-3">{title}</h4>
        </div>
      )}
      <div
        className={`detail-layout-main-section__content ${
          padding ? "p-3" : ""
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
    <div className="detail-layout-main-section__wrapper">
      <div className="row gx-5">
        <div className={colSpan}>{wrappedContent}</div>
      </div>
    </div>
  );
};

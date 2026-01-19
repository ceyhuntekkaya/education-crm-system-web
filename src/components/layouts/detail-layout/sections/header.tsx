"use client";

import React from "react";
import { BackButton, ActionButton } from "../components";
import type { DetailHeaderConfig } from "../types";

interface HeaderProps {
  config?: DetailHeaderConfig;
  className?: string;
}

/**
 * Detail layout header section
 */
export const Header: React.FC<HeaderProps> = ({ config, className = "" }) => {
  if (!config) {
    return null;
  }

  // Custom header varsa direkt onu kullan
  if (config.customHeader) {
    return <>{config.customHeader}</>;
  }

  const {
    backButton,
    actionButtons = [],
    reversed = false,
    className: configClassName = "",
  } = config;

  const headerClassName = ["detail-layout-header", configClassName, className]
    .filter(Boolean)
    .join(" ");

  // Hiç buton yoksa header'ı gösterme
  if (backButton === false && actionButtons.length === 0) {
    return null;
  }

  return (
    <div className={headerClassName}>
      <div className="rfq-detail-page__header">
        {/* Action Buttons */}
        {actionButtons.length > 0 && (
          <div className="rfq-detail-page__header-actions">
            {actionButtons.map((button) => (
              <ActionButton key={button.id} config={button} />
            ))}
          </div>
        )}

        {/* Back Button */}
        {backButton !== false && <BackButton config={backButton} />}
      </div>
    </div>
  );
};

"use client";

import React from "react";
import { ActionButton } from "@/components/layouts/detail-layout/components";

/**
 * ================================================================================
 * APPLICATION HEADER SECTION
 * ================================================================================
 * Başvuru detay sayfası header section
 * - Geri dön butonu (liste sayfasına yönlendirir)
 */
export const ApplicationHeaderSection: React.FC = () => {
  // Action buttons
  const actionButtons = [
    {
      id: "back",
      label: "Geri Dön",
      href: "/individual/teacher/applications",
    },
  ];

  return (
    <div className="detail-layout-header">
      <div className="application-detail-page__header">
        <div className="application-detail-page__header-actions d-flex justify-content-between align-items-center w-100">
          {actionButtons.map((button) => (
            <ActionButton
              key={button.id}
              config={{
                id: button.id,
                label: button.label,
                href: button.href,
                variant: "outline",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

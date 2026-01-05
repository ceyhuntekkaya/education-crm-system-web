"use client";

import React from "react";

interface RFQErrorStateProps {
  error: string | null;
}

export const RFQErrorState: React.FC<RFQErrorStateProps> = ({ error }) => {
  return (
    <div className="rfq-detail-page">
      <div className="rfq-detail-page__container">
        <div className="rfq-detail-page__state-container">
          <i className="ph-duotone ph-warning-circle text-danger-600 rfq-detail-page__state-icon"></i>
          <h3 className="rfq-detail-page__state-title text-neutral-900">
            Hata Oluştu
          </h3>
          <p className="rfq-detail-page__state-message">
            {error || "Teklif talebi bilgileri yüklenirken bir hata oluştu."}
          </p>
        </div>
      </div>
    </div>
  );
};

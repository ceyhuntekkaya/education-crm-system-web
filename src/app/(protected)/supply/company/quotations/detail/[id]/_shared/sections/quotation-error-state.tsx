"use client";

import React from "react";

interface QuotationErrorStateProps {
  error: string | null;
}

export const QuotationErrorState: React.FC<QuotationErrorStateProps> = ({
  error,
}) => {
  return (
    <div className="quotation-detail-page">
      <div className="quotation-detail-page__container">
        <div className="quotation-detail-page__state-container">
          <i className="ph-duotone ph-warning-circle text-danger-600 quotation-detail-page__state-icon"></i>
          <h3 className="quotation-detail-page__state-title text-neutral-900">
            Hata Oluştu
          </h3>
          <p className="quotation-detail-page__state-message">
            {error || "Teklif bilgileri yüklenirken bir hata oluştu."}
          </p>
        </div>
      </div>
    </div>
  );
};


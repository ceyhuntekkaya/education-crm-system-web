"use client";

import React from "react";

export const QuotationEmptyState: React.FC = () => {
  return (
    <div className="quotation-detail-page">
      <div className="quotation-detail-page__container">
        <div className="quotation-detail-page__state-container">
          <i className="ph-duotone ph-file-text text-neutral-400 quotation-detail-page__state-icon"></i>
          <h3 className="quotation-detail-page__state-title text-neutral-600">
            Teklif Bulunamadı
          </h3>
          <p className="quotation-detail-page__state-message">
            Aradığınız teklif bulunamadı veya erişim yetkiniz bulunmuyor.
          </p>
        </div>
      </div>
    </div>
  );
};


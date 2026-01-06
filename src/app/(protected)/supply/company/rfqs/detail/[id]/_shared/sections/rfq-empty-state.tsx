"use client";

import React from "react";

export const RFQEmptyState: React.FC = () => {
  return (
    <div className="rfq-detail-page">
      <div className="rfq-detail-page__container">
        <div className="rfq-detail-page__state-container">
          <i className="ph-duotone ph-file-text text-neutral-400 rfq-detail-page__state-icon"></i>
          <h3 className="rfq-detail-page__state-title text-neutral-600">
            Alım İlanı Bulunamadı
          </h3>
          <p className="rfq-detail-page__state-message">
            Aradığınız alım ilanı bulunamadı veya erişim yetkiniz bulunmuyor.
          </p>
        </div>
      </div>
    </div>
  );
};

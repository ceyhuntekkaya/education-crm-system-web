"use client";

import React from "react";
import { usePageTitle } from "@/hooks";
import {
  useRFQDetail,
  RFQInfoSection,
  RFQDetailsSection,
  RFQLoadingState,
  RFQErrorState,
  RFQEmptyState,
  RFQBackButton,
  RFQEditButton,
} from "./_shared";

/**
 * Modern RFQ detay sayfası
 * Quotation Detail sayfasından ilham alınmıştır
 */
const RFQDetailPage: React.FC = () => {
  usePageTitle("Teklif Talebi Detayı");
  const { rfq, isLoading, error, hasValidId } = useRFQDetail();

  // Loading state
  if (isLoading && hasValidId) {
    return <RFQLoadingState />;
  }

  // Error state
  if (error && hasValidId) {
    return <RFQErrorState error={error} />;
  }

  // Empty state
  if (!rfq && !isLoading && !error && hasValidId) {
    return <RFQEmptyState />;
  }

  if (!rfq) return null;

  return (
    <div className="rfq-detail-page">
      <div className="rfq-detail-page__container">
        {/* Header: Geri Dön ve Düzenle - Minimal Tasarım */}
        <div className="rfq-detail-page__header">
          <RFQBackButton />
          <RFQEditButton />
        </div>

        {/* Ana RFQ Bilgileri */}
        <div className="rfq-detail-page__main-section">
          <div className="row gx-5">
            <div className="col-12">
              <RFQInfoSection />
            </div>
          </div>
        </div>

        {/* Detaylı Bilgiler */}
        <RFQDetailsSection />
      </div>
    </div>
  );
};

export default RFQDetailPage;

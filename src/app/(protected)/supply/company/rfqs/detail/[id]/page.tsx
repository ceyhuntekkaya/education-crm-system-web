"use client";

import React from "react";
import { usePageTitle } from "@/hooks";
import {
  useQuotationDetail,
  QuotationInfoSection,
  QuotationDetailsSection,
  QuotationLoadingState,
  QuotationErrorState,
  QuotationEmptyState,
  QuotationBackButton,
} from "./_shared";

/**
 * Modern RFQ detay sayfası
 * Product Card tasarımından ilham alınmıştır
 */
const QuotationDetailPage: React.FC = () => {
  usePageTitle("Teklif Detayı");
  const { quotation, isLoading, error, hasValidId } = useQuotationDetail();

  // Loading state
  if (isLoading && hasValidId) {
    return <QuotationLoadingState />;
  }

  // Error state
  if (error && hasValidId) {
    return <QuotationErrorState error={error} />;
  }

  // Empty state
  if (!quotation && !isLoading && !error && hasValidId) {
    return <QuotationEmptyState />;
  }

  if (!quotation) return null;

  return (
    <div className="quotation-detail-page">
      <div className="quotation-detail-page__container">
        {/* Geri Dön - Minimal Tasarım */}
        <QuotationBackButton />

        {/* Ana Teklif Bilgileri */}
        <div className="quotation-detail-page__main-section">
          <div className="row gx-5">
            <div className="col-12">
              <QuotationInfoSection />
            </div>
          </div>
        </div>

        {/* Detaylı Bilgiler */}
        <QuotationDetailsSection />
      </div>
    </div>
  );
};

export default QuotationDetailPage;

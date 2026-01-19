"use client";

import React from "react";
import { QuotationDetailProvider } from "./_shared";
import { validateQuotationId } from "./_shared/utils";

interface QuotationDetailLayoutProps {
  children: React.ReactNode;
  params: { id: string };
}

/**
 * Quotation detail sayfaları için layout
 * Context provider ve ID validasyonu sağlar
 */
const QuotationDetailLayout: React.FC<QuotationDetailLayoutProps> = ({
  children,
  params,
}) => {
  // URL'den gelen ID'yi kontrol et
  const quotationId = validateQuotationId(params.id);

  // ID yoksa veya geçersizse bile devam et, empty state gösterilecek
  return (
    <QuotationDetailProvider quotationId={quotationId ?? 0}>
      {children}
    </QuotationDetailProvider>
  );
};

export default QuotationDetailLayout;


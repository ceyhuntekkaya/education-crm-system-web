"use client";

import React from "react";
import { usePageTitle } from "@/hooks";
import { DetailLayout } from "@/components/layouts";
import { useQuotationDetail, createQuotationDetailColumns } from "./_shared";
import { QuotationHeaderSection } from "../../_shared";

/**
 * Modern Quotation detay sayfası - DetailLayout kullanarak
 * Teklif detaylarını görüntüler
 */
const QuotationDetailPage: React.FC = () => {
  usePageTitle("Teklif Detayı");
  const { quotation, isLoading, error, hasValidId } = useQuotationDetail();

  return (
    <>
      <QuotationHeaderSection />
      <DetailLayout
        loading={{
          isLoading: isLoading && hasValidId,
        }}
        error={{
          error: error && hasValidId ? error : null,
        }}
        empty={{
          isEmpty: !quotation && !isLoading && !error && hasValidId,
          emptyTitle: "Teklif Bulunamadı",
          emptyDescription:
            "İstenen teklif bulunamadı veya erişim izniniz yok.",
        }}
        columns={
          quotation
            ? {
                data: quotation,
                columns: createQuotationDetailColumns(),
              }
            : undefined
        }
      />
    </>
  );
};

export default QuotationDetailPage;

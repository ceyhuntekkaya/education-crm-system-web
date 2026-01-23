"use client";

import React from "react";
import { useRouter, useParams } from "next/navigation";
import { usePageTitle } from "@/hooks";
import { DetailLayout } from "@/components/layouts";
import { useQuotationDetail, createQuotationDetailColumns } from "./_shared";

/**
 * Modern Quotation detay sayfası - DetailLayout kullanarak
 * Teklif detaylarını görüntüler
 */
const QuotationDetailPage: React.FC = () => {
  usePageTitle("Teklif Detayı");
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const { quotation, isLoading, error, hasValidId } = useQuotationDetail();

  return (
    <DetailLayout
      header={{
        backButton: {
          label: "Geri Dön",
          href: "/supply/supplier/quotations",
        },
        actionButtons: [
          {
            id: "items",
            label: "Teklif Kalemleri",
            href: `/supply/supplier/quotations/items/${id}`,
          },
          {
            id: "edit",
            label: "Düzenle",
            onClick: () =>
              router.push(`/supply/supplier/quotations/add-edit/${id}`),
            // disabled: quotation?.status !== "DRAFT",
          },
        ],
      }}
      loading={{
        isLoading: isLoading && hasValidId,
      }}
      error={{
        error: error && hasValidId ? error : null,
      }}
      empty={{
        isEmpty: !quotation && !isLoading && !error && hasValidId,
        emptyTitle: "Teklif Bulunamadı",
        emptyDescription: "İstenen teklif bulunamadı veya erişim izniniz yok.",
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
  );
};

export default QuotationDetailPage;

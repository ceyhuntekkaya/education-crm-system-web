"use client";

import React from "react";
import { useRouter, useParams } from "next/navigation";
import { usePageTitle } from "@/hooks";
import { useSnackbar } from "@/contexts";
import { DetailLayout } from "@/components/layouts";
import { useRFQDetail, createRFQDetailColumns } from "./_shared";

/**
 * Modern RFQ detay sayfası - DetailLayout kullanarak
 * Alım ilanı detaylarını görüntüler
 */
const RFQDetailPage: React.FC = () => {
  usePageTitle("Alım İlanı Detayı");
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const { showSnackbar } = useSnackbar();
  const { rfq, isLoading, error, hasValidId } = useRFQDetail();

  // Custom handlers (sadece özel logic gerektiren butonlar için)
  const handleEdit = () => {
    // Sadece DRAFT durumundaki RFQ'lar düzenlenebilir
    if (rfq?.status !== "DRAFT") {
      showSnackbar(
        "Yalnızca taslak durumundaki alım ilanları düzenlenebilir.",
        "warning"
      );
      return;
    }
    router.push(`/supply/company/rfqs/add-edit/${id}`);
  };

  return (
    <DetailLayout
      header={{
        backButton: {
          label: "Geri Dön",
          href: "/supply/company/rfqs",
        },
        actionButtons: [
          {
            id: "items",
            label: "İhtiyaç Listesi",
            href: `/supply/company/rfqs/items/${id}`,
          },
          {
            id: "quotations",
            label: "Gelen Teklifler",
            href: `/supply/company/rfqs/quotations/${id}`,
          },
          {
            id: "comparison",
            label: "Teklif Karşılaştırma",
            href: `/supply/company/rfqs/comparison/${id}`,
          },
          ...(rfq?.rfqType === "INVITED"
            ? [
                {
                  id: "suppliers",
                  label: "Davet Edilen Tedarikçiler",
                  href: `/supply/company/rfqs/invited-suppliers/${id}`,
                },
              ]
            : []),
          {
            id: "edit",
            label: "Düzenle",
            onClick: handleEdit,
            disabled: rfq?.status !== "DRAFT",
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
        isEmpty: !rfq && !isLoading && !error && hasValidId,
        emptyTitle: "RFQ Bulunamadı",
        emptyDescription:
          "İstenen alım ilanı bulunamadı veya erişim izniniz yok.",
      }}
      columns={
        rfq
          ? {
              data: rfq,
              columns: createRFQDetailColumns(),
            }
          : undefined
      }
    />
  );
};

export default RFQDetailPage;

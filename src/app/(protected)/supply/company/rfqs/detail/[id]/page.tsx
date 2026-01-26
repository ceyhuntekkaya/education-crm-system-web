"use client";

import React from "react";
import { useParams } from "next/navigation";
import { usePageTitle } from "@/hooks";
import { DetailLayout } from "@/components/layouts";
import {
  useRFQDetail,
  createRFQDetailColumns,
  RFQHeaderSection,
} from "./_shared";

/**
 * Modern RFQ detay sayfası - DetailLayout kullanarak
 * Alım ilanı detaylarını görüntüler
 */
const RFQDetailPage: React.FC = () => {
  usePageTitle("Alım İlanı Detayı");
  const params = useParams();
  const id = params.id as string;
  const { rfq, isLoading, error, hasValidId } = useRFQDetail();

  return (
    <>
      {/* RFQ Header Section */}
      <RFQHeaderSection />

      <DetailLayout
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
    </>
  );
};

export default RFQDetailPage;

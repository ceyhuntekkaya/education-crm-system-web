"use client";

import React, { useMemo } from "react";
import { useRouter } from "next/navigation";
import { usePageTitle } from "@/hooks";
import { useAuth } from "@/contexts";
import { DataCollectionLayout } from "@/components/layouts/data-collection-layout";
import { SupplierRFQCard } from "./_shared/sections/rfq-card";
import {
  createSupplierRFQColumns,
  SUPPLIER_RFQ_POPOVER_FILTERS,
  SUPPLIER_RFQ_SORT_OPTIONS,
  createSupplierRFQActionButtons,
  createSupplierRFQEmptyStateAction,
} from "./_shared/config";
import { useSupplierRFQsContext } from "./_shared/contexts";
import type { RFQDto } from "@/types";

const SupplierRFQsPage: React.FC = () => {
  usePageTitle("Alım İlanları");
  const router = useRouter();

  // Context'ten sadece data al
  const { rfqs, rfqsListLoading } = useSupplierRFQsContext();

  // Config'leri memoize et ki her render'da yeni object oluşmasın
  const rfqColumns = useMemo(() => createSupplierRFQColumns(), []);
  const rfqFilters = useMemo(() => SUPPLIER_RFQ_POPOVER_FILTERS, []);
  const rfqSortOptions = useMemo(() => SUPPLIER_RFQ_SORT_OPTIONS, []);

  // Action buttons'ları da memoize et
  const actionButtons = useMemo(
    () => createSupplierRFQActionButtons(router),
    [router],
  );
  const emptyStateAction = useMemo(
    () => createSupplierRFQEmptyStateAction(router),
    [router],
  );

  return (
    <DataCollectionLayout<RFQDto>
      // ═══════════════════════════════════════════════════════════════════
      // HEADER - Başlık ve Aksiyon Butonları
      // ═══════════════════════════════════════════════════════════════════
      header={{
        title: "Alım İlanları",
        subtitle:
          "Şu an teklif bekleyen, teklif vermeye açık olan alım ilanları",
        icon: "ph-file-text",
        actionButtons: actionButtons,
      }}
      // ═══════════════════════════════════════════════════════════════════
      // DATA - Veri ve Loading State
      // ═══════════════════════════════════════════════════════════════════
      data={{
        data: rfqs,
        loading: rfqsListLoading,
      }}
      // ═══════════════════════════════════════════════════════════════════
      // VIEW - Görünüm Ayarları
      // ═══════════════════════════════════════════════════════════════════
      view={{
        defaultMode: "grid",
        enableToggle: true,
        grid: {
          renderCard: ({ item }: { item: any }) => (
            <SupplierRFQCard rfq={item} />
          ),
          col: 4,
        },
        list: {
          columns: rfqColumns,
        },
      }}
      // ═══════════════════════════════════════════════════════════════════
      // FILTERS - Filtreleme (logic ListView içinde)
      // ═══════════════════════════════════════════════════════════════════
      filters={{
        enabled: true,
        options: rfqFilters,
      }}
      // ═══════════════════════════════════════════════════════════════════
      // SORT - Sıralama
      // ═══════════════════════════════════════════════════════════════════
      sort={{
        enabled: true,
        options: rfqSortOptions,
      }}
      // ═══════════════════════════════════════════════════════════════════
      // SEARCH - Arama
      // ═══════════════════════════════════════════════════════════════════
      search={{
        enabled: true,
        placeholder: "Alım ilanı ara...",
        fields: ["title"],
      }}
      // ═══════════════════════════════════════════════════════════════════
      // STATES - Empty ve Loading State'leri
      // ═══════════════════════════════════════════════════════════════════
      states={{
        empty: {
          title: "Henüz Alım İlanı Yok",
          description:
            "Size gönderilen veya açık alım ilanları burada görünecektir",
          icon: "ph-file-text",
          action: emptyStateAction,
        },
        loading: {
          text: "Alım ilanları yükleniyor...",
        },
      }}
      // ═══════════════════════════════════════════════════════════════════
      // PAGINATION - Sayfalama
      // ═══════════════════════════════════════════════════════════════════
      pagination={{
        enabled: true,
      }}
    />
  );
};

export default SupplierRFQsPage;

"use client";

import React, { useMemo } from "react";
import { useRouter } from "next/navigation";
import { usePageTitle } from "@/hooks";
import { DataCollectionLayout } from "@/components/layouts/data-collection-layout";
import { QuotationCard } from "./_shared/sections";
import {
  createQuotationColumns,
  QUOTATION_POPOVER_FILTERS,
  QUOTATION_SORT_OPTIONS,
  createQuotationActionButtons,
  createQuotationEmptyStateAction,
} from "./_shared/config";
import { useQuotationsContext } from "./_shared/contexts";
import type { QuotationDto } from "@/types";

const SupplierQuotationsPage: React.FC = () => {
  usePageTitle("Teklif Yönetimi");
  const router = useRouter();

  // Context'ten sadece data al
  const { quotations, quotationsListLoading } = useQuotationsContext();

  // Config'leri memoize et ki her render'da yeni object oluşmasın
  const quotationColumns = useMemo(() => createQuotationColumns(), []);
  const quotationFilters = useMemo(() => QUOTATION_POPOVER_FILTERS, []);
  const quotationSortOptions = useMemo(() => QUOTATION_SORT_OPTIONS, []);

  // Action buttons'ları da memoize et
  const actionButtons = useMemo(
    () => createQuotationActionButtons(router),
    [router],
  );
  const emptyStateAction = useMemo(
    () => createQuotationEmptyStateAction(router),
    [router],
  );

  return (
    <DataCollectionLayout<QuotationDto>
      // ═══════════════════════════════════════════════════════════════════
      // HEADER - Başlık ve Aksiyon Butonları
      // ═══════════════════════════════════════════════════════════════════
      header={{
        title: "Teklif Yönetimi",
        subtitle:
          "Verdiğiniz teklifleri buradan takip edebilir, yeni teklif oluşturabilir ve mevcut tekliflerinizi yönetebilirsiniz",
        icon: "ph-clipboard-text",
        actionButtons: actionButtons,
      }}
      // ═══════════════════════════════════════════════════════════════════
      // DATA - Veri ve Loading State
      // ═══════════════════════════════════════════════════════════════════
      data={{
        data: quotations,
        loading: quotationsListLoading,
      }}
      // ═══════════════════════════════════════════════════════════════════
      // VIEW - Görünüm Ayarları
      // ═══════════════════════════════════════════════════════════════════
      view={{
        defaultMode: "grid",
        enableToggle: true,
        grid: {
          renderCard: ({ item }: { item: any }) => (
            <QuotationCard
              quotation={item}
              url={`/supply/supplier/quotations/detail/${item.id}`}
            />
          ),
          col: 4,
        },
        list: {
          columns: quotationColumns,
        },
      }}
      // ═══════════════════════════════════════════════════════════════════
      // FILTERS - Filtreleme (logic ListView içinde)
      // ═══════════════════════════════════════════════════════════════════
      filters={{
        enabled: true,
        options: quotationFilters,
      }}
      // ═══════════════════════════════════════════════════════════════════
      // SORT - Sıralama
      // ═══════════════════════════════════════════════════════════════════
      sort={{
        enabled: true,
        options: quotationSortOptions,
      }}
      // ═══════════════════════════════════════════════════════════════════
      // SEARCH - Arama
      // ═══════════════════════════════════════════════════════════════════
      search={{
        enabled: true,
        placeholder: "Teklif ara...",
        fields: ["rfqTitle", "supplierCompanyName", "notes"],
      }}
      // ═══════════════════════════════════════════════════════════════════
      // STATES - Empty ve Loading State'leri
      // ═══════════════════════════════════════════════════════════════════
      states={{
        empty: {
          title: "Henüz Teklif Yok",
          description: "İlk teklifinizi oluşturarak başlayın",
          icon: "bi-clipboard-check",
          action: emptyStateAction,
        },
        loading: {
          text: "Teklifler yükleniyor...",
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

export default SupplierQuotationsPage;

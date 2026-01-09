"use client";

import React, { useMemo } from "react";
import { useRouter } from "next/navigation";
import { usePageTitle } from "@/hooks";
import { DataCollectionLayout } from "@/components/layouts/data-collection-layout";
import { RFQCard } from "./_shared/sections/rfq-card";
import {
  createRFQColumns,
  RFQ_POPOVER_FILTERS,
  RFQ_SORT_OPTIONS,
  createRFQActionButtons,
  createRFQEmptyStateAction,
} from "./_shared/config";
import { useRFQsContext } from "./_shared/contexts";
import type { RFQDto } from "@/types";

const RFQsPage: React.FC = () => {
  usePageTitle("Alım İlanları");
  const router = useRouter();

  // Context'ten sadece data al
  const { rfqs, rfqsListLoading } = useRFQsContext();

  // Config'leri memoize et ki her render'da yeni object oluşmasın
  const rfqColumns = useMemo(() => createRFQColumns(), []);
  const rfqFilters = useMemo(() => RFQ_POPOVER_FILTERS, []);
  const rfqSortOptions = useMemo(() => RFQ_SORT_OPTIONS, []);

  // Action buttons'ları da memoize et
  const actionButtons = useMemo(() => createRFQActionButtons(router), [router]);
  const emptyStateAction = useMemo(
    () => createRFQEmptyStateAction(router),
    [router]
  );

  return (
    <DataCollectionLayout<RFQDto>
      // ═══════════════════════════════════════════════════════════════════
      // HEADER - Başlık ve Aksiyon Butonları
      // ═══════════════════════════════════════════════════════════════════
      header={{
        title: "Alım İlanları",
        subtitle:
          "Tedarikçilerden fiyat teklifi almak için alım ilanları oluşturun ve yönetin",
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
          renderCard: ({ item }: { item: any }) => <RFQCard rfq={item} />,
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
            "İlk alım ilanınızı oluşturarak tedarikçilerden teklif almaya başlayın",
          icon: "bi-clipboard-x",
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

export default RFQsPage;

"use client";

import React, { useMemo } from "react";
import { useRouter } from "next/navigation";
import { usePageTitle } from "@/hooks";
import { DataCollectionLayout } from "@/components/layouts/data-collection-layout";
import { ItemCard } from "./_shared/sections/item-card";
import {
  createItemColumns,
  ITEM_SORT_OPTIONS,
  createItemActionButtons,
  createItemEmptyStateAction,
} from "./_shared/config";
import { useQuotationItemsContext } from "./_shared/contexts";
import type { QuotationItemDto } from "@/types";

const QuotationItemsPage: React.FC = () => {
  usePageTitle("Teklif Kalemleri");
  const router = useRouter();

  // Context'ten sadece data al
  const { quotationId, items, itemsListLoading } = useQuotationItemsContext();

  // Config'leri memoize et ki her render'da yeni object oluşmasın
  const itemColumns = useMemo(() => createItemColumns(), []);
  const itemSortOptions = useMemo(() => ITEM_SORT_OPTIONS, []);

  // Action buttons'ları da memoize et
  const actionButtons = useMemo(
    () => createItemActionButtons(router, quotationId),
    [router, quotationId],
  );
  const emptyStateAction = useMemo(
    () => createItemEmptyStateAction(router, quotationId),
    [router, quotationId],
  );

  return (
    <DataCollectionLayout<QuotationItemDto>
      // ═══════════════════════════════════════════════════════════════════
      // HEADER - Başlık ve Aksiyon Butonları
      // ═══════════════════════════════════════════════════════════════════
      header={{
        title: "Teklif Kalemleri",
        subtitle: "Teklif için tüm kalemleri ekleyin ve yönetin",
        icon: "ph-package",
        actionButtons: actionButtons,
      }}
      // ═══════════════════════════════════════════════════════════════════
      // DATA - Veri ve Loading State
      // ═══════════════════════════════════════════════════════════════════
      data={{
        data: items,
        loading: itemsListLoading,
      }}
      // ═══════════════════════════════════════════════════════════════════
      // VIEW - Görünüm Ayarları
      // ═══════════════════════════════════════════════════════════════════
      view={{
        defaultMode: "grid",
        enableToggle: true,
        grid: {
          renderCard: ({ item }: { item: QuotationItemDto }) => (
            <ItemCard item={item} />
          ),
          col: 4,
        },
        list: {
          columns: itemColumns,
        },
      }}
      // ═══════════════════════════════════════════════════════════════════
      // SORT - Sıralama
      // ═══════════════════════════════════════════════════════════════════
      sort={{
        enabled: true,
        options: itemSortOptions,
      }}
      // ═══════════════════════════════════════════════════════════════════
      // SEARCH - Arama
      // ═══════════════════════════════════════════════════════════════════
      search={{
        enabled: true,
        placeholder: "Kalem ara...",
        fields: ["itemName", "specifications"],
      }}
      // ═══════════════════════════════════════════════════════════════════
      // STATES - Empty ve Loading State'leri
      // ═══════════════════════════════════════════════════════════════════
      states={{
        empty: {
          title: "Henüz Kalem Yok",
          description:
            "İlk kaleminizi ekleyerek teklif listesini oluşturmaya başlayın",
          icon: "bi-clipboard-x",
          action: emptyStateAction,
        },
        loading: {
          text: "Kalemler yükleniyor...",
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

export default QuotationItemsPage;

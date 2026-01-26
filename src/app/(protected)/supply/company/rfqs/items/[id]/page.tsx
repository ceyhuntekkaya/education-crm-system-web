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
  createCategoryFilter,
} from "./_shared/config";
import { useRFQItemsContext } from "./_shared/contexts";
import { RFQHeaderSection } from "../../detail/[id]/_shared";
import type { RFQItemDto } from "@/types";

const RFQItemsPage: React.FC = () => {
  usePageTitle("İhtiyaç Listesi");
  const router = useRouter();

  // Context'ten data al
  const { rfqId, items, itemsListLoading, uniqueCategories } =
    useRFQItemsContext();

  // Config'leri memoize et ki her render'da yeni object oluşmasın
  const itemColumns = useMemo(() => createItemColumns(), []);
  const itemSortOptions = useMemo(() => ITEM_SORT_OPTIONS, []);

  // Dinamik kategori filtresi
  const itemFilters = useMemo(
    () => [createCategoryFilter(uniqueCategories)],
    [uniqueCategories],
  );

  // Action buttons'ları da memoize et
  const actionButtons = useMemo(
    () => createItemActionButtons(router, rfqId),
    [router, rfqId],
  );
  const emptyStateAction = useMemo(
    () => createItemEmptyStateAction(router, rfqId),
    [router, rfqId],
  );

  return (
    <>
      {/* RFQ Header Section */}
      <RFQHeaderSection />

      <DataCollectionLayout<RFQItemDto>
        // ═══════════════════════════════════════════════════════════════════
        // HEADER - Başlık ve Aksiyon Butonları
        // ═══════════════════════════════════════════════════════════════════
        header={{
          title: "İhtiyaç Listesi",
          subtitle: "RFQ için gerekli tüm kalemleri ekleyin ve yönetin",
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
            renderCard: ({ item }: { item: RFQItemDto }) => (
              <ItemCard item={item} />
            ),
            col: 4,
          },
          list: {
            columns: itemColumns,
          },
        }}
        // ═══════════════════════════════════════════════════════════════════
        // FILTERS - Filtreleme (logic DataCollectionLayout içinde)
        // ═══════════════════════════════════════════════════════════════════
        filters={{
          enabled: true,
          options: itemFilters,
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
          fields: ["itemName"],
        }}
        // ═══════════════════════════════════════════════════════════════════
        // STATES - Empty ve Loading State'leri
        // ═══════════════════════════════════════════════════════════════════
        states={{
          empty: {
            title: "Henüz Kalem Yok",
            description:
              "İlk kaleminizi ekleyerek ihtiyaç listesini oluşturmaya başlayın",
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
    </>
  );
};

export default RFQItemsPage;

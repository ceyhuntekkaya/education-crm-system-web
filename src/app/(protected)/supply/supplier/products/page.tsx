"use client";

import React, { useMemo } from "react";
import { useRouter } from "next/navigation";
import { usePageTitle } from "@/hooks";
import { DataCollectionLayout } from "@/components/layouts/data-collection-layout";
import { ProductCard } from "../../company/products/_shared/sections/product-card";
import { mapProductDtoToResult } from "@/types/dto/supply/product.dto";
import {
  createProductColumns,
  PRODUCT_POPOVER_FILTERS,
  PRODUCT_SORT_OPTIONS,
  createProductActionButtons,
  createProductEmptyStateAction,
} from "./_shared/config";
import { useProductsContext } from "./_shared/contexts";
import type { ProductDto } from "@/types";

const SupplierProductsPage: React.FC = () => {
  usePageTitle("Ürün Yönetimi");
  const router = useRouter();

  // Context'ten sadece data al
  const { products, productsListLoading } = useProductsContext();

  // Config'leri memoize et ki her render'da yeni object oluşmasın
  const productColumns = useMemo(() => createProductColumns(), []);
  const productFilters = useMemo(() => PRODUCT_POPOVER_FILTERS, []);
  const productSortOptions = useMemo(() => PRODUCT_SORT_OPTIONS, []);

  // Action buttons'ları da memoize et
  const actionButtons = useMemo(
    () => createProductActionButtons(router),
    [router]
  );
  const emptyStateAction = useMemo(
    () => createProductEmptyStateAction(router),
    [router]
  );

  return (
    <DataCollectionLayout<ProductDto>
      // ═══════════════════════════════════════════════════════════════════
      // HEADER - Başlık ve Aksiyon Butonları
      // ═══════════════════════════════════════════════════════════════════
      header={{
        title: "Ürün Yönetimi",
        subtitle:
          "Ürünlerinizi buradan yönetebilir, yeni ürün ekleyebilir ve mevcut ürünlerinizi güncelleyebilirsiniz",
        icon: "ph-package",
        actionButtons: actionButtons,
      }}
      // ═══════════════════════════════════════════════════════════════════
      // DATA - Veri ve Loading State
      // ═══════════════════════════════════════════════════════════════════
      data={{
        data: products,
        loading: productsListLoading,
      }}
      // ═══════════════════════════════════════════════════════════════════
      // VIEW - Görünüm Ayarları
      // ═══════════════════════════════════════════════════════════════════
      view={{
        defaultMode: "grid",
        enableToggle: true,
        grid: {
          renderCard: ({ item }: { item: any }) => (
            <ProductCard product={mapProductDtoToResult(item)} />
          ),
          col: 4,
        },
        list: {
          columns: productColumns,
        },
      }}
      // ═══════════════════════════════════════════════════════════════════
      // FILTERS - Filtreleme (logic ListView içinde)
      // ═══════════════════════════════════════════════════════════════════
      filters={{
        enabled: true,
        options: productFilters,
      }}
      // ═══════════════════════════════════════════════════════════════════
      // SORT - Sıralama
      // ═══════════════════════════════════════════════════════════════════
      sort={{
        enabled: true,
        options: productSortOptions,
      }}
      // ═══════════════════════════════════════════════════════════════════
      // SEARCH - Arama
      // ═══════════════════════════════════════════════════════════════════
      search={{
        enabled: true,
        placeholder: "Ürün ara...",
        fields: ["name", "sku", "categoryName"],
      }}
      // ═══════════════════════════════════════════════════════════════════
      // STATES - Empty ve Loading State'leri
      // ═══════════════════════════════════════════════════════════════════
      states={{
        empty: {
          title: "Henüz Ürün Yok",
          description: "İlk ürününüzü ekleyerek katalog oluşturmaya başlayın",
          icon: "bi-box-seam",
          action: emptyStateAction,
        },
        loading: {
          text: "Ürünler yükleniyor...",
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

export default SupplierProductsPage;

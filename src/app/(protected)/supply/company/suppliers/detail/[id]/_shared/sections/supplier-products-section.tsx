"use client";

import React, { useMemo } from "react";
import { DataCollectionLayout } from "@/components/layouts/data-collection-layout";
import { SupplierProductCard } from "./supplier-product-card"; // Tedarikçi ürün kartı
import { useSupplierDetail } from "../context";
import { createSupplierProductsColumns } from "../config";
import {
  SUPPLIER_PRODUCTS_POPOVER_FILTERS,
  SUPPLIER_PRODUCTS_SORT_OPTIONS,
  createSupplierProductsEmptyStateAction,
} from "../config/supplier-products-filters.config";
import type { ProductSummaryDto } from "@/types";

/**
 * Tedarikçi ürünleri bölümü
 */
export const SupplierProductsSection: React.FC = () => {
  const {
    supplier,
    products,
    productsLoading,
    productsError,
    productsTotal,
    refetchProducts,
  } = useSupplierDetail();

  // Config'leri memoize et
  const productColumns = useMemo(() => createSupplierProductsColumns(), []);
  const productFilters = useMemo(() => SUPPLIER_PRODUCTS_POPOVER_FILTERS, []);
  const productSortOptions = useMemo(() => SUPPLIER_PRODUCTS_SORT_OPTIONS, []);
  const emptyStateAction = useMemo(
    () => createSupplierProductsEmptyStateAction(),
    []
  );

  return (
    <div className="supplier-products-section">
      {/* Ürün Listesi */}
      <DataCollectionLayout<ProductSummaryDto>
        // ═══════════════════════════════════════════════════════════════════
        // HEADER - Başlık ve Aksiyon Butonları
        // ═══════════════════════════════════════════════════════════════════
        header={{
          title: "Ürünler",
          subtitle: `${productsTotal || 0} ürün bulundu`,
          icon: "ph-package",
        }}
        // ═══════════════════════════════════════════════════════════════════
        // DATA - Veri ve Loading State
        // ═══════════════════════════════════════════════════════════════════
        data={{
          data: products,
          loading: productsLoading,
          error: productsError,
        }}
        // ═══════════════════════════════════════════════════════════════════
        // VIEW - Görünüm Ayarları
        // ═══════════════════════════════════════════════════════════════════
        view={{
          defaultMode: "grid",
          enableToggle: true,
          grid: {
            renderCard: ({ item }: { item: ProductSummaryDto }) => (
              <SupplierProductCard product={item} />
            ),
            col: 4,
          },
          list: {
            columns: productColumns,
          },
        }}
        // ═══════════════════════════════════════════════════════════════════
        // FILTERS - Filtreleme
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
          fields: ["name", "sku"],
        }}
        // ═══════════════════════════════════════════════════════════════════
        // STATES - Empty ve Loading State'leri
        // ═══════════════════════════════════════════════════════════════════
        states={{
          empty: {
            title: "Henüz Ürün Yok",
            description: `${
              supplier?.companyName || "Bu tedarikçi"
            } henüz hiç ürün eklememiş`,
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
    </div>
  );
};

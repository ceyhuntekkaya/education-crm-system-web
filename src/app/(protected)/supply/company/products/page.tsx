"use client";

import React, { useMemo } from "react";
import { useRouter } from "next/navigation";
import { usePageTitle } from "@/hooks";
import { DataCollectionLayout } from "@/components/layouts/data-collection-layout";
import { ProductCard } from "./_shared/sections/product-card";
import { ProductsFilterForm } from "./_shared/sections/filter-form";
import {
  createProductColumns,
  PRODUCT_POPOVER_FILTERS,
  PRODUCT_SORT_OPTIONS,
} from "./_shared/config";
import { useProductsContext, InitialProductsSearchState } from "./_shared";
import type { ProductResultDto } from "./_shared/types";

const ProductsPage: React.FC = () => {
  usePageTitle("Ürün Arama");
  const router = useRouter();

  // Context'ten data al
  const { products, productsLoading, hasSearched } = useProductsContext();

  // Config'leri memoize et
  const productColumns = useMemo(() => createProductColumns(), []);
  const productFilters = useMemo(() => PRODUCT_POPOVER_FILTERS, []);
  const productSortOptions = useMemo(() => PRODUCT_SORT_OPTIONS, []);

  return (
    <div className="d-flex flex-column gap-24">
      {/* Filter Form - Her Zaman Görünür */}
      <ProductsFilterForm />

      {/* Results - Arama Yapılıp Yapılmadığına Göre */}
      <div className="row">
        <div className="col-12">
          {!hasSearched ? (
            <InitialProductsSearchState />
          ) : (
            <DataCollectionLayout<ProductResultDto>
              // ═══════════════════════════════════════════════════════════════════
              // HEADER - Başlık (Filter form ayrı olduğu için basit header)
              // ═══════════════════════════════════════════════════════════════════
              header={{
                title: "Arama Sonuçları",
                subtitle: `${products?.length || 0} ürün bulundu`,
                icon: "ph-package",
              }}
              // ═══════════════════════════════════════════════════════════════════
              // DATA - Veri ve Loading State
              // ═══════════════════════════════════════════════════════════════════
              data={{
                data: products || [],
                loading: productsLoading,
              }}
              // ═══════════════════════════════════════════════════════════════════
              // VIEW - Görünüm Ayarları
              // ═══════════════════════════════════════════════════════════════════
              view={{
                defaultMode: "grid",
                enableToggle: true,
                grid: {
                  renderCard: ({ item }: { item: any }) => (
                    <ProductCard product={item} />
                  ),
                  col: 4,
                },
                list: {
                  columns: productColumns,
                },
              }}
              // ═══════════════════════════════════════════════════════════════════
              // FILTERS - Filtreleme (ProductDto'ya göre)
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
              // SEARCH - Arama (Deaktif - Üstteki form kullanılıyor)
              // ═══════════════════════════════════════════════════════════════════
              search={{
                enabled: false,
              }}
              // ═══════════════════════════════════════════════════════════════════
              // STATES - Empty ve Loading State'leri
              // ═══════════════════════════════════════════════════════════════════
              states={{
                empty: {
                  title: "Ürün Bulunamadı",
                  description:
                    "Arama kriterlerinize uygun ürün bulunamadı. Filtreleri değiştirmeyi deneyin.",
                  icon: "bi-search",
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
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;

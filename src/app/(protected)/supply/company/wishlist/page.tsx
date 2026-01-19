"use client";

import React, { useMemo } from "react";
import { useRouter } from "next/navigation";
import { usePageTitle } from "@/hooks";
import { DataCollectionLayout } from "@/components/layouts/data-collection-layout";
import { ProductCard } from "../products/_shared/sections/product-card";
import {
  createWishlistColumns,
  createWishlistSortOptions,
} from "./_shared/config";
import { useWishlistContext } from "./_shared/contexts";
import { mapWishlistsToProducts } from "./_shared/utils";
import type { ProductResultDto } from "@/types/dto/supply/product.dto";

const WishlistPage: React.FC = () => {
  usePageTitle("İstek Listem");
  const router = useRouter();

  // Context'ten data al
  const { wishlistLoading, wishlistItems } = useWishlistContext();

  // Wishlist items'ları ProductResultDto array'e dönüştür
  const productData = useMemo(() => {
    return mapWishlistsToProducts(wishlistItems);
  }, [wishlistItems]);

  // Config'leri memoize et ki her render'da yeni object oluşmasın
  const wishlistColumns = useMemo(() => createWishlistColumns(), []);
  const wishlistSortOptions = useMemo(() => createWishlistSortOptions(), []);

  // Empty state action'ını memoize et
  const emptyStateAction = useMemo(
    () => ({
      label: "Ürünlere Göz At",
      onClick: () => router.push("/supply/company/products"),
    }),
    [router]
  );

  return (
    <DataCollectionLayout<ProductResultDto>
      // ═══════════════════════════════════════════════════════════════════
      // HEADER - Başlık ve Aksiyon Butonları
      // ═══════════════════════════════════════════════════════════════════
      header={{
        title: "İstek Listem",
        subtitle:
          "Beğendiğim ürünleri buradan görüntüleyebilir ve yönetebilirim",
        icon: "ph-bookmark",
      }}
      // ═══════════════════════════════════════════════════════════════════
      // DATA - Veri ve Loading State
      // ═══════════════════════════════════════════════════════════════════
      data={{
        data: productData,
        loading: wishlistLoading,
      }}
      // ═══════════════════════════════════════════════════════════════════
      // VIEW - Görünüm Ayarları
      // ═══════════════════════════════════════════════════════════════════
      view={{
        defaultMode: "grid",
        enableToggle: true,
        grid: {
          renderCard: ({ item }: { item: ProductResultDto }) => (
            <ProductCard product={item} />
          ),
          col: 6,
        },
        list: {
          columns: wishlistColumns,
        },
      }}
      // ═══════════════════════════════════════════════════════════════════
      // FILTERS - Filtreleme
      // ═══════════════════════════════════════════════════════════════════
      filters={{
        enabled: false,
      }}
      // ═══════════════════════════════════════════════════════════════════
      // SORT - Sıralama
      // ═══════════════════════════════════════════════════════════════════
      sort={{
        enabled: true,
        options: wishlistSortOptions,
      }}
      // ═══════════════════════════════════════════════════════════════════
      // SEARCH - Arama
      // ═══════════════════════════════════════════════════════════════════
      search={{
        enabled: true,
        placeholder: "Listemde ara...",
        fields: ["name", "sku", "supplierName"],
      }}
      // ═══════════════════════════════════════════════════════════════════
      // STATES - Empty ve Loading State'leri
      // ═══════════════════════════════════════════════════════════════════
      states={{
        empty: {
          title: "Henüz Listem Boş",
          description:
            "Ürünler sayfasından beğendiğin ürünleri listene ekleyebilirsin",
          icon: "ph-bookmark",
          action: emptyStateAction,
        },
        loading: {
          text: "Listem yükleniniyor...",
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

export default WishlistPage;

"use client";

import React from "react";

import { CustomCard } from "@/components/ui";
import { useProductDetail, useProductSections } from "./_shared";
import { usePageTitle } from "@/hooks";

/**
 * Product detay bilgilerini gösteren kart bileşeni
 */
const ProductDetailPage: React.FC = () => {
  usePageTitle("Ürün Detayı");
  const { product, isLoading, error, productId } = useProductDetail();

  // Ana section'ları oluştur - hook'u en üstte çağırıyoruz
  const allSections = useProductSections(product);

  // ID yoksa veya 0 ise özel mesaj göster
  const hasValidId = !!(productId && productId > 0);

  return (
    <CustomCard
      title="Ürün Bilgisi Detayı"
      subtitle="Ürün bilgilerini detaylı olarak görüntüleyin"
      isLoading={isLoading && hasValidId}
      loadingMessage="Ürün bilgisi yükleniyor..."
      isError={!!error && hasValidId}
      errorMessage={
        error ? `Ürün bilgisi yüklenirken hata oluştu: ${error}` : undefined
      }
      isEmpty={!product && !isLoading && !error && hasValidId}
      emptyMessage="Ürün Bilgisi Bulunamadı"
      emptyDescription="Bu ID ile ilişkili bir ürün bulunamadı. Lütfen geçerli bir ürün ID'si ile tekrar deneyin."
      emptyIcon="ph-package"
      multiItems={allSections}
      isBack
    />
  );
};

export default ProductDetailPage;

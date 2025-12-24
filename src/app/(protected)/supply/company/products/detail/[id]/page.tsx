"use client";

import React from "react";

import { CustomCard } from "@/components/ui";
import {
  useProductDetail,
  useProductSections,
  useSupplierSections,
} from "./_shared";
import { usePageTitle } from "@/hooks";

/**
 * Product detay bilgilerini gösteren kart bileşeni
 */
const ProductDetailPage: React.FC = () => {
  usePageTitle("Ürün Detayı");
  const { product, supplier, isLoading, error, productId } = useProductDetail();

  // Ana section'ları oluştur (tedarikçi bilgileri ayrı gösterilecek)
  const allSections = useProductSections(product);

  // Tedarikçi section'larını oluştur
  const supplierSections = useSupplierSections(supplier);

  // ID yoksa veya 0 ise özel mesaj göster
  const hasValidId = !!(productId && productId > 0);

  return (
    <div className="d-flex flex-column gap-24">
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

      {supplier && supplierSections.length > 0 && (
        <CustomCard
          title="Tedarikçi Bilgileri"
          subtitle="Ürünün tedarikçi bilgilerini görüntüleyin"
          multiItems={supplierSections}
          //   type="accordion"
        />
      )}
    </div>
  );
};

export default ProductDetailPage;

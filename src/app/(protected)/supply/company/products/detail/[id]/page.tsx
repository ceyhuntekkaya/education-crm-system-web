"use client";

import React from "react";
import {
  useProductDetail,
  ProductFooter,
  ProductImageSection,
  ProductInfoSection,
  ProductTabsSection,
  ProductLoadingState,
  ProductErrorState,
  ProductEmptyState,
  ProductBackButton,
  ProductDiscountSection,
  ProductVariantsSection,
} from "./_shared";
import { usePageTitle } from "@/hooks";

/**
 * Modern e-ticaret tarzı ürün detay sayfası
 * Product Card tasarımından ilham alınmıştır
 * Trendyol, Amazon, Hepsiburada gibi sitelerden esinlenilmiştir
 */
const ProductDetailPage: React.FC = () => {
  usePageTitle("Ürün Detayı");
  const { product, isLoading, error, hasValidId } = useProductDetail();

  // Loading state
  if (isLoading && hasValidId) {
    return <ProductLoadingState />;
  }

  // Error state
  if (error && hasValidId) {
    return <ProductErrorState error={error} />;
  }

  // Empty state
  if (!product && !isLoading && !error && hasValidId) {
    return <ProductEmptyState />;
  }

  if (!product) return null;

  return (
    <div className="product-detail-page">
      <div className="product-detail-page__container">
        {/* Geri Dön - Minimal Tasarım */}
        <ProductBackButton />

        {/* Ana Ürün Bilgileri */}
        <div className="product-detail-page__main-section">
          <div className="row gx-5">
            <div className="col-6">
              <ProductImageSection />
            </div>

            <div className="col-6">
              <ProductInfoSection />
            </div>
          </div>
        </div>

        {/* İndirimler - Fiyat bilgisinden sonra */}
        <ProductDiscountSection />

        {/* Ürün Varyantları */}
        <ProductVariantsSection productId={product.id!} />

        {/* Detaylı Bilgiler - Tab Navigation */}
        <ProductTabsSection />
      </div>

      {/* Sticky Footer */}
      <ProductFooter />
    </div>
  );
};

export default ProductDetailPage;

"use client";

import React from "react";
import { usePageTitle } from "@/hooks";
import {
  useSupplierDetail,
  SupplierInfoSection,
  SupplierDetailsSection,
  SupplierLoadingState,
  SupplierErrorState,
  SupplierEmptyState,
  SupplierBackButton,
  SupplierEditButton,
  SupplierProductsSection,
} from "./_shared";

/**
 * Modern Supplier detay sayfası
 * Tedarikçi detaylarını görüntüler
 */
const SupplierDetailPage: React.FC = () => {
  usePageTitle("Tedarikçi Detayı");
  const { supplier, isLoading, error, hasValidId } = useSupplierDetail();

  // Loading state
  if (isLoading && hasValidId) {
    return <SupplierLoadingState />;
  }

  // Error state
  if (error && hasValidId) {
    return <SupplierErrorState error={error} />;
  }

  // Empty state
  if (!supplier && !isLoading && !error && hasValidId) {
    return <SupplierEmptyState />;
  }

  if (!supplier) return null;

  return (
    <div className="supplier-detail-page">
      <div className="supplier-detail-page__container">
        {/* Header: Geri Dön ve Düzenle - Minimal Tasarım */}
        <div className="supplier-detail-page__header">
          <div className="supplier-detail-page__header-actions">
            {/* <SupplierEditButton /> */}
          </div>

          <SupplierBackButton />
        </div>

        {/* Ana Supplier Bilgileri */}
        <div className="supplier-detail-page__main-section">
          <div className="row gx-5">
            <div className="col-12">
              <SupplierInfoSection />
            </div>
          </div>
        </div>

        {/* Detaylı Bilgiler */}
        <SupplierDetailsSection />

        {/* Tedarikçi Ürünleri */}
        <div className="mt-32">
          <SupplierProductsSection />
        </div>
      </div>
    </div>
  );
};

export default SupplierDetailPage;

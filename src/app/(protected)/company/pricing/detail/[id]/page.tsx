"use client";

import React from "react";

import { CustomCard, LoadingSpinner } from "@/components/ui";
import { usePricingDetail, usePricingSections } from "./_shared";

/**
 * Pricing detay bilgilerini gösteren kart bileşeni
 */
const PricingDetailPage: React.FC = () => {
  const { pricing, isLoading, error } = usePricingDetail();

  // Ana section'ları oluştur - hook'u en üstte çağırıyoruz
  const allSections = usePricingSections(pricing);

  if (isLoading) {
    return (
      <CustomCard title="Fiyat Bilgisi Detayı">
        <LoadingSpinner message="Fiyat bilgisi yükleniyor..." />
      </CustomCard>
    );
  }

  if (error) {
    return (
      <CustomCard
        title="Hata"
        bgColor="bg-danger-25"
        border="border border-danger-30"
      >
        <div className="text-center py-8">
          <i className="ph ph-warning-circle text-danger fs-2 mb-3"></i>
          <p className="text-danger mb-0">
            Fiyat bilgisi yüklenirken hata oluştu: {error}
          </p>
        </div>
      </CustomCard>
    );
  }

  if (!pricing) {
    return (
      <CustomCard title="Bilgi">
        <div className="text-center py-8">
          <i className="ph ph-info text-neutral-500 fs-2 mb-3"></i>
          <p className="text-neutral-600 mb-0">Fiyat bilgisi bulunamadı.</p>
        </div>
      </CustomCard>
    );
  }

  return (
    <CustomCard
      title="Fiyat Bilgisi Detayı"
      subtitle="Okul fiyat bilgilerini detaylı olarak görüntüleyin"
      editButtonUrl={
        pricing?.id ? `/company/pricing/add-edit/${pricing.id}` : undefined
      }
      multiItems={allSections}
    />
  );
};

export default PricingDetailPage;

"use client";

import React from "react";

import { CustomCard } from "@/components/ui";
import { usePricingDetail, usePricingSections } from "./_shared";
import { useCompany } from "@/app/(protected)/company/_shared";

/**
 * Pricing detay bilgilerini gösteren kart bileşeni
 */
const PricingDetailPage: React.FC = () => {
  const { pricing, isLoading, error, pricingId } = usePricingDetail();
  const { selectedSchool } = useCompany();

  // Ana section'ları oluştur - hook'u en üstte çağırıyoruz
  const allSections = usePricingSections(pricing);

  // ID yoksa veya 0 ise özel mesaj göster
  const hasValidId = !!(pricingId && pricingId > 0);
  const showNoSchoolMessage = !hasValidId && !selectedSchool;

  return (
    <CustomCard
      title="Fiyat Bilgisi Detayı"
      subtitle="Okul fiyat bilgilerini detaylı olarak görüntüleyin"
      isLoading={isLoading && hasValidId}
      loadingMessage="Fiyat bilgisi yükleniyor..."
      isError={!!error && hasValidId}
      errorMessage={
        error ? `Fiyat bilgisi yüklenirken hata oluştu: ${error}` : undefined
      }
      isEmpty={
        showNoSchoolMessage || (!pricing && !isLoading && !error && hasValidId)
      }
      emptyMessage={
        showNoSchoolMessage
          ? "Lütfen önce bir okul seçin"
          : "Fiyat bilgisi bulunamadı"
      }
      emptyDescription={
        showNoSchoolMessage
          ? "Fiyat bilgilerini görüntülemek için yan menüden bir okul seçmeniz gerekmektedir."
          : undefined
      }
      emptyIcon={showNoSchoolMessage ? "ph-buildings" : "ph-info"}
      editButtonUrl={
        pricing?.id ? `/company/pricing/add-edit/${pricing.id}` : undefined
      }
      multiItems={allSections}
    />
  );
};

export default PricingDetailPage;

"use client";

import React from "react";

import { CustomCard } from "@/components/ui";
import { usePricingDetail, usePricingSections } from "./_shared";
import { useCompany } from "@/app/(protected)/company/_shared";
import { usePageTitle } from "@/hooks";

/**
 * Pricing detay bilgilerini gösteren kart bileşeni
 */
const PricingDetailPage: React.FC = () => {
  usePageTitle("Fiyat Detayı");
  const { pricing, isLoading, error, pricingId } = usePricingDetail();
  const { selectedSchool } = useCompany();

  // Ana section'ları oluştur - hook'u en üstte çağırıyoruz
  const allSections = usePricingSections(pricing);

  // ID yoksa veya 0 ise özel mesaj göster
  const hasValidId = !!(pricingId && pricingId > 0);
  const showNoSchoolMessage = !hasValidId && !selectedSchool;

  //   {
  //     "schoolId": 21,
  //     "staffUserId": 4,
  //     "durationMinutes": 30,
  //     "appointmentType": "INFORMATION_MEETING",
  //     "onlineMeetingAvailable": false,
  //     "slotDate": "2025-11-29T14:01"
  // }

  return (
    <CustomCard
      title="Fiyat Bilgisi Detayı"
      subtitle="Kurum fiyat bilgilerini detaylı olarak görüntüleyin"
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
          ? "Lütfen önce bir Kurum seçin"
          : "Fiyat bilgisi bulunamadı"
      }
      emptyDescription={
        showNoSchoolMessage
          ? "Fiyat bilgilerini görüntülemek için yan menüden bir Kurum seçmeniz gerekmektedir."
          : undefined
      }
      emptyIcon={showNoSchoolMessage ? "ph-buildings" : "ph-info"}
      // editButtonUrl={
      //   pricing?.id
      //     ? `/company/pricing/add-edit/${pricing.id}`
      //     : `/company/pricing/add-edit/${selectedSchool?.id}`
      // }
      editButtonUrl={`/company/pricing/add-edit/${selectedSchool?.id}`}
      multiItems={allSections}
    />
  );
};

export default PricingDetailPage;

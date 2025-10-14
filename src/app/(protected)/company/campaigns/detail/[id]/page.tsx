"use client";

import React from "react";

import { CustomCard, LoadingSpinner } from "@/components/ui";
import { useCampaignDetail, useCampaignSections } from "./_shared";

/**
 * Campaign detay bilgilerini gösteren kart bileşeni
 */
const CampaignDetailPage: React.FC = () => {
  const { campaign, isLoading, error } = useCampaignDetail();

  // Ana section'ları oluştur - hook'u en üstte çağırıyoruz
  const allSections = useCampaignSections(campaign);

  if (isLoading) {
    return (
      <CustomCard title="Kampanya Detayı">
        <LoadingSpinner message="Kampanya bilgisi yükleniyor..." />
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
            Kampanya bilgisi yüklenirken hata oluştu: {error}
          </p>
        </div>
      </CustomCard>
    );
  }

  if (!campaign) {
    return (
      <CustomCard title="Bilgi">
        <div className="text-center py-8">
          <i className="ph ph-info text-neutral-500 fs-2 mb-3"></i>
          <p className="text-neutral-600 mb-0">Kampanya bilgisi bulunamadı.</p>
        </div>
      </CustomCard>
    );
  }

  console.log("campaign detail:", campaign);

  return (
    <CustomCard
      title="Kampanya Detayı"
      subtitle="Kampanya bilgilerini detaylı olarak görüntüleyin"
      multiItems={allSections}
    />
  );
};

export default CampaignDetailPage;

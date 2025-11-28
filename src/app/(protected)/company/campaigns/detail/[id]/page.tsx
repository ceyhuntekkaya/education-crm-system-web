"use client";

import React from "react";

import { CustomCard, LoadingSpinner } from "@/components/ui";
import { useCampaignDetail, useCampaignSections } from "./_shared";
import { CampaignCard } from "@/app/(public)/search/[id]/_shared/sections/institution-campaigns";
import { API_ENDPOINTS } from "@/lib/api/endpoints";
import { usePageTitle } from "@/hooks";

/**
 * Campaign detay bilgilerini gösteren kart bileşeni
 */
const CampaignDetailPage: React.FC = () => {
  usePageTitle("Kampanya Detayı");
  const { campaign, isLoading, error } = useCampaignDetail();

  // Ana section'ları oluştur - hook'u en üstte çağırıyoruz
  const allSections = useCampaignSections(campaign);

  return (
    <CustomCard
      title="Kampanya Detayı"
      subtitle="Kampanya bilgilerini detaylı olarak görüntüleyin"
      multiItems={allSections}
      editButtonUrl={
        campaign?.id ? `/company/campaigns/add-edit/${campaign.id}` : undefined
      }
      deleteUrl={
        campaign?.id ? API_ENDPOINTS.CAMPAIGNS.DELETE(campaign.id) : undefined
      }
    >
      {isLoading ? (
        <LoadingSpinner message="Kampanya bilgisi yükleniyor..." />
      ) : error ? (
        <div className="text-center py-8">
          <i className="ph ph-warning-circle text-danger fs-2 mb-3"></i>
          <p className="text-danger mb-0">
            Kampanya bilgisi yüklenirken hata oluştu: {error}
          </p>
        </div>
      ) : !campaign ? (
        <div className="text-center py-8">
          <i className="ph ph-info text-neutral-500 fs-2 mb-3"></i>
          <p className="text-neutral-600 mb-0">Kampanya bilgisi bulunamadı.</p>
        </div>
      ) : (
        <CampaignCard campaign={campaign} />
      )}
    </CustomCard>
  );
};

export default CampaignDetailPage;

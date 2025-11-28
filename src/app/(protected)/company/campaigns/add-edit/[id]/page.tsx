"use client";

import React from "react";
import { LoadingSpinner, CustomCard } from "@/components";
import { CampaignForm, useCampaignAddEdit } from "../_shared";
import { API_ENDPOINTS } from "@/lib/api/endpoints";
import { usePageTitle } from "@/hooks";

interface CampaignAddEditPageProps {}

const CampaignAddEditPage: React.FC<CampaignAddEditPageProps> = () => {
  usePageTitle("Kampanya Düzenle");
  const { isEditing, campaign, campaignLoading, campaignId } =
    useCampaignAddEdit();

  const pageTitle = isEditing
    ? "Kampanya Bilgisi Düzenle"
    : "Yeni Kampanya Oluştur";

  return (
    <CustomCard
      title={pageTitle}
      subtitle={
        isEditing
          ? "Mevcut kampanya bilgilerini düzenleyin"
          : "Yeni kampanya bilgilerini oluşturun"
      }
      isBack
      deleteUrl={
        isEditing && campaignId
          ? API_ENDPOINTS.CAMPAIGNS.DELETE(campaignId)
          : undefined
      }
      mb="mb-24"
    >
      {/* Form Content */}
      {campaignLoading && isEditing ? (
        <LoadingSpinner
          message="Kampanya bilgileri yükleniyor..."
          size="md"
          variant="dots"
          className="py-5"
        />
      ) : (
        <CampaignForm isEditing={isEditing} initialData={campaign} />
      )}
    </CustomCard>
  );
};

export default CampaignAddEditPage;

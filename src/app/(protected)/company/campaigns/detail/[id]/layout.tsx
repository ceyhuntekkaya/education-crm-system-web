"use client";

import React from "react";
import { useParams } from "next/navigation";
import { CampaignDetailProvider } from "./_shared";
import { validateCampaignId } from "./_shared/utils/campaign-detail.utils";

interface CampaignDetailLayoutProps {
  children: React.ReactNode;
}

const CampaignDetailLayout: React.FC<CampaignDetailLayoutProps> = ({
  children,
}) => {
  const params = useParams();
  const id = params?.id as string;

  // ID'yi valide et
  const campaignId = validateCampaignId(id);

  if (!campaignId) {
    return (
      <div className="text-center py-8">
        <i className="ph ph-warning-circle text-danger fs-2 mb-3"></i>
        <p className="text-danger mb-0">Geçersiz kampanya ID&apos;si: {id}</p>
      </div>
    );
  }

  return (
    <CampaignDetailProvider campaignId={campaignId}>
      {children}
    </CampaignDetailProvider>
  );
};

export default CampaignDetailLayout;

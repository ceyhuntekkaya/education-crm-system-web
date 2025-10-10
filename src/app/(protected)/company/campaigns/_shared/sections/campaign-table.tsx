"use client";

import React, { useState } from "react";
import { DataGrid } from "@/components/ui/data-grid";
import { CampaignDto } from "@/types/dto/campaign/CampaignDto";
import { CampaignSummaryDto } from "@/types/dto/campaign/CampaignSummaryDto";
import { createCampaignColumns } from "../config/campaign-columns";
import { CampaignColumnHandlers, CampaignTableProps } from "../types";
import { mockCampaigns, getCampaignStats } from "../mock/campaigns-mock-data";
import { useCampaigns } from "../context";

export const CampaignTable: React.FC<CampaignTableProps> = ({
  campaigns: propCampaigns,
  loading: propLoading,
}) => {
  // Context'ten aktif kampanyaları al
  const { activeCampaigns, campaignsLoading } = useCampaigns();

  // Props'tan gelen veriler varsa onları kullan, yoksa context'ten al
  const campaigns = propCampaigns || activeCampaigns;
  const loading = propLoading !== undefined ? propLoading : campaignsLoading;

  // Kolonları oluştur
  const columns = createCampaignColumns();

  return (
    <div>
      <DataGrid<CampaignDto | CampaignSummaryDto>
        rows={campaigns}
        columns={columns}
        loading={loading}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[5, 10, 25, 50]}
        disableRowSelectionOnClick
        emptyState={{
          icon: "ph-megaphone",
          title: "Henüz Kampanya Yok",
          description:
            "İlk kampanyanızı oluşturmak için 'Yeni Kampanya' butonuna tıklayın.",
          showActions: true,
          addButtonText: "Yeni Kampanya",
          onAddNew: () => {
            console.log("Yeni Kampanya ekleme formu açılacak");
          },
        }}
      />
    </div>
  );
};

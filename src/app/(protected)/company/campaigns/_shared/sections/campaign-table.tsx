"use client";

import React, { useState } from "react";
import { DataGrid } from "@/components/ui/data-grid";
import { CampaignDto } from "@/types/dto/campaign/CampaignDto";
import { createCampaignColumns } from "../config/campaign-columns";
import { CampaignColumnHandlers, CampaignTableProps } from "../types";
import { mockCampaigns, getCampaignStats } from "../mock/campaigns-mock-data";

export const CampaignTable: React.FC<CampaignTableProps> = ({
  campaigns = mockCampaigns,
  loading = false,
}) => {
  // Event handler'lar - sadece detay görüntüleme
  const handlers: CampaignColumnHandlers = {
    onViewDetails: (campaign: CampaignDto) => {
      console.log("View details campaign:", campaign);
      // Burada detay modal açılabilir
    },
    onEdit: (campaign: CampaignDto) => {
      // Boş bırakıldı
    },
    onToggleStatus: (campaign: CampaignDto) => {
      // Boş bırakıldı
    },
    onDelete: (campaign: CampaignDto) => {
      // Boş bırakıldı
    },
    onDuplicate: (campaign: CampaignDto) => {
      // Boş bırakıldı
    },
  };

  // Kolonları oluştur
  const columns = createCampaignColumns(handlers);

  return (
    <div>
      <DataGrid
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

"use client";

import React, { useState } from "react";
import { DataGrid } from "@/components/ui/data-grid";
import { SchoolPricingDto } from "@/types/dto/pricing/SchoolPricingDto";
import { createPricingColumns } from "../config/pricing-columns";
import { PricingColumnHandlers, PricingTableProps } from "../types";
import { usePricing } from "../context/pricing-context";

export const PricingTable = () => {
  // Pricing context'ten veri al
  const { schoolPricings, pricingLoading } = usePricing();

  // Kolonları oluştur
  const columns = createPricingColumns();

  return (
    <div>
      <DataGrid
        rows={schoolPricings || []}
        columns={columns}
        loading={pricingLoading}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[5, 10, 25, 50]}
        disableRowSelectionOnClick
        emptyState={{
          icon: "ph-currency-circle-dollar",
          title: "Henüz Fiyat Bilgisi Yok",
          description:
            "İlk fiyat bilginizi oluşturmak için 'Yeni Fiyat Bilgisi' butonuna tıklayın.",
          showActions: true,
          addButtonText: "Yeni Fiyat Bilgisi",
          onAddNew: () => {
            console.log("Yeni Fiyat Bilgisi ekleme formu açılacak");
          },
        }}
      />
    </div>
  );
};

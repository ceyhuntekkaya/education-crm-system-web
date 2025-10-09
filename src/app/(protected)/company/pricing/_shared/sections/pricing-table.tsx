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

  // Event handler'lar - sadece detay görüntüleme
  const handlers: PricingColumnHandlers = {
    onViewDetails: (pricing: SchoolPricingDto) => {
      console.log("View details pricing:", pricing);
      // Burada detay modal açılabilir
    },
    onEdit: (pricing: SchoolPricingDto) => {
      console.log("Edit pricing:", pricing);
      // Düzenleme sayfasına yönlendirme
    },
    onToggleStatus: (pricing: SchoolPricingDto) => {
      console.log("Toggle status pricing:", pricing);
      // Durum değiştirme işlemi
    },
    onDelete: (pricing: SchoolPricingDto) => {
      console.log("Delete pricing:", pricing);
      // Silme işlemi
    },
    onDuplicate: (pricing: SchoolPricingDto) => {
      console.log("Duplicate pricing:", pricing);
      // Kopyalama işlemi
    },
  };

  // Kolonları oluştur
  const columns = createPricingColumns(handlers);

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

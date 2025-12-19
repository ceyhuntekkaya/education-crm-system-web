"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { DataGrid } from "@/components/ui/data-grid";
import { createPricingColumns } from "../config/pricing-columns";
import { usePricing } from "../context/pricing-context";

export const PricingTable = () => {
  const router = useRouter();

  // Pricing context'ten veri al
  const { schoolPricings, pricingLoading } = usePricing();

  // Row tıklama handler'ı
  const handleRowClick = (params: any) => {
    if (params.row?.id) {
      router.push(`/company/pricing/detail/${params.row.id}`);
    }
  };

  // Kolonları oluştur
  const columns = createPricingColumns();

  return (
    <div>
      <DataGrid
        rows={schoolPricings || []}
        columns={columns}
        loading={pricingLoading}
        onRowClick={handleRowClick}
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
            // console.log("Yeni Fiyat Bilgisi ekleme formu açılacak");
          },
        }}
      />
    </div>
  );
};

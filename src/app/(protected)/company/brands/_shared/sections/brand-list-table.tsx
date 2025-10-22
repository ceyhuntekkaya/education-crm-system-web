"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { DataGrid } from "@/components/ui/data-grid";
import { createBrandColumns } from "../config/brand-columns";
import { useBrandList } from "../context/brand-list-context";

export const BrandListTable = () => {
  const router = useRouter();

  // Brand list context'ten veri al
  const { brands, brandLoading } = useBrandList();

  // Row tıklama handler'ı
  const handleRowClick = (params: any) => {
    if (params.row?.id) {
      router.push(`/company/brands/detail/${params.row.id}`);
    }
  };

  // Kolonları oluştur
  const columns = createBrandColumns();

  return (
    <div>
      <DataGrid
        rows={brands || []}
        columns={columns}
        loading={brandLoading}
        onRowClick={handleRowClick}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[5, 10, 25, 50]}
        disableRowSelectionOnClick
        emptyState={{
          icon: "ph-buildings",
          title: "Henüz Marka Yok",
          description:
            "İlk markanızı oluşturmak için 'Yeni Marka' butonuna tıklayın.",
          showActions: true,
          addButtonText: "Yeni Marka",
          onAddNew: () => {
            router.push("/company/brands/add-edit/new");
          },
        }}
      />
    </div>
  );
};

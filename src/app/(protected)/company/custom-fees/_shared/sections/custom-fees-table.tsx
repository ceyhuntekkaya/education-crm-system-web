"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { DataGrid } from "@/components/ui/data-grid";
import { createCustomFeeColumns } from "../config/custom-fee-columns";
import { useCustomFeeList } from "../context/custom-fee-list-context";

export const CustomFeesTable = () => {
  const router = useRouter();

  // Custom fee list context'ten veri al
  const { customFees, customFeeLoading } = useCustomFeeList();

  // Row tıklama handler'ı
  const handleRowClick = (params: any) => {
    if (params.row?.id) {
      router.push(`/company/custom-fees/detail/${params.row.id}`);
    }
  };

  // Kolonları oluştur
  const columns = createCustomFeeColumns();

  return (
    <div>
      <DataGrid
        rows={customFees || []}
        columns={columns}
        loading={customFeeLoading}
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
          title: "Henüz Ek Ücret Yok",
          description:
            "İlk ek ücret kaydınızı oluşturmak için 'Yeni Ek Ücret' butonuna tıklayın.",
          showActions: true,
          addButtonText: "Yeni Ek Ücret",
          onAddNew: () => {
            router.push("/company/custom-fees/add-edit/new");
          },
        }}
      />
    </div>
  );
};

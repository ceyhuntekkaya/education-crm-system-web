"use client";

import React from "react";
import { DataGrid } from "@/components/ui/data-grid";
import { createSchoolColumns } from "../config/school-columns";
import { SchoolTableProps } from "../types";
import { useCompany } from "@/app/(protected)/company/_shared";
import { useAuth } from "@/contexts";

export const SchoolTable: React.FC<SchoolTableProps> = () => {
  const { schools } = useCompany();
  const { isLoading } = useAuth();

  // Kolonları oluştur
  const columns = createSchoolColumns();

  return (
    <div>
      <DataGrid
        rows={schools}
        columns={columns}
        loading={isLoading}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[5, 10, 25, 50]}
        disableRowSelectionOnClick
        emptyState={{
          icon: "ph-graduation-cap",
          title: "Henüz Kurum Yok",
          description:
            "İlk Kurum bilginizi eklemek için 'Yeni Kurum Ekle' butonuna tıklayın.",
          showActions: true,
          addButtonText: "Yeni Kurum Ekle",
          onAddNew: () => {
            console.log("Yeni Kurum ekleme formu açılacak");
          },
        }}
      />
    </div>
  );
};

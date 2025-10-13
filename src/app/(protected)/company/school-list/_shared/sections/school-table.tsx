"use client";

import React, { useState } from "react";
import { DataGrid } from "@/components/ui/data-grid";
import { SchoolDto } from "@/types";
import { createSchoolColumns } from "../config/school-columns";
import { SchoolColumnHandlers, SchoolTableProps } from "../types";
import { useSchoolList } from "../context";

export const SchoolTable: React.FC<SchoolTableProps> = ({
  loading: propLoading = false,
}) => {
  const { schools, loading: contextLoading } = useSchoolList();
  const loading = propLoading || contextLoading;

  // Kolonları oluştur
  const columns = createSchoolColumns();

  return (
    <div>
      <DataGrid
        rows={schools}
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
          icon: "ph-school",
          title: "Henüz Okul Yok",
          description:
            "İlk okul bilginizi eklemek için 'Yeni Okul Ekle' butonuna tıklayın.",
          showActions: true,
          addButtonText: "Yeni Okul Ekle",
          onAddNew: () => {
            console.log("Yeni Okul ekleme formu açılacak");
          },
        }}
      />
    </div>
  );
};

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
  // Event handler'lar - sadece detay görüntüleme
  const handlers: SchoolColumnHandlers = {
    onViewDetails: (school: SchoolDto) => {
      console.log("View details school:", school);
      // Burada detay modal açılabilir
    },
    onEdit: (school: SchoolDto) => {
      console.log("Edit school:", school);
      // Düzenleme sayfasına yönlendirme
    },
    onToggleStatus: (school: SchoolDto) => {
      console.log("Toggle subscription status school:", school);
      // Abonelik durumu değiştirme işlemi
    },
    onDelete: (school: SchoolDto) => {
      console.log("Delete school:", school);
      // Silme işlemi
    },
    onDuplicate: (school: SchoolDto) => {
      console.log("Duplicate school:", school);
      // Kopyalama işlemi
    },
    onViewAppointments: (school: SchoolDto) => {
      console.log("View appointments for school:", school);
      // Randevu listesi sayfasına yönlendirme
    },
  };

  // Kolonları oluştur
  const columns = createSchoolColumns(handlers);

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

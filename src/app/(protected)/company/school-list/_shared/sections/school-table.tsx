"use client";

import React, { useState } from "react";
import { DataGrid } from "@/components/ui/data-grid";
import { SchoolSearchResultDto } from "@/types";
import { createSchoolColumns } from "../config/school-columns";
import { SchoolColumnHandlers, SchoolTableProps } from "../types";
import { mockSchools, getSchoolStats } from "../mock/school-list-mock-data";

export const SchoolTable: React.FC<SchoolTableProps> = ({
  schools = mockSchools,
  loading = false,
}) => {
  // Event handler'lar - sadece detay görüntüleme
  const handlers: SchoolColumnHandlers = {
    onViewDetails: (school: SchoolSearchResultDto) => {
      console.log("View details school:", school);
      // Burada detay modal açılabilir
    },
    onEdit: (school: SchoolSearchResultDto) => {
      console.log("Edit school:", school);
      // Düzenleme sayfasına yönlendirme
    },
    onToggleStatus: (school: SchoolSearchResultDto) => {
      console.log("Toggle subscription status school:", school);
      // Abonelik durumu değiştirme işlemi
    },
    onDelete: (school: SchoolSearchResultDto) => {
      console.log("Delete school:", school);
      // Silme işlemi
    },
    onDuplicate: (school: SchoolSearchResultDto) => {
      console.log("Duplicate school:", school);
      // Kopyalama işlemi
    },
    onViewAppointments: (school: SchoolSearchResultDto) => {
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

"use client";

import React, { useState } from "react";
import { DataGrid } from "@/components/ui/data-grid";
import { AppointmentDto } from "@/types/dto/appointment/AppointmentDto";
import { createAppointmentColumns } from "../config/appointment-columns";
import { AppointmentTableProps } from "../types";
import {
  mockAppointments,
  getAppointmentStats,
} from "../mock/appointment-mock-data";

export const AppointmentTable: React.FC<AppointmentTableProps> = ({
  appointments = mockAppointments,
  loading = false,
}) => {
  // Kolonları oluştur
  const columns = createAppointmentColumns();

  return (
    <div>
      <DataGrid
        rows={appointments}
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
          icon: "ph-calendar",
          title: "Henüz Randevu Yok",
          description:
            "İlk randevunuzu oluşturmak için 'Yeni Randevu' butonuna tıklayın.",
          showActions: true,
          addButtonText: "Yeni Randevu",
          onAddNew: () => {
            console.log("Yeni Randevu ekleme formu açılacak");
          },
        }}
      />
    </div>
  );
};

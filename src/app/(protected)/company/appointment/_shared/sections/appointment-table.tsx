"use client";

import React, { useState } from "react";
import { DataGrid } from "@/components/ui/data-grid";
import { AppointmentDto } from "@/types/dto/appointment/AppointmentDto";
import { createAppointmentColumns } from "../config/appointment-columns";
import { AppointmentColumnHandlers, AppointmentTableProps } from "../types";
import {
  mockAppointments,
  getAppointmentStats,
} from "../mock/appointment-mock-data";

export const AppointmentTable: React.FC<AppointmentTableProps> = ({
  appointments = mockAppointments,
  loading = false,
}) => {
  // Event handler'lar
  const handlers: AppointmentColumnHandlers = {
    onViewDetails: (appointment: AppointmentDto) => {
      console.log("View details appointment:", appointment);
      // Burada detay modal açılabilir
    },
    onEdit: (appointment: AppointmentDto) => {
      console.log("Edit appointment:", appointment);
      // Düzenleme sayfasına yönlendirme
    },
    onComplete: (appointment: AppointmentDto) => {
      console.log("Complete appointment:", appointment);
      // Randevu tamamlama işlemi
    },
    onCancel: (appointment: AppointmentDto) => {
      console.log("Cancel appointment:", appointment);
      // Randevu iptal etme işlemi
    },
    onReschedule: (appointment: AppointmentDto) => {
      console.log("Reschedule appointment:", appointment);
      // Randevu yeniden planlama işlemi
    },
    onAddNote: (appointment: AppointmentDto) => {
      console.log("Add note to appointment:", appointment);
      // Not ekleme işlemi
    },
  };

  // Kolonları oluştur
  const columns = createAppointmentColumns(handlers);

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

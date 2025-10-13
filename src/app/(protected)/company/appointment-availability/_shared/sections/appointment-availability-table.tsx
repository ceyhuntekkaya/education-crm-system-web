"use client";

import React from "react";
import { DataGrid } from "@/components/ui/data-grid";
import { appointmentAvailabilityColumns } from "../config/appointment-availability-columns";
import { useAppointment } from "../context/appointment-context";

export const AppointmentAvailabilityTable: React.FC = () => {
  // Context'ten veri ve loading state'i al
  const { availabilities, availabilityLoading } = useAppointment();

  // Context'ten direkt kullan
  const loading = availabilityLoading;
  return (
    <DataGrid
      rows={availabilities || []}
      columns={appointmentAvailabilityColumns}
      loading={loading}
      initialState={{
        pagination: {
          paginationModel: { page: 0, pageSize: 10 },
        },
      }}
      pageSizeOptions={[5, 10, 25, 50]}
      disableRowSelectionOnClick
      emptyState={{
        icon: "ph-calendar-blank",
        title: "Müsaitlik Bilgisi Bulunamadı",
        description:
          "Seçilen kriterlere göre müsaitlik bilgisi bulunamadı. Farklı tarih veya okul seçmeyi deneyin.",
        showActions: false,
      }}
    />
  );
};

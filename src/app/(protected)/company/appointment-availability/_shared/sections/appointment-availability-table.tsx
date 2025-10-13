"use client";

import React from "react";
import { DataGrid } from "@/components/ui/data-grid";
import { appointmentAvailabilityColumns } from "../config/appointment-availability-columns";
import { useAppointment } from "../context/appointment-context";
import { hasValidSearchCriteria } from "../utils";

export const AppointmentAvailabilityTable: React.FC = () => {
  // Context'ten veri ve loading state'i al
  const { availabilities, availabilityLoading, filters } = useAppointment();

  // Filter durumunu kontrol et - henüz arama yapılmadı mı?
  const hasSearchCriteria = React.useMemo(() => {
    return hasValidSearchCriteria(filters);
  }, [filters]);

  // Loading state
  const loading = availabilityLoading;

  // EmptyState konfigürasyonu
  const emptyStateConfig = React.useMemo(() => {
    if (!hasSearchCriteria) {
      // Henüz arama kriterleri girilmemiş
      return {
        icon: "ph-magnifying-glass",
        title: "Müsaitlik Sorgulama",
        description:
          "Müsaitlik bilgilerini görmek için lütfen yukarıdaki formu doldurarak arama kriterlerinizi belirleyin.",
        showActions: false,
      };
    } else {
      // Arama yapıldı ama sonuç bulunamadı
      return {
        icon: "ph-calendar-blank",
        title: "Müsaitlik Bilgisi Bulunamadı",
        description:
          "Seçilen kriterlere göre müsaitlik bilgisi bulunamadı. Farklı tarih veya okul seçmeyi deneyin.",
        showActions: false,
      };
    }
  }, [hasSearchCriteria]);

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
      emptyState={emptyStateConfig}
    />
  );
};

import { useMemo } from "react";
import { hasValidSearchCriteria } from "../utils";
import type {
  AppointmentAvailabilityFilters,
  AppointmentAvailabilityRangeFilters,
} from "../types";
import type { AppointmentSlotDto } from "@/types/dto/appointment/AppointmentSlotDto";

interface UseAppointmentTableDataProps {
  filters: AppointmentAvailabilityFilters | AppointmentAvailabilityRangeFilters;
  appointmentFilters?: Record<string, any>;
  filteredAppointments?: AppointmentSlotDto[];
  availabilities?: AppointmentSlotDto[];
}

export const useAppointmentTableData = ({
  filters,
  appointmentFilters,
  filteredAppointments,
  availabilities,
}: UseAppointmentTableDataProps) => {
  // Filter durumunu kontrol et
  const hasSearchCriteria = useMemo(() => {
    return hasValidSearchCriteria(filters);
  }, [filters]);

  // Hangi veriyi kullanacağımızı belirle
  const dataToDisplay = useMemo(() => {
    if (appointmentFilters && Object.keys(appointmentFilters).length > 0) {
      return filteredAppointments || [];
    }
    return availabilities || [];
  }, [appointmentFilters, filteredAppointments, availabilities]);

  // EmptyState konfigürasyonu
  const emptyStateConfig = useMemo(() => {
    if (!hasSearchCriteria) {
      return {
        icon: "ph-magnifying-glass",
        title: "Müsaitlik Sorgulama",
        description:
          "Müsaitlik bilgilerini görmek için lütfen yukarıdaki formu doldurarak arama kriterlerinizi belirleyin.",
        showActions: false,
      };
    } else {
      return {
        icon: "ph-calendar-blank",
        title: "Müsaitlik Bilgisi Bulunamadı",
        description:
          "Seçilen kriterlere göre müsaitlik bilgisi bulunamadı. Farklı tarih veya okul seçmeyi deneyin.",
        showActions: false,
      };
    }
  }, [hasSearchCriteria]);

  return {
    dataToDisplay,
    emptyStateConfig,
    hasSearchCriteria,
  };
};

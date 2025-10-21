"use client";

import React from "react";
import { FormProvider } from "@/contexts/form-context";
import { AppointmentDetailsFormContent } from "./sections";
import {
  validationSchema as appointmentDetailsValidationSchema,
  initialValues as appointmentDetailsInitialValues,
} from "./schemas";
import { AppointmentDetailsFilterFormProps } from "./types";
import { useAppointment } from "../../context/appointment-context";
import CustomCard from "@/components/ui/custom-card";
import Button from "@/components/ui/button";
import { getFilterSubtitle } from "./utils";
import { cleanFilters, getActiveFilterCount } from "@/utils/filter-utils";

/**
 * Appointment details filter form component
 * Context üzerinden otomatik çalışır ve frontend tabanlı filtreleme yapar
 */
export const AppointmentDetailsFilterForm: React.FC<
  AppointmentDetailsFilterFormProps
> = ({ onFilter, loading = false, className }) => {
  // Context'ten veri ve fonksiyonları al
  const {
    setAppointmentFilters,
    availabilityLoading,
    availabilities,
    appointmentFilters,
    clearAppointmentFilters,
    hasDataToFilter,
  } = useAppointment();

  //   Eğer filtrelenecek veri yoksa component'i gösterme
  if (!hasDataToFilter) {
    return null;
  }

  const handleSubmit = (filters: any) => {
    // Boş değerleri temizle - genel utility kullan (tüm default seçeneklerle)
    const processedFilters = cleanFilters(filters);

    // Context'teki filter fonksiyonunu çağır
    if (setAppointmentFilters) {
      setAppointmentFilters(processedFilters);
    }

    // Callback varsa çağır
    if (onFilter) {
      onFilter(processedFilters);
    }
  };

  // Filtreleri tamamen temizleme fonksiyonu
  const handleClearAllFilters = () => {
    // Context'teki filtreleri temizle
    clearAppointmentFilters?.();

    // Form'daki callback'i de çağır (boş filtreler ile)
    if (onFilter) {
      onFilter({});
    }
  };

  // Header action component
  const headerAction =
    getActiveFilterCount(appointmentFilters) > 0 ? (
      <Button
        variant="outline"
        size="sm"
        leftIcon="ph-x"
        onClick={handleClearAllFilters}
        aria-label="Tüm filtreleri temizle"
      >
        Temizle
      </Button>
    ) : undefined;

  return (
    <div className={className}>
      <CustomCard
        variant="outline"
        title="Randevu Detayları Filtreleme"
        subtitle={getFilterSubtitle(
          appointmentFilters,
          availabilities?.length || 0,
          "Randevular yükleniyor..."
        )}
        size="sm"
        headerAction={headerAction}
        type="accordion"
      >
        {/* Filter Form */}
        <FormProvider
          //   key={`appointment-filter-${JSON.stringify(appointmentFilters)}`}
          initialValues={appointmentDetailsInitialValues}
          //   validationSchema={appointmentDetailsValidationSchema}
        >
          <AppointmentDetailsFormContent onSubmit={handleSubmit} />
        </FormProvider>
      </CustomCard>
    </div>
  );
};

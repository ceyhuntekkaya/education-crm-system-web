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

  // Eğer filtrelenecek veri yoksa component'i gösterme
  if (!hasDataToFilter) {
    return null;
  }

  const handleSubmit = (filters: any) => {
    // Boş değerleri temizle
    const cleanFilters = Object.entries(filters).reduce((acc, [key, value]) => {
      if (value !== "" && value !== null && value !== undefined) {
        // Array ise ve boş değilse ekle
        if (Array.isArray(value) && value.length > 0) {
          acc[key] = value;
        }
        // String ise ve boş değilse ekle
        else if (typeof value === "string" && value.trim() !== "") {
          acc[key] = value.trim();
        }
        // Boolean ise ekle
        else if (typeof value === "boolean") {
          acc[key] = value;
        }
      }
      return acc;
    }, {} as any);

    // Context'teki filter fonksiyonunu çağır
    if (setAppointmentFilters) {
      setAppointmentFilters(cleanFilters);
    }

    // Callback varsa çağır
    if (onFilter) {
      onFilter(cleanFilters);
    }
  };

  // Header action component
  const headerAction =
    appointmentFilters && Object.keys(appointmentFilters).length > 0 ? (
      <Button
        variant="outline"
        size="sm"
        leftIcon="ph-x"
        onClick={() => clearAppointmentFilters?.()}
        aria-label="Tüm filtreleri temizle"
      >
        Temizle
      </Button>
    ) : undefined;

  // Active filters info
  const subtitle = availabilities?.length
    ? `${availabilities.length} randevu içerisinde filtreleme yapabilirsiniz`
    : "Randevular yükleniyor...";

  const activeFiltersInfo =
    appointmentFilters && Object.keys(appointmentFilters).length > 0 ? (
      <div className="d-flex align-items-center gap-2 mt-2">
        <span className="badge bg-info-subtle text-info px-2 py-1">
          <i className="ph-check-circle me-1" style={{ fontSize: "12px" }}></i>
          {Object.keys(appointmentFilters).length} aktif filtre uygulandı
        </span>
      </div>
    ) : null;

  return (
    <div className={className}>
      <CustomCard
        variant="outline"
        title="Randevu Detayları Filtreleme"
        subtitle={subtitle}
        headerAction={headerAction}
        className="mb-6"
      >
        {/* Active Filters Info */}
        {activeFiltersInfo}

        {/* Filter Form */}
        <FormProvider
          initialValues={appointmentDetailsInitialValues}
          //   validationSchema={appointmentDetailsValidationSchema}
        >
          <AppointmentDetailsFormContent
            onSubmit={handleSubmit}
            loading={loading || availabilityLoading}
          />
        </FormProvider>
      </CustomCard>
    </div>
  );
};

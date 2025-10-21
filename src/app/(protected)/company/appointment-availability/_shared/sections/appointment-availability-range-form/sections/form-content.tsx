"use client";

import React from "react";
import { Form, FormInput } from "@/components/forms";
import { Button } from "@/components/ui/button";
import CustomCard from "@/components/ui/custom-card";
import { AppointmentAvailabilityRangeFilters } from "../types";
import { useAppointment } from "../../../context/appointment-context";
import { useFormHook } from "@/hooks";

/**
 * Randevu müsaitlik aralığı sorgulama form içeriği
 * FormProvider sarmalayıcısı olmadan sadece form elemanları
 */
export const AppointmentAvailabilityRangeFormContent: React.FC = () => {
  // Context'ten veri ve fonksiyonları al
  const { fetchAvailabilities, availabilityLoading } = useAppointment();

  // Form hook'u - error durumunu kontrol için
  const { hasErrors } = useFormHook();

  // Context'ten direkt kullan
  const onSubmit = fetchAvailabilities;
  const loading = availabilityLoading;

  // Error varsa center, yoksa end alignment
  const alignClass = hasErrors ? "align-items-center" : "align-items-end";

  const handleSubmit = (values: any) => {
    // Form values'ları AppointmentAvailabilityRangeFilters formatına çevir
    // schoolId context'ten otomatik gelecek
    const filters: AppointmentAvailabilityRangeFilters = {
      startDate: values.startDate || undefined,
      endDate: values.endDate || undefined,
    };

    // Sadece startDate ve endDate'in dolu olması gerekiyor (schoolId context'ten gelecek)
    if (filters.startDate && filters.endDate) {
      onSubmit(filters);
    }
  };

  return (
    <CustomCard variant="outline">
      <Form onSubmit={handleSubmit}>
        {/* Form Fields ve Button Tek Satırda */}
        <div className={`row ${alignClass}`}>
          <div className="col-4">
            <FormInput
              name="startDate"
              type="date"
              label="Başlangıç Tarihi"
              placeholder="Başlangıç tarihini seçin"
              variant="inline"
              iconLeft="ph-calendar-plus"
              required
              disabled={loading}
            />
          </div>
          <div className="col-4">
            <FormInput
              name="endDate"
              type="date"
              label="Bitiş Tarihi"
              placeholder="Bitiş tarihini seçin"
              variant="inline"
              iconLeft="ph-calendar-minus"
              required
              disabled={loading}
            />
          </div>
          {/* <div className="col-1" /> */}
          <div className="col-4">
            <Button
              type="submit"
              variant="inline"
              disabled={loading}
              leftIcon="ph-magnifying-glass"
              fullWidth
            >
              {loading ? "Sorgulanıyor..." : "Aralık Sorgula"}
            </Button>
          </div>
        </div>
      </Form>
    </CustomCard>
  );
};

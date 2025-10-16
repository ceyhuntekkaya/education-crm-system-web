"use client";

import React from "react";
import { Form, FormInput } from "@/components/forms";
import { Button } from "@/components/ui/button";
import CustomCard from "@/components/ui/custom-card";
import { AppointmentAvailabilityFilters } from "../types";
import { useAppointment } from "../../../context/appointment-context";
import { useFormHook } from "@/hooks";

/**
 * Randevu müsaitlik sorgulama form içeriği
 * FormProvider sarmalayıcısı olmadan sadece form elemanları
 */
export const AppointmentAvailabilityFormContent: React.FC = () => {
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
    // Form values'ları AppointmentAvailabilityFilters formatına çevir
    // schoolId context'ten otomatik gelecek, sadece date yeterli
    const filters: AppointmentAvailabilityFilters = {
      date: values.date || undefined,
    };

    // Sadece date'in dolu olması gerekiyor (schoolId context'ten gelecek)
    if (filters.date) {
      onSubmit(filters);
    }
  };

  return (
    <CustomCard variant="outline">
      <Form onSubmit={handleSubmit}>
        {/* Form Fields ve Button Tek Satırda */}
        <div className={`row ${alignClass}`}>
          <div className="col-8">
            <FormInput
              name="date"
              type="date"
              label="Tarih"
              placeholder="Müsaitlik sorgulanacak tarihi seçin"
              variant="inline"
              iconLeft="ph-calendar"
              required
              disabled={loading}
            />
          </div>
          <div className="col-4">
            <Button
              type="submit"
              variant="inline"
              disabled={loading}
              leftIcon="ph-magnifying-glass"
              fullWidth
            >
              {loading ? "Sorgulanıyor..." : "Müsaitlik Sorgula"}
            </Button>
          </div>
        </div>
      </Form>
    </CustomCard>
  );
};

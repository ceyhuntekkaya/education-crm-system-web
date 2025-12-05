"use client";

import React from "react";
import { Form, FormInput, FormAutocomplete } from "@/components/forms";
import { Button } from "@/components/ui/button";
import {
  AppointmentDetailsFilters,
  AppointmentDetailsFormContentProps,
} from "../types";
import { useFormHook } from "@/hooks";
import { useForm } from "@/contexts/form-context";
import {
  statusOptions,
  appointmentTypeOptions,
  outcomeOptions,
  booleanOptions,
} from "../options";
import { ActiveFilters } from "./active-filters";
import { useAppointment } from "../../../context/appointment-context";

/**
 * Appointment details filter form content component
 * Kurum/kampüs bilgileri ve tarih aralığı filtreleri kaldırılmış optimize form
 */
export const AppointmentDetailsFormContent: React.FC<
  AppointmentDetailsFormContentProps
> = ({ onSubmit }) => {
  // Form hook - validation ve error kontrolü için
  const { hasErrors } = useFormHook();

  // Form reset hook'u
  const { reset } = useForm();

  // Context'ten sadece loading state'i ve clear fonksiyonu al
  const { availabilityLoading, clearAppointmentFilters } = useAppointment();

  const handleSubmit = (values: any) => {
    // Boolean değerleri düzenle
    const processedValues: AppointmentDetailsFilters = {
      ...values,
      onlineMeetingAvailable:
        values.onlineMeetingAvailable === "true"
          ? true
          : values.onlineMeetingAvailable === "false"
          ? false
          : undefined,
      isAvailable:
        values.isAvailable === "true"
          ? true
          : values.isAvailable === "false"
          ? false
          : undefined,
      isActive:
        values.isActive === "true"
          ? true
          : values.isActive === "false"
          ? false
          : undefined,
      requiresApproval:
        values.requiresApproval === "true"
          ? true
          : values.requiresApproval === "false"
          ? false
          : undefined,
    };

    onSubmit?.(processedValues);
  };

  const handleClear = () => {
    // Form'u initial values'a reset et
    reset();

    // Context'teki filtreleri temizle
    clearAppointmentFilters?.();

    // Parent component'e boş filtre gönder
    onSubmit?.({});
  };

  return (
    <div>
      {/* Active Filters Display */}
      <ActiveFilters />

      <Form onSubmit={handleSubmit}>
        {/* Form Layout - Yeni AppointmentSlotDto yapısına göre güncellenmiş */}
        <div className="row row-gap-16">
          {/* 1. Kurum Adı */}
          <div className="col-md-3">
            <FormInput
              name="schoolName"
              label="Kurum Adı"
              variant="inline"
              placeholder="Kurum adını giriniz"
            />
          </div>

          {/* 2. Personel */}
          <div className="col-md-3">
            <FormInput
              name="staffUserName"
              label="Personel"
              variant="inline"
              placeholder="Personel adını giriniz"
            />
          </div>

          {/* 3. Gün */}
          <div className="col-md-3">
            <FormInput
              name="dayOfWeekName"
              label="Gün"
              variant="inline"
              placeholder="Pazartesi, Salı..."
            />
          </div>

          {/* 4. Randevu Türü */}
          <div className="col-md-3">
            <FormAutocomplete
              name="appointmentType"
              label="Randevu Türü"
              variant="inline"
              options={appointmentTypeOptions}
              placeholder="Tür seçiniz"
            />
          </div>

          {/* 5. Slot Tarihi Başlangıç */}
          <div className="col-md-3">
            <FormInput
              name="slotDateStart"
              label="Slot Tarihi (Başlangıç)"
              type="date"
              variant="inline"
            />
          </div>

          {/* 6. Slot Tarihi Bitiş */}
          <div className="col-md-3">
            <FormInput
              name="slotDateEnd"
              label="Slot Tarihi (Bitiş)"
              type="date"
              variant="inline"
            />
          </div>

          {/* 7. Müsaitlik */}
          <div className="col-md-3">
            <FormAutocomplete
              name="isAvailable"
              label="Müsaitlik"
              variant="inline"
              options={booleanOptions}
              placeholder="Seçiniz"
            />
          </div>

          {/* 8. Online Toplantı */}
          <div className="col-md-3">
            <FormAutocomplete
              name="onlineMeetingAvailable"
              label="Online Toplantı"
              variant="inline"
              options={booleanOptions}
              placeholder="Seçiniz"
            />
          </div>

          {/* 9. Aktif/Pasif */}
          <div className="col-md-3">
            <FormAutocomplete
              name="isActive"
              label="Aktif/Pasif"
              variant="inline"
              options={booleanOptions}
              placeholder="Seçiniz"
            />
          </div>

          {/* 10. Onay Gerekli */}
          <div className="col-md-3">
            <FormAutocomplete
              name="requiresApproval"
              label="Onay Gerekli"
              variant="inline"
              options={booleanOptions}
              placeholder="Seçiniz"
            />
          </div>

          {/* 11. Randevu No (appointment içinden) */}
          <div className="col-md-3">
            <FormInput
              name="appointmentNumber"
              label="Randevu No"
              variant="inline"
              placeholder="Randevu numarası"
            />
          </div>

          {/* 12. Randevu Durumu */}
          <div className="col-md-3">
            <FormAutocomplete
              name="appointmentStatus"
              label="Randevu Durumu"
              variant="inline"
              options={statusOptions}
              placeholder="Durum seçiniz"
            />
          </div>

          {/* 13. Veli Adı (appointment içinden) */}
          <div className="col-md-3">
            <FormInput
              name="parentName"
              label="Veli Adı"
              variant="inline"
              placeholder="Veli adını giriniz"
            />
          </div>

          {/* 14. Öğrenci Adı (appointment içinden) */}
          <div className="col-md-3">
            <FormInput
              name="studentName"
              label="Öğrenci Adı"
              variant="inline"
              placeholder="Öğrenci adını giriniz"
            />
          </div>

          {/* 15. Sonuç */}
          <div className="col-md-3">
            <FormAutocomplete
              name="appointmentOutcome"
              label="Sonuç"
              variant="inline"
              options={outcomeOptions}
              placeholder="Sonuç seçiniz"
            />
          </div>

          {/* Action Buttons */}
          <div className="col-12 mb-12">
            <div className="d-flex justify-content-end gap-16">
              <Button
                type="button"
                variant="outline"
                size="sm"
                leftIcon="ph-broom"
                onClick={handleClear}
                disabled={availabilityLoading}
              >
                Filtreleri Temizle
              </Button>
              <Button
                type="submit"
                size="sm"
                leftIcon="ph-funnel"
                loading={availabilityLoading}
                disabled={availabilityLoading}
              >
                Filtrele
              </Button>
            </div>
          </div>
        </div>
      </Form>
    </div>
  );
};

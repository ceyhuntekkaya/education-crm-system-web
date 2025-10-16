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
 * Okul/kampüs bilgileri ve tarih aralığı filtreleri kaldırılmış optimize form
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
      isOnline:
        values.isOnline === "true"
          ? true
          : values.isOnline === "false"
          ? false
          : undefined,
      followUpRequired:
        values.followUpRequired === "true"
          ? true
          : values.followUpRequired === "false"
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
        {/* Form Layout - İstenen sıralamayla düzenlenmiş */}
        <div className="row row-gap-16">
          {/* 1. Randevu Başlığı */}
          <div className="col-md-3">
            <FormInput
              name="title"
              label="Randevu Başlığı"
              variant="inline"
              placeholder="Randevu başlığını giriniz"
            />
          </div>

          {/* 2. Randevu No */}
          <div className="col-md-3">
            <FormInput
              name="appointmentNumber"
              label="Randevu No"
              variant="inline"
              placeholder="Randevu numarası"
            />
          </div>

          {/* 3. Veli Adı */}
          <div className="col-md-3">
            <FormInput
              name="parentName"
              label="Veli Adı"
              variant="inline"
              placeholder="Veli adını giriniz"
            />
          </div>

          {/* 4. Öğrenci Adı */}
          <div className="col-md-3">
            <FormInput
              name="studentName"
              label="Öğrenci Adı"
              variant="inline"
              placeholder="Öğrenci adını giriniz"
            />
          </div>

          {/* 5. Randevu Türü */}
          <div className="col-md-3">
            <FormAutocomplete
              name="appointmentType"
              label="Randevu Türü"
              variant="inline"
              options={appointmentTypeOptions}
              placeholder="Tür seçiniz"
            />
          </div>

          {/* 6. Durum */}
          <div className="col-md-3">
            <FormAutocomplete
              name="status"
              label="Durum"
              variant="inline"
              options={statusOptions}
              placeholder="Durum seçiniz"
            />
          </div>

          {/* 7. Konum */}
          <div className="col-md-3">
            <FormInput
              name="location"
              label="Konum"
              variant="inline"
              placeholder="Konum bilgisi giriniz"
            />
          </div>

          {/* 8. Online/Fiziksel */}
          <div className="col-md-3">
            <FormAutocomplete
              name="isOnline"
              label="Online/Fiziksel"
              variant="inline"
              options={booleanOptions}
              placeholder="Seçiniz"
            />
          </div>

          {/* 9. Randevu Tarihi */}
          <div className="col-md-3">
            <FormInput
              name="appointmentDate"
              label="Randevu Tarihi"
              type="date"
              variant="inline"
            />
          </div>

          {/* 10. Başlangıç Saati */}
          <div className="col-md-3">
            <FormInput
              name="startTime"
              label="Başlangıç Saati"
              variant="inline"
              placeholder="09:30"
            />
          </div>

          {/* 11. Bitiş Saati */}
          <div className="col-md-3">
            <FormInput
              name="endTime"
              label="Bitiş Saati"
              variant="inline"
              placeholder="17:30"
            />
          </div>

          {/* 12. Personel */}
          <div className="col-md-3">
            <FormInput
              name="staffUserName"
              label="Personel"
              variant="inline"
              placeholder="Personel adını giriniz"
            />
          </div>

          {/* 13. Sonuç */}
          <div className="col-md-3">
            <FormAutocomplete
              name="outcome"
              label="Sonuç"
              variant="inline"
              options={outcomeOptions}
              placeholder="Sonuç seçiniz"
            />
          </div>

          {/* 14. Takip Gerekli */}
          <div className="col-md-3">
            <FormAutocomplete
              name="followUpRequired"
              label="Takip Gerekli"
              variant="inline"
              options={booleanOptions}
              placeholder="Seçiniz"
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

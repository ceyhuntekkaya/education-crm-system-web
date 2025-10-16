"use client";

import React from "react";
import { Form, FormInput, FormAutocomplete } from "@/components/forms";
import { Button } from "@/components/ui/button";
import {
  AppointmentDetailsFilters,
  AppointmentDetailsFormContentProps,
} from "../types";
import { useFormHook } from "@/hooks";
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
 * Columns'taki gösterilen bilgilere göre optimize edilmiş form
 */
export const AppointmentDetailsFormContent: React.FC<
  AppointmentDetailsFormContentProps
> = ({ onSubmit }) => {
  // Form hook - validation ve error kontrolü için
  const { hasErrors } = useFormHook();

  // Context'ten sadece loading state'i al
  const { availabilityLoading } = useAppointment();

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
    // Form'u temizle
    onSubmit?.({});
  };

  return (
    <div>
      {/* Active Filters Display */}
      <ActiveFilters />

      <Form onSubmit={handleSubmit}>
        {/* Form Layout - Columns sırasına göre düzenlenmiş */}
        <div className="row row-gap-16">
          {/* 1. Randevu Bilgileri */}
          <div className="col-md-3">
            <FormInput
              name="title"
              label="Randevu Başlığı"
              variant="inline"
              placeholder="Randevu başlığını giriniz"
            />
          </div>
          <div className="col-md-3">
            <FormInput
              name="appointmentNumber"
              label="Randevu No"
              variant="inline"
              placeholder="Randevu numarası"
            />
          </div>

          {/* 2. Okul Bilgileri */}
          <div className="col-md-3">
            <FormInput
              name="schoolName"
              label="Okul Adı"
              variant="inline"
              placeholder="Okul adını giriniz"
            />
          </div>
          <div className="col-md-3">
            <FormInput
              name="campusName"
              label="Kampüs"
              variant="inline"
              placeholder="Kampüs adı"
            />
          </div>

          {/* 3. Veli/Öğrenci Bilgileri */}
          <div className="col-md-3">
            <FormInput
              name="parentName"
              label="Veli Adı"
              variant="inline"
              placeholder="Veli adını giriniz"
            />
          </div>
          <div className="col-md-3">
            <FormInput
              name="studentName"
              label="Öğrenci Adı"
              variant="inline"
              placeholder="Öğrenci adını giriniz"
            />
          </div>

          {/* 4. Tür */}
          <div className="col-md-3">
            <FormAutocomplete
              name="appointmentType"
              label="Randevu Türü"
              variant="inline"
              options={appointmentTypeOptions}
              placeholder="Tür seçiniz"
            />
          </div>

          {/* 5. Durum */}
          <div className="col-md-3">
            <FormAutocomplete
              name="status"
              label="Durum"
              variant="inline"
              options={statusOptions}
              placeholder="Durum seçiniz"
            />
          </div>

          {/* 6. Tarih & Saat */}
          <div className="col-md-3">
            <FormInput
              name="appointmentDate"
              label="Randevu Tarihi"
              type="date"
              variant="inline"
            />
          </div>
          <div className="col-md-3">
            <FormInput
              name="startTime"
              label="Başlangıç Saati"
              variant="inline"
              placeholder="09:30"
            />
          </div>
          <div className="col-md-3">
            <FormInput
              name="endTime"
              label="Bitiş Saati"
              variant="inline"
              placeholder="17:30"
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
          <div className="col-md-3">
            <FormAutocomplete
              name="isOnline"
              label="Online/Fiziksel"
              variant="inline"
              options={booleanOptions}
              placeholder="Seçiniz"
            />
          </div>

          {/* 8. Personel */}
          <div className="col-md-3">
            <FormInput
              name="staffUserName"
              label="Personel"
              variant="inline"
              placeholder="Personel adını giriniz"
            />
          </div>

          {/* 9. Sonuç */}
          <div className="col-md-3">
            <FormAutocomplete
              name="outcome"
              label="Sonuç"
              variant="inline"
              options={outcomeOptions}
              placeholder="Sonuç seçiniz"
            />
          </div>

          {/* 10. Takip */}
          <div className="col-md-3">
            <FormAutocomplete
              name="followUpRequired"
              label="Takip Gerekli"
              variant="inline"
              options={booleanOptions}
              placeholder="Seçiniz"
            />
          </div>

          {/* 11. Tarih Aralığı (Ek Filtreleme) */}
          <div className="col-md-3">
            <FormInput
              name="startDate"
              label="Başlangıç Tarihi"
              type="date"
              variant="inline"
            />
          </div>
          <div className="col-md-3">
            <FormInput
              name="endDate"
              label="Bitiş Tarihi"
              type="date"
              variant="inline"
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

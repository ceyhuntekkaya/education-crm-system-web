"use client";

import React from "react";
import {
  Form,
  FormInput,
  FormCheckbox,
  FormAutocomplete,
} from "@/components/forms";
import { Button } from "@/components/ui/button";
import { useFormHook } from "@/hooks";
import { useForm } from "@/contexts/form-context";
import { useSlotAddEdit } from "../../../context";
import { filterDataForEdit } from "../../../utils";
import { AppointmentSlotCreateDto } from "@/types";

/**
 * Appointment slot form content component
 */
export const SlotFormContent: React.FC = () => {
  // Form hook - validation ve error kontrolü için
  const { hasErrors } = useFormHook();

  // Form reset hook'u
  const { reset } = useForm();

  // Context'ten tüm değerleri al
  const {
    isEditing,
    postSlot,
    putSlot,
    slotLoading,
    staffUserOptions,
    staffLoading,
    durationOptions,
    appointmentTypeOptions,
    selectedSchoolId,
    selectedSchoolName,
  } = useSlotAddEdit();

  const handleSubmit = async (values: any) => {
    const formData: AppointmentSlotCreateDto = {
      schoolId: selectedSchoolId || 0,
      staffUserId: Number(values.staffUserId),
      durationMinutes: Number(values.durationMinutes),
      appointmentType: values.appointmentType,
      onlineMeetingAvailable: values.onlineMeetingAvailable,
      slotDate: values.slotDate,
    };

    if (isEditing) {
      // Edit modunda sadece güncellenen alanları gönder
      const filteredData = filterDataForEdit(
        formData
      ) as AppointmentSlotCreateDto;
      await putSlot(filteredData);
    } else {
      await postSlot(formData);
    }
  };

  const handleCancel = () => {
    reset();
  };

  return (
    <Form onSubmit={handleSubmit}>
      <div className="row row-gap-24">
        {/* TEMEL BİLGİLER */}
        <div className="col-12">
          <h5 className="mb-16">Slot Bilgileri</h5>
        </div>

        {/* Personel Seçimi */}
        <div className="col-6">
          <FormAutocomplete
            name="staffUserId"
            label="Personel"
            options={staffUserOptions}
            isLoading={staffLoading}
            placeholder="Personel seçiniz.."
            loadingText="Personeller yükleniyor..."
            noOptionsText="Personel bulunamadı"
            required
          />
        </div>

        {/* Süre */}
        <div className="col-6">
          <FormAutocomplete
            name="durationMinutes"
            label="Süre"
            options={durationOptions}
            noOptionsText="Süre bulunamadı"
            required
          />
        </div>

        {/* Randevu Tipi */}
        <div className="col-6">
          <FormAutocomplete
            name="appointmentType"
            label="Randevu Tipi"
            options={appointmentTypeOptions}
            noOptionsText="Randevu tipi bulunamadı"
            required
          />
        </div>

        {/* Slot Tarihi */}
        <div className="col-6">
          <FormInput
            name="slotDate"
            label="Slot Tarihi"
            type="datetime-local"
            placeholder="Slot tarihini seçiniz..."
            required
          />
        </div>

        {/* Online Meeting Available */}
        <div className="col-12">
          <FormCheckbox
            name="onlineMeetingAvailable"
            label="Online Toplantı Mevcut"
            variant="outlined"
          />
        </div>

        {/* Butonlar */}
        <div className="col-12">
          <div className="d-flex gap-8 justify-content-end">
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              disabled={slotLoading}
            >
              İptal
            </Button>
            <Button type="submit" disabled={hasErrors || slotLoading}>
              {slotLoading
                ? "Kaydediliyor..."
                : isEditing
                ? "Güncelle"
                : "Kaydet"}
            </Button>
          </div>
        </div>
      </div>
    </Form>
  );
};

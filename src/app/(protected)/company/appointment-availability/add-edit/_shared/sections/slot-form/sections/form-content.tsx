"use client";

import React from "react";
import {
  Form,
  FormAutocomplete,
  FormDateCalendar,
  FormTimeSlotPicker,
  FormValues,
} from "@/components/forms";
import { Button } from "@/components/ui/button";
import { useFormHook } from "@/hooks";
import { useForm } from "@/contexts/form-context";
import { useSlotAddEdit } from "../../../context";
import { filterDataForEdit } from "../../../utils";
import { AppointmentSlotCreateDto } from "@/types";
import { Divider } from "@/components";

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
    selectedSchoolId,
  } = useSlotAddEdit();

  const handleSubmit = async (values: any) => {
    const formData = {
      schoolId: selectedSchoolId || 0,
      ...values,
    };

    if (isEditing) {
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
      {/* <FormValues />  */}
      <div className="row row-gap-24">
        {/* SOL PANEL - TAKVİM */}
        <div className="col-lg-6">
          <FormDateCalendar
            name="selectedDates"
            label="Tarih Seçimi"
            isRequired
            minDate={new Date()}
            multi
          />
        </div>

        {/* SAĞ PANEL */}
        <div className="col-lg-6">
          <div className="row row-gap-24 mt-8">
            {/* Personel Seçimi */}
            <div className="col-12">
              <FormAutocomplete
                name="staffUserId"
                label="Personel"
                options={staffUserOptions}
                isLoading={staffLoading}
                placeholder="Personel seçiniz.."
                loadingText="Personeller yükleniyor..."
                noOptionsText="Personel bulunamadı"
                isRequired
              />
            </div>

            <Divider size="sm" />

            {/* Saat Dilimleri */}
            <div className="col-12">
              <FormTimeSlotPicker
                name="selectedTimeSlots"
                label="Saat Dilimleri"
                isRequired
                startHour={9}
                endHour={18}
                intervalMinutes={30}
                multi
              />
            </div>
          </div>
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

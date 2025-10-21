"use client";

import React from "react";
import {
  Form,
  FormInput,
  FormAutocomplete,
  FormCheckbox,
  FormTextarea,
} from "@/components/forms";
import { Button } from "@/components/ui/button";
import { AppointmentNoteFormData } from "../types/form-data";
import { useFormHook } from "@/hooks";
import { useForm } from "@/contexts/form-context";
import { useAppointmentDetail } from "../../../context/appointment-detail-context";
import { noteTypeOptions, noSaleReasonOptions } from "../options";

/**
 * Appointment note form content component
 */
export const AppointmentNoteFormContent: React.FC = () => {
  // Form hook - validation ve error kontrolü için
  const { hasErrors } = useFormHook();

  // Form reset hook'u
  const { reset } = useForm();

  // Context'ten note işlemlerini al
  const {
    addNote,
    noteAddLoading: noteLoading,
    noteAddError: noteError,
  } = useAppointmentDetail();

  const handleSubmit = async (values: AppointmentNoteFormData) => {
    const success = await addNote(values);
    if (success) {
      reset(); // Form'u temizle
    }
  };

  const handleCancel = () => {
    reset();
  };

  return (
    <Form onSubmit={handleSubmit}>
      <div className="row row-gap-24">
        {/* Not Türü */}
        <div className="col-12">
          <FormAutocomplete
            name="noteType"
            label="Not Türü"
            options={noteTypeOptions}
            required
          />
        </div>

        {/* Not İçeriği */}
        <div className="col-12">
          <FormTextarea
            name="note"
            label="Not"
            placeholder="Randevu notu yazınız..."
            rows={4}
            required
            maxLength={2000}
          />
        </div>

        {/* Satış Olmama Sebebi */}
        <div className="col-12">
          <FormAutocomplete
            name="noSaleReason"
            label="Satış Olmama Sebebi"
            placeholder="Satış gerçekleşmeme sebebini seçiniz..."
            options={noSaleReasonOptions}
          />
        </div>

        <div className="col-6">
          <FormInput
            name="attachmentUrl"
            label="Dosya URL'si"
            placeholder="https://example.com/file.pdf"
            type="url"
          />
        </div>

        <div className="col-6">
          <FormInput
            name="attachmentName"
            label="Dosya Adı"
            placeholder="dosya.pdf"
          />
        </div>

        <div className="col-6">
          <FormInput
            name="attachmentType"
            label="Dosya Türü"
            placeholder="application/pdf"
          />
        </div>

        <div className="col-6">
          <FormInput
            name="attachmentSize"
            label="Dosya Boyutu (Byte)"
            type="number"
            placeholder="1024"
            min={0}
          />
        </div>

        {/* Özel ve Önemli Checkbox'ları */}
        <div className="col-6">
          <FormCheckbox name="isPrivate" label="Özel Not" />
        </div>
        <div className="col-6">
          <FormCheckbox name="isImportant" label="Önemli Not" />
        </div>

        {/* Hata Mesajı */}
        {noteError && (
          <div className="col-12">
            <div className="alert alert-danger" role="alert">
              {noteError}
            </div>
          </div>
        )}

        {/* Butonlar */}
        <div className="col-6">
          {/* <Button
            type="button"
            variant="outline"
            onClick={handleCancel}
            disabled={noteLoading}
          >
            İptal
          </Button> */}
        </div>
        <div className="col-6">
          <Button
            type="submit"
            variant="inline"
            disabled={hasErrors || noteLoading}
            loading={noteLoading}
            fullWidth
          >
            Notu Kaydet
          </Button>
        </div>
      </div>
    </Form>
  );
};

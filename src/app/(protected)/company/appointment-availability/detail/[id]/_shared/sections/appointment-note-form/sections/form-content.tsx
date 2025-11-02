"use client";

import React, { useEffect } from "react";
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
import { useAuth } from "@/contexts";
import { useAppointmentDetail } from "../../../context/appointment-detail-context";
import { noteTypeOptions, noSaleReasonOptions } from "../options";
import { NoteType } from "@/enums";
import { AppointmentNoteCreateDto } from "@/types/dto/appointment/AppointmentNoteCreateDto";

/**
 * Appointment note form content component
 */
export const AppointmentNoteFormContent: React.FC = () => {
  // Form hook - validation ve error kontrolü için
  const { hasErrors } = useFormHook();

  // Form reset hook'u ve form değerleri
  const { reset, values, setValue } = useForm();

  // Auth context'ten user bilgisi al
  const { user } = useAuth();

  // Context'ten tüm gerekli değerleri al
  const { appointmentId, addNote, noteAddLoading, noteAddError } =
    useAppointmentDetail();

  const handleSubmit = async (formValues: AppointmentNoteFormData) => {
    if (!user?.id) {
      console.error("Kullanıcı bilgisi bulunamadı");
      return;
    }

    // Form values'ı tam AppointmentNoteCreateDto'ya dönüştür
    const createDto: AppointmentNoteCreateDto = {
      ...formValues,
      appointmentId,
      authorUserId: user.id,
    };

    // Note ekleme işlemi
    const result = await addNote(createDto);

    // Başarılı olursa formu resetle
    if (result) {
      reset();
    }
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
        {values?.noteType === NoteType.REASON_FOR_NEGATIVITY ? (
          <div className="col-12">
            <FormAutocomplete
              name="note"
              label="Satış Olmama Sebebi"
              placeholder="Satış gerçekleşmeme sebebini seçiniz..."
              options={noSaleReasonOptions}
            />
          </div>
        ) : (
          <div className="col-12">
            <FormTextarea
              name="note"
              label="Not"
              placeholder="Randevu notu yazınız..."
              rows={4}
              maxLength={2000}
            />
          </div>
        )}

        {/* <div className="col-6">
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
        </div> */}

        {/* Özel ve Önemli Checkbox'ları */}
        <div className="col-6">
          <FormCheckbox name="isPrivate" label="Özel Not" variant="outlined" />
        </div>
        <div className="col-6">
          <FormCheckbox
            name="isImportant"
            label="Önemli Not"
            variant="outlined"
          />
        </div>

        {/* Hata Mesajı */}
        {noteAddError && (
          <div className="col-12">
            <div className="alert alert-danger" role="alert">
              {noteAddError}
            </div>
          </div>
        )}

        {/* Butonlar */}
        <div className="col-6">
          {/* <Button
            type="button"
            variant="outline"
            onClick={handleCancel}
            disabled={noteAddLoading}
          >
            İptal
          </Button> */}
        </div>
        <div className="col-6">
          <Button
            type="submit"
            variant="inline"
            disabled={hasErrors || noteAddLoading}
            loading={noteAddLoading}
            fullWidth
          >
            Notu Kaydet
          </Button>
        </div>
      </div>
    </Form>
  );
};

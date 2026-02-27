"use client";

import React from "react";
import { FormInput, FormAutocomplete } from "@/components/forms";
import { Button } from "@/components/ui";
import { useForm } from "@/contexts/form-context";
import { useTeacherProfileAddEdit } from "../../../context";
import type { TeacherEducationDto } from "@/types";

interface TeacherEducationFormContentProps {
  onSuccess?: () => void;
  onCancel?: () => void;
  editData?: TeacherEducationDto | null;
}

const EDUCATION_LEVEL_OPTIONS = [
  { label: "Lise", value: "HIGH_SCHOOL" },
  { label: "Ön Lisans", value: "ASSOCIATE" },
  { label: "Lisans", value: "BACHELORS" },
  { label: "Yüksek Lisans", value: "MASTERS" },
  { label: "Doktora", value: "DOCTORATE" },
];

/**
 * Eğitim bilgisi formu içeriği
 */
export const TeacherEducationFormContent: React.FC<
  TeacherEducationFormContentProps
> = ({ onSuccess, onCancel, editData }) => {
  const { addEducation, updateEducation, isSubmittingEducation } =
    useTeacherProfileAddEdit();
  const { values, validate } = useForm();

  const handleSubmit = async () => {
    const formIsValid = await validate();
    if (!formIsValid) return;

    const data = {
      educationLevel: values.educationLevel,
      institution: (values.institution as string)?.trim(),
      department: (values.department as string)?.trim() || undefined,
      startYear: values.startYear
        ? parseInt(values.startYear as string)
        : undefined,
      endYear: values.endYear ? parseInt(values.endYear as string) : undefined,
      displayOrder: values.displayOrder
        ? parseInt(values.displayOrder as string)
        : undefined,
    };

    try {
      if (editData) {
        await updateEducation(editData.id, data);
      } else {
        await addEducation(data);
      }
      onSuccess?.();
    } catch {
      // Snackbar context tarafından yönetilir
    }
  };

  return (
    <div>
      <div className="row g-3 pb-16">
        <div className="col-12">
          <FormAutocomplete
            label="Eğitim Seviyesi"
            name="educationLevel"
            placeholder="Eğitim seviyesi seçiniz..."
            options={EDUCATION_LEVEL_OPTIONS}
            isRequired
            variant="inline"
          />
        </div>

        <div className="col-12">
          <FormInput
            label="Kurum Adı"
            name="institution"
            isRequired
            placeholder="Örn: İstanbul Üniversitesi"
            variant="inline"
          />
        </div>

        <div className="col-12">
          <FormInput
            label="Bölüm"
            name="department"
            placeholder="Örn: Matematik Öğretmenliği"
            variant="inline"
          />
        </div>

        <div className="col-md-6">
          <FormInput
            label="Başlangıç Yılı"
            name="startYear"
            // type="number"
            placeholder="Örn: 2015"
            variant="inline"
          />
        </div>

        <div className="col-md-6">
          <FormInput
            label="Bitiş Yılı"
            name="endYear"
            // type="number"
            placeholder="Örn: 2019"
            helperText="Devam ediyorsanız boş bırakın"
            variant="inline"
          />
        </div>

        {/* Form Actions */}
        <div className="col-12">
          <div className="d-flex justify-content-end gap-12">
            <Button
              type="button"
              size="sm"
              loading={isSubmittingEducation}
              disabled={isSubmittingEducation}
              onClick={handleSubmit}
            >
              <i className="ph-check me-2"></i>
              {editData ? "Güncelle" : "Kaydet"}
            </Button>
            {onCancel && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={onCancel}
                disabled={isSubmittingEducation}
              >
                <i className="ph-x me-2"></i>
                İptal
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

"use client";

import React from "react";
import { FormInput, FormTextarea, FormCheckbox } from "@/components/forms";
import { Button } from "@/components/ui";
import { useForm } from "@/contexts/form-context";
import { useTeacherProfileAddEdit } from "../../../context";
import type { TeacherExperienceDto } from "@/types";

interface TeacherExperienceFormContentProps {
  onSuccess?: () => void;
  onCancel?: () => void;
  editData?: TeacherExperienceDto | null;
}

/**
 * Deneyim bilgisi formu içeriği
 */
export const TeacherExperienceFormContent: React.FC<
  TeacherExperienceFormContentProps
> = ({ onSuccess, onCancel, editData }) => {
  const { addExperience, updateExperience, isSubmittingExperience } =
    useTeacherProfileAddEdit();
  const { values, validate } = useForm();

  const handleSubmit = async () => {
    const formIsValid = await validate();
    if (!formIsValid) return;

    const data = {
      institution: (values.institution as string)?.trim(),
      roleTitle: (values.roleTitle as string)?.trim(),
      startDate: values.startDate as string,
      endDate: values.isCurrentJob
        ? undefined
        : (values.endDate as string) || undefined,
      description: (values.description as string)?.trim() || undefined,
      displayOrder: values.displayOrder
        ? parseInt(values.displayOrder as string)
        : undefined,
    };

    try {
      if (editData) {
        await updateExperience(editData.id, data);
      } else {
        await addExperience(data);
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
          <FormInput
            label="Görev Unvanı"
            name="roleTitle"
            isRequired
            placeholder="Örn: Matematik Öğretmeni"
            variant="inline"
          />
        </div>

        <div className="col-12">
          <FormInput
            label="Kurum Adı"
            name="institution"
            isRequired
            placeholder="Örn: ABC Koleji"
            variant="inline"
          />
        </div>

        <div className="col-md-6">
          <FormInput
            label="Başlangıç Tarihi"
            name="startDate"
            type="date"
            isRequired
            variant="inline"
          />
        </div>

        <div className="col-md-6">
          <FormInput
            label="Bitiş Tarihi"
            name="endDate"
            type="date"
            disabled={!!values.isCurrentJob}
            variant="inline"
          />
        </div>

        <div className="col-12">
          <FormCheckbox
            label="Hâlâ burada çalışıyorum"
            name="isCurrentJob"
            variant="outlined"
          />
        </div>

        <div className="col-12">
          <FormTextarea
            label="Görev Tanımı"
            name="description"
            rows={3}
            placeholder="Görevinizi ve sorumluluklarınızı kısaca açıklayın..."
            variant="inline"
          />
        </div>

        {/* Form Actions */}
        <div className="col-12">
          <div className="d-flex justify-content-end gap-12">
            <Button
              type="button"
              size="sm"
              loading={isSubmittingExperience}
              disabled={isSubmittingExperience}
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
                disabled={isSubmittingExperience}
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

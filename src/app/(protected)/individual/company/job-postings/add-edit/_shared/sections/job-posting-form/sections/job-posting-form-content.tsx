"use client";

import React, { forwardRef, useImperativeHandle } from "react";
import { useForm } from "@/contexts/form-context";
import {
  FormInput,
  FormTextarea,
  FormAutocomplete,
  FormCheckbox,
} from "@/components/forms";
import { useJobPostingAddEdit } from "../../../context";
import type { JobPostingFormHandle } from "../types";
import type { JobPostingCreateDto, JobPostingUpdateDto } from "@/types";

/**
 * İş ilanı form içeriği
 */
export const JobPostingFormContent = forwardRef<JobPostingFormHandle, {}>(
  (_, ref) => {
    const { values } = useForm();
    const { isEditMode, schoolId, postJobPosting, putJobPosting } =
      useJobPostingAddEdit();

    // Ref ile dışarıya form metodlarını expose et
    useImperativeHandle(ref, () => ({
      submit: async () => {
        const formData = values as any;

        try {
          if (isEditMode) {
            // UPDATE
            const updateData: JobPostingUpdateDto = {
              positionTitle: formData.positionTitle,
              branch: formData.branch,
              employmentType: formData.employmentType,
              startDate: formData.startDate || null,
              contractDuration: formData.contractDuration,
              requiredExperienceYears: formData.requiredExperienceYears
                ? parseInt(formData.requiredExperienceYears)
                : undefined,
              requiredEducationLevel: formData.requiredEducationLevel,
              salaryMin: formData.salaryMin
                ? parseFloat(formData.salaryMin)
                : undefined,
              salaryMax: formData.salaryMax
                ? parseFloat(formData.salaryMax)
                : undefined,
              showSalary: formData.showSalary || false,
              description: formData.description,
              applicationDeadline: formData.applicationDeadline,
              status: formData.status || "DRAFT",
              isPublic: formData.isPublic !== false,
            };

            const result = await putJobPosting(updateData);
            return result?.id || null;
          } else {
            // CREATE
            const createData: JobPostingCreateDto = {
              schoolId,
              positionTitle: formData.positionTitle,
              branch: formData.branch,
              employmentType: formData.employmentType,
              startDate: formData.startDate || null,
              contractDuration: formData.contractDuration,
              requiredExperienceYears: formData.requiredExperienceYears
                ? parseInt(formData.requiredExperienceYears)
                : undefined,
              requiredEducationLevel: formData.requiredEducationLevel,
              salaryMin: formData.salaryMin
                ? parseFloat(formData.salaryMin)
                : undefined,
              salaryMax: formData.salaryMax
                ? parseFloat(formData.salaryMax)
                : undefined,
              showSalary: formData.showSalary || false,
              description: formData.description,
              applicationDeadline: formData.applicationDeadline,
              status: formData.status || "DRAFT",
              isPublic: formData.isPublic !== false,
            };

            const result = await postJobPosting(createData);
            return result?.id || null;
          }
        } catch (error) {
          throw error;
        }
      },
      validate: async () => {
        return true;
      },
      getValues: () => values as any,
    }));

    return (
      <div className="row row-gap-24">
        <div className="col-12">
          <FormInput
            label="Pozisyon Başlığı"
            name="positionTitle"
            isRequired
            placeholder="Örn: Matematik Öğretmeni"
          />
        </div>

        <div className="col-md-6">
          <FormInput
            label="Branş"
            name="branch"
            isRequired
            placeholder="Örn: Matematik"
          />
        </div>

        <div className="col-md-6">
          <FormAutocomplete
            label="İstihdam Tipi"
            name="employmentType"
            placeholder="İstihdam tipi seçiniz..."
            options={[
              { label: "Tam Zamanlı", value: "FULL_TIME" },
              { label: "Yarı Zamanlı", value: "PART_TIME" },
              { label: "Sözleşmeli", value: "CONTRACT" },
              { label: "Stajyer", value: "INTERNSHIP" },
            ]}
          />
        </div>

        <div className="col-md-6">
          <FormInput label="Başlangıç Tarihi" name="startDate" type="date" />
        </div>

        <div className="col-md-6">
          <FormInput
            label="Sözleşme Süresi"
            name="contractDuration"
            placeholder="Örn: 1 Yıl"
          />
        </div>

        <div className="col-md-6">
          <FormInput
            label="Gerekli Tecrübe (Yıl)"
            name="requiredExperienceYears"
            type="number"
            placeholder="Örn: 3"
          />
        </div>

        <div className="col-md-6">
          <FormAutocomplete
            label="Eğitim Seviyesi"
            name="requiredEducationLevel"
            placeholder="Eğitim seviyesi seçiniz..."
            options={[
              { label: "Lise", value: "HIGH_SCHOOL" },
              { label: "Ön Lisans", value: "ASSOCIATE" },
              { label: "Lisans", value: "BACHELOR" },
              { label: "Yüksek Lisans", value: "MASTER" },
              { label: "Doktora", value: "DOCTORATE" },
            ]}
          />
        </div>

        <div className="col-12">
          <FormCheckbox label="Maaş bilgisini göster" name="showSalary" />
        </div>

        <div className="col-md-6">
          <FormInput
            label="Minimum Maaş (TL)"
            name="salaryMin"
            type="number"
            placeholder="Örn: 15000"
          />
        </div>

        <div className="col-md-6">
          <FormInput
            label="Maksimum Maaş (TL)"
            name="salaryMax"
            type="number"
            placeholder="Örn: 25000"
          />
        </div>

        <div className="col-12">
          <FormTextarea
            label="İlan Açıklaması"
            name="description"
            rows={6}
            placeholder="İş ilanının detaylı açıklamasını buraya yazın..."
          />
        </div>

        <div className="col-md-6">
          <FormInput
            label="Son Başvuru Tarihi"
            name="applicationDeadline"
            type="date"
          />
        </div>

        <div className="col-md-6">
          <FormAutocomplete
            label="Durum"
            name="status"
            placeholder="Durum seçiniz..."
            options={[
              { label: "Taslak", value: "DRAFT" },
              { label: "Yayında", value: "PUBLISHED" },
              { label: "Kapalı", value: "CLOSED" },
              { label: "Tamamlandı", value: "COMPLETED" },
            ]}
          />
        </div>

        <div className="col-12">
          <FormCheckbox label="İlanı herkese açık yap" name="isPublic" />
        </div>
      </div>
    );
  },
);

JobPostingFormContent.displayName = "JobPostingFormContent";

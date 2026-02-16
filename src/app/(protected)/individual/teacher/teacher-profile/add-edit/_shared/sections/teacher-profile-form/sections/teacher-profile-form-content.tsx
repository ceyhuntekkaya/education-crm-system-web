"use client";

import React, { forwardRef, useImperativeHandle } from "react";
import { useForm } from "@/contexts/form-context";
import {
  FormInput,
  FormTextarea,
  FormAutocomplete,
  FormCheckbox,
} from "@/components/forms";
import { useTeacherProfileAddEdit } from "../../../context";
import type { TeacherProfileFormHandle } from "../types";
import type { TeacherProfileCreateDto, TeacherProfileUpdateDto } from "@/types";
import { FileInput, Divider } from "@/components";

/**
 * Öğretmen profil form içeriği
 */
export const TeacherProfileFormContent = forwardRef<
  TeacherProfileFormHandle,
  {}
>((_, ref) => {
  const { values } = useForm();
  const { isEditMode, postProfile, putProfile } = useTeacherProfileAddEdit();

  // Ref ile dışarıya form metodlarını expose et
  useImperativeHandle(ref, () => ({
    submit: async () => {
      const formData = values as any;

      try {
        if (isEditMode) {
          // UPDATE
          const updateData: TeacherProfileUpdateDto = {
            fullName: formData.fullName,
            email: formData.email,
            phone: formData.phone,
            city: formData.city,
            branch: formData.branch,
            educationLevel: formData.educationLevel,
            experienceYears: formData.experienceYears
              ? parseInt(formData.experienceYears)
              : undefined,
            bio: formData.bio,
            profilePhotoUrl: formData.profilePhotoUrl,
            videoUrl: formData.videoUrl,
            cvUrl: formData.cvUrl,
            isActive: formData.isActive !== false,
            provinceIds: formData.provinceIds || [],
          };

          const result = await putProfile(updateData);
          return result?.id || null;
        } else {
          // CREATE
          const createData: TeacherProfileCreateDto = {
            fullName: formData.fullName,
            email: formData.email,
            phone: formData.phone,
            city: formData.city,
            branch: formData.branch,
            educationLevel: formData.educationLevel,
            experienceYears: formData.experienceYears
              ? parseInt(formData.experienceYears)
              : undefined,
            bio: formData.bio,
            profilePhotoUrl: formData.profilePhotoUrl,
            videoUrl: formData.videoUrl,
            cvUrl: formData.cvUrl,
            isActive: formData.isActive !== false,
            provinceIds: formData.provinceIds || [],
          };

          const result = await postProfile(createData);
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
      {/* Temel Bilgiler */}
      <div className="col-12">
        <h5 className="mb-3">
          <i className="ph ph-user me-2"></i>
          Temel Bilgiler
        </h5>
      </div>

      <div className="col-md-6">
        <FormInput
          label="Ad Soyad"
          name="fullName"
          isRequired
          placeholder="Örn: Ahmet Yılmaz"
        />
      </div>

      <div className="col-md-6">
        <FormInput
          label="E-posta"
          name="email"
          type="email"
          isRequired
          placeholder="ornek@email.com"
        />
      </div>

      <div className="col-md-6">
        <FormInput
          label="Telefon"
          name="phone"
          type="tel"
          placeholder="0555 123 45 67"
        />
      </div>

      <div className="col-md-6">
        <FormInput label="Şehir" name="city" placeholder="Örn: İstanbul" />
      </div>

      {/* Divider */}
      <div className="col-12">
        <Divider size="xxs" />
      </div>

      {/* Eğitim ve Tecrübe */}
      <div className="col-12">
        <h5 className="mb-3">
          <i className="ph ph-graduation-cap me-2"></i>
          Eğitim ve Tecrübe
        </h5>
      </div>

      <div className="col-md-6">
        <FormInput label="Branş" name="branch" placeholder="Örn: Matematik" />
      </div>

      <div className="col-md-6">
        <FormAutocomplete
          label="Eğitim Seviyesi"
          name="educationLevel"
          placeholder="Eğitim seviyesi seçiniz..."
          options={[
            { label: "Lise", value: "HIGH_SCHOOL" },
            { label: "Ön Lisans", value: "ASSOCIATE" },
            { label: "Lisans", value: "BACHELORS" },
            { label: "Yüksek Lisans", value: "MASTERS" },
            { label: "Doktora", value: "DOCTORATE" },
          ]}
        />
      </div>

      <div className="col-md-6">
        <FormInput
          label="Tecrübe Yılı"
          name="experienceYears"
          type="number"
          placeholder="Örn: 5"
        />
      </div>

      <div className="col-12">
        <FormTextarea
          label="Hakkında"
          name="bio"
          rows={4}
          placeholder="Kendinizi kısaca tanıtın..."
        />
      </div>

      {/* Divider */}
      <div className="col-12">
        <Divider size="xxs" />
      </div>

      {/* Medya ve Belgeler */}
      <div className="col-12">
        <h5 className="mb-3">
          <i className="ph ph-file-image me-2"></i>
          Medya ve Belgeler
        </h5>
      </div>

      <div className="col-md-6">
        {/* <FileInput
          label="Profil Fotoğrafı"
          type="img"
          variant="outline"
          placeholder="Profil fotoğrafı yüklemek için tıklayın veya sürükleyin"
          maxSize={5}
          name="profilePhotoUrl"
          isAutoUpload={true}
        /> */}
        <FormInput
          label="Profil Fotoğrafı URL"
          name="profilePhotoUrl"
          placeholder="Profil fotoğrafı URL'si girin"
        />
      </div>

      <div className="col-md-6">
        {/* <FileInput
          label="Tanıtım Videosu"
          type="video"
          variant="outline"
          placeholder="Tanıtım videosu yüklemek için tıklayın veya sürükleyin"
          maxSize={50}
          name="videoUrl"
          isAutoUpload={true}
        /> */}
        <FormInput
          label="Tanıtım Videosu URL"
          name="videoUrl"
          placeholder="Video URL'si girin"
        />
      </div>

      <div className="col-md-6">
        {/* <FileInput
          label="CV Dosyası"
          type="all"
          variant="outline"
          placeholder="CV dosyası yüklemek için tıklayın veya sürükleyin"
          maxSize={10}
          name="cvUrl"
          isAutoUpload={true}
        /> */}
        <FormInput
          label="CV Dosyası URL"
          name="cvUrl"
          placeholder="CV URL'si girin"
        />
      </div>

      {/* Divider */}
      <div className="col-12">
        <Divider size="xxs" />
      </div>

      {/* Durum */}
      <div className="col-12">
        <h5 className="mb-3">
          <i className="ph ph-toggles me-2"></i>
          Durum
        </h5>
      </div>

      <div className="col-12">
        <FormCheckbox label="Profil aktif" name="isActive" variant="outlined" />
        <small className="text-muted">
          Pasif profiller arama sonuçlarında görünmez
        </small>
      </div>
    </div>
  );
});

TeacherProfileFormContent.displayName = "TeacherProfileFormContent";

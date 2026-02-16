"use client";

import React from "react";
import { useForm } from "@/contexts/form-context";
import {
  Form,
  FormInput,
  FormTextarea,
  FormAutocomplete,
  FormCheckbox,
} from "@/components/forms";
import { Button } from "@/components/ui/button";
import { FileInput, Divider } from "@/components";
import { useFormHook } from "@/hooks";
import { useTeacherProfileAddEdit } from "../../../context";
import { useRouter } from "next/navigation";
import { filterDataForEdit } from "../../../utils";
import { TeacherProfileCreateDto, TeacherProfileUpdateDto } from "@/types";
import { useTeacherProfileContext } from "@/app/(protected)/individual/teacher/teacher-profile/_shared/contexts";

/**
 * Öğretmen profil form içeriği
 */
export const TeacherProfileFormContent: React.FC = () => {
  const { hasErrors } = useFormHook();
  const { reset } = useForm();
  const router = useRouter();
  const { refetch } = useTeacherProfileContext();
  const {
    isEditMode,
    postProfile,
    putProfile,
    profileSubmitLoading,
    cityOptions,
    provinceOptions,
    provincesLoading,
  } = useTeacherProfileAddEdit();

  const handleSubmit = async (values: any) => {
    // Province IDs'i number array'e çevir
    const provinceIds = Array.isArray(values.provinceIds)
      ? values.provinceIds.map((id: string) => parseInt(id))
      : [];

    let success = false;

    if (isEditMode) {
      const filteredData = filterDataForEdit(values) as TeacherProfileUpdateDto;
      // Province IDs'i ekle
      filteredData.provinceIds = provinceIds;
      const result = await putProfile(filteredData);
      success = !!result;
    } else {
      const formData: TeacherProfileCreateDto = {
        ...values,
        provinceIds,
        experienceYears: values.experienceYears
          ? parseInt(values.experienceYears)
          : undefined,
        isActive: values.isActive !== false,
      };
      const result = await postProfile(formData);
      success = !!result;
    }

    // Sadece başarılı olduğunda refetch yap ve yönlendir
    if (success) {
      try {
        // 1. Refetch profile data - GET request yapılır (by-user endpoint'i)
        // Bu, yeni oluşturulan veya güncellenen profili sunucudan çeker
        await refetch();

        // 2. Profil sayfasına yönlendir
        router.push("/individual/teacher/teacher-profile");

        // 3. Sayfa verilerini yenile (Next.js cache'ini temizle)
        router.refresh();
      } catch (error) {
        console.error("❌ Error during refetch/redirect:", error);
      }
    }
  };

  const handleCancel = () => {
    reset();
    router.back();
  };

  return (
    <Form onSubmit={handleSubmit}>
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
          <FormAutocomplete
            label="Yaşadığı Şehir"
            name="city"
            placeholder="Şehir seçiniz..."
            options={cityOptions}
            isLoading={provincesLoading}
          />
        </div>

        <div className="col-md-12">
          <FormAutocomplete
            label="Çalışmak İstediği Şehirler"
            name="provinceIds"
            placeholder="Şehirleri seçiniz (çoklu seçim)..."
            options={provinceOptions}
            isLoading={provincesLoading}
            multiple={true}
          />
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

        <div className="col-md-4">
          <FileInput
            label="Profil Fotoğrafı"
            type="img"
            variant="outline"
            placeholder="Profil fotoğrafı yüklemek için tıklayın veya sürükleyin"
            maxSize={5}
            name="profilePhotoUrl"
            isAutoUpload={true}
          />
          {/* <FormInput
          label="Profil Fotoğrafı URL"
          name="profilePhotoUrl"
          placeholder="Profil fotoğrafı URL'si girin"
        /> */}
        </div>

        <div className="col-md-4">
          <FileInput
            label="Tanıtım Videosu"
            type="video"
            variant="outline"
            placeholder="Tanıtım videosu yüklemek için tıklayın veya sürükleyin"
            maxSize={50}
            name="videoUrl"
            isAutoUpload={true}
          />
          {/* <FormInput
          label="Tanıtım Videosu URL"
          name="videoUrl"
          placeholder="Video URL'si girin"
        /> */}
        </div>

        <div className="col-md-4">
          <FileInput
            label="CV Dosyası"
            type="all"
            variant="outline"
            placeholder="CV dosyası yüklemek için tıklayın veya sürükleyin"
            maxSize={10}
            name="cvUrl"
            isAutoUpload={true}
          />
          {/* <FormInput
          label="CV Dosyası URL"
          name="cvUrl"
          placeholder="CV URL'si girin"
        /> */}
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
          <FormCheckbox
            label="Profil aktif"
            name="isActive"
            variant="outlined"
          />
          <small className="text-muted">
            Pasif profiller arama sonuçlarında görünmez
          </small>
        </div>

        {/* Form Actions */}
        <div className="col-12">
          <div className="d-flex justify-content-end gap-12 mt-24">
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              disabled={profileSubmitLoading}
            >
              İptal
            </Button>
            <Button
              type="submit"
              disabled={hasErrors || profileSubmitLoading}
              loading={profileSubmitLoading}
            >
              {isEditMode ? "Profili Güncelle" : "Profil Oluştur"}
            </Button>
          </div>
        </div>
      </div>
    </Form>
  );
};

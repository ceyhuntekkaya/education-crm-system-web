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
import { TeacherEducationSection } from "../../teacher-education-section";
import { TeacherExperienceSection } from "../../teacher-experience-section";

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
    profileId,
  } = useTeacherProfileAddEdit();

  const handleSubmit = async (values: any) => {
    // Province IDs'i number array'e çevir
    const provinceIds = Array.isArray(values.provinceIds)
      ? values.provinceIds.map((id: string) => parseInt(id))
      : [];

    // Backend DTO'suna uygun alanları dışla:
    // educationLevel ve experienceYears backend TeacherProfileCreateDto/UpdateDto'sunda YOK.
    // Eğitim: /hr/teacher-profiles/{id}/educations sub-resource ile yönetilir
    // Deneyim: /hr/teacher-profiles/{id}/experiences sub-resource ile yönetilir
    const {
      educationLevel: _educationLevel,
      experienceYears: _experienceYears,
      provinceIds: _rawProvinceIds,
      ...backendSafeValues
    } = values;

    let success = false;

    if (isEditMode) {
      const filteredData = filterDataForEdit(
        backendSafeValues,
      ) as TeacherProfileUpdateDto;
      // Province IDs'i ekle
      filteredData.provinceIds = provinceIds;
      const result = await putProfile(filteredData);
      success = !!result;
    } else {
      const formData: TeacherProfileCreateDto = {
        ...backendSafeValues,
        provinceIds,
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
          <h5 className="mb-3 d-flex align-items-center gap-8">
            <i className="ph ph-user"></i>
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

        {/* Eğitim ve Branş */}
        <div className="col-12">
          <h5 className="mb-3 d-flex align-items-center gap-8">
            <i className="ph ph-graduation-cap"></i>
            Branş Bilgisi
          </h5>
        </div>

        <div className="col-md-12">
          <FormInput label="Branş" name="branch" placeholder="Örn: Matematik" />
        </div>

        {/* NOT: Eğitim seviyesi ve tecrübe yılı alanları backend API'de TeacherProfileCreateDto/UpdateDto içinde yer almamaktadır.
             Eğitim bilgileri (educationLevel dahil) profil oluşturulduktan sonra
             /hr/teacher-profiles/{id}/educations sub-resource'u ile eklenir.
             Deneyim bilgileri ise /hr/teacher-profiles/{id}/experiences ile eklenir. */}

        <div className="col-12">
          <FormTextarea
            label="Hakkında"
            name="bio"
            rows={4}
            placeholder="Kendinizi kısaca tanıtın..."
          />
        </div>

        {/* Eğitim Bilgileri - Sadece edit modunda göster */}
        {isEditMode && profileId && (
          <>
            <div className="col-12 pt-8">
              <Divider size="xxs" />
            </div>
            <div className="col-12 pt-8">
              <TeacherEducationSection />
            </div>
          </>
        )}

        {/* İş Deneyimleri - Sadece edit modunda göster */}
        {isEditMode && profileId && (
          <>
            <div className="col-12 pt-8">
              <Divider size="xxs" />
            </div>
            <div className="col-12 pt-8">
              <TeacherExperienceSection />
            </div>
          </>
        )}

        {/* Profil oluşturulduktan sonra eklenebileceğini belirten bilgi notu */}
        {!isEditMode && (
          <>
            <div className="col-12">
              <Divider size="xxs" />
            </div>

            {/* Section Başlığı */}
            <div className="col-12">
              <h5 className="mb-0 d-flex align-items-center gap-8">
                <i className="ph ph-list-checks"></i>
                Eğitim ve Deneyim Bilgileri
              </h5>
              <p className="text-muted text-sm mt-4 mb-0">
                Bu bilgiler profil oluşturulduktan sonra eklenebilir.
              </p>
            </div>

            {/* Eğitim Bilgileri Kartı */}
            <div className="col-md-6">
              <div className="rounded-12 border border-info-100 overflow-hidden h-100">
                <div className="bg-info-50 px-16 py-12 d-flex align-items-center gap-10 border-bottom border-info-100">
                  <div
                    className="d-flex align-items-center justify-content-center rounded-8 bg-info-100"
                    style={{ width: 36, height: 36, flexShrink: 0 }}
                  >
                    <i
                      className="ph ph-graduation-cap text-info-600"
                      style={{ fontSize: 18 }}
                    ></i>
                  </div>
                  <span className="fw-semibold text-info-700">
                    Eğitim Bilgileri
                  </span>
                </div>
                <div className="bg-white px-16 py-12">
                  <ul
                    className="mb-0 ps-0 d-flex flex-column gap-8"
                    style={{ listStyle: "none" }}
                  >
                    <li className="d-flex align-items-start gap-8 text-sm text-neutral-600">
                      <i
                        className="ph ph-check-circle text-info-500 mt-1 flex-shrink-0"
                        style={{ fontSize: 15 }}
                      ></i>
                      Mezun olduğunuz okul ve bölüm
                    </li>
                    <li className="d-flex align-items-start gap-8 text-sm text-neutral-600">
                      <i
                        className="ph ph-check-circle text-info-500 mt-1 flex-shrink-0"
                        style={{ fontSize: 15 }}
                      ></i>
                      Eğitim seviyesi ve mezuniyet yılı
                    </li>
                    <li className="d-flex align-items-start gap-8 text-sm text-neutral-600">
                      <i
                        className="ph ph-check-circle text-info-500 mt-1 flex-shrink-0"
                        style={{ fontSize: 15 }}
                      ></i>
                      Birden fazla eğitim kaydı eklenebilir
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* İş Deneyimi Kartı */}
            <div className="col-md-6">
              <div className="rounded-12 border border-purple-100 overflow-hidden h-100">
                <div className="bg-purple-50 px-16 py-12 d-flex align-items-center gap-10 border-bottom border-purple-100">
                  <div
                    className="d-flex align-items-center justify-content-center rounded-8 bg-purple-100"
                    style={{ width: 36, height: 36, flexShrink: 0 }}
                  >
                    <i
                      className="ph ph-briefcase text-purple-600"
                      style={{ fontSize: 18 }}
                    ></i>
                  </div>
                  <span className="fw-semibold text-purple-700">
                    İş Deneyimleri
                  </span>
                </div>
                <div className="bg-white px-16 py-12">
                  <ul
                    className="mb-0 ps-0 d-flex flex-column gap-8"
                    style={{ listStyle: "none" }}
                  >
                    <li className="d-flex align-items-start gap-8 text-sm text-neutral-600">
                      <i
                        className="ph ph-check-circle text-purple-500 mt-1 flex-shrink-0"
                        style={{ fontSize: 15 }}
                      ></i>
                      Çalıştığınız kurum ve pozisyon bilgisi
                    </li>
                    <li className="d-flex align-items-start gap-8 text-sm text-neutral-600">
                      <i
                        className="ph ph-check-circle text-purple-500 mt-1 flex-shrink-0"
                        style={{ fontSize: 15 }}
                      ></i>
                      Başlangıç ve bitiş tarihleri
                    </li>
                    <li className="d-flex align-items-start gap-8 text-sm text-neutral-600">
                      <i
                        className="ph ph-check-circle text-purple-500 mt-1 flex-shrink-0"
                        style={{ fontSize: 15 }}
                      ></i>
                      Birden fazla deneyim kaydı eklenebilir
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Alt bilgi notu */}
            <div className="col-12">
              <div className="d-flex align-items-center gap-8 bg-neutral-25 rounded-8 p-12 border border-neutral-100">
                <i
                  className="ph ph-arrows-clockwise text-neutral-400 flex-shrink-0"
                  style={{ fontSize: 16 }}
                ></i>
                <p className="text-neutral-500 mb-0 text-sm">
                  Profil kaydedildikten sonra düzenleme sayfasına
                  yönlendirileceksiniz. Orada bu bilgileri ekleyebilirsiniz.
                </p>
              </div>
            </div>
          </>
        )}

        {/* Divider */}
        <div className="col-12">
          <Divider size="xxs" />
        </div>

        {/* Medya ve Belgeler */}
        <div className="col-12">
          <h5 className="mb-3 d-flex align-items-center gap-8">
            <i className="ph ph-file-image"></i>
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
          <h5 className="mb-3 d-flex align-items-center gap-8">
            <i className="ph ph-toggles"></i>
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

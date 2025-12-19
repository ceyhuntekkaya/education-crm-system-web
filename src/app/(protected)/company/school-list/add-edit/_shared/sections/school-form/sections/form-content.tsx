"use client";

import React, { useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Form,
  FormInput,
  FormTextarea,
  FormValues,
  FormAutocomplete,
  FormCheckbox,
} from "@/components/forms";
import { Button, Divider } from "@/components/ui";
import { FileInput } from "@/components/file-input";
import { useFormHook } from "@/hooks";
import { useForm } from "@/contexts/form-context";
import { useSchoolAddEdit } from "../../../context";
import { filterDataForEdit } from "../../../utils";
import { SchoolCreateDto } from "@/types";
import { useAuth } from "@/contexts";

/**
 * School form content component
 */
export const SchoolFormContent: React.FC = () => {
  const router = useRouter();

  // Form hook - validation ve error kontrolü için
  const { hasErrors, useResetFieldOnChange } = useFormHook();

  // Form reset hook'u
  const { reset, values } = useForm();

  // Context'ten tüm school işlemlerini ve dropdown options'ları al
  const {
    isEditing,
    postSchool,
    putSchool,
    updateProperties,
    isSubmitting,
    campusOptions,
    institutionTypeOptions,
    institutionGroupOptions,
    languageOptions,
    campusesLoading,
    institutionTypesLoading,
    getGroupsByInstitutionTypeId,
    getFilteredTypesByGroupId,
    propertyValuesLoading,
  } = useSchoolAddEdit();

  const { user } = useAuth();

  // Kurum kategorisi değiştiğinde kurum tipini ve propertyValues'i sıfırla
  useResetFieldOnChange("institutionGroupId", [
    "institutionTypeId",
    "propertyValues",
  ]);

  // Kurum tipi değiştiğinde propertyValues'i sıfırla
  useResetFieldOnChange("institutionTypeId", "propertyValues");

  // Seçili gruba göre filtrelenmiş kurum tipleri
  const filteredInstitutionTypes = useMemo(() => {
    const groupId = values?.institutionGroupId;
    return getFilteredTypesByGroupId(groupId);
  }, [values?.institutionGroupId, getFilteredTypesByGroupId]);

  // Kategori seçili mi kontrolü
  const isGroupSelected = useMemo(() => {
    return values?.institutionGroupId && values.institutionGroupId !== "";
  }, [values?.institutionGroupId]);

  // Seçili institutionTypeId'ye göre property gruplarını al
  const currentPropertyGroups = useMemo(() => {
    const institutionTypeId = values?.institutionTypeId;
    if (!institutionTypeId) {
      return [];
    }
    return getGroupsByInstitutionTypeId(institutionTypeId);
  }, [values?.institutionTypeId, getGroupsByInstitutionTypeId]);

  // console.log("currentPropertyGroups", currentPropertyGroups);

  const handleSubmit = async (values: any) => {
    // PropertyValues'i number array'ine çevir
    const propertyTypeIds =
      values.propertyValues && Array.isArray(values.propertyValues)
        ? values.propertyValues.map((id: string) => Number(id))
        : [];

    // values nesnesinden propertyValues, propertyTypeIds ve institutionGroupId'yi çıkar
    const {
      propertyValues,
      propertyTypeIds: _,
      institutionGroupId,
      ...cleanValues
    } = values;

    const formData: SchoolCreateDto = {
      ...cleanValues,
      // Sayısal alanları number'a çevir
      campusId: user?.campus?.id,
      institutionTypeId: cleanValues.institutionTypeId
        ? Number(cleanValues.institutionTypeId)
        : undefined,
      minAge: cleanValues.minAge ? Number(cleanValues.minAge) : undefined,
      maxAge: cleanValues.maxAge ? Number(cleanValues.maxAge) : undefined,
      capacity: cleanValues.capacity ? Number(cleanValues.capacity) : undefined,
      currentStudentCount: cleanValues.currentStudentCount
        ? Number(cleanValues.currentStudentCount)
        : undefined,
      classSizeAverage: cleanValues.classSizeAverage
        ? Number(cleanValues.classSizeAverage)
        : undefined,
      // Sosyal medya alanları - boş string'leri undefined'a çevir
      // facebookUrl: cleanValues.facebookUrl?.trim() || undefined,
      // twitterUrl: cleanValues.twitterUrl?.trim() || undefined,
      // instagramUrl: cleanValues.instagramUrl?.trim() || undefined,
      // linkedinUrl: cleanValues.linkedinUrl?.trim() || undefined,
      // youtubeUrl: cleanValues.youtubeUrl?.trim() || undefined,
      // propertyTypeIds ve propertyValues artık gönderilmeyecek
    };

    if (isEditing) {
      // Edit modunda:
      // 1. Önce school bilgilerini güncelle
      const filteredData = filterDataForEdit(formData) as SchoolCreateDto;
      const schoolUpdateResponse = await putSchool(filteredData);

      // 2. School güncelleme başarılıysa, property'leri güncelle
      if (schoolUpdateResponse && "success" in schoolUpdateResponse) {
        await updateProperties(propertyTypeIds);
      }
    } else {
      // Add modunda:
      // 1. Önce school'u oluştur
      const schoolCreateResponse = await postSchool(formData);

      // 2. School oluşturma başarılıysa ve propertyTypeIds varsa, property'leri güncelle
      if (
        schoolCreateResponse &&
        schoolCreateResponse.success &&
        "data" in schoolCreateResponse &&
        schoolCreateResponse.data?.id &&
        propertyTypeIds.length > 0
      ) {
        // Response'tan gelen school id ile updateProperties çağır
        const createdSchoolId = schoolCreateResponse.data.id;
        await updateProperties(propertyTypeIds, {
          schoolId: createdSchoolId,
          onSuccess: () => {
            router.push("/company/school-list");
          },
        });
      } else if (schoolCreateResponse && schoolCreateResponse.success) {
        // propertyTypeIds yoksa direkt yönlendir
        router.push("/company/school-list");
      }
    }
  };

  const handleCancel = () => {
    reset();
  };

  return (
    <Form onSubmit={handleSubmit}>
      {/* <FormValues /> */}
      <div className="row row-gap-24">
        {/* TEMEL BİLGİLER */}
        <div className="col-12">
          <h5 className="mb-16">Temel Bilgiler</h5>
        </div>

        {/* Kampüs Seçimi */}
        {/* <div className="col-6">
          <FormAutocomplete
            name="campusId"
            label="Kampüs"
            placeholder="Kampüs seçiniz veya arayın..."
            options={campusOptions}
            required
            disabled={campusesLoading}
            isLoading={campusesLoading}
            noOptionsText="Kampüs bulunamadı"
            loadingText="Kampüsler yükleniyor..."
          />
        </div> */}

        {/* Kurum Adı */}
        <div className="col-12">
          <FormInput
            name="name"
            label="Kurum Adı"
            placeholder="Kurum adını giriniz..."
            isRequired
          />
        </div>

        {/* Kurum Kategorisi Seçimi */}
        <div className="col-6">
          <FormAutocomplete
            name="institutionGroupId"
            label="Kurum Kategorisi"
            placeholder="Kurum kategorisi seçiniz..."
            options={institutionGroupOptions}
            isRequired
            disabled={institutionTypesLoading}
            isLoading={institutionTypesLoading}
            noOptionsText="Kurum kategorisi bulunamadı"
            loadingText="Kategoriler yükleniyor..."
          />
        </div>

        {/* Kurum Tipi Seçimi */}
        <div className="col-6">
          <FormAutocomplete
            name="institutionTypeId"
            label="Kurum Tipi"
            placeholder={
              isGroupSelected
                ? "Kurum tipi seçiniz..."
                : "Önce kategori seçiniz..."
            }
            options={filteredInstitutionTypes}
            isRequired
            disabled={institutionTypesLoading || !isGroupSelected}
            isLoading={institutionTypesLoading}
            noOptionsText={
              isGroupSelected
                ? "Bu kategoride kurum tipi bulunamadı"
                : "Önce kategori seçiniz"
            }
            loadingText="Kurum tipleri yükleniyor..."
          />
        </div>

        {/* Açıklama */}
        <div className="col-12">
          <FormTextarea
            name="description"
            label="Açıklama"
            placeholder="Kurum açıklamasını giriniz..."
            rows={4}
          />
        </div>

        {/* Divider */}
        <div className="col-12">
          <Divider />
        </div>

        {/* GÖRSEL BİLGİLER */}
        <div className="col-12">
          <h5 className="mb-16">Görsel Bilgiler</h5>
        </div>

        {/* Logo */}
        <div className="col-6">
          <FileInput
            label="Kurum Logosu"
            type="img"
            variant="outline"
            placeholder="Logo yüklemek için tıklayın veya sürükleyin"
            maxSize={5}
            isAutoUpload
            name="logoUrl"
          />
        </div>

        {/* Kapak Resmi */}
        <div className="col-6">
          <FileInput
            label="Kapak Resmi"
            type="img"
            variant="outline"
            placeholder="Kapak resmi yüklemek için tıklayın veya sürükleyin"
            maxSize={5}
            isAutoUpload
            name="coverImageUrl"
          />
        </div>

        {/* Divider */}
        <div className="col-12">
          <Divider />
        </div>

        {/* İLETİŞİM BİLGİLERİ */}
        <div className="col-12">
          <h5 className="mb-16">İletişim Bilgileri</h5>
        </div>

        {/* E-posta */}
        <div className="col-12">
          <FormInput
            name="email"
            label="E-posta"
            type="email"
            placeholder="E-posta adresini giriniz..."
          />
        </div>

        {/* Telefon */}
        <div className="col-6">
          <FormInput
            name="phone"
            type="tel"
            label="Telefon"
            placeholder="Telefon numarasını giriniz..."
          />
        </div>

        {/* Dahili */}
        <div className="col-6">
          <FormInput
            name="extension"
            label="Dahili"
            placeholder="Dahili numarasını giriniz..."
          />
        </div>

        {/* Divider */}
        <div className="col-12">
          <Divider />
        </div>

        {/* EĞİTİM BİLGİLERİ */}
        <div className="col-12">
          <h5 className="mb-16">Eğitim Bilgileri</h5>
        </div>

        {/* Eğitim Dili */}
        <div className="col-4">
          <FormAutocomplete
            name="languageOfInstruction"
            label="Eğitim Dili"
            placeholder="Eğitim dili seçiniz..."
            options={languageOptions}
            noOptionsText="Dil bulunamadı"
          />
        </div>

        {/* Minimum Yaş */}
        <div className="col-4">
          <FormInput
            name="minAge"
            label="Minimum Yaş"
            type="number"
            placeholder="Minimum yaşı giriniz..."
          />
        </div>

        {/* Maksimum Yaş */}
        <div className="col-4">
          <FormInput
            name="maxAge"
            label="Maksimum Yaş"
            type="number"
            placeholder="Maksimum yaşı giriniz..."
          />
        </div>

        {/* Kapasite */}
        <div className="col-4">
          <FormInput
            name="capacity"
            label="Kapasite"
            type="number"
            placeholder="Kapasiteyi giriniz..."
          />
        </div>

        {/* Mevcut Öğrenci Sayısı */}
        <div className="col-4">
          <FormInput
            name="currentStudentCount"
            label="Mevcut Öğrenci Sayısı"
            type="number"
            placeholder="Mevcut öğrenci sayısını giriniz..."
          />
        </div>

        {/* Ortalama Sınıf Büyüklüğü */}
        <div className="col-4">
          <FormInput
            name="classSizeAverage"
            label="Maksimum Sınıf Mevcudu"
            type="number"
            placeholder="Maksimum sınıf mevcudunu giriniz..."
          />
        </div>

        {/* Müfredat Tipi */}
        {/* <div className="col-6">
          <FormInput
            name="curriculumType"
            label="Müfredat Tipi"
            placeholder="Müfredat tipini giriniz..."
          />
        </div> */}

        {/* Divider */}
        <div className="col-12">
          <Divider />
        </div>

        {/* SOSYAL MEDYA LİNKLERİ */}
        <div className="col-12">
          <h5 className="mb-16">Sosyal Medya Linkleri</h5>
        </div>

        {/* Facebook URL */}
        <div className="col-6">
          <FormInput
            name="facebookUrl"
            label="Facebook"
            placeholder="Facebook URL'sini giriniz..."
          />
        </div>

        {/* Twitter URL */}
        <div className="col-6">
          <FormInput
            name="twitterUrl"
            label="Twitter"
            placeholder="Twitter URL'sini giriniz..."
          />
        </div>

        {/* Instagram URL */}
        <div className="col-6">
          <FormInput
            name="instagramUrl"
            label="Instagram"
            placeholder="Instagram URL'sini giriniz..."
          />
        </div>

        {/* LinkedIn URL */}
        <div className="col-6">
          <FormInput
            name="linkedinUrl"
            label="LinkedIn"
            placeholder="LinkedIn URL'sini giriniz..."
          />
        </div>

        {/* Youtube URL */}
        <div className="col-6">
          <FormInput
            name="youtubeUrl"
            label="Youtube"
            placeholder="Youtube URL'sini giriniz..."
          />
        </div>

        {/* Logo URL - Opsiyonel olarak bırakıldı */}
        {/* <div className="col-6">
          <FormInput
            name="logoUrl"
            label="Logo URL (Manuel)"
            placeholder="Logo URL'sini giriniz..."
          />
        </div> */}

        {/* Kapak Resmi URL - Opsiyonel olarak bırakıldı */}
        {/* <div className="col-6">
          <FormInput
            name="coverImageUrl"
            label="Kapak Resmi URL (Manuel)"
            placeholder="Kapak resmi URL'sini giriniz..."
          />
        </div> */}

        {/* Divider */}
        {/* <div className="col-12">
          <Divider />
        </div> */}

        {/* SEO BİLGİLERİ */}
        {/* <div className="col-12">
          <h5 className="mb-16">SEO Bilgileri</h5>
        </div>


        <div className="col-12">
          <FormInput
            name="metaTitle"
            label="Meta Başlık"
            placeholder="Meta başlığı giriniz..."
          />
        </div>


        <div className="col-12">
          <FormTextarea
            name="metaDescription"
            label="Meta Açıklama"
            placeholder="Meta açıklamasını giriniz..."
            rows={3}
          />
        </div>

        <div className="col-12">
          <FormInput
            name="metaKeywords"
            label="Meta Anahtar Kelimeler"
            placeholder="Meta anahtar kelimeleri giriniz (virgülle ayırarak)..."
          />
        </div> */}

        {/* ÖZELLİK DEĞERLERİ - PropertyValues */}
        {currentPropertyGroups.length > 0 && (
          <>
            {/* Divider */}
            <div className="col-12">
              <Divider />
            </div>

            <div className="col-12">
              <FormCheckbox
                name="propertyValues"
                label=""
                grouped
                groups={currentPropertyGroups}
                groupedTitle="Özellikler"
                groupedDescription="Seçili kurum tipine özel özellikleri seçiniz."
                disabled={propertyValuesLoading}
                direction="horizontal"
                col={4}
                variant="outlined"
                isCollapsible
                defaultCollapsed
              />
            </div>
          </>
        )}

        {/* FORM BUTONLARI */}
        <div className="col-12 d-flex justify-content-end gap-12 mt-24">
          <Button
            type="button"
            variant="outline"
            onClick={handleCancel}
            disabled={isSubmitting}
          >
            İptal
          </Button>
          <Button type="submit" disabled={hasErrors || isSubmitting}>
            {isSubmitting
              ? "Kaydediliyor..."
              : isEditing
              ? "Güncelle"
              : "Kaydet"}
          </Button>
        </div>
      </div>
    </Form>
  );
};

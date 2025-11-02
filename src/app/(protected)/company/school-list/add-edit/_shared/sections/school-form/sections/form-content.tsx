"use client";

import React, { useMemo } from "react";
import {
  Form,
  FormInput,
  FormTextarea,
  FormValues,
  FormAutocomplete,
  FormCheckbox,
} from "@/components/forms";
import { Button } from "@/components/ui/button";
import { FileInput } from "@/components/file-input";
import { useFormHook } from "@/hooks";
import { useForm } from "@/contexts/form-context";
import { useSchoolAddEdit } from "../../../context";
import { filterDataForEdit } from "../../../utils";
import { SchoolCreateDto } from "@/types";

/**
 * School form content component
 */
export const SchoolFormContent: React.FC = () => {
  // Form hook - validation ve error kontrolü için
  const { hasErrors } = useFormHook();

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
    languageOptions,
    campusesLoading,
    institutionTypesLoading,
    getGroupsByInstitutionTypeId,
    propertyValuesLoading,
  } = useSchoolAddEdit();

  // Seçili institutionTypeId'ye göre property gruplarını al
  const currentPropertyGroups = useMemo(() => {
    const institutionTypeId = values?.institutionTypeId;
    if (!institutionTypeId) {
      return [];
    }
    return getGroupsByInstitutionTypeId(institutionTypeId);
  }, [values?.institutionTypeId, getGroupsByInstitutionTypeId]);

  const handleSubmit = async (values: any) => {
    // PropertyValues'i number array'ine çevir
    const propertyTypeIds =
      values.propertyValues && Array.isArray(values.propertyValues)
        ? values.propertyValues.map((id: string) => Number(id))
        : [];

    const formData: SchoolCreateDto = {
      ...values,
      // Sayısal alanları number'a çevir
      campusId: values.campusId ? Number(values.campusId) : undefined,
      institutionTypeId: values.institutionTypeId
        ? Number(values.institutionTypeId)
        : undefined,
      minAge: values.minAge ? Number(values.minAge) : undefined,
      maxAge: values.maxAge ? Number(values.maxAge) : undefined,
      capacity: values.capacity ? Number(values.capacity) : undefined,
      currentStudentCount: values.currentStudentCount
        ? Number(values.currentStudentCount)
        : undefined,
      classSizeAverage: values.classSizeAverage
        ? Number(values.classSizeAverage)
        : undefined,
      // PropertyValues - Add modunda gönder, Edit modunda ayrı endpoint'e gönderilecek
      propertyTypeIds: isEditing ? undefined : propertyTypeIds,
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
      // Add modunda normal akış
      await postSchool(formData);
    }
  };

  const handleCancel = () => {
    reset();
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormValues />
      <div className="row row-gap-24">
        {/* TEMEL BİLGİLER */}
        <div className="col-12">
          <h5 className="mb-16">Temel Bilgiler</h5>
        </div>

        {/* Kampüs Seçimi */}
        <div className="col-6">
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
        </div>

        {/* Kurum Tipi Seçimi */}
        <div className="col-6">
          <FormAutocomplete
            name="institutionTypeId"
            label="Kurum Tipi"
            placeholder="Kurum tipi seçiniz veya arayın..."
            options={institutionTypeOptions}
            required
            disabled={institutionTypesLoading}
            isLoading={institutionTypesLoading}
            noOptionsText="Kurum tipi bulunamadı"
            loadingText="Kurum tipleri yükleniyor..."
          />
        </div>

        {/* Okul Adı */}
        <div className="col-12">
          <FormInput
            name="name"
            label="Okul Adı"
            placeholder="Okul adını giriniz..."
            required
          />
        </div>

        {/* Açıklama */}
        <div className="col-12">
          <FormTextarea
            name="description"
            label="Açıklama"
            placeholder="Okul açıklamasını giriniz..."
            rows={4}
          />
        </div>

        {/* İLETİŞİM BİLGİLERİ */}
        <div className="col-12">
          <h5 className="mb-16 mt-16">İletişim Bilgileri</h5>
        </div>

        {/* E-posta */}
        <div className="col-6">
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

        {/* EĞİTİM BİLGİLERİ */}
        <div className="col-12">
          <h5 className="mb-16 mt-16">Eğitim Bilgileri</h5>
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
        <div className="col-6">
          <FormInput
            name="currentStudentCount"
            label="Mevcut Öğrenci Sayısı"
            type="number"
            placeholder="Mevcut öğrenci sayısını giriniz..."
          />
        </div>

        {/* Ortalama Sınıf Büyüklüğü */}
        <div className="col-6">
          <FormInput
            name="classSizeAverage"
            label="Maksimum Sınıf Mevcudu"
            type="number"
            placeholder="Maksimum sınıf mevcudunu giriniz..."
          />
        </div>

        {/* Müfredat Tipi */}
        <div className="col-6">
          <FormInput
            name="curriculumType"
            label="Müfredat Tipi"
            placeholder="Müfredat tipini giriniz..."
          />
        </div>

        {/* Eğitim Dili */}
        <div className="col-6">
          <FormAutocomplete
            name="languageOfInstruction"
            label="Eğitim Dili"
            placeholder="Eğitim dili seçiniz..."
            options={languageOptions}
            noOptionsText="Dil bulunamadı"
          />
        </div>

        {/* GÖRSEL BİLGİLER */}
        <div className="col-12">
          <h5 className="mb-16 mt-16">Görsel Bilgiler</h5>
        </div>

        {/* Logo */}
        <div className="col-6">
          <FileInput
            label="Logo"
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

        {/* Logo URL - Opsiyonel olarak bırakıldı */}
        <div className="col-6">
          <FormInput
            name="logoUrl"
            label="Logo URL (Manuel)"
            placeholder="Logo URL'sini giriniz..."
          />
        </div>

        {/* Kapak Resmi URL - Opsiyonel olarak bırakıldı */}
        <div className="col-6">
          <FormInput
            name="coverImageUrl"
            label="Kapak Resmi URL (Manuel)"
            placeholder="Kapak resmi URL'sini giriniz..."
          />
        </div>

        {/* SEO BİLGİLERİ */}
        <div className="col-12">
          <h5 className="mb-16 mt-16">SEO Bilgileri</h5>
        </div>

        {/* Meta Başlık */}
        <div className="col-12">
          <FormInput
            name="metaTitle"
            label="Meta Başlık"
            placeholder="Meta başlığı giriniz..."
          />
        </div>

        {/* Meta Açıklama */}
        <div className="col-12">
          <FormTextarea
            name="metaDescription"
            label="Meta Açıklama"
            placeholder="Meta açıklamasını giriniz..."
            rows={3}
          />
        </div>

        {/* Meta Anahtar Kelimeler */}
        <div className="col-12">
          <FormInput
            name="metaKeywords"
            label="Meta Anahtar Kelimeler"
            placeholder="Meta anahtar kelimeleri giriniz (virgülle ayırarak)..."
          />
        </div>

        {/* ÖZELLİK DEĞERLERİ - PropertyValues */}
        {currentPropertyGroups.length > 0 && (
          <div className="col-12">
            <FormCheckbox
              name="propertyValues"
              label=""
              grouped={true}
              groups={currentPropertyGroups}
              groupedTitle="Özellikler"
              groupedDescription="Seçili kurum tipine özel özellikleri seçiniz."
              disabled={propertyValuesLoading}
              direction="horizontal"
              col={4}
              variant="outlined"
            />
          </div>
        )}

        {/* FORM BUTONLARI */}
        <div className="col-12 d-flex justify-content-end gap-3 mt-24">
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

"use client";

import React from "react";
import {
  Form,
  FormInput,
  FormTextarea,
  FormValues,
  FormAutocomplete,
} from "@/components/forms";
import { Button } from "@/components/ui/button";
import { FileInput } from "@/components/file-input";
import { useFormHook } from "@/hooks";
import { useForm } from "@/contexts/form-context";
import { useAuth } from "@/contexts/auth-context";
import { useCampusAddEdit } from "../../../context";
import { useCampusLocationData } from "../../../hooks";
import { filterDataForEdit } from "../../../utils";
import { CampusCreateDto } from "@/types";

/**
 * Campus form content component
 */
export const CampusFormContent: React.FC = () => {
  // Form hook - validation ve error kontrolü için
  const { hasErrors, values, errors } = useFormHook();

  // Form context
  const { reset } = useForm();

  // Auth context - brand.id için
  const { user } = useAuth();

  // Context'ten campus işlemlerini ve brand summaries'i al
  const { isEditing, postCampus, putCampus, campusLoading, brands } =
    useCampusAddEdit();

  // Location data hook - values'dan countryId ve provinceId otomatik alınıyor
  const { countries, provinces, districts, neighborhoods } =
    useCampusLocationData(values);

  const handleSubmit = async (formValues: any) => {
    // Form'dan gelen ID'leri API için uygun formata çevir
    const {
      brandId,
      countryId,
      provinceId,
      districtId,
      neighborhoodId,
      ...rest
    } = formValues;

    const formData: CampusCreateDto = {
      ...rest,
      // useAuth'dan gelen brand.id'yi kullan
      brandId: user?.brand?.id || (undefined as any),
      // Location objelerini tam veriyle gönder (API'den gelen tüm alanlarla)
      country: countryId
        ? countries.raw.find((c) => c.id?.toString() === countryId) || null
        : null,
      province: provinceId
        ? provinces.raw.find((p) => p.id?.toString() === provinceId) || null
        : null,
      district: districtId
        ? districts.raw.find((d) => d.id?.toString() === districtId) || null
        : null,
      neighborhood: neighborhoodId
        ? neighborhoods.raw.find((n) => n.id?.toString() === neighborhoodId) ||
          null
        : null,
    };

    if (isEditing) {
      // Edit modunda sadece UpdateDto'daki alanları gönder
      const filteredData = filterDataForEdit(formData) as CampusCreateDto;
      await putCampus(filteredData);
    } else {
      await postCampus(formData);
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

        {/* Marka */}
        {/* <div className="col-6">
          <FormAutocomplete
            name="brandId"
            label="Marka"
            placeholder="Marka ara..."
            options={brands.data}
            isLoading={brands.loading}
            disabled={campusLoading}
            required
          />
        </div> */}

        {/* Kampüs Adı */}
        <div className="col-6">
          <FormInput
            name="name"
            label="Kampüs Adı"
            placeholder="Kampüs adını giriniz..."
            required
          />
        </div>

        {/* Kuruluş Yılı */}
        <div className="col-6">
          <FormInput
            name="establishedYear"
            label="Kuruluş Yılı"
            placeholder="Kuruluş yılını giriniz..."
          />
        </div>

        {/* Açıklama */}
        <div className="col-12">
          <FormTextarea
            name="description"
            label="Açıklama"
            placeholder="Kampüs açıklamasını giriniz..."
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

        {/* Fax */}
        <div className="col-6">
          <FormInput
            name="fax"
            label="Fax"
            placeholder="Fax numarasını giriniz..."
          />
        </div>

        {/* Website URL */}
        <div className="col-6">
          <FormInput
            name="websiteUrl"
            label="Website URL"
            placeholder="Website URL'sini giriniz..."
          />
        </div>

        {/* ADRES BİLGİLERİ */}
        <div className="col-12">
          <h5 className="mb-16 mt-16">Adres Bilgileri</h5>
        </div>

        {/* Ülke */}
        <div className="col-3">
          <FormAutocomplete
            name="countryId"
            label="Ülke"
            placeholder="Ülke ara..."
            options={countries.data}
            isLoading={countries.loading}
            disabled={campusLoading}
          />
        </div>

        {/* İl */}
        <div className="col-3">
          <FormAutocomplete
            name="provinceId"
            label="İl"
            placeholder={values?.countryId ? "İl ara..." : "Önce ülke seçiniz"}
            options={provinces.data}
            isLoading={provinces.loading}
            disabled={provinces.disabled || campusLoading}
          />
        </div>

        {/* İlçe */}
        <div className="col-3">
          <FormAutocomplete
            name="districtId"
            label="İlçe"
            placeholder={values?.provinceId ? "İlçe ara..." : "Önce il seçiniz"}
            options={districts.data}
            isLoading={districts.loading}
            disabled={districts.disabled || campusLoading}
          />
        </div>

        {/* Mahalle */}
        <div className="col-3">
          <FormAutocomplete
            name="neighborhoodId"
            label="Mahalle"
            placeholder={
              values?.districtId ? "Mahalle ara..." : "Önce ilçe seçiniz"
            }
            options={neighborhoods.data}
            isLoading={neighborhoods.loading}
            disabled={neighborhoods.disabled || campusLoading}
          />
        </div>

        {/* Adres Satır 1 */}
        <div className="col-12">
          <FormInput
            name="addressLine1"
            label="Adres Satır 1"
            placeholder="Adres satır 1'i giriniz..."
          />
        </div>

        {/* Adres Satır 2 */}
        <div className="col-12">
          <FormInput
            name="addressLine2"
            label="Adres Satır 2"
            placeholder="Adres satır 2'yi giriniz..."
          />
        </div>

        {/* Posta Kodu */}
        <div className="col-6">
          <FormInput
            name="postalCode"
            label="Posta Kodu"
            placeholder="Posta kodunu giriniz..."
          />
        </div>

        {/* Enlem */}
        <div className="col-6">
          <FormInput
            name="latitude"
            label="Enlem (Latitude)"
            type="number"
            step="0.000001"
            placeholder="Enlem değerini giriniz..."
          />
        </div>

        {/* Boylam */}
        <div className="col-6">
          <FormInput
            name="longitude"
            label="Boylam (Longitude)"
            type="number"
            step="0.000001"
            placeholder="Boylam değerini giriniz..."
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
            name="logoUrl"
            isAutoUpload
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
            name="coverImageUrl"
            isAutoUpload
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

        {/* SOSYAL MEDYA */}
        <div className="col-12">
          <h5 className="mb-16 mt-16">Sosyal Medya</h5>
        </div>

        {/* Facebook */}
        <div className="col-6">
          <FormInput
            name="facebookUrl"
            label="Facebook URL"
            placeholder="Facebook URL'sini giriniz..."
          />
        </div>

        {/* Twitter */}
        <div className="col-6">
          <FormInput
            name="twitterUrl"
            label="Twitter URL"
            placeholder="Twitter URL'sini giriniz..."
          />
        </div>

        {/* Instagram */}
        <div className="col-6">
          <FormInput
            name="instagramUrl"
            label="Instagram URL"
            placeholder="Instagram URL'sini giriniz..."
          />
        </div>

        {/* LinkedIn */}
        <div className="col-6">
          <FormInput
            name="linkedinUrl"
            label="LinkedIn URL"
            placeholder="LinkedIn URL'sini giriniz..."
          />
        </div>

        {/* YouTube */}
        <div className="col-12">
          <FormInput
            name="youtubeUrl"
            label="YouTube URL"
            placeholder="YouTube URL'sini giriniz..."
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
            placeholder="Meta başlık giriniz (Max 60 karakter)..."
            maxLength={60}
          />
        </div>

        {/* Meta Açıklama */}
        <div className="col-12">
          <FormTextarea
            name="metaDescription"
            label="Meta Açıklama"
            placeholder="Meta açıklama giriniz (Max 160 karakter)..."
            rows={3}
            maxLength={160}
          />
        </div>

        {/* Meta Anahtar Kelimeler */}
        <div className="col-12">
          <FormInput
            name="metaKeywords"
            label="Meta Anahtar Kelimeler"
            placeholder="Virgülle ayrılmış anahtar kelimeler giriniz..."
          />
        </div>

        {/* FORM ACTIONS */}
        <div className="col-12">
          <div className="d-flex justify-content-end gap-12 mt-24">
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              disabled={campusLoading}
            >
              İptal
            </Button>
            <Button
              type="submit"
              disabled={hasErrors || campusLoading}
              loading={campusLoading}
            >
              {isEditing ? "Güncelle" : "Kaydet"}
            </Button>
          </div>
        </div>
      </div>
    </Form>
  );
};

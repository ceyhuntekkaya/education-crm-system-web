"use client";

import React from "react";
import { Form, FormInput, FormTextarea, FormValues } from "@/components/forms";
import { Button } from "@/components/ui/button";
import { FileInput } from "@/components/file-input";
import { useFormHook } from "@/hooks";
import { useForm } from "@/contexts/form-context";
import { useBrandAddEdit } from "../../../context";
import { filterDataForEdit } from "../../../utils";
import { BrandCreateDto } from "@/types";

/**
 * Brand form content component
 */
export const BrandFormContent: React.FC = () => {
  // Form hook - validation ve error kontrolü için
  const { hasErrors } = useFormHook();

  // Form reset hook'u
  const { reset } = useForm();

  // Context'ten brand işlemlerini al
  const { isEditing, postBrand, putBrand, brandLoading, brandId } =
    useBrandAddEdit();

  const handleSubmit = async (values: any) => {
    const formData: BrandCreateDto = {
      ...values,
    };

    if (isEditing) {
      // Edit modunda sadece UpdateDto'daki alanları gönder
      const filteredData = filterDataForEdit(formData) as BrandCreateDto;
      await putBrand(filteredData);
    } else {
      await postBrand(formData);
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

        {/* Marka Adı */}
        <div className="col-6">
          <FormInput
            name="name"
            label="Marka Adı"
            placeholder="Marka adını giriniz..."
            required
          />
        </div>

        {/* Kuruluş Yılı */}
        <div className="col-6">
          <FormInput
            name="foundedYear"
            label="Kuruluş Yılı"
            // type="number"
            placeholder="Kuruluş yılını giriniz..."
          />
        </div>

        {/* Açıklama */}
        <div className="col-12">
          <FormTextarea
            name="description"
            label="Açıklama"
            placeholder="Marka açıklamasını giriniz..."
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
            label="Telefon"
            placeholder="Telefon numarasını giriniz..."
          />
        </div>

        {/* Website URL */}
        <div className="col-12">
          <FormInput
            name="websiteUrl"
            label="Website URL"
            placeholder="Website URL'sini giriniz..."
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
            uploadButtonText="Logo Yükle"
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
            uploadButtonText="Kapak Resmi Yükle"
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
              disabled={brandLoading}
            >
              İptal
            </Button>
            <Button
              type="submit"
              disabled={hasErrors || brandLoading}
              loading={brandLoading}
            >
              {isEditing ? "Güncelle" : "Kaydet"}
            </Button>
          </div>
        </div>
      </div>
    </Form>
  );
};

const tempBrandFormData = {
  // TEMEL BİLGİLER (Required)
  name: "Örnek Eğitim Kurumu Markası",

  // TEMEL BİLGİLER (Optional)
  description:
    "Bu marka, yenilikçi eğitim çözümleri sunan, öğrenci odaklı bir eğitim kurumu markasıdır. Kaliteli eğitim anlayışı ve modern teknolojik altyapısı ile öne çıkmaktadır.",
  foundedYear: 2015,

  // İLETİŞİM BİLGİLERİ
  email: "info@ornekegitim.com",
  phone: "+90 555 123 4567",
  websiteUrl: "https://www.ornekegitim.com",

  // GÖRSEL BİLGİLER
  logoUrl: "https://picsum.photos/400/400",
  coverImageUrl: "https://picsum.photos/1200/400",

  // SOSYAL MEDYA
  facebookUrl: "https://facebook.com/ornekegitim",
  twitterUrl: "https://twitter.com/ornekegitim",
  instagramUrl: "https://instagram.com/ornekegitim",
  linkedinUrl: "https://linkedin.com/company/ornekegitim",
  youtubeUrl: "https://youtube.com/@ornekegitim",

  // SEO BİLGİLERİ
  metaTitle: "Örnek Eğitim Kurumu - Kaliteli ve Modern Eğitim",
  metaDescription:
    "Örnek Eğitim Kurumu markası ile öğrenci odaklı, kaliteli ve modern eğitim hizmetleri. Yenilikçi eğitim çözümleri için bizi keşfedin.",
  metaKeywords:
    "eğitim kurumu, kaliteli eğitim, özel okul, online eğitim, yenilikçi eğitim",
};

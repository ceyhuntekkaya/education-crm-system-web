"use client";

import React from "react";
import {
  Form,
  FormInput,
  FormTextarea,
  FormValues,
  FormCheckbox,
  FormAutocomplete,
} from "@/components/forms";
import { Button } from "@/components/ui/button";
import { FileInput } from "@/components/file-input";
import { useFormHook } from "@/hooks";
import { useForm } from "@/contexts/form-context";
import { useCampaignAddEdit } from "../../../context";
import { filterDataForEdit } from "../../../utils";
import { CampaignCreateDto, CampaignUpdateDto } from "@/types";

/**
 * Campaign form content component
 */
export const CampaignFormContent: React.FC = () => {
  // Form hook - validation ve error kontrolü için
  const { hasErrors } = useFormHook();

  // Form reset hook'u
  const { reset } = useForm();

  // Context'ten campaign işlemlerini al
  const { isEditing, postCampaign, putCampaign, campaignLoading, formOptions } =
    useCampaignAddEdit();

  // Form options - context'ten gelen
  const { campaignTypeOptions, discountTypeOptions, targetAudienceOptions } =
    formOptions;

  const handleSubmit = async (values: any) => {
    if (isEditing) {
      // Edit modunda CampaignUpdateDto kullan
      const updateData: CampaignUpdateDto = filterDataForEdit(values);
      await putCampaign(updateData);
    } else {
      // Add modunda CampaignCreateDto kullan
      const createData: CampaignCreateDto = {
        ...values,
      };
      await postCampaign(createData);
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

        {/* Kampanya Başlığı */}
        <div className="col-12">
          <FormInput
            name="title"
            label="Kampanya Başlığı"
            placeholder="Kampanya başlığını giriniz..."
            required
          />
        </div>

        {/* Kampanya Tipi */}
        <div className="col-6">
          <FormAutocomplete
            name="campaignType"
            label="Kampanya Tipi"
            options={campaignTypeOptions}
            placeholder="Kampanya tipi seçiniz..."
            required
          />
        </div>

        {/* İndirim Tipi */}
        <div className="col-6">
          <FormAutocomplete
            name="discountType"
            label="İndirim Tipi"
            options={discountTypeOptions}
            placeholder="İndirim tipi seçiniz..."
            required
          />
        </div>

        {/* Kısa Açıklama */}
        <div className="col-12">
          <FormTextarea
            name="shortDescription"
            label="Kısa Açıklama"
            placeholder="Kampanya kısa açıklamasını giriniz..."
            rows={2}
          />
        </div>

        {/* Açıklama */}
        <div className="col-12">
          <FormTextarea
            name="description"
            label="Açıklama"
            placeholder="Kampanya açıklamasını giriniz..."
            rows={4}
          />
        </div>

        {/* Divider */}
        <div className="col-12">
          <span className="d-block border border-neutral-30 border-dashed" />
        </div>

        {/* İNDİRİM BİLGİLERİ */}
        <div className="col-12">
          <h5 className="mb-16 mt-16">İndirim Bilgileri</h5>
        </div>

        {/* İndirim Miktarı */}
        <div className="col-6">
          <FormInput
            name="discountAmount"
            label="İndirim Miktarı (TL)"
            type="number"
            placeholder="İndirim miktarını giriniz..."
          />
        </div>

        {/* İndirim Yüzdesi */}
        <div className="col-6">
          <FormInput
            name="discountPercentage"
            label="İndirim Yüzdesi (%)"
            type="number"
            placeholder="İndirim yüzdesini giriniz..."
          />
        </div>

        {/* Maksimum İndirim Tutarı */}
        <div className="col-6">
          <FormInput
            name="maxDiscountAmount"
            label="Maksimum İndirim Tutarı (TL)"
            type="number"
            placeholder="Maksimum indirim tutarını giriniz..."
          />
        </div>

        {/* Minimum Alış Tutarı */}
        <div className="col-6">
          <FormInput
            name="minPurchaseAmount"
            label="Minimum Alış Tutarı (TL)"
            type="number"
            placeholder="Minimum alış tutarını giriniz..."
          />
        </div>

        {/* Divider */}
        <div className="col-12">
          <span className="d-block border border-neutral-30 border-dashed" />
        </div>

        {/* KAMPANYA DÖNEMİ */}
        <div className="col-12">
          <h5 className="mb-16 mt-16">Kampanya Dönemi</h5>
        </div>

        {/* Başlangıç Tarihi */}
        <div className="col-6">
          <FormInput
            name="startDate"
            label="Başlangıç Tarihi"
            type="date"
            required
          />
        </div>

        {/* Bitiş Tarihi */}
        <div className="col-6">
          <FormInput name="endDate" label="Bitiş Tarihi" type="date" required />
        </div>

        {/* Erken Kayıt Bitiş Tarihi */}
        <div className="col-6">
          <FormInput
            name="earlyBirdEndDate"
            label="Erken Kayıt Bitiş Tarihi"
            type="date"
          />
        </div>

        {/* Kayıt Son Tarihi */}
        <div className="col-6">
          <FormInput
            name="registrationDeadline"
            label="Kayıt Son Tarihi"
            type="date"
          />
        </div>

        {/* Divider */}
        <div className="col-12">
          <span className="d-block border border-neutral-30 border-dashed" />
        </div>

        {/* KAYIT TARİHLERİ */}
        <div className="col-12">
          <h5 className="mb-16 mt-16">Kayıt Tarihleri</h5>
        </div>

        {/* Kayıt Başlangıç Tarihi */}
        <div className="col-6">
          <FormInput
            name="enrollmentStartDate"
            label="Kayıt Başlangıç Tarihi"
            type="date"
          />
        </div>

        {/* Kayıt Bitiş Tarihi */}
        <div className="col-6">
          <FormInput
            name="enrollmentEndDate"
            label="Kayıt Bitiş Tarihi"
            type="date"
          />
        </div>

        {/* Akademik Yıl */}
        <div className="col-6">
          <FormInput
            name="academicYear"
            label="Akademik Yıl"
            placeholder="Örn: 2024-2025"
          />
        </div>

        {/* Divider */}
        <div className="col-12">
          <span className="d-block border border-neutral-30 border-dashed" />
        </div>

        {/* KAMPANYA AYARLARI */}
        <div className="col-12">
          <h5 className="mb-16 mt-16">Kampanya Ayarları</h5>
        </div>

        {/* Öne Çıkan */}
        <div className="col-4">
          <FormCheckbox name="isFeatured" label="Öne Çıkan" />
        </div>

        {/* Herkese Açık */}
        <div className="col-4">
          <FormCheckbox name="isPublic" label="Herkese Açık" />
        </div>

        {/* Onay Gerekli */}
        <div className="col-4">
          <FormCheckbox name="requiresApproval" label="Onay Gerekli" />
        </div>

        {/* Divider */}
        <div className="col-12">
          <span className="d-block border border-neutral-30 border-dashed" />
        </div>

        {/* KULLANIM LİMİTLERİ */}
        <div className="col-12">
          <h5 className="mb-16 mt-16">Kullanım Limitleri</h5>
        </div>

        {/* Kullanım Limiti */}
        <div className="col-4">
          <FormInput
            name="usageLimit"
            label="Kullanım Limiti"
            type="number"
            placeholder="Toplam kullanım limiti..."
          />
        </div>

        {/* Kullanıcı Başına Limit */}
        <div className="col-4">
          <FormInput
            name="perUserLimit"
            label="Kullanıcı Başına Limit"
            type="number"
            placeholder="Kullanıcı başına limit..."
          />
        </div>

        {/* Okul Başına Limit */}
        <div className="col-4">
          <FormInput
            name="perSchoolLimit"
            label="Okul Başına Limit"
            type="number"
            placeholder="Okul başına limit..."
          />
        </div>

        {/* Divider */}
        <div className="col-12">
          <span className="d-block border border-neutral-30 border-dashed" />
        </div>

        {/* HEDEF KİTLE */}
        <div className="col-12">
          <h5 className="mb-16 mt-16">Hedef Kitle</h5>
        </div>

        {/* Hedef Kitle */}
        <div className="col-12">
          <FormAutocomplete
            name="targetAudience"
            label="Hedef Kitle"
            options={targetAudienceOptions}
            placeholder="Hedef kitle seçiniz..."
          />
        </div>

        {/* Hedef Sınıf Seviyeleri */}
        <div className="col-12">
          <FormInput
            name="targetGradeLevels"
            label="Hedef Sınıf Seviyeleri"
            placeholder="Örn: 1,2,3,4"
          />
        </div>

        {/* Minimum Yaş */}
        <div className="col-6">
          <FormInput
            name="targetAgeMin"
            label="Minimum Yaş"
            type="number"
            placeholder="Minimum yaş..."
          />
        </div>

        {/* Maksimum Yaş */}
        <div className="col-6">
          <FormInput
            name="targetAgeMax"
            label="Maksimum Yaş"
            type="number"
            placeholder="Maksimum yaş..."
          />
        </div>

        {/* Sadece Yeni Öğrenciler */}
        <div className="col-6">
          <FormCheckbox
            name="targetNewStudentsOnly"
            label="Sadece Yeni Öğrenciler"
          />
        </div>

        {/* Kardeş İndirimi */}
        <div className="col-6">
          <FormCheckbox name="targetSiblingDiscount" label="Kardeş İndirimi" />
        </div>

        {/* Divider */}
        <div className="col-12">
          <span className="d-block border border-neutral-30 border-dashed" />
        </div>

        {/* PROMOSYON İÇERİĞİ */}
        <div className="col-12">
          <h5 className="mb-16 mt-16">Promosyon İçeriği</h5>
        </div>

        {/* Promosyon Kodu */}
        <div className="col-6">
          <FormInput
            name="promoCode"
            label="Promosyon Kodu"
            placeholder="Promosyon kodunu giriniz..."
          />
        </div>

        {/* CTA Metni */}
        <div className="col-6">
          <FormInput
            name="ctaText"
            label="CTA Metni"
            placeholder="Örn: Hemen Başvur"
          />
        </div>

        {/* CTA URL */}
        <div className="col-12">
          <FormInput
            name="ctaUrl"
            label="CTA URL"
            placeholder="CTA URL'ini giriniz..."
          />
        </div>

        {/* Video URL */}
        <div className="col-12">
          <FormInput
            name="videoUrl"
            label="Video URL"
            placeholder="Video URL'ini giriniz..."
          />
        </div>

        {/* Divider */}
        <div className="col-12">
          <span className="d-block border border-neutral-30 border-dashed" />
        </div>

        {/* GÖRSEL BİLGİLER */}
        <div className="col-12">
          <h5 className="mb-16 mt-16">Görsel Bilgiler</h5>
        </div>

        {/* Banner Resmi */}
        <div className="col-6">
          <FileInput
            label="Banner Resmi"
            type="img"
            variant="outline"
            placeholder="Banner resmi yüklemek için tıklayın"
            maxSize={5}
            uploadButtonText="Banner Yükle"
            name="bannerImageUrl"
          />
          <FormInput
            name="bannerImageUrl"
            label="Banner URL (Manuel)"
            placeholder="Banner URL'ini giriniz..."
            className="mt-12"
          />
        </div>

        {/* Thumbnail Resmi */}
        <div className="col-6">
          <FileInput
            label="Thumbnail Resmi"
            type="img"
            variant="outline"
            placeholder="Thumbnail resmi yüklemek için tıklayın"
            maxSize={5}
            uploadButtonText="Thumbnail Yükle"
            name="thumbnailImageUrl"
          />
          <FormInput
            name="thumbnailImageUrl"
            label="Thumbnail URL (Manuel)"
            placeholder="Thumbnail URL'ini giriniz..."
            className="mt-12"
          />
        </div>

        {/* Rozet Metni */}
        <div className="col-6">
          <FormInput
            name="badgeText"
            label="Rozet Metni"
            placeholder="Örn: Yeni"
          />
        </div>

        {/* Rozet Rengi */}
        <div className="col-6">
          <FormInput
            name="badgeColor"
            label="Rozet Rengi"
            type="color"
            placeholder="#FF0000"
          />
        </div>

        {/* Divider */}
        <div className="col-12">
          <span className="d-block border border-neutral-30 border-dashed" />
        </div>

        {/* ŞARTLAR VE KOŞULLAR */}
        <div className="col-12">
          <h5 className="mb-16 mt-16">Şartlar ve Koşullar</h5>
        </div>

        {/* Şartlar ve Koşullar */}
        <div className="col-12">
          <FormTextarea
            name="termsAndConditions"
            label="Şartlar ve Koşullar"
            placeholder="Şartlar ve koşulları giriniz..."
            rows={4}
          />
        </div>

        {/* Uyarılar */}
        <div className="col-12">
          <FormTextarea
            name="finePrint"
            label="Uyarılar"
            placeholder="Uyarıları giriniz..."
            rows={3}
          />
        </div>

        {/* İstisnalar */}
        <div className="col-12">
          <FormTextarea
            name="exclusions"
            label="İstisnalar"
            placeholder="İstisnaları giriniz..."
            rows={3}
          />
        </div>

        {/* Divider */}
        <div className="col-12">
          <span className="d-block border border-neutral-30 border-dashed" />
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
            placeholder="Meta başlık giriniz..."
          />
        </div>

        {/* Meta Açıklama */}
        <div className="col-12">
          <FormTextarea
            name="metaDescription"
            label="Meta Açıklama"
            placeholder="Meta açıklama giriniz..."
            rows={3}
          />
        </div>

        {/* Meta Anahtar Kelimeler */}
        <div className="col-12">
          <FormInput
            name="metaKeywords"
            label="Meta Anahtar Kelimeler"
            placeholder="Meta anahtar kelimeleri giriniz..."
          />
        </div>

        {/* Divider */}
        <div className="col-12">
          <span className="d-block border border-neutral-30 border-dashed" />
        </div>

        {/* EK ÖZELLİKLER */}
        <div className="col-12">
          <h5 className="mb-16 mt-16">Ek Özellikler</h5>
        </div>

        {/* Ücretsiz Deneme Günleri */}
        <div className="col-4">
          <FormInput
            name="freeTrialDays"
            label="Ücretsiz Deneme Günleri"
            type="number"
            placeholder="Ücretsiz deneme günleri..."
          />
        </div>

        {/* Taksit Seçenekleri */}
        <div className="col-4">
          <FormInput
            name="installmentOptions"
            label="Taksit Seçenekleri"
            placeholder="Örn: 3,6,9,12"
          />
        </div>

        {/* Ödeme Son Günü */}
        <div className="col-4">
          <FormInput
            name="paymentDeadlineDays"
            label="Ödeme Son Günü"
            type="number"
            placeholder="Ödeme son günü..."
          />
        </div>

        {/* İade Politikası */}
        <div className="col-12">
          <FormTextarea
            name="refundPolicy"
            label="İade Politikası"
            placeholder="İade politikasını giriniz..."
            rows={3}
          />
        </div>

        {/* Ücretsiz Hizmetler */}
        <div className="col-12">
          <FormTextarea
            name="freeServices"
            label="Ücretsiz Hizmetler"
            placeholder="Ücretsiz hizmetleri giriniz..."
            rows={3}
          />
        </div>

        {/* Bonus Özellikler */}
        <div className="col-12">
          <FormTextarea
            name="bonusFeatures"
            label="Bonus Özellikler"
            placeholder="Bonus özellikleri giriniz..."
            rows={3}
          />
        </div>

        {/* Hediye Ürünler */}
        <div className="col-12">
          <FormTextarea
            name="giftItems"
            label="Hediye Ürünler"
            placeholder="Hediye ürünleri giriniz..."
            rows={3}
          />
        </div>

        {/* Divider */}
        <div className="col-12">
          <span className="d-block border border-neutral-30 border-dashed" />
        </div>

        {/* GÖRÜNTÜLEME VE ÖNCELİK */}
        <div className="col-12">
          <h5 className="mb-16 mt-16">Görüntüleme ve Öncelik</h5>
        </div>

        {/* Öncelik */}
        <div className="col-6">
          <FormInput
            name="priority"
            label="Öncelik"
            type="number"
            placeholder="Öncelik değeri..."
          />
        </div>

        {/* Sıralama */}
        <div className="col-6">
          <FormInput
            name="sortOrder"
            label="Sıralama"
            type="number"
            placeholder="Sıralama değeri..."
          />
        </div>

        {/* FORM ACTIONS */}
        <div className="col-12">
          <div className="d-flex justify-content-end gap-12 mt-24">
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              disabled={campaignLoading}
            >
              İptal
            </Button>
            <Button
              type="submit"
              disabled={hasErrors || campaignLoading}
              loading={campaignLoading}
            >
              {isEditing ? "Güncelle" : "Kaydet"}
            </Button>
          </div>
        </div>
      </div>
    </Form>
  );
};

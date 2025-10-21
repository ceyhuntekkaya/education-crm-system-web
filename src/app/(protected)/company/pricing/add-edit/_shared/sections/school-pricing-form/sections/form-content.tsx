"use client";

import React from "react";
import {
  Form,
  FormInput,
  FormAutocomplete,
  FormCheckbox,
  FormTextarea,
} from "@/components/forms";
import { Button } from "@/components/ui/button";
import { SchoolPricingFormData } from "../types/form-data";
import { useFormHook } from "@/hooks";
import { useForm } from "@/contexts/form-context";
import { useAuth } from "@/contexts";
import { useCompany } from "@/app/(protected)/company/_shared";
import {
  currencyOptions,
  paymentFrequencyOptions,
  gradeLevelOptions,
  academicYearOptions,
} from "../options";
import { usePricingAddEdit } from "../../../context";

/**
 * School pricing form content component
 */
export const SchoolPricingFormContent: React.FC = () => {
  // Form hook - validation ve error kontrolü için
  const { hasErrors } = useFormHook();

  // Form reset hook'u
  const { reset } = useForm();

  // Auth context'ten user bilgisini al
  const { user } = useAuth();

  // Company context'ten seçili okul bilgisini al
  const { selectedSchool } = useCompany();

  // Context'ten pricing işlemlerini al
  const { isEditing, postPricing, putPricing, pricingLoading, pricingError } =
    usePricingAddEdit();

  const handleSubmit = async (values: SchoolPricingFormData) => {
    // Form data'yı API için hazırla
    const formData = {
      ...values,
      createdByUserId: user?.id,
      schoolId: selectedSchool?.id,
    };

    // Edit veya Add moduna göre doğru hook'u kullan
    if (isEditing) {
      putPricing(formData);
    } else {
      postPricing(formData);
    }
  };

  const handleCancel = () => {
    reset();
  };

  return (
    <Form onSubmit={handleSubmit}>
      <div className="row row-gap-24">
        {/* TEMEL BİLGİLER */}
        <div className="col-12">
          <h5 className="mb-16">Temel Bilgiler</h5>
        </div>

        {/* Akademik Yıl */}
        <div className="col-6">
          <FormAutocomplete
            name="academicYear"
            label="Akademik Yıl"
            options={academicYearOptions}
            required
          />
        </div>

        {/* Sınıf Seviyesi */}
        <div className="col-6">
          <FormAutocomplete
            name="gradeLevel"
            label="Sınıf Seviyesi"
            options={gradeLevelOptions}
            required
          />
        </div>

        {/* Sınıf Düzeyi */}
        <div className="col-6">
          <FormInput
            name="classLevel"
            label="Sınıf Düzeyi"
            placeholder="Örn: A, B, C"
          />
        </div>

        {/* Para Birimi */}
        <div className="col-6">
          <FormAutocomplete
            name="currency"
            label="Para Birimi"
            options={currencyOptions}
            required
          />
        </div>

        {/* TEMEL ÜCRETLER */}
        <div className="col-12">
          <hr className="my-24" />
          <h5 className="mb-16">Temel Ücretler</h5>
        </div>

        {/* Kayıt Ücreti */}
        <div className="col-4">
          <FormInput
            name="registrationFee"
            label="Kayıt Ücreti"
            type="number"
            min={0}
            step={0.01}
          />
        </div>

        {/* Başvuru Ücreti */}
        <div className="col-4">
          <FormInput
            name="applicationFee"
            label="Başvuru Ücreti"
            type="number"
            min={0}
            step={0.01}
          />
        </div>

        {/* Kayıt Tescil Ücreti */}
        <div className="col-4">
          <FormInput
            name="enrollmentFee"
            label="Kayıt Tescil Ücreti"
            type="number"
            min={0}
            step={0.01}
          />
        </div>

        {/* ÖĞRENİM ÜCRETLERİ */}
        <div className="col-12">
          <h6 className="mb-16">Öğrenim Ücretleri</h6>
        </div>

        {/* Yıllık Öğrenim Ücreti */}
        <div className="col-4">
          <FormInput
            name="annualTuition"
            label="Yıllık Öğrenim Ücreti"
            type="number"
            min={0}
            step={0.01}
          />
        </div>

        {/* Aylık Öğrenim Ücreti */}
        <div className="col-4">
          <FormInput
            name="monthlyTuition"
            label="Aylık Öğrenim Ücreti"
            type="number"
            min={0}
            step={0.01}
          />
        </div>

        {/* Dönemlik Öğrenim Ücreti */}
        <div className="col-4">
          <FormInput
            name="semesterTuition"
            label="Dönemlik Öğrenim Ücreti"
            type="number"
            min={0}
            step={0.01}
          />
        </div>

        {/* EK ÜCRETLER */}
        <div className="col-12">
          <hr className="my-24" />
          <h5 className="mb-16">Ek Ücretler</h5>
        </div>

        {/* Kitap Ücreti */}
        <div className="col-3">
          <FormInput
            name="bookFee"
            label="Kitap Ücreti"
            type="number"
            min={0}
            step={0.01}
          />
        </div>

        {/* Üniforma Ücreti */}
        <div className="col-3">
          <FormInput
            name="uniformFee"
            label="Üniforma Ücreti"
            type="number"
            min={0}
            step={0.01}
          />
        </div>

        {/* Aktivite Ücreti */}
        <div className="col-3">
          <FormInput
            name="activityFee"
            label="Aktivite Ücreti"
            type="number"
            min={0}
            step={0.01}
          />
        </div>

        {/* Teknoloji Ücreti */}
        <div className="col-3">
          <FormInput
            name="technologyFee"
            label="Teknoloji Ücreti"
            type="number"
            min={0}
            step={0.01}
          />
        </div>

        {/* Laboratuvar Ücreti */}
        <div className="col-3">
          <FormInput
            name="laboratoryFee"
            label="Laboratuvar Ücreti"
            type="number"
            min={0}
            step={0.01}
          />
        </div>

        {/* Kütüphane Ücreti */}
        <div className="col-3">
          <FormInput
            name="libraryFee"
            label="Kütüphane Ücreti"
            type="number"
            min={0}
            step={0.01}
          />
        </div>

        {/* Spor Ücreti */}
        <div className="col-3">
          <FormInput
            name="sportsFee"
            label="Spor Ücreti"
            type="number"
            min={0}
            step={0.01}
          />
        </div>

        {/* Sanat Ücreti */}
        <div className="col-3">
          <FormInput
            name="artFee"
            label="Sanat Ücreti"
            type="number"
            min={0}
            step={0.01}
          />
        </div>

        {/* Müzik Ücreti */}
        <div className="col-3">
          <FormInput
            name="musicFee"
            label="Müzik Ücreti"
            type="number"
            min={0}
            step={0.01}
          />
        </div>

        {/* Ulaşım Ücreti */}
        <div className="col-3">
          <FormInput
            name="transportationFee"
            label="Ulaşım Ücreti"
            type="number"
            min={0}
            step={0.01}
          />
        </div>

        {/* Kafeterya Ücreti */}
        <div className="col-3">
          <FormInput
            name="cafeteriaFee"
            label="Kafeterya Ücreti"
            type="number"
            min={0}
            step={0.01}
          />
        </div>

        {/* Sigorta Ücreti */}
        <div className="col-3">
          <FormInput
            name="insuranceFee"
            label="Sigorta Ücreti"
            type="number"
            min={0}
            step={0.01}
          />
        </div>

        {/* ÖDEME KOŞULLARI */}
        <div className="col-12">
          <hr className="my-24" />
          <h5 className="mb-16">Ödeme Koşulları</h5>
        </div>

        {/* Ödeme Sıklığı */}
        <div className="col-6">
          <FormAutocomplete
            name="paymentFrequency"
            label="Ödeme Sıklığı"
            options={paymentFrequencyOptions}
            required
          />
        </div>

        {/* Taksit Sayısı */}
        <div className="col-6">
          <FormInput
            name="installmentCount"
            label="Taksit Sayısı"
            type="number"
            min={1}
            max={60}
          />
        </div>

        {/* İNDİRİMLER */}
        <div className="col-12">
          <h6 className="mb-16">İndirimler (%)</h6>
        </div>

        {/* Peşinat Yüzdesi */}
        <div className="col-4">
          <FormInput
            name="downPaymentPercentage"
            label="Peşinat Yüzdesi"
            type="number"
            min={0}
            max={100}
            step={0.01}
          />
        </div>

        {/* Erken Ödeme İndirimi */}
        <div className="col-4">
          <FormInput
            name="earlyPaymentDiscountPercentage"
            label="Erken Ödeme İndirimi (%)"
            type="number"
            min={0}
            max={100}
            step={0.01}
          />
        </div>

        {/* Kardeş İndirimi */}
        <div className="col-4">
          <FormInput
            name="siblingDiscountPercentage"
            label="Kardeş İndirimi (%)"
            type="number"
            min={0}
            max={100}
            step={0.01}
          />
        </div>

        {/* GEÇERLİLİK TARİHLERİ */}
        <div className="col-12">
          <hr className="my-24" />
          <h5 className="mb-16">Geçerlilik Tarihleri</h5>
        </div>

        {/* Başlangıç Tarihi */}
        <div className="col-6">
          <FormInput name="validFrom" label="Başlangıç Tarihi" type="date" />
        </div>

        {/* Bitiş Tarihi */}
        <div className="col-6">
          <FormInput name="validUntil" label="Bitiş Tarihi" type="date" />
        </div>

        {/* AÇIKLAMALAR */}
        <div className="col-12">
          <hr className="my-24" />
          <h5 className="mb-16">Açıklamalar</h5>
        </div>

        {/* İade Politikası */}
        <div className="col-6">
          <FormTextarea
            name="refundPolicy"
            label="İade Politikası"
            placeholder="İade politikası detaylarını giriniz..."
            rows={4}
            maxLength={2000}
          />
        </div>

        {/* Ödeme Koşulları */}
        <div className="col-6">
          <FormTextarea
            name="paymentTerms"
            label="Ödeme Koşulları"
            placeholder="Ödeme koşulları detaylarını giriniz..."
            rows={4}
            maxLength={2000}
          />
        </div>

        {/* Genel Açıklama */}
        <div className="col-12">
          <FormTextarea
            name="publicDescription"
            label="Genel Açıklama"
            placeholder="Bu fiyat planı hakkında genel açıklama..."
            rows={3}
            maxLength={1000}
          />
        </div>

        {/* AYARLAR */}
        <div className="col-12">
          <hr className="my-24" />
          <h5 className="mb-16">Görüntüleme Ayarları</h5>
        </div>

        {/* Burs Durumu */}
        <div className="col-6">
          <FormCheckbox
            name="needBasedAidAvailable"
            label="İhtiyaç Bazlı Burs Mevcut"
          />
        </div>
        <div className="col-6">
          <FormCheckbox
            name="meritBasedAidAvailable"
            label="Başarı Bazlı Burs Mevcut"
          />
        </div>

        {/* Görüntüleme Seçenekleri */}
        <div className="col-6">
          <FormCheckbox
            name="showDetailedBreakdown"
            label="Detaylı Ücret Dökümü Göster"
          />
        </div>
        <div className="col-6">
          <FormCheckbox
            name="highlightTotalCost"
            label="Toplam Maliyeti Vurgula"
          />
        </div>

        <div className="col-6">
          <FormCheckbox
            name="showPaymentOptions"
            label="Ödeme Seçeneklerini Göster"
          />
        </div>
        <div className="col-6">
          <FormCheckbox
            name="showFinancialAidInfo"
            label="Burs Bilgilerini Göster"
          />
        </div>

        {/* Hata Mesajı */}
        {pricingError && (
          <div className="col-12">
            <div className="alert alert-danger" role="alert">
              {pricingError}
            </div>
          </div>
        )}

        {/* BUTONLAR */}
        <div className="col-12">
          <hr className="my-24" />
          <div className="d-flex gap-3 justify-content-end me-64">
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              disabled={pricingLoading}
            >
              Temizle
            </Button>
            <Button
              type="submit"
              variant="inline"
              disabled={hasErrors || pricingLoading}
              loading={pricingLoading}
            >
              {isEditing
                ? "Fiyat Bilgisini Güncelle"
                : "Fiyat Bilgisini Kaydet"}
            </Button>
          </div>
        </div>
      </div>
    </Form>
  );
};

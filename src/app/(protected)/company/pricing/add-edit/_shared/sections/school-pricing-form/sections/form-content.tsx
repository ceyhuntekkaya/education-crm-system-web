"use client";

import React from "react";
import {
  Form,
  FormInput,
  FormAutocomplete,
  FormCheckbox,
  FormTextarea,
  FormValues,
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
import { filterDataForEdit } from "../../../utils";
import { SchoolPricingCreateDto, SchoolPricingUpdateDto } from "@/types";

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
  const { isEditing, postPricing, putPricing, formLoading, pricingError } =
    usePricingAddEdit();

  const handleSubmit = async (values: SchoolPricingFormData) => {
    console.log("📝 Form değerleri:", values);

    // Edit veya Add moduna göre doğru hook'u kullan
    try {
      if (isEditing) {
        // Edit modunda sadece UpdateDto'daki alanları gönder
        const filteredData = filterDataForEdit(
          values
        ) as SchoolPricingUpdateDto;
        console.log("🔄 Edit modu - Filtrelenmiş veri:", filteredData);
        await putPricing(filteredData);
      } else {
        // Add modunda schoolId ve createdByUserId ekle
        const formData = {
          ...values,
          schoolId: selectedSchool?.id,
          createdByUserId: user?.id,
        } as SchoolPricingCreateDto;
        console.log("➕ Add modu - Form verisi:", formData);
        await postPricing(formData);
      }
    } catch (error) {
      console.error("❌ Form submit hatası:", error);
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

        {/* Akademik Yıl */}
        <div className="col-6">
          <FormAutocomplete
            name="academicYear"
            label="Akademik Yıl"
            options={academicYearOptions}
            placeholder="Örn: 2024-2025, 2025-2026"
            required
          />
        </div>

        {/* Sınıf Seviyesi */}
        <div className="col-6">
          <FormAutocomplete
            name="gradeLevel"
            label="Sınıf Seviyesi"
            options={gradeLevelOptions}
            placeholder="Sınıf seviyesi seçiniz..."
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
            placeholder="Para birimi seçiniz..."
            required
          />
        </div>

        {/* TEMEL ÜCRETLER */}
        {/* <div className="col-12">
          <hr className="my-24" />
          <h5 className="mb-16">Temel Ücretler</h5>
        </div> */}

        {/* Kayıt Ücreti */}
        {/* <div className="col-4">
          <FormInput
            name="registrationFee"
            label="Kayıt Ücreti"
            type="number"
            placeholder="₺ 0,00"
          />
        </div> */}

        {/* Başvuru Ücreti */}
        {/* <div className="col-4">
          <FormInput
            name="applicationFee"
            label="Başvuru Ücreti"
            type="number"
            placeholder="₺ 0,00"
          />
        </div> */}

        {/* Kayıt Tescil Ücreti */}
        {/* <div className="col-4">
          <FormInput
            name="enrollmentFee"
            label="Kayıt Tescil Ücreti"
            type="number"
            placeholder="₺ 0,00"
          />
        </div> */}

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
            placeholder="₺ 0,00"
          />
        </div>

        {/* Aylık Öğrenim Ücreti */}
        <div className="col-4">
          <FormInput
            name="monthlyTuition"
            label="Aylık Öğrenim Ücreti"
            type="number"
            placeholder="₺ 0,00"
          />
        </div>

        {/* Dönemlik Öğrenim Ücreti */}
        <div className="col-4">
          <FormInput
            name="semesterTuition"
            label="Dönemlik Öğrenim Ücreti"
            type="number"
            placeholder="₺ 0,00"
          />
        </div>

        {/* EK ÜCRETLER */}
        {/* <div className="col-12">
          <hr className="my-24" />
          <h5 className="mb-16">Ek Ücretler</h5>
        </div> */}

        {/* Kitap Ücreti */}
        {/* <div className="col-3">
          <FormInput
            name="bookFee"
            label="Kitap Ücreti"
            type="number"
            placeholder="₺ 0,00"
          />
        </div> */}

        {/* Üniforma Ücreti */}
        {/* <div className="col-3">
          <FormInput
            name="uniformFee"
            label="Üniforma Ücreti"
            type="number"
            placeholder="₺ 0,00"
          />
        </div> */}

        {/* Aktivite Ücreti */}
        {/* <div className="col-3">
          <FormInput
            name="activityFee"
            label="Aktivite Ücreti"
            type="number"
            placeholder="₺ 0,00"
          />
        </div> */}

        {/* Teknoloji Ücreti */}
        {/* <div className="col-3">
          <FormInput
            name="technologyFee"
            label="Teknoloji Ücreti"
            type="number"
            placeholder="₺ 0,00"
          />
        </div> */}

        {/* Laboratuvar Ücreti */}
        {/* <div className="col-3">
          <FormInput
            name="laboratoryFee"
            label="Laboratuvar Ücreti"
            type="number"
            placeholder="₺ 0,00"
          />
        </div> */}

        {/* Kütüphane Ücreti */}
        {/* <div className="col-3">
          <FormInput
            name="libraryFee"
            label="Kütüphane Ücreti"
            type="number"
            placeholder="₺ 0,00"
          />
        </div> */}

        {/* Spor Ücreti */}
        {/* <div className="col-3">
          <FormInput
            name="sportsFee"
            label="Spor Ücreti"
            type="number"
            placeholder="₺ 0,00"
          />
        </div> */}

        {/* Sanat Ücreti */}
        {/* <div className="col-3">
          <FormInput
            name="artFee"
            label="Sanat Ücreti"
            type="number"
            placeholder="₺ 0,00"
          />
        </div> */}

        {/* Müzik Ücreti */}
        {/* <div className="col-3">
          <FormInput
            name="musicFee"
            label="Müzik Ücreti"
            type="number"
            placeholder="₺ 0,00"
          />
        </div> */}

        {/* Ulaşım Ücreti */}
        {/* <div className="col-3">
          <FormInput
            name="transportationFee"
            label="Ulaşım Ücreti"
            type="number"
            placeholder="₺ 0,00"
          />
        </div> */}

        {/* Kafeterya Ücreti */}
        {/* <div className="col-3">
          <FormInput
            name="cafeteriaFee"
            label="Kafeterya Ücreti"
            type="number"
            placeholder="₺ 0,00"
          />
        </div> */}

        {/* Sigorta Ücreti */}
        {/* <div className="col-3">
          <FormInput
            name="insuranceFee"
            label="Sigorta Ücreti"
            type="number"
            placeholder="₺ 0,00"
          />
        </div> */}

        {/* Bakım Ücreti */}
        {/* <div className="col-3">
          <FormInput
            name="maintenanceFee"
            label="Bakım Ücreti"
            type="number"
            placeholder="₺ 0,00"
          />
        </div> */}

        {/* Güvenlik Ücreti */}
        {/* <div className="col-3">
          <FormInput
            name="securityFee"
            label="Güvenlik Ücreti"
            type="number"
            placeholder="₺ 0,00"
          />
        </div> */}

        {/* Sınav Ücreti */}
        {/* <div className="col-3">
          <FormInput
            name="examFee"
            label="Sınav Ücreti"
            type="number"
            placeholder="₺ 0,00"
          />
        </div> */}

        {/* Mezuniyet Ücreti */}
        {/* <div className="col-3">
          <FormInput
            name="graduationFee"
            label="Mezuniyet Ücreti"
            type="number"
            placeholder="₺ 0,00"
          />
        </div> */}

        {/* Uzatmalı Gün Ücreti */}
        {/* <div className="col-3">
          <FormInput
            name="extendedDayFee"
            label="Uzatmalı Gün Ücreti"
            type="number"
            placeholder="₺ 0,00"
          />
        </div> */}

        {/* Etüt Ücreti */}
        {/* <div className="col-3">
          <FormInput
            name="tutoringFee"
            label="Etüt Ücreti"
            type="number"
            placeholder="₺ 0,00"
          />
        </div> */}

        {/* Yaz Okulu Ücreti */}
        {/* <div className="col-3">
          <FormInput
            name="summerSchoolFee"
            label="Yaz Okulu Ücreti"
            type="number"
            placeholder="₺ 0,00"
          />
        </div> */}

        {/* Kış Kampı Ücreti */}
        {/* <div className="col-3">
          <FormInput
            name="winterCampFee"
            label="Kış Kampı Ücreti"
            type="number"
            placeholder="₺ 0,00"
          />
        </div> */}

        {/* Dil Kursu Ücreti */}
        {/* <div className="col-3">
          <FormInput
            name="languageCourseFee"
            label="Dil Kursu Ücreti"
            type="number"
            placeholder="₺ 0,00"
          />
        </div> */}

        {/* Özel Ders Ücreti */}
        {/* <div className="col-3">
          <FormInput
            name="privateLessonFee"
            label="Özel Ders Ücreti"
            type="number"
            placeholder="₺ 0,00"
          />
        </div> */}

        {/* İptal Ücreti */}
        {/* <div className="col-3">
          <FormInput
            name="cancellationFee"
            label="İptal Ücreti"
            type="number"
            placeholder="₺ 0,00"
          />
        </div> */}

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
            placeholder="Ödeme sıklığı seçiniz..."
            required
          />
        </div>

        {/* Taksit Sayısı */}
        <div className="col-6">
          <FormInput
            name="installmentCount"
            label="Taksit Sayısı"
            type="number"
            placeholder="12"
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
            placeholder="0 %"
          />
        </div>

        {/* Erken Ödeme İndirimi */}
        <div className="col-4">
          <FormInput
            name="earlyPaymentDiscountPercentage"
            label="Erken Ödeme İndirimi"
            type="number"
            placeholder="0 %"
          />
        </div>

        {/* Kardeş İndirimi */}
        <div className="col-4">
          <FormInput
            name="siblingDiscountPercentage"
            label="Kardeş İndirimi"
            type="number"
            placeholder="0 %"
          />
        </div>

        {/* Çoklu Yıl İndirimi */}
        <div className="col-4">
          <FormInput
            name="multiYearDiscountPercentage"
            label="Çoklu Yıl İndirimi"
            type="number"
            placeholder="0 %"
          />
        </div>

        {/* Sadakat İndirimi */}
        <div className="col-4">
          <FormInput
            name="loyaltyDiscountPercentage"
            label="Sadakat İndirimi"
            type="number"
            placeholder="0 %"
          />
        </div>

        {/* DİĞER YÜZDELER VE CEZALAR */}
        <div className="col-12">
          <h6 className="mb-16">Diğer Ceza ve İadeler (%)</h6>
        </div>

        {/* Geç Ödeme Ceza Yüzdesi */}
        <div className="col-4">
          <FormInput
            name="latePaymentPenaltyPercentage"
            label="Geç Ödeme Ceza Yüzdesi"
            type="number"
            placeholder="0 %"
          />
        </div>

        {/* Çekilme İade Yüzdesi */}
        <div className="col-4">
          <FormInput
            name="withdrawalRefundPercentage"
            label="Çekilme İade Yüzdesi"
            type="number"
            placeholder="0 %"
          />
        </div>

        {/* GEÇERLİLİK TARİHLERİ */}
        <div className="col-12">
          <hr className="my-24" />
          <h5 className="mb-16">Geçerlilik Tarihleri</h5>
        </div>

        {/* Başlangıç Tarihi */}
        <div className="col-6">
          <FormInput
            name="validFrom"
            label="Başlangıç Tarihi"
            type="date"
            placeholder="dd/mm/yyyy"
          />
        </div>

        {/* Bitiş Tarihi */}
        <div className="col-6">
          <FormInput
            name="validUntil"
            label="Bitiş Tarihi"
            type="date"
            placeholder="dd/mm/yyyy"
          />
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

        {/* İç Notlar */}
        <div className="col-6">
          <FormTextarea
            name="internalNotes"
            label="İç Notlar"
            placeholder="Sadece yetkili personelin görebileceği notlar..."
            rows={4}
            maxLength={2000}
          />
        </div>

        {/* Ücret Döküm Notları */}
        <div className="col-6">
          <FormTextarea
            name="feeBreakdownNotes"
            label="Ücret Döküm Notları"
            placeholder="Ücret detayları hakkında ek açıklamalar..."
            rows={4}
            maxLength={1000}
          />
        </div>

        {/* Pazar Pozisyonu */}
        <div className="col-12">
          <FormTextarea
            name="marketPosition"
            label="Pazar Pozisyonu"
            placeholder="Bu fiyatlandırmanın pazar konumu ve stratejisi..."
            rows={3}
            maxLength={500}
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
          <div className="d-flex gap-12 justify-content-end me-64">
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              disabled={formLoading}
            >
              Temizle
            </Button>
            <Button
              type="submit"
              variant="inline"
              disabled={hasErrors || formLoading}
              loading={formLoading}
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

const exampleSchoolPricingCreateDto: SchoolPricingCreateDto = {
  schoolId: 5,
  createdByUserId: 1,
  academicYear: "2024-2025",
  gradeLevel: "HIGH_SCHOOL", // Lise seviyesi
  classLevel: "9", // 9. sınıf
  currency: "TRY", // Türk Lirası

  // Temel ücretler
  registrationFee: 5000, // Kayıt ücreti
  applicationFee: 500, // Başvuru ücreti
  enrollmentFee: 2500, // Kayıt tamamlama ücreti
  annualTuition: 120000, // Yıllık öğrenim ücreti
  monthlyTuition: 10000, // Aylık öğrenim ücreti
  semesterTuition: 60000, // Dönemlik öğrenim ücreti

  // Ek ücretler
  bookFee: 3000, // Kitap ücreti
  uniformFee: 2000, // Üniforma ücreti
  activityFee: 1500, // Aktivite ücreti
  technologyFee: 2500, // Teknoloji ücreti
  laboratoryFee: 1800, // Laboratuvar ücreti
  libraryFee: 800, // Kütüphane ücreti
  sportsFee: 1200, // Spor ücreti
  artFee: 1000, // Sanat ücreti
  musicFee: 1500, // Müzik ücreti
  transportationFee: 4000, // Ulaşım ücreti
  cafeteriaFee: 3000, // Kafeterya ücreti
  insuranceFee: 600, // Sigorta ücreti
  maintenanceFee: 800, // Bakım ücreti
  securityFee: 500, // Güvenlik ücreti
  examFee: 400, // Sınav ücreti
  graduationFee: 2000, // Mezuniyet ücreti
  extendedDayFee: 2500, // Uzatılmış gün ücreti
  tutoringFee: 3500, // Özel ders ücreti
  summerSchoolFee: 8000, // Yaz okulu ücreti
  winterCampFee: 5000, // Kış kampı ücreti
  languageCourseFee: 2500, // Dil kursu ücreti
  privateLessonFee: 500, // Özel ders (saatlik) ücreti

  // Ödeme koşulları
  paymentFrequency: "MONTHLY", // Aylık ödeme
  installmentCount: 10, // 10 taksit
  downPaymentPercentage: 20.0, // %20 peşinat

  // İndirimler
  earlyPaymentDiscountPercentage: 5.0, // %5 erken ödeme indirimi
  siblingDiscountPercentage: 10.0, // %10 kardeş indirimi
  multiYearDiscountPercentage: 8.0, // %8 çok yıllık indirim
  loyaltyDiscountPercentage: 3.0, // %3 sadakat indirimi

  // Burs seçenekleri
  needBasedAidAvailable: true, // İhtiyaç bazlı burs var
  meritBasedAidAvailable: true, // Başarı bazlı burs var

  // Geçerlilik tarihleri
  validFrom: "2024-09-01", // Başlangıç tarihi
  validUntil: "2025-08-31", // Bitiş tarihi

  // Politikalar ve açıklamalar
  refundPolicy:
    "İade politikası: Öğrenim yılı başlamadan 30 gün öncesine kadar %100 iade. Sonrasında kademeli iade uygulanır.",
  paymentTerms:
    "Ödeme koşulları: Her ayın 5'ine kadar ödeme yapılmalıdır. Geç ödeme cezası uygulanır.",
  latePaymentPenaltyPercentage: 2.5, // %2.5 geç ödeme cezası
  cancellationFee: 1000, // İptal ücreti
  withdrawalRefundPercentage: 70.0, // %70 ayrılma iadesi

  // Notlar ve açıklamalar
  internalNotes:
    "Bu fiyatlandırma 2024-2025 akademik yılı için belirlenmiştir. Yönetim kurulu onayı alınmıştır.",
  publicDescription:
    "Kaliteli eğitim için uygun fiyat seçenekleri. Esnek ödeme planları ve burs imkanları mevcuttur.",
  feeBreakdownNotes:
    "Tüm ücretler KDV dahildir. Ek materyaller ayrıca ücretlendirilir.",
  marketPosition:
    "Orta-üst segment. Rekabetçi fiyatlandırma ile kaliteli eğitim sunumu.",

  // Görünüm seçenekleri
  showDetailedBreakdown: true, // Detaylı döküm göster
  highlightTotalCost: true, // Toplam maliyeti vurgula
  showPaymentOptions: true, // Ödeme seçeneklerini göster
  showFinancialAidInfo: true, // Finansal yardım bilgilerini göster
};

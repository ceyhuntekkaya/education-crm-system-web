"use client";

import React from "react";
import { FormInput, FormTextarea, FormAutocomplete } from "@/components/forms";

interface BasicInfoSectionProps {}

const BasicInfoSection: React.FC<BasicInfoSectionProps> = () => {
  const campaignTypeOptions = [
    { value: "DISCOUNT", label: "İndirim" },
    { value: "FREE_SERVICE", label: "Ücretsiz Hizmet" },
    { value: "BONUS_FEATURE", label: "Bonus Özellik" },
    { value: "EARLY_BIRD", label: "Erken Kayıt" },
    { value: "SUMMER_SCHOOL", label: "Yaz Okulu" },
    { value: "WINTER_CAMP", label: "Kış Kampı" },
    { value: "FREE_TRIAL", label: "Ücretsiz Deneme" },
    { value: "SIBLING_DISCOUNT", label: "Kardeş İndirimi" },
    { value: "LOYALTY_REWARD", label: "Sadakat Ödülü" },
    { value: "REFERRAL_BONUS", label: "Referans Bonusu" },
    { value: "NEW_STUDENT", label: "Yeni Öğrenci" },
    { value: "SCHOLARSHIP", label: "Burs" },
    { value: "INSTALLMENT", label: "Taksit" },
    { value: "SEASONAL", label: "Mevsimsel" },
    { value: "SPECIAL_EVENT", label: "Özel Etkinlik" },
    { value: "BUNDLE_DEAL", label: "Paket Anlaşması" },
    { value: "LIMITED_TIME", label: "Sınırlı Süre" },
    { value: "FLASH_SALE", label: "Flaş Satış" },
    { value: "OTHER", label: "Diğer" },
  ];

  return (
    <div className="bg-white rounded-8 p-24 mb-24">
      <h4 className="mb-16">Temel Bilgiler</h4>

      <div className="d-flex flex-column gap-3">
        <FormInput
          name="title"
          type="text"
          label="Kampanya Başlığı"
          placeholder="Kampanya başlığını girin"
          variant="inline"
          required
        />

        <FormAutocomplete
          name="campaignType"
          label="Kampanya Türü"
          options={campaignTypeOptions}
          variant="inline"
          required
        />

        <FormInput
          name="shortDescription"
          type="text"
          label="Kısa Açıklama"
          placeholder="Kısa açıklama girin"
          variant="inline"
        />

        <FormInput
          name="academicYear"
          type="text"
          label="Akademik Yıl"
          placeholder="Örn: 2024-2025"
          variant="inline"
        />

        <FormTextarea
          name="description"
          label="Detaylı Açıklama"
          placeholder="Kampanya hakkında detaylı bilgi verin"
          variant="inline"
          rows={4}
          required
        />
      </div>
    </div>
  );
};

export default BasicInfoSection;

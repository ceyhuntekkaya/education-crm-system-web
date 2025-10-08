"use client";

import React from "react";
import { FormInput, FormAutocomplete, FormCheckbox } from "@/components/forms";

interface TargetAudienceSectionProps {}

const TargetAudienceSection: React.FC<TargetAudienceSectionProps> = () => {
  const targetAudienceOptions = [
    { value: "ALL", label: "Herkesi" },
    { value: "NEW_STUDENTS", label: "Yeni Öğrenciler" },
    { value: "EXISTING_STUDENTS", label: "Mevcut Öğrenciler" },
    { value: "SIBLINGS", label: "Kardeşler" },
    { value: "EARLY_REGISTRANTS", label: "Erken Kayıt Yapanlar" },
    { value: "LOCAL_RESIDENTS", label: "Yerel Sakinler" },
    { value: "REFERRALS", label: "Referanslar" },
    { value: "VIP_MEMBERS", label: "VIP Üyeler" },
    { value: "SPECIFIC_GRADES", label: "Belirli Sınıflar" },
    { value: "SPECIFIC_AGES", label: "Belirli Yaşlar" },
    { value: "LOYALTY_MEMBERS", label: "Sadakat Üyeleri" },
    { value: "FIRST_TIME_VISITORS", label: "İlk Kez Gelenler" },
  ];

  return (
    <div className="bg-white rounded-8 p-24 mb-24">
      <h4 className="mb-16">Hedef Kitle</h4>

      <div className="d-flex flex-column gap-3">
        <FormAutocomplete
          name="targetAudience"
          label="Hedef Kitle"
          options={targetAudienceOptions}
          variant="inline"
          required
        />

        <FormInput
          name="targetGradeLevels"
          type="text"
          label="Hedef Sınıf Seviyeleri"
          placeholder="Örn: 1,2,3 veya 9-12"
          variant="inline"
        />

        <FormInput
          name="targetAgeMin"
          type="number"
          label="Minimum Yaş"
          placeholder="0"
          variant="inline"
          min="0"
          max="100"
        />

        <FormInput
          name="targetAgeMax"
          type="number"
          label="Maksimum Yaş"
          placeholder="0"
          variant="inline"
          min="0"
          max="100"
        />

        <FormCheckbox
          name="targetNewStudentsOnly"
          label="Sadece Yeni Öğrenciler"
        />

        <FormCheckbox
          name="targetSiblingDiscount"
          label="Kardeş İndirimi Uygula"
        />
      </div>
    </div>
  );
};

export default TargetAudienceSection;

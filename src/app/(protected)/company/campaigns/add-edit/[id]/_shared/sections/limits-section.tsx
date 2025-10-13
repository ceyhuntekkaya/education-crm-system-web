"use client";

import React from "react";
import { FormInput, FormCheckbox } from "@/components/forms";

interface LimitsSectionProps {}

const LimitsSection: React.FC<LimitsSectionProps> = () => {
  return (
    <div className="bg-white rounded-8 p-24 mb-24">
      <h4 className="mb-16">Kullanım Limitleri ve Ayarlar</h4>

      <div className="d-flex flex-column gap-3">
        <FormInput
          name="usageLimit"
          type="number"
          label="Toplam Kullanım Limiti"
          placeholder="0 (Sınırsız)"
          variant="inline"
          min="0"
        />

        <FormInput
          name="perUserLimit"
          type="number"
          label="Kullanıcı Başına Limit"
          placeholder="0 (Sınırsız)"
          variant="inline"
          min="0"
        />

        <FormInput
          name="perSchoolLimit"
          type="number"
          label="Okul Başına Limit"
          placeholder="0 (Sınırsız)"
          variant="inline"
          min="0"
        />

        <FormInput
          name="priority"
          type="number"
          label="Öncelik"
          placeholder="0"
          variant="inline"
          min="0"
        />

        <FormInput
          name="sortOrder"
          type="number"
          label="Sıralama"
          placeholder="0"
          variant="inline"
          min="0"
        />

        <FormInput
          name="freeTrialDays"
          type="number"
          label="Ücretsiz Deneme Günü"
          placeholder="0"
          variant="inline"
          min="0"
        />

        <FormCheckbox name="isFeatured" label="Öne Çıkarılsın" />

        <FormCheckbox name="isPublic" label="Herkese Açık" />

        <FormCheckbox name="requiresApproval" label="Onay Gerektirir" />
      </div>
    </div>
  );
};

export default LimitsSection;

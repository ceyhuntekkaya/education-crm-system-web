"use client";

import React from "react";
import { FormInput, FormTextarea } from "@/components/forms";

interface SeoSectionProps {}

const SeoSection: React.FC<SeoSectionProps> = () => {
  return (
    <div className="bg-white rounded-8 p-24 mb-24">
      <h4 className="mb-16">SEO ve Meta Bilgileri</h4>

      <div className="d-flex flex-column gap-3">
        <div>
          <FormInput
            name="metaTitle"
            type="text"
            label="Meta Başlık"
            placeholder="Kampanya için SEO başlığı"
            variant="inline"
            maxLength={60}
          />
          <small className="text-muted">Maksimum 60 karakter önerilir</small>
        </div>

        <div>
          <FormTextarea
            name="metaDescription"
            label="Meta Açıklama"
            placeholder="Kampanya için SEO açıklaması"
            variant="inline"
            rows={3}
            maxLength={160}
          />
          <small className="text-muted">Maksimum 160 karakter önerilir</small>
        </div>

        <div>
          <FormInput
            name="metaKeywords"
            type="text"
            label="Meta Anahtar Kelimeler"
            placeholder="kampanya, indirim, eğitim, okul"
            variant="inline"
          />
          <small className="text-muted">Virgülle ayırarak yazın</small>
        </div>
      </div>
    </div>
  );
};

export default SeoSection;

"use client";

import React from "react";
import { FormTextarea } from "@/components/forms";

interface AdditionalSectionProps {}

const AdditionalSection: React.FC<AdditionalSectionProps> = () => {
  return (
    <div className="bg-white rounded-8 p-24 mb-24">
      <h4 className="mb-16">Ek Özellikler</h4>

      <div className="d-flex flex-column gap-3">
        <FormTextarea
          name="freeServices"
          label="Ücretsiz Hizmetler"
          placeholder="Kampanya kapsamında sunulan ücretsiz hizmetler..."
          variant="inline"
          rows={3}
        />

        <FormTextarea
          name="bonusFeatures"
          label="Bonus Özellikler"
          placeholder="Kampanya ile birlikte verilen bonus özellikler..."
          variant="inline"
          rows={3}
        />

        <FormTextarea
          name="giftItems"
          label="Hediye Ürünler"
          placeholder="Kampanya kapsamında verilen hediyeler..."
          variant="inline"
          rows={3}
        />
      </div>
    </div>
  );
};

export default AdditionalSection;

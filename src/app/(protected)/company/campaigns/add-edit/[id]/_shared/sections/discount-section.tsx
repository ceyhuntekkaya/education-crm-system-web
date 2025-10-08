"use client";

import React from "react";
import { FormInput, FormAutocomplete } from "@/components/forms";

interface DiscountSectionProps {}

const DiscountSection: React.FC<DiscountSectionProps> = () => {
  const discountTypeOptions = [
    { value: "FIXED_AMOUNT", label: "Sabit Tutar" },
    { value: "PERCENTAGE", label: "Yüzde" },
    { value: "FREE_MONTHS", label: "Ücretsiz Aylar" },
    { value: "BUY_X_GET_Y", label: "X Al Y Öde" },
    { value: "TIERED", label: "Kademeli" },
    { value: "BUNDLE", label: "Paket" },
    { value: "NO_DISCOUNT", label: "İndirim Yok" },
  ];

  return (
    <div className="bg-white rounded-8 p-24 mb-24">
      <h4 className="mb-16">İndirim Bilgileri</h4>

      <div className="d-flex flex-column gap-3">
        <FormAutocomplete
          name="discountType"
          label="İndirim Türü"
          options={discountTypeOptions}
          variant="inline"
        />

        <FormInput
          name="discountAmount"
          type="number"
          label="İndirim Tutarı (TL)"
          placeholder="0"
          variant="inline"
          min="0"
          step="0.01"
        />

        <FormInput
          name="discountPercentage"
          type="number"
          label="İndirim Yüzdesi (%)"
          placeholder="0"
          variant="inline"
          min="0"
          max="100"
          step="0.01"
        />

        <FormInput
          name="maxDiscountAmount"
          type="number"
          label="Maksimum İndirim Tutarı (TL)"
          placeholder="0"
          variant="inline"
          min="0"
          step="0.01"
        />

        <FormInput
          name="minPurchaseAmount"
          type="number"
          label="Minimum Satın Alma Tutarı (TL)"
          placeholder="0"
          variant="inline"
          min="0"
          step="0.01"
        />

        <FormInput
          name="promoCode"
          type="text"
          label="Promosyon Kodu"
          placeholder="Promosyon kodunu girin"
          variant="inline"
        />
      </div>
    </div>
  );
};

export default DiscountSection;

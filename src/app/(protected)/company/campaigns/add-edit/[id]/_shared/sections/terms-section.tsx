"use client";

import React from "react";
import { FormTextarea, FormInput } from "@/components/forms";

interface TermsSectionProps {}

const TermsSection: React.FC<TermsSectionProps> = () => {
  return (
    <div className="bg-white rounded-8 p-24 mb-24">
      <h4 className="mb-16">Şartlar ve Koşullar</h4>

      <div className="d-flex flex-column gap-3">
        <FormTextarea
          name="termsAndConditions"
          label="Şartlar ve Koşullar"
          placeholder="Kampanya şartlarını ve koşullarını detaylı olarak yazın..."
          variant="inline"
          rows={4}
        />

        <FormTextarea
          name="finePrint"
          label="Küçük Yazı (Fine Print)"
          placeholder="Ek detaylar ve önemli notlar..."
          variant="inline"
          rows={3}
        />

        <FormTextarea
          name="exclusions"
          label="İstisnalar"
          placeholder="Kampanya kapsamı dışında kalan durumlar..."
          variant="inline"
          rows={3}
        />

        <FormInput
          name="paymentDeadlineDays"
          type="number"
          label="Ödeme Son Tarihi (Gün)"
          placeholder="30"
          variant="inline"
          min="0"
        />

        <FormInput
          name="installmentOptions"
          type="text"
          label="Taksit Seçenekleri"
          placeholder="2, 3, 6, 12 taksit"
          variant="inline"
        />

        <FormTextarea
          name="refundPolicy"
          label="İade Politikası"
          placeholder="İade koşulları ve süreci..."
          variant="inline"
          rows={3}
        />
      </div>
    </div>
  );
};

export default TermsSection;

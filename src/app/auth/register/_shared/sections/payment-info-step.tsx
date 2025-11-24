"use client";

import React from "react";
import { FormInput, FormCheckbox } from "@/components/forms";
import CustomCard from "@/components/ui/custom-card";

/**
 * Step 6: Payment Info
 * Ödeme bilgileri ve sözleşmeler
 */
export const PaymentInfoStep: React.FC = () => {
  return (
    <div className="register-step-content">
      {/* Kart Bilgileri Card */}
      <CustomCard
        title="Kart Bilgileri"
        subtitle="Ödeme bilgilerinizi güvenli bir şekilde giriniz"
        mb="mb-24"
      >
        <div className="row row-gap-24">
          {/* Kart Sahibi Adı */}
          <div className="col-12">
            <FormInput
              name="paymentInfo.cardHolderName"
              label="Kart Sahibinin Adı Soyadı"
              placeholder="AHMET YILMAZ"
              isRequired
            />
          </div>

          {/* Kart Numarası */}
          <div className="col-12">
            <FormInput
              name="paymentInfo.cardNumber"
              type="cardNumber"
              label="Kart Numarası"
              placeholder="1234 5678 9012 3456"
              autoComplete="cc-number"
              isRequired
            />
          </div>

          <div className="col-md-6">
            {/* Son Kullanma Tarihi */}
            <label className="form-label fw-medium mb-8">
              Son Kullanma Tarihi
            </label>
            <div className="d-flex gap-8">
              <FormInput
                name="paymentInfo.expiryMonth"
                type="expiryMonth"
                placeholder="AA"
                autoComplete="cc-exp-month"
                className="text-center"
                isRequired
              />
              <span className="d-flex align-items-center">/</span>
              <FormInput
                name="paymentInfo.expiryYear"
                type="expiryYear"
                placeholder="YY"
                autoComplete="cc-exp-year"
                className="text-center"
                isRequired
              />
            </div>
          </div>

          {/* CVV */}
          <div className="col-md-6">
            <FormInput
              name="paymentInfo.cvv"
              type="cvv"
              label="CVV"
              placeholder="123"
              isRequired
              autoComplete="cc-csc"
            />
          </div>
        </div>
      </CustomCard>

      {/* Sözleşmeler Card */}
      <CustomCard title="Sözleşme ve Onaylar" mb="mb-24">
        <div className="row row-gap-16">
          {/* Kullanım Koşulları */}
          <div className="col-12">
            <FormCheckbox
              id="acceptTerms"
              name="paymentInfo.acceptTerms"
              isRequired
              variant="outlined"
              label={
                <>
                  <a
                    href="/terms"
                    target="_blank"
                    className="text-main-600 fw-medium"
                  >
                    Kullanım Koşulları
                  </a>
                  &apos;nı okudum ve kabul ediyorum{" "}
                  <span className="text-danger">*</span>
                </>
              }
            />
          </div>

          {/* Gizlilik Politikası */}
          <div className="col-12">
            <FormCheckbox
              id="acceptPrivacy"
              name="paymentInfo.acceptPrivacy"
              isRequired
              variant="outlined"
              label={
                <>
                  <a
                    href="/privacy"
                    target="_blank"
                    className="text-main-600 fw-medium"
                  >
                    Gizlilik Politikası
                  </a>
                  &apos;nı okudum ve kabul ediyorum{" "}
                  <span className="text-danger">*</span>
                </>
              }
            />
          </div>

          {/* Pazarlama İzni */}
          <div className="col-12">
            <FormCheckbox
              id="acceptMarketing"
              name="paymentInfo.acceptMarketing"
              label="Kampanya ve tanıtım içeriklerinden haberdar olmak istiyorum (Opsiyonel)"
              variant="outlined"
            />
          </div>
        </div>
      </CustomCard>

      {/* Güvenlik Bildirimi */}
      <div className="alert alert-info d-flex align-items-start gap-12 mb-0">
        <i className="ri-shield-check-line text-info-600 text-2xl"></i>
        <div className="flex-grow-1">
          <strong className="d-block mb-8 text-neutral-900 fw-semibold">
            Güvenli Ödeme
          </strong>
          <p className="mb-0 text-sm text-neutral-700">
            Tüm ödeme işlemleriniz SSL sertifikası ile şifrelenmiş ve güvenli
            bir şekilde işlenir. Kart bilgileriniz hiçbir zaman saklanmaz.
          </p>
        </div>
      </div>
    </div>
  );
};

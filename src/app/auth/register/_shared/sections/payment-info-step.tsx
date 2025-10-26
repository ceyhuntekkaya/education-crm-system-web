"use client";

import React, { useState } from "react";
import { FormInput } from "@/components/forms";
import CustomCard from "@/components/ui/custom-card";
import { useForm } from "@/contexts/form-context";

/**
 * Step 6: Payment Info
 * Ödeme bilgileri ve sözleşmeler
 */
export const PaymentInfoStep: React.FC = () => {
  const { values, setValue } = useForm();
  const [showCardNumber, setShowCardNumber] = useState(false);

  const paymentInfo = values?.paymentInfo || {};

  // Kart numarası formatlama (4'lü gruplar)
  const formatCardNumber = (value: string) => {
    const cleaned = value.replace(/\s/g, "").replace(/\D/g, "");
    const groups = cleaned.match(/.{1,4}/g);
    return groups ? groups.join(" ") : cleaned;
  };

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
              onChange={(e) =>
                setValue(
                  "paymentInfo.cardHolderName",
                  e.target.value.toUpperCase()
                )
              }
              required
              autoComplete="cc-name"
            />
          </div>

          {/* Kart Numarası */}
          <div className="col-12">
            <div className="position-relative">
              <FormInput
                name="paymentInfo.cardNumber"
                type={showCardNumber ? "text" : "password"}
                label="Kart Numarası"
                placeholder="1234 5678 9012 3456"
                value={formatCardNumber(paymentInfo.cardNumber || "")}
                onChange={(e) => {
                  const cleaned = e.target.value
                    .replace(/\s/g, "")
                    .replace(/\D/g, "");
                  setValue("paymentInfo.cardNumber", cleaned);
                }}
                required
                autoComplete="cc-number"
                maxLength={19}
              />
              <button
                type="button"
                className="btn btn-sm btn-outline-neutral position-absolute"
                style={{ right: "12px", top: "38px" }}
                onClick={() => setShowCardNumber(!showCardNumber)}
              >
                <i
                  className={`ph-bold ${
                    showCardNumber ? "ph-eye-slash" : "ph-eye"
                  }`}
                />
              </button>
            </div>
          </div>

          <div className="col-md-6">
            {/* Son Kullanma Tarihi */}
            <label className="form-label fw-medium mb-8">
              Son Kullanma Tarihi <span className="text-danger">*</span>
            </label>
            <div className="d-flex gap-8">
              <FormInput
                name="paymentInfo.expiryMonth"
                type="text"
                placeholder="AA"
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, "");
                  if (parseInt(value) <= 12) {
                    setValue("paymentInfo.expiryMonth", value);
                  }
                }}
                maxLength={2}
                autoComplete="cc-exp-month"
                className="text-center"
              />
              <span className="d-flex align-items-center">/</span>
              <FormInput
                name="paymentInfo.expiryYear"
                type="text"
                placeholder="YY"
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, "");
                  setValue("paymentInfo.expiryYear", value);
                }}
                maxLength={2}
                autoComplete="cc-exp-year"
                className="text-center"
              />
            </div>
          </div>

          {/* CVV */}
          <div className="col-md-6">
            <FormInput
              name="paymentInfo.cvv"
              type="password"
              label="CVV"
              placeholder="123"
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, "");
                setValue("paymentInfo.cvv", value);
              }}
              required
              autoComplete="cc-csc"
              maxLength={4}
            />
          </div>
        </div>
      </CustomCard>

      {/* Sözleşmeler Card */}
      <CustomCard
        title="Sözleşme ve Onaylar"
        mb="mb-24"
      >
        <div className="row row-gap-16">
          {/* Kullanım Koşulları */}
          <div className="col-12">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="acceptTerms"
                checked={paymentInfo.acceptTerms || false}
                onChange={(e) =>
                  setValue("paymentInfo.acceptTerms", e.target.checked)
                }
                required
              />
              <label className="form-check-label" htmlFor="acceptTerms">
                <a
                  href="/terms"
                  target="_blank"
                  className="text-main-600 fw-medium"
                >
                  Kullanım Koşulları
                </a>
                &apos;nı okudum ve kabul ediyorum{" "}
                <span className="text-danger">*</span>
              </label>
            </div>
          </div>

          {/* Gizlilik Politikası */}
          <div className="col-12">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="acceptPrivacy"
                checked={paymentInfo.acceptPrivacy || false}
                onChange={(e) =>
                  setValue("paymentInfo.acceptPrivacy", e.target.checked)
                }
                required
              />
              <label className="form-check-label" htmlFor="acceptPrivacy">
                <a
                  href="/privacy"
                  target="_blank"
                  className="text-main-600 fw-medium"
                >
                  Gizlilik Politikası
                </a>
                &apos;nı okudum ve kabul ediyorum{" "}
                <span className="text-danger">*</span>
              </label>
            </div>
          </div>

          {/* Pazarlama İzni */}
          <div className="col-12">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="acceptMarketing"
                checked={paymentInfo.acceptMarketing || false}
                onChange={(e) =>
                  setValue("paymentInfo.acceptMarketing", e.target.checked)
                }
              />
              <label className="form-check-label" htmlFor="acceptMarketing">
                Kampanya ve tanıtım içeriklerinden haberdar olmak istiyorum
                (Opsiyonel)
              </label>
            </div>
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

"use client";

import React from "react";
import { FormInput } from "@/components/forms";
import CustomCard from "@/components/ui/custom-card";

/**
 * Step 1: Login Credentials
 * Kullanıcı adı ve şifre bilgileri
 */
export const LoginCredentialsStep: React.FC = () => {
  return (
    <div className="register-step-content">
      {/* Ana Card - Form içeriği */}
      <CustomCard
        title="Giriş Bilgileri"
        subtitle="Sisteme giriş yapmak için kullanacağınız kullanıcı adı ve şifrenizi belirleyin"
      >
        <div className="row row-gap-24">
          {/* Kullanıcı Adı */}
          <div className="col-12">
            <FormInput
              name="loginCredentials.username"
              label="Kullanıcı Adı"
              placeholder="Kullanıcı adınızı giriniz..."
              required
              autoComplete="username"
            />
          </div>

          {/* Şifre */}
          <div className="col-md-6">
            <FormInput
              name="loginCredentials.password"
              type="password"
              label="Şifre"
              placeholder="Şifrenizi giriniz..."
              required
              autoComplete="new-password"
            />
          </div>

          {/* Şifre Onay */}
          <div className="col-md-6">
            <FormInput
              name="loginCredentials.confirmPassword"
              type="password"
              label="Şifre Onay"
              placeholder="Şifrenizi tekrar giriniz..."
              required
              autoComplete="new-password"
            />
          </div>
        </div>
      </CustomCard>

      {/* Bilgilendirme Card */}
      <CustomCard mt="mt-24">
        <div className="d-flex align-items-start gap-12">
          <i className="ri-information-line text-info-600 text-2xl flex-shrink-0"></i>
          <div className="flex-grow-1">
            <strong className="d-block mb-12 text-neutral-900 fw-semibold">
              Şifre Gereksinimleri
            </strong>
            <ul className="mb-0 ps-20 text-sm text-neutral-700">
              <li className="mb-4">En az 8 karakter uzunluğunda</li>
              <li className="mb-4">Bir büyük harf, bir küçük harf</li>
              <li>En az bir rakam ve bir özel karakter</li>
            </ul>
          </div>
        </div>
      </CustomCard>
    </div>
  );
};

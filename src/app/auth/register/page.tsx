"use client";

import React from "react";
import { RegisterForm } from "./_shared/register-form";

/**
 * Register Page
 * 6 adımlı kayıt sayfası
 */
const RegisterPage: React.FC = () => {
  return (
    <div className="register-page">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-40">
          <h2 className="mb-16">Hesap Oluştur</h2>
          <p className="text-neutral-600 mb-0">
            Tüm özelliklere erişmek için 6 adımlı kayıt sürecini tamamlayın
          </p>
        </div>

        {/* Register Form */}
        <RegisterForm />

        {/* Footer Link */}
        <div className="text-center mt-32 pt-24 border-top">
          <p className="text-neutral-600 mb-0">
            Zaten hesabınız var mı?{" "}
            <a href="/auth/login" className="text-main-600 fw-semibold">
              Giriş Yapın
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;

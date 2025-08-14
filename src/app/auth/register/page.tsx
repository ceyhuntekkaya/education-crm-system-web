"use client";

import React, { useState } from "react";
import * as yup from "yup";
import Link from "next/link";
import { Form, FormInput, FormButton } from "@/components";
import { FormProvider, FormValues } from "@/contexts";
import { ROUTES } from "@/constants";

// Yup validation schema
const validationSchema = yup.object({
  name: yup
    .string()
    .required("Ad Soyad zorunludur")
    .min(2, "Ad Soyad en az 2 karakter olmalıdır")
    .max(100, "Ad Soyad en fazla 100 karakter olabilir"),

  email: yup
    .string()
    .required("E-posta zorunludur")
    .email("Geçerli bir e-posta adresi giriniz"),

  password: yup
    .string()
    .required("Şifre zorunludur")
    .min(6, "Şifre en az 6 karakter olmalıdır")
    .max(50, "Şifre en fazla 50 karakter olabilir"),
});

// İlk değerler
const initialValues = {
  name: "",
  email: "",
  password: "",
};

export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (values: FormValues) => {
    setIsLoading(true);
    setMessage("");

    // Simulate registration
    setTimeout(() => {
      console.log("Kayıt formu gönderildi:", values);
      setMessage(
        "Kayıt işlemi tamamlandı! Giriş yapmak için yönlendiriliyorsunuz..."
      );
      setTimeout(() => {
        window.location.href = ROUTES.AUTH.LOGIN;
      }, 2000);
    }, 1000);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Yeni hesap oluşturun
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Bu bir demo uygulamadır
          </p>
        </div>

        <div className="bg-white shadow-md rounded-lg p-8">
          <FormProvider
            initialValues={initialValues}
            validationSchema={validationSchema}
          >
            <Form onSubmit={handleSubmit} className="space-y-6">
              <FormInput
                name="name"
                type="text"
                label="Ad Soyad"
                placeholder="Adınızı ve soyadınızı girin"
                helperText="Gerçek ad ve soyadınızı yazınız"
              />

              <FormInput
                name="email"
                type="email"
                label="E-posta adresi"
                placeholder="E-posta adresinizi girin"
                helperText="Geçerli bir e-posta adresi girin (örn: kullanici@ornek.com)"
              />

              <FormInput
                name="password"
                type="password"
                label="Şifre"
                placeholder="Şifrenizi girin"
                helperText="En az 6 karakter uzunluğunda güvenli bir şifre"
              />

              {message && (
                <div
                  className={`text-sm text-center p-2 rounded ${
                    message.includes("tamamlandı")
                      ? "text-green-600 bg-green-50"
                      : "text-red-600 bg-red-50"
                  }`}
                >
                  {message}
                </div>
              )}

              <FormButton
                variant="primary"
                disableOnInvalid
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? "Kayıt oluşturuluyor..." : "Hesap Oluştur"}
              </FormButton>

              <div className="text-center">
                <Link
                  href={ROUTES.AUTH.LOGIN}
                  className="text-blue-600 hover:text-blue-500"
                >
                  Zaten hesabınız var mı? Giriş yapın
                </Link>
              </div>
            </Form>
          </FormProvider>
        </div>
      </div>
    </div>
  );
}

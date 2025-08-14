"use client";

import React from "react";
import * as yup from "yup";
import Link from "next/link";
import { useAuth } from "@/contexts";
import { useRouter } from "next/navigation";
import { Form, FormInput, FormButton } from "@/components";
import { FormProvider, FormValues } from "@/contexts";
import { ROUTES } from "@/constants";

// Yup validation schema
const validationSchema = yup.object({
  email: yup
    .string()
    .required("E-posta zorunludur")
    .email("Geçerli bir e-posta adresi giriniz"),

  password: yup
    .string()
    .required("Şifre zorunludur")
    .min(6, "Şifre en az 6 karakter olmalıdır"),
});

// İlk değerler
const initialValues = {
  email: "",
  password: "",
};

export default function LoginPage() {
  const { login, isLoading } = useAuth();
  const router = useRouter();

  const handleSubmit = async (values: FormValues) => {
    const success = await login(
      values.email as string,
      values.password as string
    );
    if (success) {
      router.push(ROUTES.DASHBOARD.HOME);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Hesabınıza giriş yapın
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Sistemimizi test etmek için aşağıdaki demo hesapları
            kullanabilirsiniz:
          </p>
          <div className="mt-4 space-y-3">
            {/* Admin Hesabı */}
            <div className="bg-gradient-to-r from-red-50 to-red-100 border border-red-200 rounded-lg p-3">
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-lg">👑</span>
                <h4 className="font-semibold text-red-800">Admin Hesabı</h4>
              </div>
              <div className="text-xs text-red-700">
                <div>
                  <strong>E-posta:</strong> admin@example.com
                </div>
                <div>
                  <strong>Şifre:</strong> admin123
                </div>
                <div className="mt-1 text-red-600">
                  Tüm sistem yönetimi özelliklerine erişim
                </div>
              </div>
            </div>

            {/* Kurum Hesabı */}
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-lg p-3">
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-lg">🏢</span>
                <h4 className="font-semibold text-blue-800">Kurum Hesabı</h4>
              </div>
              <div className="text-xs text-blue-700">
                <div>
                  <strong>E-posta:</strong> institution@example.com
                </div>
                <div>
                  <strong>Şifre:</strong> inst123
                </div>
                <div className="mt-1 text-blue-600">
                  Kurum yönetimi ve öğrenci işlemleri
                </div>
              </div>
            </div>

            {/* Kullanıcı Hesabı */}
            <div className="bg-gradient-to-r from-green-50 to-green-100 border border-green-200 rounded-lg p-3">
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-lg">👤</span>
                <h4 className="font-semibold text-green-800">
                  Kullanıcı Hesabı
                </h4>
              </div>
              <div className="text-xs text-green-700">
                <div>
                  <strong>E-posta:</strong> user@example.com
                </div>
                <div>
                  <strong>Şifre:</strong> user123
                </div>
                <div className="mt-1 text-green-600">
                  Temel kullanıcı özellikleri ve profil yönetimi
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-lg p-8">
          <FormProvider
            initialValues={initialValues}
            validationSchema={validationSchema}
          >
            <Form onSubmit={handleSubmit} className="space-y-6">
              <FormInput
                name="email"
                type="email"
                label="E-posta adresi"
                placeholder="E-posta adresinizi girin"
                helperText="Kayıtlı e-posta adresinizi giriniz"
              />

              <FormInput
                name="password"
                type="password"
                label="Şifre"
                placeholder="Şifrenizi girin"
                helperText="Hesabınızın şifresini giriniz"
              />

              <FormButton
                variant="primary"
                disableOnInvalid
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? "Giriş yapılıyor..." : "Giriş Yap"}
              </FormButton>

              <div className="text-center">
                <Link
                  href={ROUTES.AUTH.REGISTER}
                  className="text-blue-600 hover:text-blue-500"
                >
                  Hesabınız yok mu? Kayıt olun
                </Link>
              </div>
            </Form>
          </FormProvider>
        </div>
      </div>
    </div>
  );
}

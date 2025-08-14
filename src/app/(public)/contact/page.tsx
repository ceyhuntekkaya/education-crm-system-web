"use client";

import React, { useState } from "react";
import * as yup from "yup";
import { Form, FormInput, FormTextarea, FormButton } from "@/components";
import { FormProvider, FormValues } from "@/contexts";

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

  subject: yup
    .string()
    .required("Konu zorunludur")
    .min(5, "Konu en az 5 karakter olmalıdır")
    .max(200, "Konu en fazla 200 karakter olabilir"),

  message: yup
    .string()
    .required("Mesaj zorunludur")
    .min(10, "Mesaj en az 10 karakter olmalıdır")
    .max(1000, "Mesaj en fazla 1000 karakter olabilir"),
});

// İlk değerler
const initialValues = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

export default function ContactPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (values: FormValues) => {
    setIsLoading(true);
    setSuccessMessage("");

    // Simulate message sending
    setTimeout(() => {
      console.log("İletişim formu gönderildi:", values);
      setSuccessMessage(
        "Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağız."
      );
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">İletişim</h1>
            <p className="text-lg text-gray-600">
              Bizimle iletişime geçmek için aşağıdaki bilgileri
              kullanabilirsiniz.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                  İletişim Bilgileri
                </h2>

                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="text-blue-600 text-xl">📍</div>
                    <div>
                      <h3 className="font-medium text-gray-900">Adres</h3>
                      <p className="text-gray-600">
                        Atatürk Mahallesi, Teknoloji Sokak No: 123
                        <br />
                        34100 Fatih/İstanbul
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="text-blue-600 text-xl">📞</div>
                    <div>
                      <h3 className="font-medium text-gray-900">Telefon</h3>
                      <p className="text-gray-600">+90 212 123 45 67</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="text-blue-600 text-xl">✉️</div>
                    <div>
                      <h3 className="font-medium text-gray-900">E-posta</h3>
                      <p className="text-gray-600">info@educrm.com</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="text-blue-600 text-xl">🕒</div>
                    <div>
                      <h3 className="font-medium text-gray-900">
                        Çalışma Saatleri
                      </h3>
                      <p className="text-gray-600">
                        Pazartesi - Cuma: 09:00 - 18:00
                        <br />
                        Cumartesi: 09:00 - 15:00
                        <br />
                        Pazar: Kapalı
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                  Bize Yazın
                </h2>

                <FormProvider
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                >
                  <Form onSubmit={handleSubmit} className="space-y-4">
                    <FormInput
                      name="name"
                      label="Ad Soyad"
                      placeholder="Adınızı ve soyadınızı giriniz"
                      helperText="Gerçek ad ve soyadınızı yazınız"
                    />

                    <FormInput
                      name="email"
                      type="email"
                      label="E-posta"
                      placeholder="E-posta adresinizi giriniz"
                      helperText="Size geri dönüş yapabilmemiz için gereklidir"
                    />

                    <FormInput
                      name="subject"
                      label="Konu"
                      placeholder="Mesajınızın konusunu giriniz"
                      helperText="Mesajınızın ana konusunu belirtiniz"
                    />

                    <FormTextarea
                      name="message"
                      label="Mesaj"
                      placeholder="Mesajınızı buraya yazınız"
                      rows={4}
                      helperText="Detaylı bir açıklama yazınız (en az 10 karakter)"
                    />

                    {successMessage && (
                      <div className="text-green-600 text-sm bg-green-50 p-3 rounded">
                        {successMessage}
                      </div>
                    )}

                    <FormButton
                      variant="primary"
                      disableOnInvalid
                      className="w-full"
                      disabled={isLoading}
                    >
                      {isLoading ? "Gönderiliyor..." : "Mesaj Gönder"}
                    </FormButton>
                  </Form>
                </FormProvider>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

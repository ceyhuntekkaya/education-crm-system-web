"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui";

const InputExamples: React.FC = () => {
  const [basicInput, setBasicInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [errorInput, setErrorInput] = useState("");
  const [searchInput, setSearchInput] = useState("");

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          📝 Temel Input
        </h3>
        <div className="space-y-4">
          <Input
            placeholder="Temel input örneği"
            value={basicInput}
            onChange={(e) => setBasicInput(e.target.value)}
          />
          <Input
            label="Etiketli Input"
            placeholder="Etiket ile birlikte input"
            value={basicInput}
            onChange={(e) => setBasicInput(e.target.value)}
            helperText="Bu bir yardımcı metindir."
          />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          📏 Boyutlar
        </h3>
        <div className="space-y-4">
          <Input size="sm" placeholder="Küçük boyut (sm)" label="Küçük Input" />
          <Input
            size="md"
            placeholder="Orta boyut (md) - varsayılan"
            label="Orta Input"
          />
          <Input size="lg" placeholder="Büyük boyut (lg)" label="Büyük Input" />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          🎨 Varyantlar
        </h3>
        <div className="space-y-4">
          <Input
            variant="default"
            placeholder="Varsayılan varyant"
            label="Default Varyant"
          />
          <Input
            variant="filled"
            placeholder="Doldurulmuş varyant"
            label="Filled Varyant"
          />
          <Input
            variant="outlined"
            placeholder="Çerçeveli varyant"
            label="Outlined Varyant"
          />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibent text-gray-900 mb-4">
          🔍 İkonlarla
        </h3>
        <div className="space-y-4">
          <Input
            placeholder="Arama yapın..."
            label="Arama Input'u"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            startIcon={
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            }
          />
          <Input
            type="email"
            placeholder="E-posta adresiniz"
            label="E-posta"
            value={emailInput}
            onChange={(e) => setEmailInput(e.target.value)}
            startIcon={
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                />
              </svg>
            }
          />
          <Input
            type="password"
            placeholder="Şifreniz"
            label="Şifre"
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
            startIcon={
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            }
            endIcon={
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            }
          />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          ⚠️ Hata Durumu
        </h3>
        <div className="space-y-4">
          <Input
            placeholder="Hatalı input"
            label="Hatalı Alan"
            value={errorInput}
            onChange={(e) => setErrorInput(e.target.value)}
            error="Bu alan gereklidir ve geçerli bir değer içermelidir."
          />
          <Input
            placeholder="Geçerli input"
            label="Geçerli Alan"
            value="geçerli@email.com"
            readOnly
          />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          🚫 Devre Dışı
        </h3>
        <div className="space-y-4">
          <Input
            placeholder="Devre dışı input"
            label="Devre Dışı Alan"
            disabled
            value="Bu alan düzenlenemez"
          />
          <Input
            placeholder="Devre dışı ikonlu input"
            label="Devre Dışı İkonlu Alan"
            disabled
            startIcon={
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            }
            value="John Doe"
          />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          📐 Tam Genişlik
        </h3>
        <div className="space-y-4">
          <Input
            placeholder="Tam genişlik input"
            label="Tam Genişlik Input"
            fullWidth
            helperText="Bu input tüm genişliği kaplar"
          />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          📋 Form Örneği
        </h3>
        <div className="space-y-4 max-w-md">
          <Input
            label="Ad Soyad"
            placeholder="Adınızı ve soyadınızı girin"
            required
            fullWidth
          />
          <Input
            type="email"
            label="E-posta"
            placeholder="email@example.com"
            required
            fullWidth
            startIcon={
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                />
              </svg>
            }
          />
          <Input
            type="tel"
            label="Telefon"
            placeholder="+90 (555) 123-4567"
            fullWidth
            startIcon={
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
            }
          />
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          💡 Kullanım İpuçları
        </h3>
        <ul className="space-y-2 text-sm text-gray-600">
          <li>
            • <strong>variant prop&apos;u:</strong> &apos;default&apos;,
            &apos;filled&apos;, veya &apos;outlined&apos; değerlerini alabilir
          </li>
          <li>
            • <strong>size prop&apos;u:</strong> &apos;sm&apos;, &apos;md&apos;,
            veya &apos;lg&apos; değerlerini alabilir
          </li>
          <li>
            • <strong>startIcon ve endIcon:</strong> Input&apos;un başına ve
            sonuna ikon eklemek için kullanılır
          </li>
          <li>
            • <strong>error prop&apos;u:</strong> Hata mesajı göstermek ve
            input&apos;u kırmızı yapmak için kullanılır
          </li>
          <li>
            • <strong>helperText:</strong> Input altında yardımcı metin
            göstermek için kullanılır
          </li>
          <li>
            • <strong>fullWidth:</strong> Input&apos;un tüm genişliği kaplaması
            için kullanılır
          </li>
          <li>
            • <strong>Tüm HTML input özellikleri:</strong> placeholder,
            disabled, required vb. desteklenir
          </li>
        </ul>
      </div>
    </div>
  );
};

export default InputExamples;

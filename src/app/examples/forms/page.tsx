"use client";

import React from "react";
import * as yup from "yup";
import Link from "next/link";
import {
  Form,
  FormInput,
  FormTextarea,
  FormSelect,
  FormCheckbox,
  FormButton,
  FormAutoComplete,
} from "@/components";
import { FormProvider, FormValues } from "@/contexts";
import { useFormHook } from "@/hooks";

// Yup validation schema
const validationSchema = yup.object({
  name: yup
    .string()
    .required("İsim zorunludur")
    .min(2, "İsim en az 2 karakter olmalıdır")
    .max(100, "İsim en fazla 100 karakter olabilir"),

  email: yup
    .string()
    .required("E-posta zorunludur")
    .email("Geçerli bir e-posta adresi giriniz"),

  age: yup
    .number()
    .required("Yaş zorunludur")
    .min(18, "Yaş 18-100 arasında olmalıdır")
    .max(100, "Yaş 18-100 arasında olmalıdır")
    .integer("Yaş tam sayı olmalıdır"),

  category: yup
    .string()
    .required("Kategori seçimi zorunludur")
    .oneOf(
      ["student", "teacher", "admin", "parent"],
      "Geçerli bir kategori seçiniz"
    ),

  city: yup
    .string()
    .required("Şehir seçimi zorunludur")
    .min(2, "Şehir adı en az 2 karakter olmalıdır"),

  description: yup.string().max(500, "Açıklama en fazla 500 karakter olabilir"),

  terms: yup.boolean().oneOf([true], "Kullanım şartlarını kabul etmelisiniz"),
});

// İlk değerler
const initialValues = {
  name: "",
  email: "",
  age: "",
  category: "",
  city: "",
  description: "",
  terms: false,
};

// Kategori seçenekleri
const categoryOptions = [
  { value: "student", label: "Öğrenci" },
  { value: "teacher", label: "Öğretmen" },
  { value: "admin", label: "Yönetici" },
  { value: "parent", label: "Veli" },
];

// Şehir seçenekleri (AutoComplete için)
const cityOptions = [
  { value: "istanbul", label: "İstanbul" },
  { value: "ankara", label: "Ankara" },
  { value: "izmir", label: "İzmir" },
  { value: "bursa", label: "Bursa" },
  { value: "antalya", label: "Antalya" },
  { value: "adana", label: "Adana" },
  { value: "konya", label: "Konya" },
  { value: "gaziantep", label: "Gaziantep" },
  { value: "kayseri", label: "Kayseri" },
  { value: "mersin", label: "Mersin" },
  { value: "eskisehir", label: "Eskişehir" },
  { value: "diyarbakir", label: "Diyarbakır" },
  { value: "samsun", label: "Samsun" },
  { value: "denizli", label: "Denizli" },
  { value: "sakarya", label: "Sakarya" },
  { value: "trabzon", label: "Trabzon" },
  { value: "mugla", label: "Muğla" },
  { value: "balikesir", label: "Balıkesir" },
  { value: "malatya", label: "Malatya" },
  { value: "erzurum", label: "Erzurum" },
  { value: "canakkale", label: "Çanakkale" },
  { value: "afyonkarahisar", label: "Afyonkarahisar" },
  { value: "kirklareli", label: "Kırklareli" },
  { value: "kutahya", label: "Kütahya" },
  { value: "usak", label: "Uşak" },
  { value: "nevsehir", label: "Nevşehir" },
];

export default function FormExamplePage() {
  const handleSubmit = async (values: FormValues) => {
    console.log("Form gönderildi:", values);

    // API çağrısı simülasyonu
    await new Promise((resolve) => setTimeout(resolve, 1000));

    alert("Form başarıyla gönderildi!");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link
                href="/"
                className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors"
              >
                EduCRM
              </Link>
              <span className="text-gray-300">|</span>
              <h1 className="text-lg font-semibold text-gray-800">
                Form Sistemi Örneği
              </h1>
            </div>
            <div className="flex gap-3">
              <Link
                href="/examples"
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
              >
                ← Örneklere Dön
              </Link>
              <Link
                href="/"
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
              >
                🏠 Ana Sayfa
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <FormProvider
            initialValues={initialValues}
            validationSchema={validationSchema}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Sol taraf - Form (yarısı) */}
              <div className="lg:col-span-1">
                <div className="bg-white shadow-md rounded-lg p-8">
                  <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                    📝 Gelişmiş Form Sistemi
                  </h1>

                  <FormContent onSubmit={handleSubmit} />
                </div>

                {/* Açıklama panelleri */}
                <div className="mt-8 space-y-6">
                  <div className="bg-white shadow-md rounded-lg p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">
                      🎯 Yup Validation ile Form Sistemi
                    </h2>
                    <div className="text-sm text-gray-600 space-y-2">
                      <p>• Zorunlu alanlar Yup schema ile belirlenir</p>
                      <p>• Required (*) işareti otomatik gösterilir</p>
                      <p>• Helper text ile kullanıcıya rehberlik sağlanır</p>
                      <p>• Hata durumunda helper text gizlenir</p>
                      <p>• E-posta formatı otomatik kontrol edilir</p>
                      <p>• Yaş 18-100 arasında olmalıdır</p>
                      <p>• Ad/Soyad 2-100 karakter arası</p>
                      <p>• Kategori seçimi zorunludur</p>
                      <p>
                        • Şehir AutoComplete ile seçilir (custom değer de
                        girilebilir)
                      </p>
                      <p>• Açıklama max 500 karakter</p>
                      <p>
                        • Form geçerli olduğunda &quot;Kayıt Ol&quot; butonu
                        aktif olur
                      </p>
                    </div>
                  </div>

                  <div className="bg-white shadow-md rounded-lg p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">
                      🔍 FormAutoComplete Özellikleri
                    </h2>
                    <div className="text-sm text-gray-600 space-y-2">
                      <p>
                        • <strong>Klavye Navigasyonu:</strong> ↑↓ ok tuşları ile
                        seçenekler arası gezinme
                      </p>
                      <p>
                        • <strong>Enter:</strong> Seçili seçeneği onaylama
                      </p>
                      <p>
                        • <strong>Escape:</strong> Dropdown&apos;u kapatma
                      </p>
                      <p>
                        • <strong>Filtreleme:</strong> Yazılan metne göre
                        dinamik filtreleme
                      </p>
                      <p>
                        • <strong>Custom Değer:</strong> Listede olmayan
                        değerlerin girilmesine izin
                      </p>
                      <p>
                        • <strong>Türkçe Karakter Desteği:</strong> İ, ı, ş, ğ,
                        ü, ö, ç karakterleri doğru aranır
                      </p>
                      <p>
                        • <strong>Minimum Karakter:</strong> Filtreleme için
                        minimum karakter sayısı
                      </p>
                      <p>
                        • <strong>Maksimum Sonuç:</strong> Gösterilecek maksimum
                        seçenek sayısı
                      </p>
                      <p>
                        • <strong>Otomatik Scroll:</strong> Seçili öğeye
                        otomatik scroll
                      </p>
                      <p>
                        • <strong>Click Outside:</strong> Dışarı tıklayınca
                        dropdown kapanması
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sağ taraf - Debug bilgileri (diğer yarısı, yan yana) */}
              <div className="lg:col-span-1">
                <div className="sticky top-4">
                  {/* Form Values ve Errors yan yana - diğer yarıyı paylaşıyor */}
                  <div className="grid grid-cols-2 gap-4">
                    <FormDebugValues />
                    <FormDebugErrors />
                  </div>
                </div>
              </div>
            </div>
          </FormProvider>
        </div>
      </div>
    </div>
  );
}

// Debug componentleri
function FormDebugValues() {
  const { values } = useFormHook();

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 border-2 border-blue-200 rounded-lg p-6 shadow-md h-[600px]">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
          <span className="text-white text-base">📊</span>
        </div>
        <h3 className="text-base font-bold text-blue-800">Form Verileri</h3>
      </div>

      <div className="bg-white/70 backdrop-blur-sm rounded p-4 border border-blue-200 h-[520px] overflow-y-auto">
        {Object.keys(values).length > 0 ? (
          <div className="space-y-4">
            {Object.entries(values).map(([key, value]) => (
              <div key={key} className="text-base">
                <div className="flex items-center gap-3 mb-3">
                  <span className="inline-block w-3 h-3 bg-blue-500 rounded-full"></span>
                  <span className="font-semibold text-blue-700 uppercase tracking-wide">
                    {key}
                  </span>
                </div>
                <div className="ml-6 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-400">
                  <span className="text-base text-gray-700 font-mono break-all leading-relaxed">
                    {typeof value === "boolean"
                      ? value
                        ? "✅ true"
                        : "❌ false"
                      : value || "🔸 -"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="text-6xl mb-6">📋</div>
            <p className="text-blue-600 text-lg font-medium mb-3">
              Henüz veri girilmedi
            </p>
            <p className="text-blue-500 text-base mb-6">
              Form alanlarını doldurmaya başlayın
            </p>
            <div className="bg-blue-100 rounded-lg p-4 text-blue-700 text-sm max-w-xs mx-auto">
              <p className="mb-2">💡 İpucu:</p>
              <p>
                Formu doldurdukça burada değerler gerçek zamanlı olarak
                görünecek
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="mt-3 text-sm text-blue-600 text-center font-medium">
        Gerçek zamanlı güncellenir • Toplam: {Object.keys(values).length} alan
      </div>
    </div>
  );
}

function FormDebugErrors() {
  const { errors } = useFormHook();
  const errorCount = Object.keys(errors).filter((key) => errors[key]).length;

  return (
    <div className="bg-gradient-to-br from-red-50 to-pink-100 border-2 border-red-200 rounded-lg p-6 shadow-md h-[600px]">
      <div className="flex items-center gap-3 mb-4">
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center ${
            errorCount > 0 ? "bg-red-500" : "bg-green-500"
          }`}
        >
          <span className="text-white text-base">
            {errorCount > 0 ? "⚠️" : "✅"}
          </span>
        </div>
        <div className="flex-1">
          <h3 className="text-base font-bold text-red-800">
            Validasyon Durumu
          </h3>
          <div className="flex items-center gap-2">
            <span
              className={`inline-block w-3 h-3 rounded-full ${
                errorCount > 0 ? "bg-red-500 animate-pulse" : "bg-green-500"
              }`}
            ></span>
            <span
              className={`text-sm font-medium ${
                errorCount > 0 ? "text-red-600" : "text-green-600"
              }`}
            >
              {errorCount > 0
                ? `${errorCount} Hata Bulundu`
                : "Tüm alanlar geçerli"}
            </span>
          </div>
        </div>
      </div>

      <div className="bg-white/70 backdrop-blur-sm rounded p-4 border border-red-200 h-[520px] overflow-y-auto">
        {errorCount > 0 ? (
          <div className="space-y-4">
            {Object.entries(errors).map(
              ([field, error]) =>
                error && (
                  <div
                    key={field}
                    className="flex items-start gap-4 p-4 bg-red-50 rounded-lg border border-red-200"
                  >
                    <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-sm font-bold">!</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-base font-semibold text-red-700 uppercase mb-2 tracking-wide">
                        {field}
                      </div>
                      <div className="text-base text-red-600 leading-relaxed">
                        {error}
                      </div>
                    </div>
                  </div>
                )
            )}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="text-6xl mb-6">🎉</div>
            <p className="text-green-600 text-xl font-medium mb-3">Mükemmel!</p>
            <p className="text-green-500 text-base mb-6">
              Tüm form alanları doğru şekilde dolduruldu
            </p>
            <div className="bg-green-100 rounded-lg p-4 text-green-700 text-sm max-w-sm mx-auto space-y-2">
              <p className="font-semibold">✓ Başarılı validasyonlar:</p>
              <p>✓ Tüm zorunlu alanlar tamamlandı</p>
              <p>✓ E-posta formatı doğru</p>
              <p>✓ Yaş aralığı uygun</p>
              <p>✓ Karakter sınırları sağlandı</p>
              <p>✓ Kategori seçimi yapıldı</p>
              <p>✓ Kullanım şartları kabul edildi</p>
              <p className="mt-3 font-semibold text-green-800">
                🚀 Form gönderime hazır!
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="mt-3 text-sm text-center font-medium">
        <span className={errorCount > 0 ? "text-red-600" : "text-green-600"}>
          {errorCount > 0
            ? "Hataları düzeltin ve tekrar deneyin"
            : "Form başarıyla doğrulandı 🚀"}
        </span>
      </div>
    </div>
  );
}

// Form içeriği - useFormHook kullanan component
function FormContent({
  onSubmit,
}: {
  onSubmit: (values: FormValues) => Promise<void>;
}) {
  const { resetForm } = useFormHook();

  const handleReset = () => {
    resetForm();
  };

  return (
    <>
      <Form onSubmit={onSubmit} className="space-y-4">
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
          helperText="Geçerli bir e-posta adresi girin (örn: kullanici@ornek.com)"
        />

        <FormInput
          name="age"
          type="number"
          label="Yaş"
          placeholder="Yaşınızı giriniz"
          helperText="18-100 yaş aralığında olmalıdır"
        />

        <FormSelect
          name="category"
          label="Kategori"
          placeholder="Kategori seçiniz"
          options={categoryOptions}
          helperText="Size en uygun kategoriyi seçiniz"
        />

        <FormAutoComplete
          name="city"
          label="Şehir"
          placeholder="Şehir adını yazın veya seçin"
          options={cityOptions}
          helperText="Yaşadığınız şehri seçiniz veya yazınız"
        />

        <FormTextarea
          name="description"
          label="Açıklama"
          placeholder="Kendiniz hakkında kısa bir açıklama yazınız"
          rows={3}
          helperText="İsteğe bağlı - Kendinizi tanıtın (max 500 karakter)"
        />

        <FormCheckbox
          name="terms"
          label="Kullanım şartlarını kabul ediyorum"
          helperText="Devam etmek için kullanım şartlarını kabul etmelisiniz"
        />

        <div className="flex gap-3 pt-4">
          <FormButton variant="primary" disableOnInvalid className="flex-1">
            Kayıt Ol
          </FormButton>

          <FormButton type="button" variant="secondary" onClick={handleReset}>
            Temizle
          </FormButton>
        </div>
      </Form>
    </>
  );
}

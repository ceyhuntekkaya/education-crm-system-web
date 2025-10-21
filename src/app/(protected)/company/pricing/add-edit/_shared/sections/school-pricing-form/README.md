# Pricing Add/Edit Module

Bu modül okul fiyatlandırması ekleme/düzenleme işlemleri için oluşturulmuştur.

## Klasör Yapısı

```
_shared/
├── context/                    # React Context
│   ├── pricing-add-edit-context.tsx
│   └── index.ts
├── hooks/                      # Custom Hooks
│   ├── useSchoolPricing.ts    # Pricing data fetch hook
│   ├── usePricingActions.ts   # Save/Update actions hook
│   └── index.ts
├── types/                      # TypeScript type tanımları
│   ├── context-types.ts       # Context type definitions
│   └── index.ts
├── utils/                      # Utility functions
│   ├── pricing-utils.ts       # Helper functions
│   └── index.ts
├── sections/                   # UI Components
│   └── school-pricing-form/   # Form component
│       ├── school-pricing-form.tsx
│       ├── types/
│       ├── schemas/
│       ├── sections/
│       └── options/
└── index.ts                   # Main exports
```

## Kullanım

```tsx
import { SchoolPricingForm } from "./_shared";

// Yeni kayıt için
<SchoolPricingForm />

// Düzenleme için
<SchoolPricingForm 
  isEditing={true}
  initialData={existingPricingData}
/>
```

## API Entegrasyonu

Form `SchoolPricingFormContent` bileşenindeki `handleSubmit` fonksiyonunda API çağrısı yapılmalıdır:

```tsx
// API servis örneği
const createDto: SchoolPricingCreateDto = {
  ...values,
  schoolId: currentSchoolId,
  createdByUserId: currentUserId,
};

const result = await schoolPricingService.createSchoolPricing(createDto);
```

## Form Alanları

### Temel Bilgiler
- Akademik Yıl (required)
- Sınıf Seviyesi (required) 
- Sınıf Düzeyi
- Para Birimi (required)

### Temel Ücretler
- Kayıt Ücreti
- Başvuru Ücreti  
- Kayıt Tescil Ücreti
- Yıllık/Aylık/Dönemlik Öğrenim Ücretleri

### Ek Ücretler
- Kitap, Üniforma, Aktivite Ücretleri
- Teknoloji, Laboratuvar, Kütüphane Ücretleri
- Spor, Sanat, Müzik Ücretleri
- Ulaşım, Kafeterya, Sigorta Ücretleri

### Ödeme Koşulları
- Ödeme Sıklığı (required)
- Taksit Sayısı
- İndirim Yüzdeleri

### Geçerlilik Tarihleri
- Başlangıç ve Bitiş Tarihleri

### Açıklamalar
- İade Politikası
- Ödeme Koşulları  
- Genel Açıklama

### Görüntüleme Ayarları
- Burs durumu checkboxları
- Görüntüleme seçenekleri

## Validasyon

Tüm form alanları Yup schema ile validate edilir:
- Required alanlar kontrol edilir
- Numerik değerler için min/max limitleri
- Tarih alanları için tutarlılık kontrolleri
- Text alanları için karakter sınırları

## TODO

1. API servis entegrasyonu tamamlanmalı
2. Düzenleme modunda mevcut data'nın yüklenmesi
3. Başarılı kayıt sonrası yönlendirme
4. Hata durumları için proper error handling
5. Loading states eklenmesi
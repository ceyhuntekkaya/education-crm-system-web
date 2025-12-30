# RFQ Form Modal

Bu modül, wishlist'teki seçili ürünler için RFQ (Request for Quotation / Teklif Talebi) oluşturmaya yarayan form yapısıdır.

## 📁 Yapı

```
rfq-form-modal/
├── index.ts                      # Ana export dosyası
├── rfq-form-modal.tsx           # Modal container component
├── options/                     # Form seçenek listeleri
│   ├── index.ts
│   └── rfq-type-options.ts      # RFQ tipi seçenekleri (OPEN, INVITED)
├── schemas/                     # Validation ve initial değerler
│   ├── index.ts
│   ├── initial-values.ts        # Form başlangıç değerleri
│   └── validation-schema.ts     # Yup validation şeması
├── sections/                    # Form içerik bileşenleri
│   ├── index.ts
│   └── form-content.tsx         # Ana form içeriği
└── types/                       # TypeScript type tanımları
    ├── index.ts
    ├── form-data.ts             # Form data interface
    └── props.ts                 # Component props interface
```

## 🎯 Özellikler

### Form Alanları

#### Zorunlu Alanlar
- **Başlık** (title): RFQ başlığı - min 1, max 200 karakter
- **Teklif Son Tarihi** (submissionDeadline): Gelecek bir tarih/saat olmalı

#### Opsiyonel Alanlar
- **Açıklama** (description): Detaylı açıklama - max 2000 karakter
- **RFQ Tipi** (rfqType): OPEN (Açık) veya INVITED (Davetli)
- **Beklenen Teslimat Tarihi** (expectedDeliveryDate): Teklif son tarihinden sonra olmalı
- **Ödeme Koşulları** (paymentTerms): max 1000 karakter
- **Değerlendirme Kriterleri** (evaluationCriteria): max 1000 karakter
- **Teknik Gereksinimler** (technicalRequirements): max 2000 karakter

### Validasyon Kuralları

1. **Başlık**: Zorunlu, 1-200 karakter arası
2. **Teklif Son Tarihi**: Zorunlu, gelecek bir tarih olmalı
3. **Teslimat Tarihi**: Opsiyonel ama varsa teklif tarihinden sonra olmalı
4. **Ürün Seçimi**: En az 1 ürün seçilmeli

## 💻 Kullanım

Component artık context-based çalışıyor, herhangi bir prop gerekmez:

```tsx
import { RFQFormModal } from "./_shared/sections/rfq-form-modal";

// Props gerekmez, tüm değerler context'ten gelir
<RFQFormModal />
```

### Context'ten Alınan Değerler

- `isRFQModalOpen`: Modal açık/kapalı durumu
- `closeRFQModal`: Modal'ı kapatma fonksiyonu
- `submitRFQ`: RFQ submit fonksiyonu
- `selectedProductIds`: Seçilen ürün ID'leri

## 🔄 Form Flow

1. Kullanıcı wishlist'ten ürünleri seçer
2. "RFQ Oluştur" butonuna basar
3. Modal açılır ve form gösterilir
4. Kullanıcı formu doldurur
5. Form validasyondan geçer
6. `onSubmit` callback'i çağrılır
7. API isteği atılır
8. Başarılı ise modal kapanır

## 🎨 Form Context Integration

Form, `FormProvider` ile sarmalanmıştır ve şunları sağlar:
- Otomatik validation
- Error handling
- Form state yönetimi
- Reset fonksiyonalitesi

## 📦 Dependencies

- `@/contexts/form-context`: Form state yönetimi
- `@/components/forms`: Form bileşenleri
- `@/components/ui`: UI bileşenleri
- `yup`: Validation
- `../../hooks/api`: RFQ API hooks

## 🔍 Type Safety

Tüm formlar TypeScript ile type-safe olarak yazılmıştır:
- `RFQFormData`: Form data interface
- `RFQFormModalProps`: Component props
- `RFQCreateDto`: API DTO interface

## 🚀 Best Practices

1. Her değişiklikten sonra validation otomatik çalışır
2. Error mesajları kullanıcı dostu ve Türkçe
3. Loading states form submit sırasında aktif
4. Modal kapatma sırasında unsaved changes korunur
5. Form reset ile temizlenebilir

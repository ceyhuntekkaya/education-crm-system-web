# Register Module

## Genel Bakış

6 adımlı kayıt süreci ile kullanıcı kaydı için geliştirilmiş profesyonel bir modül. Brand modülündeki yapıya benzer şekilde context tabanlı state yönetimi, hook'lar ve section bazlı form yapısı kullanılmıştır.

## Özellikler

### 6 Adımlı Kayıt Süreci

1. **Giriş Bilgileri**: Kullanıcı adı ve şifre belirleme
2. **Kişisel Bilgiler**: Ad, soyad, e-posta ve telefon bilgileri
3. **Doğrulama**: 4 basamaklı e-posta doğrulama kodu
4. **Kampüs Bilgileri**: Marka seçimi, kampüs adı ve lokasyon bilgileri
5. **Paket Seçimi**: Üyelik paketlerinden birini seçme
6. **Ödeme Bilgileri**: Ödeme ve sözleşme bilgileri

### Teknik Özellikler

- ✅ Context tabanlı state yönetimi
- ✅ Her adım için ayrı validation schema
- ✅ Custom hooks ile API entegrasyonu
- ✅ Responsive tasarım
- ✅ Gerçek zamanlı form validasyonu
- ✅ Cascade location selection
- ✅ Güvenli ödeme formu
- ✅ E-posta doğrulama sistemi
- ✅ Seçilebilir paket kartları

## Klasör Yapısı

```
register/
├── _shared/
│   ├── components/          # Reusable components
│   │   ├── register-stepper.tsx
│   │   └── step-navigation.tsx
│   ├── constants/           # Sabit değerler
│   │   └── step-config.ts
│   ├── context/            # Context provider
│   │   └── register-context.tsx
│   ├── hooks/              # Custom hooks
│   │   ├── use-register.ts
│   │   └── use-verification.ts
│   ├── schemas/            # Form schemas
│   │   ├── initial-values.ts
│   │   └── validation-schema.ts
│   ├── sections/           # Step components
│   │   ├── login-credentials-step.tsx
│   │   ├── personal-info-step.tsx
│   │   ├── verification-code-step.tsx
│   │   ├── campus-info-step.tsx
│   │   ├── package-selection-step.tsx
│   │   └── payment-info-step.tsx
│   ├── types/              # Type definitions
│   │   ├── register.types.ts
│   │   └── context.types.ts
│   ├── register-form.tsx   # Ana form component
│   └── index.ts
├── layout.tsx              # Layout with provider
├── page.tsx               # Main page
└── register.scss          # Styles
```

## Kullanım

### Context Kullanımı

```tsx
const {
  formData,
  currentStep,
  nextStep,
  previousStep,
  updateFormData,
  canProceedToNextStep,
  submitRegistration
} = useRegisterContext();
```

### Form Data Güncelleme

```tsx
// Her step kendi data'sını günceller
updateFormData(stepNumber, {
  ...formData.stepName,
  fieldName: value
});
```

### Validation

Her step için ayrı validation schema:
- `loginCredentialsSchema`
- `personalInfoSchema`
- `verificationCodeSchema`
- `campusInfoSchema`
- `packageSelectionSchema`
- `paymentInfoSchema`

## API Endpoints

- `POST /users/register` - Kullanıcı kaydı
- `POST /auth/send-verification-code` - Doğrulama kodu gönderme (Mock)
- `POST /auth/verify-code` - Kod doğrulama (Mock)
- `GET /subscriptions/plans/active` - Aktif paketler
- `GET /institutions/brands/summaries` - Markalar
- `GET /locations/countries` - Ülkeler
- `GET /locations/countries/{id}/provinces` - İller
- `GET /locations/provinces/{id}/districts` - İlçeler
- `GET /locations/districts/{id}/neighborhoods` - Mahalleler

## Önemli Notlar

### Mock Verifikasyon

E-posta doğrulama şu an mock olarak çalışıyor. Test kodu: **1234**

### Form Validation

- Username: Min 3 karakter, sadece harf, rakam ve alt çizgi
- Password: Min 8 karakter, büyük harf, küçük harf, rakam ve özel karakter
- Email: Geçerli e-posta formatı
- Phone: 10 haneli, başında 0 olmadan
- Card: 16 haneli kart numarası
- CVV: 3 veya 4 haneli

### Cascade Selection

Lokasyon seçimi cascade çalışır:
1. Ülke seçilmeden il seçilemez
2. İl seçilmeden ilçe seçilemez
3. İlçe seçilmeden mahalle seçilemez

### Package Selection

- Aylık, 3 aylık ve yıllık faturalama seçenekleri
- Kartlar seçilebilir
- En popüler paket vurgulanır
- Fiyatlar seçilen periyoda göre güncellenir

## Responsive Tasarım

- Desktop: Full grid layout
- Tablet: 2 column layout
- Mobile: Single column, optimized inputs

## Güvenlik

- Şifre alanları masked
- CVV gizli
- Kart numarası formatlanmış
- SSL bildirimi
- HTTPS only
- Input sanitization

## Sonraki Adımlar

1. E-posta doğrulama API entegrasyonu
2. Ödeme gateway entegrasyonu
3. SMS doğrulama opsiyonu
4. 2FA desteği
5. Social login (Google, Facebook)
6. Progress kaydetme (draft)
7. Email template'leri
8. Admin onay süreci

## Geliştirici Notları

- Context provider layout'ta wrap ediliyor
- Her step isolated component
- Form validation step bazlı
- Navigation otomatik disable/enable
- API errors handled
- Loading states mevcut
- Success/error snackbars

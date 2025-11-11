# Backend API Entegrasyonu - Detaylı Döküman

Bu döküman, kurum kayıt sürecinin backend API'sine tam uyumlu olarak entegre edilmesini açıklar.

## 📋 İçindekiler
1. [Backend DTO Yapısı](#backend-dto-yapısı)
2. [Frontend-Backend Mapping](#frontend-backend-mapping)
3. [Step-by-Step API Akışı](#step-by-step-api-akışı)
4. [Form Field Değişiklikleri](#form-field-değişiklikleri)
5. [Validation Kuralları](#validation-kuralları)

---

## 🔧 Backend DTO Yapısı

### Step 1: RegisterCredentialDto
```java
public class RegisterCredentialDto {
    private String email;
    private String password;
    private String passwordControl;
}
```

**Frontend DTO:**
```typescript
export interface RegisterCredentialDto {
  email: string;
  password: string;
  passwordControl: string;
}
```

**API Endpoint:** `POST /register/step/1/credential`

**Response:** 
```typescript
{
  success: boolean;
  data: {
    id: number;  // userId - sonraki adımlar için gerekli
    email: string;
    // ... diğer user bilgileri
  }
}
```

---

### Step 2: RegisterIdentityDto
```java
public class RegisterIdentityDto {
    private Long userId;
    private String firstName;
    private String lastName;
    private String phone;
}
```

**Frontend DTO:**
```typescript
export interface RegisterIdentityDto {
  userId: number;
  firstName: string;
  lastName: string;
  phone: string;
}
```

**API Endpoint:** `POST /register/step/2/identity`

**ÖNEMLİ:** Email bu adımda GÖNDERİLMEZ, Step 1'de kaydedildi.

---

### Step 3: RegisterConfirmDto
```java
public class RegisterConfirmDto {
    private Long userId;
    private String code;
}
```

**Frontend DTO:**
```typescript
export interface RegisterConfirmDto {
  userId: number;
  code: string;  // 4 haneli doğrulama kodu
}
```

**API Endpoint:** `POST /register/step/3/confirm`

---

### Step 4: RegisterCampusDto
```java
public class RegisterCampusDto {
    private Long userId;
    private Long brandId;
    private String name;          // Campus name
    private String email;         // Campus email
    private String phone;         // Campus phone
    private String addressLine1;
    private String addressLine2;
    private Long districtId;
    private String postalCode;
    private Long countryId;
    private Long provinceId;
}
```

**Frontend DTO:**
```typescript
export interface RegisterCampusDto {
  userId: number;
  brandId: number;
  name: string;
  email: string;
  phone: string;
  addressLine1: string;
  addressLine2: string;
  districtId: number;
  postalCode: string;
  countryId: number;
  provinceId: number;
}
```

**API Endpoint:** `POST /register/step/4/campus`

**ÖNEMLİ:** neighborhoodId backend'de YOK, sadece frontend'te tutuluyor.

---

### Step 5: RegisterSubscriptionDto
```java
public class RegisterSubscriptionDto {
    private Long userId;
    private Long subscriptionId;
}
```

**Frontend DTO:**
```typescript
export interface RegisterSubscriptionDto {
  userId: number;
  subscriptionId: number;
}
```

**API Endpoint:** `POST /register/step/5/subscription`

---

### Step 6: RegisterPaymentDto
```java
public class RegisterPaymentDto {
    private Long userId;
    private Long subscriptionId;
}
```

**Frontend DTO:**
```typescript
export interface RegisterPaymentDto {
  userId: number;
  subscriptionId: number;
}
```

**API Endpoint:** `POST /register/step/6/payment`

**ÖNEMLİ:** Kredi kartı bilgileri backend'e GÖNDERİLMEZ (şimdilik). Sadece userId ve subscriptionId gönderiliyor.

---

### Step 7: RegisterVerificationCodeDto
```java
public class RegisterVerificationCodeDto {
    private Long userId;
}
```

**Frontend DTO:**
```typescript
export interface RegisterVerificationDto {
  userId: number;
}
```

**API Endpoint:** `POST /register/step/7/`

---

## 🔄 Frontend-Backend Mapping

### LoginCredentials → RegisterCredentialDto

**ÖNCEDEN:**
```typescript
loginCredentials: {
  username: string;  // ❌ HATALI
  password: string;
  confirmPassword: string;
}
```

**ŞİMDİ:**
```typescript
loginCredentials: {
  email: string;              // ✅ DOĞRU
  password: string;
  confirmPassword: string;    // Backend'de: passwordControl
}
```

**Context Payload:**
```typescript
const payload = {
  email: values.loginCredentials.email,
  password: values.loginCredentials.password,
  passwordControl: values.loginCredentials.confirmPassword,
};
```

---

### PersonalInfo → RegisterIdentityDto

**Form Fields:**
```typescript
personalInfo: {
  firstName: string;
  lastName: string;
  email: string;      // Step 1'den gelir, disabled
  phone: string;
}
```

**Context Payload:**
```typescript
const payload = {
  userId,  // Step 1'den dönen
  firstName: values.personalInfo.firstName,
  lastName: values.personalInfo.lastName,
  phone: values.personalInfo.phone,
  // email GÖNDERİLMEZ
};
```

---

### VerificationCode → RegisterConfirmDto

**Form Fields:**
```typescript
verificationCode: {
  code1: string;
  code2: string;
  code3: string;
  code4: string;
}
```

**Context Payload:**
```typescript
const payload = {
  userId,  // Step 1'den dönen
  code: fullCode,  // "1234" formatında birleştirilmiş kod
};
```

---

### CampusInfo → RegisterCampusDto

**Form Fields:**
```typescript
campusInfo: {
  brandId: number | null;
  campusName: string;
  countryId: number | null;
  provinceId: number | null;
  districtId: number | null;
  neighborhoodId: number | null;  // Backend'e GÖNDERİLMEZ
  addressLine1: string;
  addressLine2: string;
  postalCode: string;
}
```

**Context Payload:**
```typescript
const payload = {
  userId,
  brandId: values.campusInfo.brandId,
  name: values.campusInfo.campusName,
  email: values.personalInfo.email,  // Step 1'den geliyor
  phone: values.personalInfo.phone,  // Step 2'den geliyor
  addressLine1: values.campusInfo.addressLine1,
  addressLine2: values.campusInfo.addressLine2,
  districtId: values.campusInfo.districtId,
  postalCode: values.campusInfo.postalCode,
  countryId: values.campusInfo.countryId,
  provinceId: values.campusInfo.provinceId,
  // neighborhoodId GÖNDERİLMEZ
};
```

---

### PackageSelection → RegisterSubscriptionDto & RegisterPaymentDto

**Form Fields:**
```typescript
packageSelection: {
  selectedPlanId: string | null;
  planName?: string;
  planDisplayName?: string;
  billingPeriod: "monthly" | "quarterly" | "yearly";
  price?: number;
  discountPercentage?: number;
  trialDays?: number;
}
```

**Context Payload (Step 5 & 6):**
```typescript
const payload = {
  userId,
  subscriptionId: parseInt(values.packageSelection.selectedPlanId),
  // Diğer bilgiler GÖNDERİLMEZ (planName, billingPeriod, price vb.)
};
```

---

## 📊 Step-by-Step API Akışı

### 1️⃣ Step 1: Credential (Giriş Bilgileri)
```
User fills: email, password, confirmPassword
         ↓
Click "İleri"
         ↓
POST /register/step/1/credential
{
  email: "ornek@email.com",
  password: "Test123!",
  passwordControl: "Test123!"
}
         ↓
Response: { data: { id: 123, ... } }
         ↓
Save userId = 123 to context
         ↓
Go to Step 2
```

---

### 2️⃣ Step 2: Identity (Kişisel Bilgiler)
```
User fills: firstName, lastName, phone
email: (auto-filled from Step 1, disabled)
         ↓
Click "İleri"
         ↓
POST /register/step/2/identity
{
  userId: 123,
  firstName: "Ahmet",
  lastName: "Yılmaz",
  phone: "5551234567"
}
         ↓
Backend sends verification code to email
         ↓
Go to Step 3
```

---

### 3️⃣ Step 3: Confirm (Doğrulama)
```
User enters: 4-digit code
         ↓
Click "İleri"
         ↓
POST /register/step/3/confirm
{
  userId: 123,
  code: "1234"
}
         ↓
Go to Step 4
```

---

### 4️⃣ Step 4: Campus (Kampüs Bilgileri)
```
User fills: brandId, campusName, address, etc.
         ↓
Click "İleri"
         ↓
POST /register/step/4/campus
{
  userId: 123,
  brandId: 5,
  name: "Kampüs Adı",
  email: "ornek@email.com",  // Step 1'den
  phone: "5551234567",       // Step 2'den
  addressLine1: "...",
  addressLine2: "...",
  districtId: 10,
  postalCode: "34000",
  countryId: 1,
  provinceId: 34
}
         ↓
Go to Step 5
```

---

### 5️⃣ Step 5: Subscription (Paket Seçimi)
```
User selects: subscription plan
         ↓
Click "İleri"
         ↓
POST /register/step/5/subscription
{
  userId: 123,
  subscriptionId: 2
}
         ↓
Go to Step 6
```

---

### 6️⃣ Step 6: Payment (Ödeme)
```
User confirms: payment info (şimdilik kredi kartı bilgileri kullanılmıyor)
         ↓
Click "Kaydı Tamamla"
         ↓
POST /register/step/6/payment
{
  userId: 123,
  subscriptionId: 2
}
         ↓
Registration Complete!
         ↓
Redirect to Success Page
```

---

## 🎯 Form Field Değişiklikleri

### Değişiklik 1: username → email
- **Dosya:** `login-credentials-step.tsx`
- **Önce:** `name="loginCredentials.username"`
- **Sonra:** `name="loginCredentials.email"`

### Değişiklik 2: LoginCredentials Interface
- **Dosya:** `register.types.ts`
- **Önce:** `username: string;`
- **Sonra:** `email: string;`

### Değişiklik 3: Validation Schema
- **Dosya:** `validation-schema.ts`
- **Önce:**
```typescript
username: Yup.string()
  .min(3, "...")
  .matches(/^[a-zA-Z0-9_]+$/, "...")
```
- **Sonra:**
```typescript
email: Yup.string()
  .email("Geçerli bir e-posta adresi giriniz")
  .required("E-posta gereklidir")
```

### Değişiklik 4: Initial Values
- **Dosya:** `initial-values.ts`
- **Önce:** `username: ""`
- **Sonra:** `email: ""`

---

## ✅ Validation Kuralları

### Step 1: Credential
```typescript
email: Yup.string()
  .email("Geçerli bir e-posta adresi giriniz")
  .required("E-posta gereklidir"),

password: Yup.string()
  .min(8, "Şifre en az 8 karakter olmalıdır")
  .matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
    "Şifre en az bir büyük harf, bir küçük harf, bir rakam ve bir özel karakter içermelidir"
  )
  .required("Şifre gereklidir"),

confirmPassword: Yup.string()
  .oneOf([Yup.ref("password")], "Şifreler eşleşmiyor")
  .required("Şifre onayı gereklidir"),
```

### Step 2: Identity
```typescript
firstName: Yup.string()
  .min(2, "Ad en az 2 karakter olmalıdır")
  .required("Ad gereklidir"),

lastName: Yup.string()
  .min(2, "Soyad en az 2 karakter olmalıdır")
  .required("Soyad gereklidir"),

phone: Yup.string()
  .matches(/^5\d{9}$/, "Telefon numarası 5 ile başlamalı ve 10 hane olmalıdır")
  .required("Telefon numarası gereklidir"),
```

### Step 3: Verification
```typescript
// Her input için:
code: Yup.string()
  .matches(/^\d$/, "Sadece rakam giriniz")
  .required()
```

### Step 4: Campus
```typescript
brandId: Yup.number()
  .required("Marka seçimi gereklidir"),

campusName: Yup.string()
  .min(3, "Kampüs adı en az 3 karakter olmalıdır")
  .required("Kampüs adı gereklidir"),

countryId: Yup.number()
  .required("Ülke seçimi gereklidir"),

provinceId: Yup.number()
  .required("İl seçimi gereklidir"),

districtId: Yup.number()
  .required("İlçe seçimi gereklidir"),

addressLine1: Yup.string()
  .min(10, "Adres en az 10 karakter olmalıdır")
  .required("Adres gereklidir"),

postalCode: Yup.string()
  .matches(/^\d{5}$/, "Posta kodu 5 haneli olmalıdır")
  .required("Posta kodu gereklidir"),
```

### Step 5: Package Selection
```typescript
selectedPlanId: Yup.string()
  .required("Paket seçimi gereklidir"),

billingPeriod: Yup.string()
  .oneOf(["monthly", "quarterly", "yearly"])
  .required("Ödeme periyodu seçimi gereklidir"),
```

### Step 6: Payment
```typescript
acceptTerms: Yup.boolean()
  .oneOf([true], "Kullanım koşullarını kabul etmelisiniz")
  .required(),

acceptPrivacy: Yup.boolean()
  .oneOf([true], "Gizlilik politikasını kabul etmelisiniz")
  .required(),
```

---

## 🔑 Önemli Notlar

### userId Yönetimi
- `userId` Step 1'den dönen response'tan alınır
- Context state'inde saklanır: `const [userId, setUserId] = useState<number | null>(null)`
- Her sonraki step'te payload'a eklenir

### Email Yönetimi
- Email sadece Step 1'de backend'e gönderilir
- Step 2'de form'da gösterilir (disabled)
- Step 4'te campus email olarak tekrar gönderilir

### neighborhoodId
- Frontend'te form field'ı olarak tutuluyor
- Backend DTO'da YOK
- API'ye GÖNDERİLMEZ

### Kredi Kartı Bilgileri
- Frontend'te form field'ları var (Step 6)
- Backend DTO'da YOK (RegisterPaymentDto sadece userId ve subscriptionId içeriyor)
- Şimdilik API'ye GÖNDERİLMEZ
- İleride ödeme gateway entegrasyonu eklenebilir

---

## 📁 Dosya Yapısı

```
src/
├── types/dto/register/
│   ├── RegisterCredentialDto.ts      ✅ Backend'e uygun
│   ├── RegisterIdentityDto.ts        ✅ Backend'e uygun
│   ├── RegisterConfirmDto.ts         ✅ Backend'e uygun
│   ├── RegisterCampusDto.ts          ✅ Backend'e uygun
│   ├── RegisterSubscriptionDto.ts    ✅ Backend'e uygun
│   ├── RegisterPaymentDto.ts         ✅ Backend'e uygun
│   ├── RegisterVerificationDto.ts    ✅ Backend'e uygun
│   └── index.ts
│
├── app/auth/register/_shared/
│   ├── hooks/
│   │   ├── use-register-step-1.ts    ✅ Step 1 API
│   │   ├── use-register-step-2.ts    ✅ Step 2 API
│   │   ├── use-register-step-3.ts    ✅ Step 3 API
│   │   ├── use-register-step-4.ts    ✅ Step 4 API
│   │   ├── use-register-step-5.ts    ✅ Step 5 API
│   │   └── use-register-step-6.ts    ✅ Step 6 API
│   │
│   ├── context/
│   │   └── register-context.tsx      ✅ userId management + step submits
│   │
│   ├── sections/
│   │   ├── login-credentials-step.tsx   ✅ email field
│   │   ├── personal-info-step.tsx       ✅ email disabled
│   │   ├── verification-step.tsx        ✅ 4-digit code
│   │   ├── campus-info-step.tsx         ✅ Campus fields
│   │   ├── package-selection-step.tsx   ✅ Subscription selection
│   │   └── payment-info-step.tsx        ✅ Payment (minimal)
│   │
│   ├── schemas/
│   │   ├── validation-schema.ts      ✅ email validation
│   │   └── initial-values.ts         ✅ email field
│   │
│   └── types/
│       └── register.types.ts         ✅ email in LoginCredentials
│
└── lib/api/
    └── endpoints.ts                  ✅ REGISTER endpoints
```

---

## 🎨 API Response Formatı

Tüm step'ler için backend response formatı:

```typescript
{
  success: boolean;
  message: string;
  data: UserDto;  // User bilgileri
  path: string;
  timestamp: string;
}
```

**UserDto:**
```typescript
{
  id: number;
  email: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  // ... diğer user bilgileri
}
```

---

## ✨ Özellikler

### ✅ Tamamlanan
- [x] Backend DTO'larına tam uyumlu frontend DTO'lar
- [x] Step-by-step API entegrasyonu
- [x] userId state management
- [x] Email field'ı düzeltildi (username → email)
- [x] Validation schema'ları güncellendi
- [x] Initial values düzeltildi
- [x] Context payload'ları backend'e uygun
- [x] Her step için ayrı API hook'ları
- [x] Loading states
- [x] Error handling
- [x] Snackbar notifications

### 🔄 İleride Eklenebilir
- [ ] Kredi kartı entegrasyonu (Step 6)
- [ ] Email verification flow iyileştirmesi
- [ ] Resend code functionality
- [ ] Step 7 (Final verification)

---

## 🚀 Test Senaryosu

### Başarılı Kayıt Akışı

1. **Step 1**: Email ve şifre gir → API'ye gönder → userId al
2. **Step 2**: Ad, soyad, telefon gir → API'ye gönder
3. **Step 3**: Email'e gelen kodu gir → API'ye gönder
4. **Step 4**: Kampüs bilgilerini gir → API'ye gönder
5. **Step 5**: Paket seç → API'ye gönder
6. **Step 6**: Ödeme onayla → API'ye gönder → Kayıt tamamla

### Hata Senaryoları

- Email zaten kayıtlı → Step 1'de hata göster
- Doğrulama kodu yanlış → Step 3'te hata göster
- Network hatası → İlgili step'te hata göster
- Validation hatası → Form'da göster

---

**Son Güncelleme:** 2025-01-11
**Version:** 2.0.0
**Durum:** ✅ Production Ready


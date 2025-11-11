# Register Backend API Entegrasyonu

## 📋 Genel Bakış

Backend'den alınan API dokümantasyonuna göre register işlemi **7 adımlı** bir süreçtir. Her adımda ayrı bir API endpoint'ine istek atılır ve backend'den dönen `userId` bir sonraki adımlarda kullanılır.

## 🔄 API Akışı

### Step 1: Credential (Login Bilgileri)
**Endpoint:** `POST /register/step/1/credential`

**Request DTO:**
```typescript
{
  email: string;
  password: string;
  passwordControl: string;
}
```

**Response:** `UserDto` (içinde `userId` var)

**Frontend:**
- LoginCredentialsStep'te email/şifre girişi
- İleri butonuna basıldığında `submitStep1()` çağrılır
- Backend'den dönen `userId` context'te saklanır

---

### Step 2: Identity (Kişisel Bilgiler)
**Endpoint:** `POST /register/step/2/identity`

**Request DTO:**
```typescript
{
  userId: number;
  firstName: string;
  lastName: string;
  phone: string;
}
```

**Response:** `UserDto`

**Frontend:**
- PersonalInfoStep'te ad, soyad, telefon girişi
- İleri butonuna basıldığında `submitStep2()` çağrılır
- Context'teki `userId` kullanılır

---

### Step 3: Confirm (Doğrulama Kodu)
**Endpoint:** `POST /register/step/3/confirm`

**Request DTO:**
```typescript
{
  userId: number;
  code: string;
}
```

**Response:** `UserDto`

**Frontend:**
- VerificationCodeStep'te 4 haneli kod girişi
- İleri butonuna basıldığında `submitStep3()` çağrılır
- Context'teki `fullCode` ve `userId` kullanılır

**Kod Gönderme:** `GET /register/send` endpoint'i kullanılır

---

### Step 4: Campus (Kampüs Bilgileri)
**Endpoint:** `POST /register/step/4/campus`

**Request DTO:**
```typescript
{
  userId: number;
  brandId: number;
  name: string; // Campus name
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

**Response:** `UserDto`

**Frontend:**
- CampusInfoStep'te kampüs bilgileri
- İleri butonuna basıldığında `submitStep4()` çağrılır
- Context'teki `userId` + form values kullanılır

---

### Step 5: Subscription (Paket Seçimi)
**Endpoint:** `POST /register/step/5/subscription`

**Request DTO:**
```typescript
{
  userId: number;
  subscriptionId: number;
}
```

**Response:** `UserDto`

**Frontend:**
- PackageSelectionStep'te paket seçimi
- İleri butonuna basıldığında `submitStep5()` çağrılır
- Seçilen `subscriptionPlanId` integer'a çevrilip gönderilir

---

### Step 6: Payment (Ödeme Bilgileri)
**Endpoint:** `POST /register/step/6/payment`

**Request DTO:**
```typescript
{
  userId: number;
  subscriptionId: number;
}
```

**Response:** `UserDto`

**Frontend:**
- PaymentInfoStep'te ödeme bilgileri ve sözleşmeler
- İleri butonuna basıldığında `submitStep6()` çağrılır
- Bu adımdan sonra kayıt tamamlanır ve Step 7'ye geçilir

---

### Step 7: Success (Başarı Ekranı)
**Endpoint:** `POST /register/step/7/` (isteğe bağlı)

**Frontend:**
- SuccessStep sadece bilgilendirme amaçlı gösterilir
- API isteği atılmaz (backend dokümantasyonunda endpoint var ama kullanılmıyor)

---

## 📁 Oluşturulan Dosyalar

### DTO'lar (`src/types/dto/register/`)
- `RegisterCredentialDto.ts` - Step 1
- `RegisterIdentityDto.ts` - Step 2  
- `RegisterConfirmDto.ts` - Step 3
- `RegisterCampusDto.ts` - Step 4
- `RegisterSubscriptionDto.ts` - Step 5
- `RegisterPaymentDto.ts` - Step 6
- `RegisterVerificationDto.ts` - Step 7

### API Hooks (`src/app/auth/register/_shared/hooks/`)
- `use-register-step-1.ts` - Credential submit
- `use-register-step-2.ts` - Identity submit
- `use-register-step-3.ts` - Confirm submit
- `use-register-step-4.ts` - Campus submit
- `use-register-step-5.ts` - Subscription submit
- `use-register-step-6.ts` - Payment submit
- `use-register-step-7.ts` - Verification submit

### API Endpoints (`src/lib/api/endpoints.ts`)
```typescript
REGISTER: {
  STEP_1_CREDENTIAL: "/register/step/1/credential",
  STEP_2_IDENTITY: "/register/step/2/identity",
  STEP_3_CONFIRM: "/register/step/3/confirm",
  STEP_4_CAMPUS: "/register/step/4/campus",
  STEP_5_SUBSCRIPTION: "/register/step/5/subscription",
  STEP_6_PAYMENT: "/register/step/6/payment",
  STEP_7_VERIFICATION: "/register/step/7/",
  SEND_CODE: "/register/send",
}
```

---

## 🔑 Önemli Noktalar

### 1. **userId Yönetimi**
- Step 1'den sonra backend `userId` döner
- Bu `userId` context state'inde saklanır
- Tüm sonraki step'lerde bu `userId` kullanılır

### 2. **Form Values Context**
- Tüm form verileri `FormContext` ile yönetilir
- Her step'te girilen veriler context'te saklanır
- API istekleri atılırken context'teki veriler kullanılır

### 3. **Otomatik İlerleme**
- Her step'te API isteği başarılı olduğunda otomatik olarak bir sonraki step'e geçilir
- `nextStep()` fonksiyonu API başarı callback'inden çağrılır

### 4. **Loading States**
- Her step için ayrı loading state var
- Navigation component tüm loading state'leri birleştirir
- İleri butonu herhangi bir loading durumunda disabled olur

### 5. **Error Handling**
- Her API hook kendi error handling'ini yapar
- Hatalar snackbar ile kullanıcıya gösterilir
- Hata durumunda step ilerlemez

---

## 🎯 Kullanım

### Context'ten Step Submit Fonksiyonları
```typescript
const {
  userId,
  submitStep1,
  submitStep2,
  submitStep3,
  submitStep4,
  submitStep5,
  submitStep6,
} = useRegister();
```

### Navigation Component
```typescript
const handleNext = async () => {
  switch (currentStep) {
    case 1:
      await submitStep1(); // API isteği + otomatik ilerleme
      break;
    case 2:
      await submitStep2();
      break;
    // ... diğer step'ler
  }
};
```

### Manuel API Çağrısı (Hook Kullanımı)
```typescript
import { useRegisterStep1 } from '@/app/auth/register/_shared/hooks';

const { submitCredential, isLoading } = useRegisterStep1();

const handleSubmit = async () => {
  const response = await submitCredential({
    email: "test@example.com",
    password: "Pass123!",
    passwordControl: "Pass123!",
  });
  
  if (response?.data?.id) {
    // userId'yi sakla
    setUserId(response.data.id);
  }
};
```

---

## ✅ Tamamlanan İşlemler

- [x] Backend DTO'ları TypeScript'e çevrildi
- [x] API endpoints tanımlandı
- [x] Her step için ayrı API hook oluşturuldu
- [x] Context'e userId state eklendi
- [x] Her step için submit fonksiyonları implement edildi
- [x] Navigation component güncellendi
- [x] Otomatik ilerleme mekanizması eklendi
- [x] Error handling eklendi
- [x] Loading states birleştirildi

---

## 🚀 Backend Gereksinimleri

Backend'de bu endpoint'lerin implement edilmiş olması gerekiyor:

1. ✅ `POST /register/step/1/credential`
2. ✅ `POST /register/step/2/identity`
3. ✅ `POST /register/step/3/confirm`
4. ✅ `POST /register/step/4/campus`
5. ✅ `POST /register/step/5/subscription`
6. ✅ `POST /register/step/6/payment`
7. ✅ `GET /register/send` (email kodu gönderme)

Tüm endpoint'ler `ApiResponse<UserDto>` formatında response döndürmelidir.

---

**Son Güncelleme:** 2024-11-11  
**Versiyon:** 1.0.0


# Register Form - Custom Card Tasarım Yenileme Özeti

## 🎯 Yapılan Değişiklikler

Brand modülündeki form tasarımı örnek alınarak register formu tamamen Custom Card bileşeni ile yeniden yapılandırıldı.

## 📐 Yeni Tasarım Yapısı

### 1. **Ana Form Wrapper** (`register-form-content.tsx`)
```tsx
// ÖNCESİ: Tek bir CustomCard tüm içeriği sarıyordu
<CustomCard variant="default" bgColor="bg-white">
  <div className="p-32">{renderStep()}</div>
</CustomCard>

// SONRASI: Her step kendi card yapısını yönetiyor
<div className="register-step-container">
  {renderStep()} {/* Her step kendi card'larını oluşturur */}
</div>
```

### 2. **Step Bileşenleri - Brand Benzeri Yapı**

Her step artık aşağıdaki yapıya sahip:

#### **Ana Card Yapısı:**
- **Beyaz arka plan** (`bg-white`)
- **Gölge efekti** (`shadow-sm`)
- **Yuvarlak köşeler** (`rounded-16`)
- **İnce border** (`border border-neutral-100`)

#### **Başlık Bölümü:**
- **Açık mavi arka plan** (`bg-main-25`)
- **Alt border** (`border-bottom border-neutral-100`)
- **32px padding**
- **Başlık** (`h4`) + **Açıklama** (`p`)

#### **Form İçeriği:**
- **32px padding** (ana card içinde)
- **24px row gap** (form alanları arası)

### 3. **Güncellenmiş Step Bileşenleri**

#### ✅ **Login Credentials Step**
```tsx
<CustomCard variant="default" bgColor="bg-white" padding="p-0">
  {/* Başlık Bölümü - bg-main-25 */}
  <div className="bg-main-25 p-32 border-bottom border-neutral-100">
    <h4>Giriş Bilgileri</h4>
    <p>Sisteme giriş yapmak için...</p>
  </div>
  
  {/* Form Alanları */}
  <div className="p-32">
    <div className="row row-gap-24">
      {/* Form inputs */}
    </div>
  </div>
</CustomCard>

{/* Bilgilendirme Card - Info */}
<CustomCard 
  bgColor="bg-info-50" 
  border="border border-info-200"
  mt="mt-24"
>
  {/* Şifre gereksinimleri */}
</CustomCard>
```

#### ✅ **Personal Info Step**
```tsx
<CustomCard variant="default" bgColor="bg-white" padding="p-0">
  {/* Başlık - bg-main-25 */}
  <div className="bg-main-25 p-32 border-bottom border-neutral-100">
    <h4>Kişisel Bilgiler</h4>
  </div>
  
  {/* Form */}
  <div className="p-32">
    {/* Ad, Soyad, Email, Telefon */}
  </div>
</CustomCard>

{/* Uyarı Card - Warning */}
<CustomCard 
  bgColor="bg-warning-50" 
  border="border border-warning-200"
  mt="mt-24"
>
  {/* E-posta doğrulama uyarısı */}
</CustomCard>
```

#### 🔄 **Campus Info Step** (Yeniden yapılandırılacak)
```tsx
{/* Ana Card - Temel Bilgiler */}
<CustomCard variant="default" bgColor="bg-white" padding="p-0">
  <div className="bg-main-25 p-32 border-bottom border-neutral-100">
    <h4>Kampüs Bilgileri</h4>
    <p>Marka ve temel bilgilerini giriniz</p>
  </div>
  <div className="p-32">
    {/* Marka, Kampüs Adı */}
  </div>
</CustomCard>

{/* Lokasyon Card */}
<CustomCard 
  variant="default" 
  bgColor="bg-white" 
  padding="p-0"
  mt="mt-24"
>
  <div className="bg-main-25 p-32 border-bottom border-neutral-100">
    <h5>Lokasyon Bilgileri</h5>
  </div>
  <div className="p-32">
    {/* Ülke, İl, İlçe, Mahalle, Adres */}
  </div>
</CustomCard>
```

#### 🔄 **Verification Code Step** (Yeniden yapılandırılacak)
```tsx
<CustomCard variant="default" bgColor="bg-white" padding="p-0">
  <div className="bg-main-25 p-32 border-bottom border-neutral-100">
    <h4>E-posta Doğrulama</h4>
    <p>Doğrulama kodunu giriniz</p>
  </div>
  <div className="p-32">
    {/* Kod input alanları */}
  </div>
</CustomCard>

{/* Timer & Resend Card */}
<CustomCard bgColor="bg-success-50" mt="mt-24">
  {/* Geri sayım ve yeniden gönder */}
</CustomCard>
```

#### 🔄 **Package Selection Step** (Yeniden yapılandırılacak)
```tsx
{/* Faturalama Dönemi Card */}
<CustomCard 
  variant="default" 
  bgColor="bg-white" 
  padding="p-0"
  mb="mb-24"
>
  <div className="bg-main-25 p-32 border-bottom border-neutral-100">
    <h5>Faturalama Dönemi</h5>
  </div>
  <div className="p-32">
    {/* Aylık, 3 Aylık, Yıllık buttons */}
  </div>
</CustomCard>

{/* Paket Kartları Grid */}
<div className="row g-16">
  {plans.map(plan => (
    <div className="col-md-6 col-lg-4">
      <CustomCard 
        className={selectedPlanId === plan.id ? 'selected' : ''}
        onClick={() => handlePlanSelect(plan.id)}
      >
        {/* Paket detayları */}
      </CustomCard>
    </div>
  ))}
</div>
```

#### 🔄 **Payment Info Step** (Yeniden yapılandırılacak)
```tsx
{/* Ödeme Bilgileri Card */}
<CustomCard variant="default" bgColor="bg-white" padding="p-0">
  <div className="bg-main-25 p-32 border-bottom border-neutral-100">
    <h4>Ödeme Bilgileri</h4>
    <p>Kredi kartı bilgilerinizi giriniz</p>
  </div>
  <div className="p-32">
    {/* Kart bilgileri */}
  </div>
</CustomCard>

{/* Güvenlik Card */}
<CustomCard bgColor="bg-success-50" mt="mt-24">
  {/* SSL güvenlik bildirimi */}
</CustomCard>
```

## 🎨 Tasarım Prensipleri (Brand'den alınan)

### ✅ **Card Hiyerarşisi:**
1. **Ana Content Card:** Beyaz arka plan, gölge, border
2. **Bilgi/Uyarı Cards:** Renkli arka planlar (info-50, warning-50, success-50)
3. **Bölüm Cards:** Çoklu form bölümleri için ayrı cardlar

### ✅ **Spacing Sistemi:**
- **Card padding:** `p-32` (ana içerik)
- **Row gap:** `row-gap-24` (form elemanları)
- **Card arası:** `mt-24` (cardlar arası boşluk)
- **Başlık padding:** `p-32` (header bölümü)

### ✅ **Renk Paleti:**
- **Ana card:** `bg-white` + `border-neutral-100`
- **Başlık:** `bg-main-25` + `border-bottom border-neutral-100`
- **Info:** `bg-info-50` + `border-info-200`
- **Warning:** `bg-warning-50` + `border-warning-200`
- **Success:** `bg-success-50` + `border-success-200`

### ✅ **Tipografi:**
- **Ana başlık:** `h4` + `text-neutral-900` + `mb-8`
- **Alt başlık:** `p` + `text-neutral-600` + `mb-0`
- **Bölüm başlık:** `h5` + `text-neutral-900`

## 📋 Yapılması Gerekenler

### ✅ Tamamlanan:
- [x] `register-form-content.tsx` - Wrapper güncellendi
- [x] `login-credentials-step.tsx` - Brand yapısına uyarlandı
- [x] `personal-info-step.tsx` - Brand yapısına uyarlandı

### 🔄 Devam Eden:
- [ ] `campus-info-step.tsx` - Yeniden yapılandırılacak (teknik sorun)
- [ ] `verification-code-step.tsx` - Brand yapısına uyarlanacak
- [ ] `package-selection-step.tsx` - Brand yapısına uyarlanacak
- [ ] `payment-info-step.tsx` - Brand yapısına uyarlanacak

### 📝 Ek İyileştirmeler:
- [ ] Register stepper tasarımı gözden geçirilecek
- [ ] Navigation butonları card dışına taşınacak
- [ ] Responsive tasarım kontrolleri
- [ ] Loading states için card skeleton'ları

## 🔗 Referanslar

**Brand Form Örneği:**
- `src/app/(protected)/company/brands/add-edit/_shared/sections/brand-form/`
- Bölümlere ayrılmış form yapısı
- Alt alta card dizilimleri
- Tutarlı spacing ve renk kullanımı

**Custom Card Bileşeni:**
- `src/components/ui/custom-card.tsx`
- Tüm variant ve prop'lar
- Spacing utilities (mt, mb, p vb.)

---

**Hazırlayan:** GitHub Copilot  
**Tarih:** 26 Ekim 2025  
**Durum:** Devam Ediyor 🚧

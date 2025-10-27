# Register System Documentation

## 📋 Genel Bakış

Kayıt sistemi, kullanıcıların kurum veya veli olarak kayıt olabilmelerini sağlayan 3 seviyeli bir yapıya sahiptir:

1. **Ana Seçim Sayfası** (`/auth/register`) - Kullanıcı tipi seçimi
2. **Kurum Kaydı** (`/auth/register/institution`) - 6 adımlı kurum kayıt süreci
3. **Veli Kaydı** (`/auth/register/user`) - Veli kayıt formu (geliştirme aşamasında)

## 🗂️ Dizin Yapısı

```
src/app/auth/register/
├── page.tsx                      # Ana seçim sayfası (Kurum/Veli)
├── layout.tsx                    # Ana layout
├── _shared/                      # Paylaşılan componentler
│   ├── register-form.tsx         # Ana kayıt formu
│   ├── components/               # Form componentleri
│   ├── constants/                # Adım konfigürasyonu
│   ├── context/                  # Register context
│   ├── hooks/                    # Custom hooks
│   ├── schemas/                  # Validation schemas
│   ├── sections/                 # Form sections/steps
│   └── types/                    # TypeScript tipleri
├── institution/                  # Kurum kayıt sayfası
│   ├── page.tsx                  # Kurum kayıt formu
│   └── layout.tsx                # Kurum layout
└── user/                         # Veli kayıt sayfası
    ├── page.tsx                  # Veli kayıt formu (geçici)
    └── layout.tsx                # Veli layout
```

## 🔄 Kullanıcı Akışı

### 1. Ana Seçim Sayfası (`/auth/register`)

Kullanıcı iki seçenekle karşılaşır:

#### Kurum Kaydı
- 🏢 İkon: Building
- Özellikler:
  - Kurumsal yönetim paneli
  - Öğrenci ve veli yönetimi
  - Kampanya ve paket sistemi
  - Detaylı raporlama
- Route: `/auth/register/institution`

#### Veli Kaydı
- 👨‍👩‍👧‍👦 İkon: Parent
- Özellikler:
  - Çocuk bilgilerini yönetme
  - Eğitim ilerlemesini takip
  - Kurumlarla iletişim
  - Ödemeleri yönetme
- Route: `/auth/register/user`

### 2. Kurum Kayıt Süreci (`/auth/register/institution`)

6 adımlı kayıt süreci:

1. **Kişisel Bilgiler** (Personal Info)
   - Ad, Soyad
   - E-posta, Telefon
   - TC Kimlik No
   - Doğum Tarihi, Cinsiyet

2. **E-posta Doğrulama** (Verification Code)
   - 6 haneli kod girişi
   - Otomatik gönderim
   - Yeniden gönderme (60 sn)

3. **Kampüs Bilgileri** (Campus Info)
   - Kurum adı ve tipi
   - Şehir, İlçe, Mahalle
   - Adres detayları
   - Telefon bilgileri

4. **Paket Seçimi** (Package Selection)
   - Starter, Professional, Enterprise
   - Özellik karşılaştırması
   - Fiyatlandırma bilgisi

5. **Ödeme Bilgileri** (Payment Info)
   - Kredi kartı bilgileri
   - Güvenli ödeme
   - Otomatik fatura

6. **Giriş Bilgileri** (Login Credentials)
   - Kullanıcı adı
   - Şifre (güçlü şifre kontrolü)
   - Kullanım koşulları

### 3. Veli Kayıt Sayfası (`/auth/register/user`)

**Durum:** Geliştirme aşamasında

**Planlanan Özellikler:**
- ✅ Basit ve hızlı kayıt formu
- ✅ Çocuk bilgilerini ekleme
- ✅ Kurumları arama ve bağlantı
- ✅ E-posta doğrulama

## 🎨 Tasarım Özellikleri

### Ana Seçim Sayfası

- **Card Hover Efektleri:**
  - Border rengi değişimi (#E5E7EB → #487FFF)
  - Transform animasyonu (translateY: -4px)
  - Box shadow efekti
  - Smooth transition (0.3s)

- **Renkler:**
  - Kurum: Mavi (#487FFF, #EEF2FF)
  - Veli: Kırmızı (#F04438, #FEF3F2)

### Navigasyon

- Geri dönüş linkleri
- Login sayfasına yönlendirme
- Breadcrumb navigasyon

## 🔧 Teknik Detaylar

### Kullanılan Teknolojiler

- **Framework:** Next.js 14 (App Router)
- **State Management:** React Context API
- **Form Management:** Formik
- **Validation:** Yup
- **Styling:** SASS/SCSS + Bootstrap
- **Icons:** RemixIcon

### Önemli Dosyalar

#### `_shared/register-form.tsx`
Tüm kayıt formunun ana container'ı. Context provider'ları ve step navigation'ı yönetir.

#### `_shared/context/register-context.tsx`
- Form state yönetimi
- Step navigation
- Validation handling
- API integration

#### `_shared/constants/step-config.ts`
6 adımın konfigürasyonu:
- Step metadata
- Validation rules
- Icons ve labels

## 🚀 Geliştirme Notları

### Mevcut Durum

✅ **Tamamlanan:**
- Ana seçim sayfası
- Kurum kayıt sistemi (6 adım)
- Responsive tasarım
- Form validation
- E-posta doğrulama

⏳ **Devam Eden:**
- Veli kayıt formu

### Sonraki Adımlar

1. **Veli Kayıt Formu:**
   - Basitleştirilmiş form tasarımı
   - Çocuk bilgileri ekleme
   - Kurum arama ve seçme
   - E-posta doğrulama

2. **Backend Entegrasyonu:**
   - API endpoint'leri
   - Database işlemleri
   - E-posta servisi

3. **İyileştirmeler:**
   - Loading states
   - Error handling
   - Success animations
   - A/B testing

## 📱 Responsive Davranış

- **Desktop (lg):** 2 kolon card layout
- **Tablet (md):** 2 kolon card layout
- **Mobile (sm):** 1 kolon stack layout

## 🔐 Güvenlik

- HTTPS zorunluluğu
- E-posta doğrulama
- Güçlü şifre kontrolü
- CSRF koruması
- Rate limiting

## 📞 İletişim

Sorularınız için proje yöneticisi ile iletişime geçin.

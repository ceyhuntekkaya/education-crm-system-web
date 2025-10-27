# Register System - Quick Guide

## 🎯 Yapılan Değişiklikler

### Yeni Sayfa Yapısı

```
/auth/register                    → Seçim sayfası (Kurum/Veli)
/auth/register/institution        → Kurum kayıt formu (6 adım)
/auth/register/user              → Veli kayıt formu (geliştirme aşamasında)
```

### Oluşturulan Dosyalar

#### Ana Seçim Sayfası
- ✅ `/auth/register/page.tsx` - Kurum/Veli seçimi
- ✅ `/auth/register/layout.tsx` - Ana layout wrapper

#### Kurum Kaydı
- ✅ `/auth/register/institution/page.tsx` - 6 adımlı form
- ✅ `/auth/register/institution/layout.tsx` - Kurum layout

#### Veli Kaydı (Geçici)
- ✅ `/auth/register/user/page.tsx` - Geçici "Coming Soon" sayfası
- ✅ `/auth/register/user/layout.tsx` - Veli layout

#### Dokümantasyon
- ✅ `REGISTER_SYSTEM_DOCS.md` - Detaylı dokümantasyon
- ✅ `register-selection.scss` - Stil dosyası

## 🚀 Nasıl Çalışır?

### 1. Kullanıcı `/auth/register` sayfasına gelir
- İki kart görür: **Kurum** ve **Veli**
- Hover efektleri ile interaktif deneyim
- Seçim yaparak ilgili sayfaya yönlendirilir

### 2. Kurum Seçerse → `/auth/register/institution`
- Mevcut 6 adımlı kayıt süreci başlar
- Tüm formlar ve validasyonlar çalışır
- Başarılı kayıt sonrası dashboard'a yönlendirilir

### 3. Veli Seçerse → `/auth/register/user`
- Geçici "Geliştirme Aşamasında" sayfası gösterilir
- Planlanan özellikler listelenir
- Geri dönüş veya kurum kaydına yönlendirme seçenekleri

## 📝 Paylaşılan Kodlar

**`_shared` klasörü** her iki kayıt türü için ortak:
- Form componentleri
- Validation schemas
- Context ve hooks
- Step configuration

Şu anda sadece kurum kaydı bu yapıyı kullanıyor. Veli kaydı eklendiğinde, gerekli customization'lar yapılabilir.

## 🎨 Tasarım Detayları

### Ana Seçim Sayfası
- 2 kolon card layout (responsive)
- Kurum: Mavi tema (#487FFF)
- Veli: Kırmızı tema (#F04438)
- Smooth hover animasyonları
- Özellik listeleri

### Navigasyon
- Seçim sayfasından ileri
- Alt sayfalardan geri
- Login'e yönlendirme

## 🔄 Sonraki Adımlar

### Veli Kayıt Formunu Geliştirmek İçin:

1. **Form Tasarımı:**
   ```tsx
   // user/page.tsx içinde RegisterForm benzeri bir component
   <ParentRegisterForm />
   ```

2. **Basitleştirilmiş Adımlar:**
   - Kişisel Bilgiler
   - E-posta Doğrulama
   - Çocuk Bilgileri
   - Kurum Seçimi (opsiyonel)

3. **Context:**
   ```tsx
   // Yeni context oluştur veya mevcut RegisterContext'i genişlet
   <ParentRegisterContext>
   ```

## 📞 Test Etmek İçin

1. Sunucuyu başlat: `npm run dev`
2. Git: `http://localhost:3000/auth/register`
3. Kartları test et:
   - Hover efektleri
   - Kurum seçimi → Form açılır
   - Veli seçimi → Geçici sayfa
   - Geri dönüş linkleri

## ⚠️ Önemli Notlar

- Mevcut kurum kayıt sistemi **hiç değiştirilmedi**
- Sadece yeni bir routing katmanı eklendi
- `_shared` klasörü aynen korundu
- Tüm validasyonlar ve context'ler çalışıyor

## 📚 Detaylı Bilgi

Daha fazla detay için: **REGISTER_SYSTEM_DOCS.md**

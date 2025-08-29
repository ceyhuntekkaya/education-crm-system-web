# 🎨 Kapsamlı SASS/CSS Tasarım Sistemi Rehberi v2.0

## 📖 Bu Rehber Hakkında
Bu dokümantasyon, projenizin tüm SCSS dosyalarının detaylı analizi sonucu oluşturulmuştur. Her class, component ve utility için pratik kullanım örnekleri ve adım adım açıklamalar içermektedir.

## 📋 İçindekiler
1. [Hızlı Başlangıç](#hızlı-başlangıç)
2. [Renk Sistemi ve Kullanımı](#renk-sistemi-ve-kullanımı)
3. [Tipografi ve Font Sistemi](#tipografi-ve-font-sistemi)
4. [Spacing Sistemi (Margin/Padding)](#spacing-sistemi)
5. [Button Sistemi](#button-sistemi)
6. [Form Sistemi](#form-sistemi)
7. [Layout ve Grid Sistemi](#layout-ve-grid-sistemi)
8. [Component Kütüphanesi](#component-kütüphanesi)
9. [Utility Classes](#utility-classes)
10. [Responsive Tasarım](#responsive-tasarım)
11. [Animasyon Sistemi](#animasyon-sistemi)
12. [Gerçek Proje Örnekleri](#gerçek-proje-örnekleri)

---

## 🚀 Hızlı Başlangıç

### Temel HTML Yapısı
```html
<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Proje</title>
    <link rel="stylesheet" href="assets/css/bootstrap.min.css">
    <link rel="stylesheet" href="assets/css/main.css">
    <link rel="stylesheet" href="assets/css/phosphor-icons-regular.css">
</head>
<body>
    <!-- İçerik buraya -->
</body>
</html>
```

### En Çok Kullanılan Class'lar
```html
<!-- Flexbox -->
<div class="d-flex align-items-center justify-content-between">
<div class="flex-center">
<div class="flex-between">

<!-- Spacing -->
<div class="p-24 m-16 my-60">
<div class="px-40 py-120">

<!-- Colors -->
<div class="bg-main-600 text-white">
<div class="text-main-600 bg-main-50">

<!-- Typography -->
<h1 class="h1 text-heading">
<p class="text-lg text-body">
```

---

## 🎨 Renk Sistemi ve Kullanımı

### Ana Renk Paleti
Sistem HSL (Hue, Saturation, Lightness) değerleri kullanır:

```scss
// Ana renkler
--main-h: 209;        // Mavi ton (0-360)
--main-s: 94%;        // Doygunluk
--main-l: 41%;        // Açıklık

// İkincil renkler
--main-two-h: 20;     // Turuncu ton
--main-three-h: 144;  // Yeşil ton
```

### Renk Tonları (25-900)
Her ana renk için 10 farklı ton mevcuttur:

```html
<!-- Ana renk tonları -->
<div class="bg-main-25">En açık ton</div>
<div class="bg-main-50">Çok açık</div>
<div class="bg-main-100">Açık</div>
<div class="bg-main-200">Açık orta</div>
<div class="bg-main-300">Orta açık</div>
<div class="bg-main-400">Orta</div>
<div class="bg-main-500">Orta koyu</div>
<div class="bg-main-600">Ana renk (varsayılan)</div>
<div class="bg-main-700">Koyu</div>
<div class="bg-main-800">Çok koyu</div>
<div class="bg-main-900">En koyu</div>
```

### Neutral (Gri) Tonları
```html
<!-- Neutral renkler (10-900) -->
<div class="bg-neutral-10 text-neutral-900">Beyaz arkaplan, koyu metin</div>
<div class="bg-neutral-100 text-neutral-700">Açık gri arkaplan</div>
<div class="bg-neutral-700 text-white">Koyu gri arkaplan, beyaz metin</div>
```

### Semantic Renkler
```html
<!-- Durum renkleri -->
<div class="bg-success-50 text-success-700 p-16">
    <i class="ph ph-check-circle"></i> Başarılı işlem
</div>

<div class="bg-danger-50 text-danger-700 p-16">
    <i class="ph ph-warning-circle"></i> Hata mesajı
</div>

<div class="bg-warning-50 text-warning-700 p-16">
    <i class="ph ph-warning"></i> Uyarı mesajı
</div>

<div class="bg-info-50 text-info-700 p-16">
    <i class="ph ph-info"></i> Bilgi mesajı
</div>
```

### Hover Renk Efektleri
```html
<!-- Hover text renkleri -->
<a href="#" class="text-neutral-600 hover-text-main-600">
    Hover'da ana renge dönüşen link
</a>

<!-- Hover background renkleri -->
<button class="bg-transparent hover-bg-main-50 text-main-600 p-16">
    Hover'da arkaplan rengi değişen buton
</button>

<!-- Kombinasyonlar -->
<div class="bg-white hover-bg-main-600 text-main-600 hover-text-white p-24 transition-2">
    Hover'da tamamen değişen kart
</div>
```

---

## 📝 Tipografi ve Font Sistemi

### Font Aileleri
```scss
--heading-font: "Inter", sans-serif;  // Başlıklar için
--body-font: "Inter", sans-serif;     // Gövde metni için
```

### Responsive Başlık Boyutları
```html
<!-- Responsive başlıklar (otomatik boyutlanır) -->
<h1 class="h1">Ana Başlık (32px-48px)</h1>
<h2 class="h2">İkinci Seviye (28px-40px)</h2>
<h3 class="h3">Üçüncü Seviye (24px-32px)</h3>
<h4 class="h4">Dördüncü Seviye (20px-24px)</h4>
<h5 class="h5">Beşinci Seviye (18px-20px)</h5>
<h6 class="h6">Altıncı Seviye (16px)</h6>

<!-- Display başlıklar (hero bölümler için) -->
<h1 class="display1">Mega Başlık (40px-120px)</h1>
<h2 class="display2">Büyük Başlık (36px-80px)</h2>
<h3 class="display3">Orta Başlık (32px-64px)</h3>
<h4 class="display4">Küçük Display (28px-56px)</h4>
```

### Font Size Utilities
```html
<!-- Sabit boyutlar -->
<p class="text-xs">12px metin</p>
<p class="text-sm">14px metin</p>
<p class="text-md">16px metin (varsayılan)</p>
<p class="text-lg">18px metin</p>
<p class="text-xl">20px metin</p>
<p class="text-2xl">24px metin</p>
<p class="text-3xl">30px metin</p>
<p class="text-4xl">36px metin</p>
<p class="text-5xl">48px metin</p>
<p class="text-6xl">60px metin</p>

<!-- Spacing değerleri ile font boyutları -->
<p class="text-16">16px (spacing sistemi)</p>
<p class="text-24">24px (spacing sistemi)</p>
```

### Font Weight ve Stiller
```html
<!-- Font weight (Bootstrap ile) -->
<p class="fw-light">İnce yazı (300)</p>
<p class="fw-normal">Normal yazı (400)</p>
<p class="fw-medium">Orta kalın (500)</p>
<p class="fw-semibold">Yarı kalın (600)</p>
<p class="fw-bold">Kalın yazı (700)</p>

<!-- Font family -->
<h2 class="font-heading">Başlık fontu</h2>
<p class="font-body">Gövde fontu</p>

<!-- Text alignment -->
<p class="text-start">Sola hizalı</p>
<p class="text-center">Ortaya hizalı</p>
<p class="text-end">Sağa hizalı</p>
```

### Pratik Tipografi Örnekleri
```html
<!-- Blog post başlığı -->
<article class="p-32">
    <h1 class="h2 text-heading mb-16">Blog Post Başlığı</h1>
    <div class="d-flex align-items-center gap-16 mb-24">
        <span class="text-sm text-neutral-600">15 Mart 2024</span>
        <span class="text-sm text-neutral-400">|</span>
        <span class="text-sm text-main-600">Teknoloji</span>
    </div>
    <p class="text-lg text-body mb-24">
        Bu blog post'un giriş paragrafı burada yer alır...
    </p>
</article>

<!-- Kart başlığı -->
<div class="card p-24">
    <h3 class="h4 text-heading mb-12">Kart Başlığı</h3>
    <p class="text-md text-neutral-600 mb-16">
        Kart açıklaması burada yer alır.
    </p>
    <a href="#" class="text-main-600 hover-text-main-700 fw-medium">
        Devamını Oku →
    </a>
</div>
```

---

## 📏 Spacing Sistemi

### Space Scale (1px - 187px)
```scss
// Temel spacing değerleri
--size-4: 0.25rem;     // 4px
--size-8: 0.5rem;      // 8px
--size-12: 0.75rem;    // 12px
--size-16: 1rem;       // 16px
--size-20: 1.25rem;    // 20px
--size-24: 1.5rem;     // 24px
--size-32: 2rem;       // 32px
--size-40: 2.5rem;     // 40px
--size-48: 3rem;       // 48px
--size-64: 4rem;       // 64px
--size-80: 5rem;       // 80px
--size-96: 6rem;       // 96px
--size-120: 7.5rem;    // 120px
```

### Margin Sistemi
```html
<!-- Tüm yönlere margin -->
<div class="m-16">16px margin (tüm yönler)</div>
<div class="m-24">24px margin (tüm yönler)</div>

<!-- Yatay/Dikey margin -->
<div class="mx-auto">Yatay ortala</div>
<div class="mx-24">Yatay 24px margin</div>
<div class="my-32">Dikey 32px margin</div>

<!-- Tek yön margin -->
<div class="mt-16">Üst 16px margin</div>
<div class="mb-24">Alt 24px margin</div>
<div class="ms-32">Sol 32px margin (inline-start)</div>
<div class="me-48">Sağ 48px margin (inline-end)</div>

<!-- Negatif margin -->
<div class="ms--40">Sol -40px margin</div>
<div class="mt--5">Üst -5px margin</div>

<!-- Responsive margin -->
<div class="my-60">30px-60px responsive dikey margin</div>
<div class="my-120">60px-120px responsive dikey margin</div>
```

### Padding Sistemi
```html
<!-- Tüm yönlere padding -->
<div class="p-16">16px padding (tüm yönler)</div>
<div class="p-24">24px padding (tüm yönler)</div>

<!-- Yatay/Dikey padding -->
<div class="px-24">Yatay 24px padding</div>
<div class="py-32">Dikey 32px padding</div>

<!-- Tek yön padding -->
<div class="pt-16">Üst 16px padding</div>
<div class="pb-24">Alt 24px padding</div>
<div class="ps-32">Sol 32px padding</div>
<div class="pe-48">Sağ 48px padding</div>

<!-- Responsive padding -->
<div class="py-60">30px-60px responsive dikey padding</div>
<div class="py-120">60px-120px responsive dikey padding</div>
<div class="px-60">24px-60px responsive yatay padding</div>
```

### Spacing Kombinasyonları
```html
<!-- Kart örneği -->
<div class="bg-white box-shadow-md p-32 mb-24">
    <h3 class="h4 mb-16">Kart Başlığı</h3>
    <p class="mb-20">İçerik metni</p>
    <button class="btn btn-main mt-8">Buton</button>
</div>

<!-- Section spacing -->
<section class="py-120">
    <div class="container">
        <div class="section-heading mb-60">
            <h2 class="h2">Section Başlığı</h2>
        </div>
        <!-- İçerik -->
    </div>
</section>

<!-- İç içe spacing -->
<div class="p-40">
    <div class="bg-neutral-50 p-24 mb-24">
        <h4 class="mb-16">Alt başlık</h4>
        <div class="px-16 py-12">
            İç içe içerik
        </div>
    </div>
</div>
```

---

## 🔘 Button Sistemi

### Temel Button Yapısı
```scss
.btn {
    padding: 17px 32px;        // Varsayılan padding
    border-radius: 5px;        // Köşe yuvarlaklığı
    font-weight: 500;          // Font kalınlığı
    transition: .2s linear;    // Geçiş efekti
}
```

### Button Varyantları
```html
<!-- Ana button -->
<button class="btn btn-main">Ana Buton</button>
<a href="#" class="btn btn-main">Link Button</a>

<!-- Outline button -->
<button class="btn btn-outline-main">Outline Buton</button>

<!-- Beyaz button -->
<button class="btn btn-white">Beyaz Buton</button>

<!-- Outline beyaz button -->
<button class="btn btn-outline-white">Outline Beyaz</button>
```

### Button Boyutları
```html
<!-- Varsayılan boyut -->
<button class="btn btn-main">Normal Buton (17px 32px)</button>

<!-- Küçük boyut -->
<button class="btn btn-main btn-sm">Küçük Buton (14px 20px)</button>

<!-- Özel boyutlar -->
<button class="btn btn-main px-48 py-20">Özel Boyut</button>
```

### Button İkonları
```html
<!-- İkonlu buttonlar -->
<button class="btn btn-main">
    <i class="ph ph-download me-8"></i>
    İndir
</button>

<button class="btn btn-outline-main">
    <i class="ph ph-heart me-8"></i>
    Beğen
</button>

<!-- Sadece ikon -->
<button class="btn btn-main d-flex align-items-center justify-content-center" style="width: 48px; height: 48px;">
    <i class="ph ph-plus"></i>
</button>
```

### Button Durumları
```html
<!-- Aktif durum -->
<button class="btn btn-main active">Aktif Buton</button>

<!-- Disabled durum -->
<button class="btn btn-main" disabled>Pasif Buton</button>

<!-- Loading durumu -->
<button class="btn btn-main" disabled>
    <i class="ph ph-spinner animate-spin me-8"></i>
    Yükleniyor...
</button>
```

### Button Grupları
```html
<!-- Button grup -->
<div class="d-flex gap-16">
    <button class="btn btn-main">Kaydet</button>
    <button class="btn btn-outline-main">İptal</button>
</div>

<!-- Responsive button grup -->
<div class="buttons-wrapper d-flex gap-16">
    <button class="btn btn-main">
        <i class="ph ph-play me-8"></i>
        Başlat
    </button>
    <button class="btn btn-white">
        <i class="ph ph-info me-8"></i>
        Bilgi
    </button>
</div>
```

### Pratik Button Örnekleri
```html
<!-- CTA Section -->
<section class="text-center py-120">
    <h2 class="h2 mb-24">Hemen Başlayın</h2>
    <p class="text-lg mb-32">Ücretsiz deneme sürümünü deneyin</p>
    <div class="d-flex justify-content-center gap-16">
        <button class="btn btn-main px-40 py-20">
            Ücretsiz Deneyin
        </button>
        <button class="btn btn-outline-main px-40 py-20">
            Demo İzleyin
        </button>
    </div>
</section>

<!-- Kart içinde button -->
<div class="card p-32">
    <h3 class="h4 mb-16">Premium Plan</h3>
    <div class="mb-24">
        <span class="display3 text-main-600">$29</span>
        <span class="text-neutral-600">/ay</span>
    </div>
    <button class="btn btn-main w-100 mb-16">Planı Seç</button>
    <button class="btn btn-outline-main w-100">Detayları Gör</button>
</div>
```

---

## 📝 Form Sistemi

### Input Temel Yapısı
```scss
.common-input {
    padding: 12px 24px;           // İç boşluk
    border-radius: 5px;           // Köşe yuvarlaklığı
    border: 1px solid var(--neutral-30);  // Kenarlık
    font-size: 17px;              // Font boyutu
}
```

### Input Varyantları
```html
<!-- Temel input -->
<input type="text" class="common-input" placeholder="Adınızı girin">

<!-- Farklı boyutlar -->
<input type="text" class="common-input common-input--md" placeholder="Orta boyut (13px 16px)">
<input type="text" class="common-input common-input--lg" placeholder="Büyük boyut (23px 24px)">

<!-- Özel placeholder renkleri -->
<input type="text" class="common-input placeholder-white" placeholder="Beyaz placeholder">
<input type="text" class="common-input placeholder-text-neutral-100" placeholder="Neutral placeholder">
```

### Form Grupları
```html
<!-- Temel form grup -->
<div class="mb-20">
    <label class="form-label text-neutral-700 mb-8 d-block">E-posta Adresiniz</label>
    <input type="email" class="common-input w-100" placeholder="ornek@email.com">
</div>

<!-- Hata durumu -->
<div class="mb-20">
    <label class="form-label text-neutral-700 mb-8 d-block">Şifreniz</label>
    <input type="password" class="common-input w-100 border-danger-600" placeholder="Şifrenizi girin">
    <div class="text-danger-600 text-sm mt-4">
        <i class="ph ph-warning-circle me-4"></i>
        Şifre en az 8 karakter olmalıdır
    </div>
</div>

<!-- Başarı durumu -->
<div class="mb-20">
    <label class="form-label text-neutral-700 mb-8 d-block">Kullanıcı Adı</label>
    <input type="text" class="common-input w-100 border-success-600" value="kullanici123">
    <div class="text-success-600 text-sm mt-4">
        <i class="ph ph-check-circle me-4"></i>
        Kullanıcı adı uygun
    </div>
</div>
```

### Select Dropdown
```html
<!-- Temel select -->
<div class="select-has-icon mb-20">
    <select class="common-input w-100">
        <option>Şehir seçin</option>
        <option>İstanbul</option>
        <option>Ankara</option>
        <option>İzmir</option>
    </select>
</div>

<!-- Select2 dropdown (özel stil) -->
<div class="mb-20">
    <select class="form-select" id="select2-example">
        <option>Kategori seçin</option>
        <option>Teknoloji</option>
        <option>Tasarım</option>
        <option>Pazarlama</option>
    </select>
</div>

<!-- Beyaz arkaplan select -->
<div class="select-has-icon select-bg-white">
    <select class="common-input">
        <option>Dil seçin</option>
        <option>Türkçe</option>
        <option>English</option>
    </select>
</div>
```

### Checkbox ve Radio
```html
<!-- Checkbox -->
<div class="common-check mb-16">
    <input type="checkbox" class="form-check-input" id="check1">
    <label class="form-check-label" for="check1">
        <a href="#" class="text-main-600">Kullanım şartlarını</a> kabul ediyorum
    </label>
</div>

<div class="common-check mb-16">
    <input type="checkbox" class="form-check-input" id="check2" checked>
    <label class="form-check-label" for="check2">
        E-posta bildirimleri almak istiyorum
    </label>
</div>

<!-- Radio buttons -->
<div class="mb-20">
    <p class="text-neutral-700 mb-12">Cinsiyet:</p>
    <div class="common-check common-radio mb-12">
        <input type="radio" class="form-check-input" name="gender" id="male">
        <label class="form-check-label" for="male">Erkek</label>
    </div>
    <div class="common-check common-radio mb-12">
        <input type="radio" class="form-check-input" name="gender" id="female">
        <label class="form-check-label" for="female">Kadın</label>
    </div>
    <div class="common-check common-radio">
        <input type="radio" class="form-check-input" name="gender" id="other">
        <label class="form-check-label" for="other">Belirtmek istemiyorum</label>
    </div>
</div>
```

### Textarea
```html
<!-- Temel textarea -->
<div class="mb-20">
    <label class="form-label text-neutral-700 mb-8 d-block">Mesajınız</label>
    <textarea class="common-input w-100" rows="5" placeholder="Mesajınızı buraya yazın..."></textarea>
</div>
```

### File Upload
```html
<!-- File input -->
<div class="mb-20">
    <label class="form-label text-neutral-700 mb-8 d-block">Dosya Yükleyin</label>
    <input type="file" class="common-input w-100" accept=".pdf,.doc,.docx">
</div>
```

### Şifre Göster/Gizle
```html
<div class="position-relative mb-20">
    <label class="form-label text-neutral-700 mb-8 d-block">Şifre</label>
    <input type="password" class="common-input w-100" id="your-password" placeholder="Şifrenizi girin">
    <span class="password-show-hide" onclick="togglePassword()">
        <i class="ph ph-eye"></i>
    </span>
</div>

<script>
function togglePassword() {
    const input = document.getElementById('your-password');
    const icon = document.querySelector('.password-show-hide i');
    
    if (input.type === 'password') {
        input.type = 'text';
        icon.className = 'ph ph-eye-slash';
    } else {
        input.type = 'password';
        icon.className = 'ph ph-eye';
    }
}
</script>
```

### Komple Form Örneği
```html
<form class="bg-white p-40 box-shadow-lg rounded-16">
    <h3 class="h3 text-heading mb-32 text-center">İletişim Formu</h3>
    
    <!-- İsim ve soyisim -->
    <div class="row mb-20">
        <div class="col-md-6 mb-20 mb-md-0">
            <label class="form-label text-neutral-700 mb-8 d-block">Ad</label>
            <input type="text" class="common-input w-100" placeholder="Adınız">
        </div>
        <div class="col-md-6">
            <label class="form-label text-neutral-700 mb-8 d-block">Soyad</label>
            <input type="text" class="common-input w-100" placeholder="Soyadınız">
        </div>
    </div>
    
    <!-- E-posta -->
    <div class="mb-20">
        <label class="form-label text-neutral-700 mb-8 d-block">E-posta</label>
        <input type="email" class="common-input w-100" placeholder="ornek@email.com">
    </div>
    
    <!-- Telefon -->
    <div class="mb-20">
        <label class="form-label text-neutral-700 mb-8 d-block">Telefon</label>
        <input type="tel" class="common-input w-100" placeholder="+90 555 123 45 67">
    </div>
    
    <!-- Konu -->
    <div class="mb-20">
        <label class="form-label text-neutral-700 mb-8 d-block">Konu</label>
        <div class="select-has-icon">
            <select class="common-input w-100">
                <option>Konu seçin</option>
                <option>Genel Bilgi</option>
                <option>Destek Talebi</option>
                <option>Şikayet</option>
                <option>Öneri</option>
            </select>
        </div>
    </div>
    
    <!-- Mesaj -->
    <div class="mb-24">
        <label class="form-label text-neutral-700 mb-8 d-block">Mesajınız</label>
        <textarea class="common-input w-100" rows="5" placeholder="Mesajınızı buraya yazın..."></textarea>
    </div>
    
    <!-- Checkbox -->
    <div class="common-check mb-32">
        <input type="checkbox" class="form-check-input" id="privacy">
        <label class="form-check-label" for="privacy">
            <a href="#" class="text-main-600">Gizlilik politikasını</a> okudum ve kabul ediyorum
        </label>
    </div>
    
    <!-- Submit button -->
    <button type="submit" class="btn btn-main w-100 py-16">
        <i class="ph ph-paper-plane-tilt me-8"></i>
        Mesajı Gönder
    </button>
</form>
```

Bu ilk bölümü tamamladım. Devam etmek için diğer bölümleri de ayrı dosyalar halinde oluşturacağım.

# SASS/CSS Tasarım Sistemi Dokümantasyonu

## 📋 İçindekiler
1. [Genel Yapı](#genel-yapı)
2. [Renk Sistemi](#renk-sistemi)
3. [Tipografi Sistemi](#tipografi-sistemi)
4. [Spacing Sistemi](#spacing-sistemi)
5. [Component Kütüphanesi](#component-kütüphanesi)
6. [Layout Sistem](#layout-sistem)
7. [Utility Classes](#utility-classes)
8. [Responsive Tasarım](#responsive-tasarım)
9. [Animasyonlar](#animasyonlar)
10. [Kullanım Örnekleri](#kullanım-örnekleri)

---

## 🏗️ Genel Yapı

### Dosya Organizasyonu
```
public/assets/sass/
├── main.scss                 # Ana import dosyası
├── _extra.scss              # Ekstra stiller
├── abstracts/               # Temel SASS araçları
│   ├── _variable.scss       # CSS Custom Properties & Variables
│   ├── _mixins.scss         # Mixin'ler
│   ├── _functions.scss      # SASS fonksiyonları
│   └── _index.scss          # Import hub
├── components/              # UI Componentleri
│   ├── _button.scss         # Buton stilleri
│   ├── _form.scss           # Form elementleri
│   ├── _tab.scss            # Tab componentleri
│   └── ...
├── utilities/               # Utility classes
│   ├── _typography.scss     # Tipografi
│   ├── _colors.scss         # Renk utilities
│   ├── _margin.scss         # Margin utilities
│   ├── _padding.scss        # Padding utilities
│   └── ...
├── layout/                  # Layout componentleri
│   ├── _header.scss         # Header stilleri
│   ├── _footer.scss         # Footer stilleri
│   └── ...
└── pages/                   # Sayfa özel stiller
    ├── homeOne/
    ├── homeTwo/
    └── ...
```

---

## 🎨 Renk Sistemi

### Ana Renk Paleti
Sistem, HSL tabanlı dinamik renk sistemi kullanır:

#### Primary Colors
```scss
// Ana tema renkleri
--main-h: 209;        // Hue (Mavi ton)
--main-s: 94%;        // Saturation
--main-l: 41%;        // Lightness

// Kullanım
color: hsl(var(--main));
background-color: var(--main-600);
```

#### Secondary Colors
```scss
--main-two-h: 20;     // Turuncu ton
--main-two-s: 89%;
--main-two-l: 59%;

--main-three-h: 144;  // Yeşil ton
--main-three-s: 56%;
--main-three-l: 42%;
```

#### Neutral Palette
```scss
// Gri tonları (10-900 arası)
--neutral-10: #FFFFFF;
--neutral-20: #F5F6F7;
--neutral-30: #EBECEF;
--neutral-40: #DFE0E4;
--neutral-50: #C1C4CC;
// ... 900'e kadar
--neutral-900: #071431;
```

#### Semantic Colors
```scss
// Durum renkleri
--success-50: #F0FDF4;    // Açık yeşil
--success-600: #16A34A;   // Koyu yeşil

--danger-50: #FEF2F2;     // Açık kırmızı
--danger-600: #DC2626;    // Koyu kırmızı

--warning-50: #FEFCE8;    // Açık sarı
--warning-600: #FF9F29;   // Koyu sarı

--info-50: #EFF6FF;       // Açık mavi
--info-600: #875BF7;      // Koyu mavi
```

### Renk Kullanımı
```html
<!-- Text renkleri -->
<p class="text-main-600">Ana renk metni</p>
<p class="text-neutral-700">Başlık rengi</p>
<p class="text-success-600">Başarı mesajı</p>

<!-- Background renkleri -->
<div class="bg-main-50">Açık ana renk arkaplan</div>
<div class="bg-danger-600">Hata arkaplanı</div>

<!-- Hover efektleri -->
<button class="hover-text-main-600 hover-bg-main-50">Hover buton</button>
```

---

## 📝 Tipografi Sistemi

### Font Aileleri
```scss
--heading-font: "Inter", sans-serif;
--body-font: "Inter", sans-serif;
```

### Responsive Heading Sizes
```scss
// Clamp ile responsive boyutlar
--heading-one: clamp(2rem, 0.2181rem + 3.7123vw, 3rem);     // 32px-48px
--heading-two: clamp(1.75rem, 0.4136rem + 2.7842vw, 2.5rem); // 28px-40px
--heading-three: clamp(1.5rem, 0.609rem + 1.8561vw, 2rem);   // 24px-32px
--heading-four: clamp(1.25rem, 0.8045rem + 0.9281vw, 1.5rem); // 20px-24px
--heading-five: clamp(1.125rem, 0.9023rem + 0.464vw, 1.25rem); // 18px-20px
--heading-six: clamp(1rem, 0.769rem + 0.6813vw, 1rem);        // 16px
```

### Display Sizes (Hero başlıklar için)
```scss
--display-one: clamp(2.5rem, -6.4095rem + 18.5615vw, 7.5rem); // 40px-120px
--display-two: clamp(2.25rem, -2.6502rem + 10.2088vw, 5rem);   // 36px-80px
--display-three: clamp(2rem, -1.5638rem + 7.4246vw, 4rem);     // 32px-64px
--display-four: clamp(1.75rem, -1.3683rem + 6.4965vw, 3.5rem); // 28px-56px
```

### Font Size Utilities
```scss
// Utility classes
.text-xs    // 12px
.text-sm    // 14px
.text-md    // 16px
.text-lg    // 18px
.text-xl    // 20px
.text-2xl   // 24px
.text-3xl   // 30px
.text-4xl   // 36px
.text-5xl   // 48px
.text-6xl   // 60px
```

### Kullanım Örnekleri
```html
<!-- Başlıklar -->
<h1 class="h1">Ana Başlık</h1>
<h2 class="display1">Hero Başlık</h2>

<!-- Font size utilities -->
<p class="text-lg font-heading">Büyük metin</p>
<span class="text-sm text-neutral-600">Küçük açıklama</span>
```

---

## 📏 Spacing Sistemi

### Space Scale
```scss
// 1px'den 187px'e kadar spacing değerleri
--size-1: 0.0625rem;    // 1px
--size-4: 0.25rem;      // 4px
--size-8: 0.5rem;       // 8px
--size-16: 1rem;        // 16px
--size-24: 1.5rem;      // 24px
--size-32: 2rem;        // 32px
--size-48: 3rem;        // 48px
--size-64: 4rem;        // 64px
--size-80: 5rem;        // 80px
--size-96: 6rem;        // 96px
--size-120: 7.5rem;     // 120px
--size-187: 11.6875rem; // 187px
```

### Margin Utilities
```html
<!-- Tüm yönler -->
<div class="m-16">16px margin</div>

<!-- Yatay/Dikey -->
<div class="mx-24">Yatay 24px margin</div>
<div class="my-32">Dikey 32px margin</div>

<!-- Tek yön -->
<div class="mt-16">Üst 16px margin</div>
<div class="mb-24">Alt 24px margin</div>
<div class="ms-32">Sol 32px margin</div>
<div class="me-48">Sağ 48px margin</div>

<!-- Responsive margin -->
<div class="my-60">Responsive dikey margin (30px-60px)</div>
<div class="my-120">Büyük responsive margin (60px-120px)</div>
```

### Padding Utilities
```html
<!-- Tüm yönler -->
<div class="p-16">16px padding</div>

<!-- Yatay/Dikey -->
<div class="px-24">Yatay 24px padding</div>
<div class="py-32">Dikey 32px padding</div>

<!-- Tek yön -->
<div class="pt-16">Üst 16px padding</div>
<div class="pb-24">Alt 24px padding</div>
<div class="ps-32">Sol 32px padding</div>
<div class="pe-48">Sağ 48px padding</div>

<!-- Responsive padding -->
<div class="py-60">Responsive dikey padding</div>
<div class="py-120">Büyük responsive padding</div>
```

---

## 🧩 Component Kütüphanesi

### Button Sistemi

#### Temel Button Yapısı
```scss
.btn {
    position: relative;
    border-radius: 5px;
    font-weight: 500;
    padding: 17px 32px;
    transition: .2s linear;
    
    &:active {
        transform: scale(1.01);
    }
}
```

#### Button Varyantları
```html
<!-- Ana buton -->
<button class="btn btn-main">Ana Buton</button>

<!-- Outline buton -->
<button class="btn btn-outline-main">Outline Buton</button>

<!-- Beyaz buton -->
<button class="btn btn-white">Beyaz Buton</button>

<!-- Küçük buton -->
<button class="btn btn-main btn-sm">Küçük Buton</button>
```

### Form Sistemi

#### Input Stilleri
```html
<!-- Temel input -->
<input type="text" class="common-input" placeholder="Metin girin">

<!-- Farklı boyutlar -->
<input type="text" class="common-input common-input--md" placeholder="Orta boyut">
<input type="text" class="common-input common-input--lg" placeholder="Büyük boyut">

<!-- Select dropdown -->
<div class="select-has-icon">
    <select class="common-input">
        <option>Seçenek 1</option>
        <option>Seçenek 2</option>
    </select>
</div>
```

#### Checkbox ve Radio
```html
<!-- Checkbox -->
<div class="common-check">
    <input type="checkbox" class="form-check-input" id="check1">
    <label class="form-check-label" for="check1">Kabul ediyorum</label>
</div>

<!-- Radio -->
<div class="common-check common-radio">
    <input type="radio" class="form-check-input" name="radio" id="radio1">
    <label class="form-check-label" for="radio1">Seçenek 1</label>
</div>
```

---

## 🏗️ Layout Sistem

### Container Sistemi
```html
<!-- Standart container -->
<div class="container">İçerik</div>

<!-- Büyük container -->
<div class="container container--lg">Geniş içerik (max-width: 1600px)</div>

<!-- Ekstra büyük container -->
<div class="container container--xl">Çok geniş içerik (max-width: 1760px)</div>
```

### Grid Sistemi
```html
<!-- 2 kolonlu grid -->
<div class="grid-cols-2">
    <div>Kolon 1</div>
    <div>Kolon 2</div>
</div>

<!-- 4 kolonlu özel grid -->
<div class="grid-cols-4">
    <div>Kolon 1</div>
    <div>Kolon 2</div>
    <div>Kolon 3</div>
    <div>Kolon 4 (220px)</div>
</div>
```

### Header Sistemi
```html
<header class="header fixed-header">
    <div class="container">
        <div class="header-content-wrapper d-flex align-items-center justify-content-between">
            <div class="logo">
                <img src="logo.png" alt="Logo">
            </div>
            
            <nav class="nav-menu d-flex">
                <div class="nav-menu__item">
                    <a href="#" class="nav-menu__link">Ana Sayfa</a>
                </div>
                
                <!-- Dropdown menü -->
                <div class="nav-menu__item has-submenu">
                    <a href="#" class="nav-menu__link">Hizmetler</a>
                    <ul class="nav-submenu">
                        <li class="nav-submenu__item">
                            <a href="#" class="nav-submenu__link">Alt Hizmet 1</a>
                        </li>
                    </ul>
                </div>
            </nav>
            
            <div class="header-right d-flex align-items-center">
                <button class="btn btn-main">İletişim</button>
            </div>
        </div>
    </div>
</header>
```

---

## 🛠️ Utility Classes

### Flexbox Utilities
```html
<div class="d-flex align-items-center justify-content-between">
    <div>Sol</div>
    <div>Sağ</div>
</div>
```

### Position Utilities
```html
<!-- Position -->
<div class="position-relative">
    <div class="position-absolute inset-block-start-0 inset-inline-end-0">
        Sağ üst köşe
    </div>
</div>

<!-- Inset utilities -->
<div class="inset-inline-start-50-percent">Sol 50%</div>
<div class="inset-block-start-20-percent">Üst 20%</div>
```

### Display Utilities
```html
<div class="d-block">Block</div>
<div class="d-inline-block">Inline Block</div>
<div class="d-flex">Flex</div>
<div class="d-none">Gizli</div>
```

### Background Utilities
```html
<!-- Arkaplan renkleri -->
<div class="bg-main-50">Açık ana renk</div>
<div class="section-bg">Bölüm arkaplanı</div>

<!-- Background image -->
<div class="bg-img" style="background-image: url('image.jpg')">
    Arkaplan resimli div
</div>
```

### Shadow Utilities
```html
<div class="box-shadow-sm">Küçük gölge</div>
<div class="box-shadow-md">Orta gölge</div>
<div class="box-shadow-lg">Büyük gölge</div>
<div class="box-shadow-xl">Ekstra büyük gölge</div>
```

---

## 📱 Responsive Tasarım

### Breakpoint Sistemi
```scss
// Media query mixins
@mixin xxsm-screen { @media screen and (max-width: 374px) { @content; } }
@mixin xsm-screen  { @media screen and (max-width: 424px) { @content; } }
@mixin msm-screen  { @media screen and (max-width: 575px) { @content; } }
@mixin sm-screen   { @media screen and (max-width: 767px) { @content; } }
@mixin md-screen   { @media screen and (max-width: 991px) { @content; } }
@mixin lg-screen   { @media screen and (max-width: 1199px) { @content; } }
@mixin xl-screen   { @media screen and (max-width: 1399px) { @content; } }
@mixin xxl-screen  { @media screen and (max-width: 1499px) { @content; } }
@mixin xxxl-screen { @media screen and (max-width: 1599px) { @content; } }
```

### Responsive Utilities
```html
<!-- Mobilde gizle -->
<div class="d-none d-md-block">Masaüstünde görün</div>

<!-- Responsive margin/padding -->
<div class="my-60">30px-60px responsive margin</div>
<div class="py-120">60px-120px responsive padding</div>
```

---

## ✨ Animasyonlar

### Keyframe Animasyonları
```scss
// Yukarı aşağı hareket
@keyframes upDown {
    0% { transform: translateY(0px); }
    50% { transform: translateY(-20px); }
    100% { transform: translateY(0px); }
}

// Döndürme
@keyframes roatation {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

// Ölçekleme
@keyframes scalation {
    0% { transform: scale(1); }
    50% { transform: scale(.5); }
    100% { transform: scale(1); }
}
```

### Animasyon Classes
```html
<div class="animation-upDown">Yukarı aşağı</div>
<div class="animation-rotation">Dönen element</div>
<div class="animation-scalation">Ölçeklenen element</div>
<div class="animation-walking">Yürüyen animasyon</div>
```

### Transition Utilities
```html
<div class="transition-1">0.1s geçiş</div>
<div class="transition-2">0.2s geçiş</div>
<div class="transition-3">0.3s geçiş</div>
```

---

## 💡 Kullanım Örnekleri

### Hero Bölümü
```html
<section class="banner position-relative py-120">
    <div class="container">
        <div class="row align-items-center">
            <div class="col-lg-6">
                <h1 class="display1 text-heading mb-24">
                    Harika Bir Başlık
                </h1>
                <p class="text-lg text-body mb-32">
                    Açıklama metni burada yer alır.
                </p>
                <div class="buttons-wrapper d-flex gap-16">
                    <a href="#" class="btn btn-main">
                        Başla
                    </a>
                    <a href="#" class="btn btn-outline-main">
                        Daha Fazla
                    </a>
                </div>
            </div>
            <div class="col-lg-6">
                <div class="banner-thumb">
                    <img src="hero-image.jpg" alt="Hero" class="w-100">
                </div>
            </div>
        </div>
    </div>
    
    <!-- Animasyonlu kutular -->
    <div class="banner-box one position-absolute p-24 bg-white box-shadow-lg">
        <div class="d-flex align-items-center gap-16">
            <div class="banner-box__icon text-main-600">
                <i class="ph ph-users"></i>
            </div>
            <div>
                <h6 class="mb-4">1000+</h6>
                <span class="text-sm text-neutral-600">Mutlu Müşteri</span>
            </div>
        </div>
    </div>
</section>
```

### Kart Komponenti
```html
<div class="card bg-white box-shadow-md border-radius-8 overflow-hidden">
    <div class="card-img">
        <img src="card-image.jpg" alt="Kart" class="w-100">
    </div>
    <div class="card-content p-24">
        <h5 class="text-heading mb-12">Kart Başlığı</h5>
        <p class="text-neutral-600 mb-16">
            Kart açıklama metni burada yer alır.
        </p>
        <div class="d-flex align-items-center justify-content-between">
            <span class="text-main-600 font-weight-600">$99</span>
            <a href="#" class="btn btn-main btn-sm">
                Detay
            </a>
        </div>
    </div>
</div>
```

### Form Örneği
```html
<form class="bg-white p-40 box-shadow-lg border-radius-8">
    <h4 class="text-heading mb-24">İletişim Formu</h4>
    
    <div class="row">
        <div class="col-md-6 mb-20">
            <label class="form-label text-neutral-700 mb-8">Ad Soyad</label>
            <input type="text" class="common-input" placeholder="Adınızı girin">
        </div>
        <div class="col-md-6 mb-20">
            <label class="form-label text-neutral-700 mb-8">E-posta</label>
            <input type="email" class="common-input" placeholder="E-posta adresiniz">
        </div>
    </div>
    
    <div class="mb-20">
        <label class="form-label text-neutral-700 mb-8">Mesajınız</label>
        <textarea class="common-input" placeholder="Mesajınızı yazın"></textarea>
    </div>
    
    <div class="mb-24">
        <div class="common-check">
            <input type="checkbox" class="form-check-input" id="agree">
            <label class="form-check-label" for="agree">
                <a href="#" class="text-main-600">Gizlilik politikasını</a> kabul ediyorum
            </label>
        </div>
    </div>
    
    <button type="submit" class="btn btn-main w-100">
        Gönder
    </button>
</form>
```

---

## 🎯 Önemli Notlar

### Performans İpuçları
1. **CSS Custom Properties**: Dinamik tema değişiklikleri için HSL değerleri kullanın
2. **Clamp Functions**: Responsive tasarım için clamp() fonksiyonlarını tercih edin
3. **Utility Classes**: Tekrarlanan stiller için utility class'ları kullanın

### Erişilebilirlik
1. **Focus States**: Tüm interaktif elementlerde focus durumları tanımlanmıştır
2. **Color Contrast**: Renk kontrastları WCAG standartlarına uygundur
3. **Semantic HTML**: Anlamsal HTML yapısı kullanın

### Bakım ve Güncellemeler
1. **Variables**: Tüm değişiklikler `_variable.scss` dosyasından yapılmalıdır
2. **Component Structure**: Yeni componentler `components/` klasörüne eklenmelidir
3. **Responsive**: Yeni responsive değerler için mixin'leri kullanın

---

## 🚀 Hızlı Başlangıç

1. **Renkleri kullanmak için**: `text-main-600`, `bg-success-50`, `border-danger-600`
2. **Spacing için**: `m-16`, `p-24`, `my-60`, `px-32`
3. **Typography için**: `text-lg`, `h1`, `display1`
4. **Layout için**: `d-flex`, `align-items-center`, `justify-content-between`
5. **Responsive için**: `d-none d-md-block`, `my-60`, `py-120`

Bu dokümantasyon, tasarım sisteminizin tüm detaylarını içermektedir. Yeni projeler için bu sistemi referans alarak tutarlı ve profesyonel tasarımlar oluşturabilirsiniz.

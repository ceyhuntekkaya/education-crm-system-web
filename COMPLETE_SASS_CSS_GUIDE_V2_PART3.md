# 🎨 Kapsamlı SASS/CSS Tasarım Sistemi Rehberi v2.0 - Bölüm 3

## 📱 Responsive Tasarım

### Breakpoint Sistemi
```scss
// Media query mixinleri
@mixin xxsm-screen { @media screen and (max-width: 374px) { @content; } }  // Çok küçük telefon
@mixin xsm-screen  { @media screen and (max-width: 424px) { @content; } }  // Küçük telefon
@mixin msm-screen  { @media screen and (max-width: 575px) { @content; } }  // Orta telefon
@mixin sm-screen   { @media screen and (max-width: 767px) { @content; } }  // Büyük telefon
@mixin md-screen   { @media screen and (max-width: 991px) { @content; } }  // Tablet
@mixin lg-screen   { @media screen and (max-width: 1199px) { @content; } } // Küçük masaüstü
@mixin xl-screen   { @media screen and (max-width: 1399px) { @content; } } // Orta masaüstü
@mixin xxl-screen  { @media screen and (max-width: 1499px) { @content; } } // Büyük masaüstü
@mixin xxxl-screen { @media screen and (max-width: 1599px) { @content; } } // Çok büyük masaüstü
```

### Responsive Utilities
```html
<!-- Display responsive -->
<div class="d-none d-sm-block d-lg-none d-xl-block">
    Karmaşık responsive görünüm
</div>

<!-- Mobilde gizle, masaüstünde göster -->
<div class="d-none d-md-block">
    Masaüstü içeriği
</div>

<!-- Mobilde göster, masaüstünde gizle -->
<div class="d-block d-md-none">
    Mobil içeriği
</div>

<!-- Tablet ve altında gizle -->
<div class="d-none d-lg-block">
    Sadece büyük ekranlarda
</div>
```

### Responsive Spacing
```html
<!-- Responsive margin/padding -->
<div class="my-60">
    <!-- Mobil: 30px, Tablet: 40px, Masaüstü: 60px -->
</div>

<div class="my-120">
    <!-- Mobil: 60px, Tablet: 80px, Masaüstü: 120px -->
</div>

<div class="py-60">
    <!-- Responsive vertical padding -->
</div>

<div class="px-60">
    <!-- Responsive horizontal padding -->
</div>

<!-- Özel responsive spacing -->
<div class="ms--150px">
    <!-- Masaüstü: -150px margin, Mobil: 24px margin -->
</div>

<div class="lg-ms-134px">
    <!-- Sadece lg+ ekranlarda 134px margin -->
</div>
```

### Responsive Typography
```html
<!-- Otomatik responsive başlıklar -->
<h1 class="h1">Otomatik boyutlanan başlık</h1>
<h1 class="display1">Hero başlık (40px-120px)</h1>

<!-- Clamp fonksiyonu ile özel boyutlar -->
<p class="text-xl-res">Responsive metin (15px-20px)</p>
<p class="font-size-20-px">Clamp ile responsive (16px-20px)</p>
```

### Responsive Grid
```html
<!-- Bootstrap responsive grid -->
<div class="row">
    <div class="col-12 col-md-6 col-lg-4">
        Mobil: 12/12, Tablet: 6/12, Masaüstü: 4/12
    </div>
    <div class="col-12 col-md-6 col-lg-4">
        İkinci kolon
    </div>
    <div class="col-12 col-lg-4">
        Üçüncü kolon
    </div>
</div>

<!-- Özel responsive grid -->
<div class="grid-cols-2">
    <!-- Auto-fit: minimum 260px, responsive -->
    <div>Responsive grid item</div>
    <div>İkinci item</div>
</div>

<!-- Responsive flexbox -->
<div class="d-flex flex-column flex-md-row gap-16">
    <div>Mobilde dikey</div>
    <div>Masaüstünde yatay</div>
</div>
```

### Mobile-First Yaklaşımı
```html
<!-- Mobil öncelikli tasarım -->
<div class="p-16 p-md-24 p-lg-32 p-xl-40">
    Mobil: 16px, Tablet: 24px, Masaüstü: 32px, XL: 40px
</div>

<div class="text-sm text-md-md text-lg-lg">
    Responsive font size
</div>

<!-- Container responsive -->
<div class="container">
    <div class="px-16 px-md-24 px-lg-40">
        Responsive horizontal padding
    </div>
</div>
```

---

## ✨ Animasyon Sistemi

### Keyframe Animasyonları
```html
<!-- Yukarı aşağı hareket -->
<div class="animation-upDown">
    <div class="bg-main-600 text-white p-24 rounded-16">
        Yukarı aşağı hareket eden kutu
    </div>
</div>

<!-- Döndürme animasyonu -->
<div class="animation-rotation">
    <i class="ph ph-gear text-main-600" style="font-size: 48px;"></i>
</div>

<!-- Ölçekleme animasyonu -->
<div class="animation-scalation">
    <div class="bg-success-600 text-white p-16 rounded-50">
        Büyüyüp küçülen nokta
    </div>
</div>

<!-- Yürüme animasyonu -->
<div class="animation-walking">
    <i class="ph ph-smiley text-warning-600" style="font-size: 32px;"></i>
</div>
```

### Banner Animasyonları
```html
<section class="banner position-relative py-120">
    <!-- Ana içerik -->
    <div class="container">
        <div class="row align-items-center">
            <div class="col-lg-6">
                <h1 class="display1 mb-24">Animasyonlu Banner</h1>
                <p class="text-lg mb-32">Harika animasyonlar ile dolu banner</p>
            </div>
        </div>
    </div>
    
    <!-- Animasyonlu kutular -->
    <div class="banner-box one position-absolute bg-white p-24 box-shadow-lg rounded-16">
        <div class="flex-align gap-16">
            <div class="banner-box__icon text-main-600">
                <i class="ph ph-users" style="font-size: 24px;"></i>
            </div>
            <div>
                <h6 class="mb-4">1000+</h6>
                <span class="text-sm text-neutral-600">Mutlu Müşteri</span>
            </div>
        </div>
    </div>
    
    <div class="banner-box two position-absolute bg-white p-24 box-shadow-lg rounded-16">
        <div class="flex-align gap-16">
            <div class="banner-box__icon text-success-600">
                <i class="ph ph-trophy" style="font-size: 24px;"></i>
            </div>
            <div>
                <h6 class="mb-4">50+</h6>
                <span class="text-sm text-neutral-600">Ödül</span>
            </div>
        </div>
    </div>
    
    <div class="banner-box three position-absolute bg-white p-24 box-shadow-lg rounded-16">
        <div class="flex-align gap-16">
            <div class="banner-box__icon text-warning-600">
                <i class="ph ph-star" style="font-size: 24px;"></i>
            </div>
            <div>
                <h6 class="mb-4">4.9</h6>
                <span class="text-sm text-neutral-600">Puan</span>
            </div>
        </div>
    </div>
    
    <!-- Animasyonlu şekiller -->
    <div class="shape one animation-rotation position-absolute">
        <img src="shape1.png" alt="Shape">
    </div>
    
    <div class="shape two animation-scalation position-absolute">
        <img src="shape2.png" alt="Shape">
    </div>
    
    <div class="shape three animation-walking position-absolute">
        <img src="shape3.png" alt="Shape">
    </div>
</section>
```

### Hover Animasyonları
```html
<!-- Scale hover efekti -->
<div class="scale-hover-item overflow-hidden rounded-16">
    <img src="image.jpg" alt="Resim" class="scale-hover-item__img w-100 transition-3">
    <div class="p-24">
        <h4>Hover'da resim büyür</h4>
    </div>
</div>

<!-- Active efekt -->
<button class="btn btn-main item-active-effect">
    Tıklandığında küçülür
</button>

<!-- Transform hover -->
<div class="item-hover bg-white p-24 rounded-16 transition-3">
    <div class="group-hover-transform transfrom-scale-0 transition-3">
        <i class="ph ph-heart text-danger-600" style="font-size: 24px;"></i>
    </div>
    <h4 class="item-hover__text-main">Hover Kartı</h4>
    <p class="item-hover__text">Hover yapınca kalp görünür</p>
</div>
```

---

## 🏗️ Layout Sistemleri

### Header Sistemi
```html
<header class="header fixed-header">
    <div class="container">
        <div class="header-content-wrapper d-flex align-items-center justify-content-between">
            <!-- Logo -->
            <div class="logo">
                <a href="/">
                    <img src="logo.png" alt="Logo" class="img-fluid">
                </a>
            </div>
            
            <!-- Navigation -->
            <nav class="nav-menu d-none d-lg-flex">
                <div class="nav-menu__item">
                    <a href="#" class="nav-menu__link">Ana Sayfa</a>
                </div>
                <div class="nav-menu__item has-submenu">
                    <a href="#" class="nav-menu__link">Hizmetler</a>
                    <ul class="nav-submenu">
                        <li class="nav-submenu__item">
                            <a href="#" class="nav-submenu__link">Web Tasarım</a>
                        </li>
                        <li class="nav-submenu__item">
                            <a href="#" class="nav-submenu__link">Mobil Uygulama</a>
                        </li>
                        <li class="nav-submenu__item">
                            <a href="#" class="nav-submenu__link">SEO</a>
                        </li>
                    </ul>
                </div>
                <div class="nav-menu__item">
                    <a href="#" class="nav-menu__link">Hakkımızda</a>
                </div>
                <div class="nav-menu__item">
                    <a href="#" class="nav-menu__link">İletişim</a>
                </div>
            </nav>
            
            <!-- Header Right -->
            <div class="header-right d-flex align-items-center gap-16">
                <!-- Language Select -->
                <div class="header-select d-none d-md-block">
                    <select class="form-select">
                        <option>TR</option>
                        <option>EN</option>
                    </select>
                </div>
                
                <!-- CTA Button -->
                <a href="#" class="btn btn-main d-none d-sm-inline-flex">
                    <i class="ph ph-phone me-8"></i>
                    İletişim
                </a>
                
                <!-- Mobile Menu Toggle -->
                <button class="toggle-mobileMenu d-lg-none">
                    <i class="ph ph-list"></i>
                </button>
            </div>
        </div>
    </div>
</header>

<!-- Mobile Menu -->
<div class="mobile-menu">
    <button class="close-button">
        <i class="ph ph-x"></i>
    </button>
    
    <div class="nav-menu--mobile">
        <div class="nav-menu__item">
            <a href="#" class="nav-menu__link">Ana Sayfa</a>
        </div>
        <div class="nav-menu__item has-submenu">
            <a href="#" class="nav-menu__link">
                <span>Hizmetler</span>
            </a>
            <ul class="nav-submenu">
                <li class="nav-submenu__item">
                    <a href="#" class="nav-submenu__link">Web Tasarım</a>
                </li>
                <li class="nav-submenu__item">
                    <a href="#" class="nav-submenu__link">Mobil Uygulama</a>
                </li>
            </ul>
        </div>
        <div class="nav-menu__item">
            <a href="#" class="nav-menu__link">Hakkımızda</a>
        </div>
        <div class="nav-menu__item">
            <a href="#" class="nav-menu__link">İletişim</a>
        </div>
    </div>
</div>
```

### Footer Sistemi
```html
<footer class="footer bg-neutral-800 text-white py-80">
    <!-- Footer Top -->
    <div class="footer-top">
        <div class="container">
            <div class="footer-top__left">
                <div class="footer-item__logo">
                    <a href="/">
                        <img src="logo-white.png" alt="Logo">
                    </a>
                </div>
                <div class="text text-neutral-300">
                    En iyi hizmeti sunmak için buradayız. 
                    Projelerinizi hayata geçirelim.
                </div>
            </div>
        </div>
    </div>
    
    <!-- Footer Main -->
    <div class="container">
        <div class="row">
            <!-- Company Info -->
            <div class="col-lg-4 mb-40 mb-lg-0">
                <h4 class="text-white mb-24">İletişim</h4>
                <div class="footer-contact">
                    <div class="footer-contact__item">
                        <i class="footer-contact__icon ph ph-map-pin"></i>
                        <div class="footer-contact__text">
                            İstanbul, Türkiye
                        </div>
                    </div>
                    <div class="footer-contact__item">
                        <i class="footer-contact__icon ph ph-phone"></i>
                        <a href="tel:+905551234567" class="footer-contact__link">
                            +90 555 123 45 67
                        </a>
                    </div>
                    <div class="footer-contact__item">
                        <i class="footer-contact__icon ph ph-envelope"></i>
                        <a href="mailto:info@example.com" class="footer-contact__link">
                            info@example.com
                        </a>
                    </div>
                </div>
            </div>
            
            <!-- Quick Links -->
            <div class="col-lg-2 col-md-6 mb-40 mb-lg-0">
                <h4 class="text-white mb-24">Hızlı Linkler</h4>
                <ul class="footer-menu">
                    <li class="mb-12">
                        <a href="#" class="footer-menu__link text-neutral-300">Ana Sayfa</a>
                    </li>
                    <li class="mb-12">
                        <a href="#" class="footer-menu__link text-neutral-300">Hakkımızda</a>
                    </li>
                    <li class="mb-12">
                        <a href="#" class="footer-menu__link text-neutral-300">Hizmetler</a>
                    </li>
                    <li>
                        <a href="#" class="footer-menu__link text-neutral-300">İletişim</a>
                    </li>
                </ul>
            </div>
            
            <!-- Services -->
            <div class="col-lg-2 col-md-6 mb-40 mb-lg-0">
                <h4 class="text-white mb-24">Hizmetler</h4>
                <ul class="footer-menu">
                    <li class="mb-12">
                        <a href="#" class="footer-menu__link text-neutral-300">Web Tasarım</a>
                    </li>
                    <li class="mb-12">
                        <a href="#" class="footer-menu__link text-neutral-300">Mobil App</a>
                    </li>
                    <li class="mb-12">
                        <a href="#" class="footer-menu__link text-neutral-300">SEO</a>
                    </li>
                    <li>
                        <a href="#" class="footer-menu__link text-neutral-300">Danışmanlık</a>
                    </li>
                </ul>
            </div>
            
            <!-- Newsletter -->
            <div class="col-lg-4">
                <h4 class="text-white mb-24">Bülten</h4>
                <p class="text-neutral-300 mb-20">
                    Güncel haberler ve özel fırsatlardan haberdar olun.
                </p>
                <div class="subscribe-form position-relative">
                    <i class="input-icon ph ph-envelope position-absolute text-neutral-400"></i>
                    <input type="email" class="common-input w-100 bg-transparent border-neutral-600 text-white" placeholder="E-posta adresiniz">
                    <button class="btn btn-main position-absolute inset-inline-end-4 inset-block-start-50-percent" style="transform: translateY(-50%);">
                        Abone Ol
                    </button>
                </div>
            </div>
        </div>
    </div>
    
    <!-- Footer Bottom -->
    <div class="border-top border-neutral-700 mt-60 pt-24">
        <div class="container">
            <div class="d-flex flex-column flex-md-row align-items-center justify-content-between">
                <div class="text-neutral-400 text-sm mb-16 mb-md-0">
                    © 2024 Company. Tüm hakları saklıdır.
                </div>
                <div class="footer-links">
                    <a href="#" class="footer-link text-neutral-400 text-sm">Gizlilik Politikası</a>
                    <a href="#" class="footer-link text-neutral-400 text-sm">Kullanım Şartları</a>
                    <a href="#" class="footer-link text-neutral-400 text-sm">Çerez Politikası</a>
                </div>
            </div>
        </div>
    </div>
</footer>
```

### Section Heading
```html
<!-- Merkezi section heading -->
<div class="section-heading text-center">
    <span class="section-heading__subtitle bg-main-50 text-main-600 px-16 py-8 rounded-4 text-sm fw-semibold">
        HİZMETLERİMİZ
    </span>
    <h2 class="section-heading__title h2 text-heading">
        Profesyonel Çözümler
    </h2>
    <p class="section-heading__desc text-lg text-body">
        Size en uygun çözümleri sunmak için buradayız. 
        Projelerinizi başarıya ulaştıralım.
    </p>
</div>

<!-- Sol hizalı section heading -->
<div class="section-heading style-left">
    <span class="section-heading__subtitle bg-success-50 text-success-600 px-16 py-8 rounded-4 text-sm fw-semibold">
        HAKKIMIZDA
    </span>
    <h2 class="section-heading__title h2 text-heading">
        Kim Olduğumuz
    </h2>
    <p class="section-heading__desc text-lg text-body">
        15 yıllık deneyimimizle sektörde lider konumdayız.
    </p>
</div>

<!-- Flex section heading (başlık ve buton yan yana) -->
<div class="section-heading style-flex">
    <div class="section-heading__inner">
        <span class="section-heading__subtitle bg-warning-50 text-warning-600 px-16 py-8 rounded-4 text-sm fw-semibold">
            PORTFÖYÜMÜZ
        </span>
        <h2 class="section-heading__title h2 text-heading">
            Son Projelerimiz
        </h2>
    </div>
    <div class="section-heading__content">
        <a href="#" class="btn btn-outline-main">
            Tümünü Gör
            <i class="ph ph-arrow-right ms-8"></i>
        </a>
    </div>
</div>
```

### Preloader
```html
<!-- Preloader -->
<div class="preloader" id="preloader">
    <div class="d-flex flex-column align-items-center">
        <div class="animation-rotation mb-24">
            <i class="ph ph-spinner text-main-600" style="font-size: 48px;"></i>
        </div>
        <p class="text-neutral-600">Yükleniyor...</p>
    </div>
</div>

<script>
// Preloader gizleme
window.addEventListener('load', function() {
    const preloader = document.getElementById('preloader');
    preloader.style.opacity = '0';
    setTimeout(() => {
        preloader.style.display = 'none';
    }, 300);
});
</script>
```

---

## 🚀 Gerçek Proje Örnekleri

### Komple Landing Page
```html
<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dijital Ajans</title>
    <link rel="stylesheet" href="assets/css/bootstrap.min.css">
    <link rel="stylesheet" href="assets/css/main.css">
    <link rel="stylesheet" href="assets/css/phosphor-icons-regular.css">
</head>
<body>
    <!-- Header -->
    <header class="header fixed-header">
        <!-- Header içeriği yukarıdaki gibi -->
    </header>

    <!-- Hero Section -->
    <section class="banner position-relative py-120 overflow-hidden">
        <div class="container">
            <div class="row align-items-center">
                <div class="col-lg-6 mb-60 mb-lg-0">
                    <h1 class="display1 text-heading mb-24">
                        Dijital Dünyada 
                        <span class="text-main-600">Fark Yaratın</span>
                    </h1>
                    <p class="text-xl text-body mb-32">
                        Modern web tasarımları ve güçlü dijital pazarlama stratejileri ile markanızı zirveye taşıyoruz.
                    </p>
                    <div class="buttons-wrapper d-flex gap-16">
                        <a href="#" class="btn btn-main px-32 py-16">
                            <i class="ph ph-rocket-launch me-8"></i>
                            Hemen Başlayın
                        </a>
                        <a href="#" class="btn btn-outline-main px-32 py-16">
                            <i class="ph ph-play me-8"></i>
                            Demo İzleyin
                        </a>
                    </div>
                </div>
                <div class="col-lg-6">
                    <div class="banner-thumb position-relative">
                        <img src="hero-image.jpg" alt="Hero" class="img-fluid">
                        
                        <!-- Animasyonlu istatistik kutuları -->
                        <div class="banner-box one position-absolute bg-white p-24 box-shadow-lg rounded-16">
                            <div class="flex-align gap-16">
                                <div class="w-48 h-48 bg-main-100 rounded-50 flex-center">
                                    <i class="ph ph-users text-main-600" style="font-size: 24px;"></i>
                                </div>
                                <div>
                                    <h4 class="text-heading mb-4">500+</h4>
                                    <span class="text-sm text-neutral-600">Mutlu Müşteri</span>
                                </div>
                            </div>
                        </div>
                        
                        <div class="banner-box two position-absolute bg-white p-24 box-shadow-lg rounded-16">
                            <div class="flex-align gap-16">
                                <div class="w-48 h-48 bg-success-100 rounded-50 flex-center">
                                    <i class="ph ph-trophy text-success-600" style="font-size: 24px;"></i>
                                </div>
                                <div>
                                    <h4 class="text-heading mb-4">50+</h4>
                                    <span class="text-sm text-neutral-600">Ödül</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Background shapes -->
        <div class="shape one animation-rotation position-absolute">
            <div class="w-100 h-100 bg-main-100 rounded-50" style="width: 100px; height: 100px; opacity: 0.3;"></div>
        </div>
        <div class="shape four animation-scalation position-absolute">
            <div class="w-60 h-60 bg-warning-200 rounded-50" style="opacity: 0.4;"></div>
        </div>
    </section>

    <!-- Services Section -->
    <section class="py-120 section-bg">
        <div class="container">
            <!-- Section Heading -->
            <div class="section-heading text-center mb-80">
                <span class="section-heading__subtitle bg-main-50 text-main-600 px-16 py-8 rounded-4 text-sm fw-semibold">
                    HİZMETLERİMİZ
                </span>
                <h2 class="section-heading__title h2 text-heading">
                    Profesyonel Çözümler
                </h2>
                <p class="section-heading__desc text-lg text-body">
                    Size en uygun dijital çözümleri sunmak için buradayız
                </p>
            </div>
            
            <!-- Services Grid -->
            <div class="row">
                <div class="col-lg-4 col-md-6 mb-32">
                    <div class="item-hover bg-white p-32 rounded-16 box-shadow-md h-100 transition-3">
                        <div class="w-64 h-64 bg-main-100 rounded-16 flex-center mb-24 item-hover__bg-main transition-3">
                            <i class="ph ph-code text-main-600 item-hover__text" style="font-size: 32px;"></i>
                        </div>
                        <h4 class="h4 text-heading mb-16 item-hover__text-main">Web Tasarım</h4>
                        <p class="text-body mb-24 item-hover__text">
                            Modern, responsive ve kullanıcı dostu web siteleri tasarlıyoruz.
                        </p>
                        <div class="group-hover-item d-none">
                            <a href="#" class="btn btn-white">
                                Detaylar
                                <i class="ph ph-arrow-right ms-8"></i>
                            </a>
                        </div>
                    </div>
                </div>
                
                <div class="col-lg-4 col-md-6 mb-32">
                    <div class="item-hover bg-white p-32 rounded-16 box-shadow-md h-100 transition-3">
                        <div class="w-64 h-64 bg-success-100 rounded-16 flex-center mb-24 item-hover__bg-main transition-3">
                            <i class="ph ph-device-mobile text-success-600 item-hover__text" style="font-size: 32px;"></i>
                        </div>
                        <h4 class="h4 text-heading mb-16 item-hover__text-main">Mobil Uygulama</h4>
                        <p class="text-body mb-24 item-hover__text">
                            iOS ve Android için performanslı mobil uygulamalar geliştiriyoruz.
                        </p>
                        <div class="group-hover-item d-none">
                            <a href="#" class="btn btn-white">
                                Detaylar
                                <i class="ph ph-arrow-right ms-8"></i>
                            </a>
                        </div>
                    </div>
                </div>
                
                <div class="col-lg-4 col-md-6 mb-32">
                    <div class="item-hover bg-white p-32 rounded-16 box-shadow-md h-100 transition-3">
                        <div class="w-64 h-64 bg-warning-100 rounded-16 flex-center mb-24 item-hover__bg-main transition-3">
                            <i class="ph ph-chart-line-up text-warning-600 item-hover__text" style="font-size: 32px;"></i>
                        </div>
                        <h4 class="h4 text-heading mb-16 item-hover__text-main">Dijital Pazarlama</h4>
                        <p class="text-body mb-24 item-hover__text">
                            SEO, SEM ve sosyal medya ile markanızı büyütüyoruz.
                        </p>
                        <div class="group-hover-item d-none">
                            <a href="#" class="btn btn-white">
                                Detaylar
                                <i class="ph ph-arrow-right ms-8"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- CTA Section -->
    <section class="py-120 bg-main-600 text-white text-center">
        <div class="container">
            <h2 class="h2 mb-24">Projenizi Hayata Geçirelim</h2>
            <p class="text-xl mb-40 opacity-90">
                Ücretsiz konsültasyon için hemen iletişime geçin
            </p>
            <div class="d-flex justify-content-center gap-16">
                <a href="#" class="btn btn-white px-40 py-16">
                    <i class="ph ph-phone me-8"></i>
                    Hemen Arayın
                </a>
                <a href="#" class="btn btn-outline-white px-40 py-16">
                    <i class="ph ph-envelope me-8"></i>
                    E-posta Gönderin
                </a>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="footer bg-neutral-800 text-white py-80">
        <!-- Footer içeriği yukarıdaki gibi -->
    </footer>

    <!-- Scripts -->
    <script src="assets/js/bootstrap.bundle.min.js"></script>
    <script src="assets/js/main.js"></script>
</body>
</html>
```

Bu kapsamlı rehber ile artık tasarım sisteminizi tam olarak anlayabilir ve profesyonel projeler geliştirebilirsiniz!

## 🎯 Özet ve İpuçları

### Hızlı Referans
- **Renkler**: `bg-main-600`, `text-success-700`, `hover-bg-main-50`
- **Spacing**: `p-24`, `m-16`, `py-60`, `my-120`  
- **Typography**: `h1`, `display1`, `text-lg`, `text-main-600`
- **Layout**: `flex-center`, `d-flex gap-16`, `container--lg`
- **Components**: `btn btn-main`, `common-input`, `common-accordion`

### En İyi Uygulamalar
1. **Mobile-first** yaklaşımını benimseyin
2. **Semantic HTML** kullanın
3. **Accessibility** standartlarını gözetin
4. **Performance** için gereksiz class'ları kullanmayın
5. **Consistent spacing** için sistem değerlerini kullanın

Bu rehber sayesinde artık tüm class'ları nasıl kullanacağınızı biliyorsunuz! 🚀

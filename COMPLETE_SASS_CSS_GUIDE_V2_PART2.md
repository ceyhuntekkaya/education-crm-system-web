# 🎨 Kapsamlı SASS/CSS Tasarım Sistemi Rehberi v2.0 - Bölüm 2

## 🏗️ Layout ve Grid Sistemi

### Container Sistemi
```html
<!-- Standart container (Bootstrap default) -->
<div class="container">
    <p>Responsive genişlik (max-width değişir)</p>
</div>

<!-- Büyük container -->
<div class="container container--lg">
    <p>Maksimum genişlik: 1600px</p>
</div>

<!-- Ekstra büyük container -->
<div class="container container--xl">
    <p>Maksimum genişlik: 1760px</p>
</div>

<!-- Fluid container -->
<div class="container-fluid">
    <p>Tam genişlik container</p>
</div>
```

### Grid Sistemi
```html
<!-- Özel grid sınıfları -->
<div class="grid-cols-2">
    <div class="bg-main-50 p-24">Kolon 1 (auto-fit, min 260px)</div>
    <div class="bg-main-100 p-24">Kolon 2</div>
</div>

<!-- 4 kolonlu özel grid -->
<div class="grid-cols-4">
    <div class="bg-neutral-50 p-16">Kolon 1</div>
    <div class="bg-neutral-100 p-16">Kolon 2</div>
    <div class="bg-neutral-150 p-16">Kolon 3</div>
    <div class="bg-neutral-200 p-16">Kolon 4 (220px sabit)</div>
</div>

<!-- Bootstrap grid ile kombinasyon -->
<div class="container">
    <div class="row">
        <div class="col-lg-8">
            <div class="bg-white p-32">Ana içerik</div>
        </div>
        <div class="col-lg-4">
            <div class="bg-main-25 p-32">Sidebar</div>
        </div>
    </div>
</div>
```

### Flexbox Utilities
```html
<!-- Temel flex -->
<div class="d-flex">
    <div>Flex item 1</div>
    <div>Flex item 2</div>
</div>

<!-- Hizalama -->
<div class="d-flex align-items-center justify-content-between">
    <div>Sol</div>
    <div>Sağ</div>
</div>

<!-- Extend sınıfları (daha kısa) -->
<div class="flex-align gap-16">
    <i class="ph ph-user"></i>
    <span>Kullanıcı</span>
</div>

<div class="flex-center">
    <div>Tam ortada</div>
</div>

<div class="flex-between">
    <div>Sol</div>
    <div>Sağ</div>
</div>

<!-- Flex yön -->
<div class="d-flex flex-column gap-16">
    <div>Üst</div>
    <div>Alt</div>
</div>

<!-- Responsive flex -->
<div class="d-flex flex-column flex-md-row gap-16">
    <div>Mobilde alt alta, masaüstünde yan yana</div>
    <div>İkinci item</div>
</div>
```

### Gap Sistemi
```html
<!-- Flex gap -->
<div class="d-flex gap-8">
    <button class="btn btn-main">Buton 1</button>
    <button class="btn btn-outline-main">Buton 2</button>
</div>

<!-- Grid gap -->
<div class="d-grid" style="grid-template-columns: repeat(3, 1fr); gap: var(--size-24);">
    <div class="bg-main-50 p-16">1</div>
    <div class="bg-main-100 p-16">2</div>
    <div class="bg-main-150 p-16">3</div>
</div>

<!-- Farklı gap boyutları -->
<div class="d-flex gap-4">Çok küçük boşluk</div>
<div class="d-flex gap-16">Küçük boşluk</div>
<div class="d-flex gap-24">Orta boşluk</div>
<div class="d-flex gap-32">Büyük boşluk</div>
<div class="d-flex gap-48">Çok büyük boşluk</div>
```

---

## 🧩 Component Kütüphanesi

### Tab Sistemi
```html
<!-- Temel tab yapısı -->
<div class="nav-tab-wrapper bg-main-25 p-4 rounded-24">
    <nav class="common-tab nav nav-tabs border-0">
        <div class="nav-item">
            <button class="nav-link active" data-bs-toggle="tab" data-bs-target="#tab1">
                <i class="ph ph-house me-8"></i>
                Ana Sayfa
            </button>
        </div>
        <div class="nav-item">
            <button class="nav-link" data-bs-toggle="tab" data-bs-target="#tab2">
                <i class="ph ph-user me-8"></i>
                Profil
            </button>
        </div>
        <div class="nav-item">
            <button class="nav-link" data-bs-toggle="tab" data-bs-target="#tab3">
                <i class="ph ph-gear me-8"></i>
                Ayarlar
            </button>
        </div>
    </nav>
</div>

<!-- Tab içerikleri -->
<div class="tab-content mt-24">
    <div class="tab-pane fade show active" id="tab1">
        <div class="p-32 bg-white rounded-16">
            <h4>Ana Sayfa İçeriği</h4>
            <p>Bu ana sayfa tab'ının içeriğidir.</p>
        </div>
    </div>
    <div class="tab-pane fade" id="tab2">
        <div class="p-32 bg-white rounded-16">
            <h4>Profil İçeriği</h4>
            <p>Bu profil tab'ının içeriğidir.</p>
        </div>
    </div>
    <div class="tab-pane fade" id="tab3">
        <div class="p-32 bg-white rounded-16">
            <h4>Ayarlar İçeriği</h4>
            <p>Bu ayarlar tab'ının içeriğidir.</p>
        </div>
    </div>
</div>
```

### Accordion Sistemi
```html
<!-- Temel accordion -->
<div class="common-accordion">
    <!-- Item 1 -->
    <div class="accordion-item">
        <div class="accordion-header">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#accordion1">
                Sık Sorulan Sorular Nedir?
            </button>
        </div>
        <div id="accordion1" class="accordion-collapse collapse">
            <div class="accordion-body">
                <div class="accordion-body__desc">
                    Sık sorulan sorular, müşterilerimizin en çok merak ettiği konular hakkında hazırladığımız cevaplardır.
                </div>
            </div>
        </div>
    </div>
    
    <!-- Item 2 -->
    <div class="accordion-item">
        <div class="accordion-header">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#accordion2">
                Nasıl İletişime Geçebilirim?
            </button>
        </div>
        <div id="accordion2" class="accordion-collapse collapse">
            <div class="accordion-body">
                <div class="accordion-body__desc">
                    Bizimle iletişime geçmek için contact@example.com adresini kullanabilir veya +90 555 123 45 67 numarasını arayabilirsiniz.
                </div>
            </div>
        </div>
    </div>
</div>

<!-- Style Two Accordion -->
<div class="common-accordion style-two">
    <div class="accordion-item">
        <div class="accordion-header">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#accordion3">
                Özel Stil Accordion
            </button>
        </div>
        <div id="accordion3" class="accordion-collapse collapse">
            <div class="accordion-body">
                <div class="accordion-body__desc">
                    Bu accordion style-two sınıfı ile farklı bir görünüme sahiptir.
                </div>
            </div>
        </div>
    </div>
</div>

<!-- Style Three Accordion -->
<div class="common-accordion style-three">
    <div class="accordion-item">
        <div class="accordion-header">
            <button class="accordion-button bg-main-25 collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#accordion4">
                Üçüncü Stil Accordion
            </button>
        </div>
        <div id="accordion4" class="accordion-collapse collapse">
            <div class="accordion-body">
                <div class="accordion-body__desc">
                    Bu accordion style-three sınıfı ile minimal bir görünüme sahiptir.
                </div>
            </div>
        </div>
    </div>
</div>
```

### Range Slider
```html
<!-- Temel range slider -->
<div class="custom--range">
    <div id="slider-range"></div>
    <div class="custom--range__prices d-flex justify-content-between mt-16">
        <span class="text-neutral-600">$0</span>
        <span class="text-neutral-600">$1000</span>
    </div>
</div>

<!-- Style Two range slider -->
<div class="custom--range style-two">
    <div id="slider-range-2"></div>
    <div class="custom--range__prices d-flex justify-content-between mt-16">
        <span class="text-neutral-600">Min</span>
        <span class="text-neutral-600">Max</span>
    </div>
</div>

<script>
// jQuery UI slider initialization
$("#slider-range").slider({
    range: true,
    min: 0,
    max: 1000,
    values: [100, 800],
    slide: function(event, ui) {
        // Değer değişikliği
    }
});
</script>
```

### Star Rating
```html
<div id="half-star-rating">
    <fieldset class="rating-group">
        <!-- 5 yıldız -->
        <input type="radio" class="rating__input rating__input--none" name="rating" value="0" checked>
        
        <input type="radio" class="rating__input" name="rating" value="0.5" id="rating-0-5">
        <label for="rating-0-5" class="rating__label rating__label--half">
            <i class="rating__icon rating__icon--star ph ph-star"></i>
        </label>
        
        <input type="radio" class="rating__input" name="rating" value="1" id="rating-1">
        <label for="rating-1" class="rating__label">
            <i class="rating__icon rating__icon--star ph ph-star"></i>
        </label>
        
        <input type="radio" class="rating__input" name="rating" value="1.5" id="rating-1-5">
        <label for="rating-1-5" class="rating__label rating__label--half">
            <i class="rating__icon rating__icon--star ph ph-star"></i>
        </label>
        
        <input type="radio" class="rating__input" name="rating" value="2" id="rating-2">
        <label for="rating-2" class="rating__label">
            <i class="rating__icon rating__icon--star ph ph-star"></i>
        </label>
        
        <!-- Diğer yıldızlar... -->
    </fieldset>
</div>
```

### Video Player
```html
<!-- Plyr video player -->
<div class="player">
    <video class="plyr__video-embed" controls>
        <source src="video.mp4" type="video/mp4">
        <source src="video.webm" type="video/webm">
    </video>
</div>

<!-- YouTube embed -->
<div class="player">
    <div class="plyr__video-embed">
        <iframe src="https://www.youtube.com/embed/VIDEO_ID" allowfullscreen></iframe>
    </div>
</div>
```

### DataTable
```html
<div class="table-responsive">
    <table class="table dataTable">
        <thead>
            <tr>
                <th>Ad</th>
                <th>E-posta</th>
                <th>Durum</th>
                <th>İşlemler</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Ahmet Yılmaz</td>
                <td>ahmet@example.com</td>
                <td>
                    <span class="badge bg-success-600 text-white">Aktif</span>
                </td>
                <td>
                    <button class="btn btn-sm btn-main me-8">Düzenle</button>
                    <button class="btn btn-sm btn-outline-danger">Sil</button>
                </td>
            </tr>
        </tbody>
    </table>
</div>
```

---

## 🛠️ Utility Classes

### Display Utilities
```html
<!-- Display types -->
<div class="d-block">Block element</div>
<div class="d-inline">Inline element</div>
<div class="d-inline-block">Inline-block element</div>
<div class="d-flex">Flex container</div>
<div class="d-grid">Grid container</div>
<div class="d-none">Gizli element</div>

<!-- Responsive display -->
<div class="d-none d-md-block">Masaüstünde görün</div>
<div class="d-block d-md-none">Mobilde görün</div>
```

### Position Utilities
```html
<!-- Position types -->
<div class="position-relative">
    <div class="position-absolute inset-block-start-0 inset-inline-end-0">
        Sağ üst köşe
    </div>
</div>

<div class="position-fixed inset-block-start-0 inset-inline-start-0">
    Sol üst sabit
</div>

<div class="position-sticky" style="top: 20px;">
    Sticky element
</div>

<!-- Inset utilities -->
<div class="position-absolute inset-inline-start-50-percent">Sol %50</div>
<div class="position-absolute inset-block-start-20-percent">Üst %20</div>
<div class="position-absolute inset-inline-end-8-persent">Sağ %8</div>
<div class="position-absolute inset-block-end-30-persent">Alt %30</div>

<!-- Transform utilities -->
<div class="position-absolute inset-inline-start-50-percent transform-translate-y-94px">
    Transform ile konumlandırma
</div>
```

### Border Utilities
```html
<!-- Border renkleri -->
<div class="border border-main-600 p-16">Ana renk kenarlık</div>
<div class="border border-success-600 p-16">Başarı kenarlığı</div>
<div class="border border-danger-600 p-16">Hata kenarlığı</div>

<!-- Hover border -->
<div class="border border-neutral-300 hover-border-main-600 p-16 transition-2">
    Hover'da kenarlık rengi değişir
</div>

<!-- Focus border -->
<input type="text" class="common-input focus-border-main-600" placeholder="Focus'ta kenarlık değişir">

<!-- Border styles -->
<div class="border-dashed border-neutral-400 p-16">Kesikli kenarlık</div>
<div class="border-bottom-dashed p-16">Alt kesikli kenarlık</div>
<div class="border-bottom-solid p-16">Alt düz kenarlık</div>
<div class="border-transparent p-16">Şeffaf kenarlık</div>
```

### Border Radius
```html
<!-- Spacing sisteminden radius -->
<div class="rounded-4 bg-main-100 p-16">4px radius</div>
<div class="rounded-8 bg-main-200 p-16">8px radius</div>
<div class="rounded-16 bg-main-300 p-16">16px radius</div>
<div class="rounded-24 bg-main-400 p-16">24px radius</div>

<!-- Özel radius'lar -->
<div class="rounded-top-start-8px bg-main-100 p-16">Sol üst 8px</div>
<div class="rounded-top-start-72px rounded-top-end-72px bg-main-200 p-16">Üst köşeler 72px</div>
<div class="rounded-bottom-start-72px rounded-bottom-end-72px bg-main-300 p-16">Alt köşeler 72px</div>
```

### Shadow Utilities
```html
<!-- Box shadow boyutları -->
<div class="box-shadow-sm bg-white p-24 mb-16">Küçük gölge</div>
<div class="box-shadow-md bg-white p-24 mb-16">Orta gölge</div>
<div class="box-shadow-lg bg-white p-24 mb-16">Büyük gölge</div>
<div class="box-shadow-xl bg-white p-24 mb-16">Çok büyük gölge</div>
<div class="box-shadow-2xl bg-white p-24 mb-16">Ekstra büyük gölge</div>

<!-- Inner shadow -->
<div class="box-shadow-inner bg-main-50 p-24">İç gölge</div>

<!-- Renkli gölgeler -->
<div class="shadow-main-two bg-white p-24 mb-16">Ana renk gölgesi</div>
<div class="shadow-main-three bg-white p-24">Üçüncü renk gölgesi</div>
```

### Background Utilities
```html
<!-- Renk backgrounds -->
<div class="bg-main-600 text-white p-16">Ana renk arkaplan</div>
<div class="bg-success-50 text-success-700 p-16">Başarı arkaplanı</div>

<!-- Hover backgrounds -->
<div class="bg-transparent hover-bg-main-50 text-main-600 p-16 transition-2">
    Hover arkaplan
</div>

<!-- Özel renkler -->
<div class="bg-color-black text-white p-16">Siyah arkaplan</div>
<div class="bg-color-deep-green text-white p-16">Yeşil arkaplan</div>
<div class="bg-color-violet text-white p-16">Mor arkaplan</div>

<!-- Background image -->
<div class="bg-img" style="background-image: url('image.jpg'); height: 300px;">
    <div class="d-flex align-items-center justify-content-center h-100 text-white">
        Arkaplan resimli alan
    </div>
</div>

<!-- Section background -->
<section class="section-bg py-120">
    <div class="container">
        <h2>Section arkaplanı</h2>
    </div>
</section>
```

### Hover Effects
```html
<!-- Item hover effects -->
<div class="item-hover bg-white p-24 transition-3">
    <h4 class="item-hover__text-main mb-16">Başlık</h4>
    <p class="item-hover__text mb-16">Açıklama metni</p>
    <div class="item-hover__bg-main p-16 rounded-8">
        <span class="item-hover__text">Hover'da değişen alan</span>
    </div>
    <div class="group-hover-item d-none mt-16">
        <button class="btn btn-main">Gizli buton</button>
    </div>
</div>

<!-- Hover transformations -->
<div class="scale-hover-item overflow-hidden rounded-16">
    <img src="image.jpg" alt="Resim" class="scale-hover-item__img transition-3">
</div>

<!-- Hover utilities -->
<a href="#" class="text-neutral-600 hover-text-main-600 hover-underline">
    Link hover efekti
</a>

<div class="hover-margin-left transition-2">
    Hover'da sola kayar
</div>

<!-- Group hover -->
<div class="item-hover">
    <div class="group-hover-visible transfrom-scale-0 transition-3">
        Hover'da görünür
    </div>
    <div class="group-hover-transform transfrom-scale-0 transition-3">
        Hover'da transform
    </div>
</div>
```

### Transition Utilities
```html
<!-- Transition süreleri -->
<div class="transition-1 hover-bg-main-100">0.1s geçiş</div>
<div class="transition-2 hover-bg-main-200">0.2s geçiş</div>
<div class="transition-3 hover-bg-main-300">0.3s geçiş</div>

<!-- Kombinasyonlar -->
<button class="btn btn-outline-main hover-bg-main-600 hover-text-white transition-2">
    Smooth hover button
</button>
```

Bu ikinci bölümü tamamladım. Devam etmek için üçüncü bölümü oluşturacağım.

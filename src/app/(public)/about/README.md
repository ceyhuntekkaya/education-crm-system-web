# Hakkımızda Sayfası

## Genel Bakış

Bu sayfa, Eğitim CRM Sistemi'nin genel tanıtımını yapan, tüm public modülleri ve özellikleri tanıtan kapsamlı bir hakkımızda sayfasıdır. Veliler için tasarlanmış olup, platformun nasıl kullanılacağını, hangi özelliklerin sunulduğunu ve neden tercih edilmesi gerektiğini açıklar.

## Özellikler

### 1. Hero Section (Ana Başlık Bölümü)
- **Gradient arka plan** ile göz alıcı tasarım
- Platform tanıtımı ve misyon açıklaması
- **İki ana CTA butonu**:
  - "Kurum Aramaya Başla" - `/search` sayfasına yönlendirir
  - "Üyelik Paketleri" - `/memberships` sayfasına yönlendirir

### 2. Platform Özellikleri
4 temel özellik kartı:
- **Eğitim Odaklı**: Eğitim kurumları için özel çözümler
- **Kolay Yönetim**: Tek platformdan tüm işlemler
- **Detaylı Raporlama**: Gelişmiş analitik araçlar
- **Güvenli ve Hızlı**: Yüksek güvenlik standartları

### 3. İstatistikler
Platformun başarısını gösteren 4 istatistik:
- 500+ Kayıtlı Kurum
- 10,000+ Aktif Kullanıcı
- 25,000+ Tamamlanan Randevu
- 4.8/5 Kullanıcı Memnuniyeti

### 4. Platform Modülleri
Public klasöründeki tüm sayfalar detaylı olarak tanıtılır:

#### a) Kurum Arama (`/search`)
- Gelişmiş arama filtreleri
- Konum bazlı arama
- Eğitim seviyesine göre filtreleme
- Detaylı Kurum profilleri

#### b) Randevu Yönetimi (`/appointments`)
- Online randevu alma
- Randevu durumu takibi
- Otomatik hatırlatmalar
- Randevu geçmişi

#### c) Mesajlaşma (`/messages`)
- WhatsApp entegrasyonu
- Anlık mesajlaşma
- Mesaj geçmişi
- Dosya paylaşımı

#### d) Üyelik Planları (`/memberships`)
- Esnek paket seçenekleri
- Ücretsiz deneme süresi
- Premium özellikler
- İndirimli yıllık paketler

#### e) Anketler (`/surveys`)
- Kurum değerlendirme anketleri
- Memnuniyet anketleri
- Geri bildirim sistemi
- Anonim değerlendirme

#### f) Listelerim (`/my-lists`)
- Favori Kurum listeleri
- Karşılaştırma özelliği
- Özel listeler oluşturma
- Kolay erişim ve yönetim

### 5. Nasıl Çalışır?
3 basit adımla kullanım rehberi:
1. **Kayıt Olun**: Hızlı ve kolay kayıt
2. **Arayın ve Keşfedin**: Gelişmiş filtreleme
3. **İletişime Geçin**: Randevu ve mesajlaşma

### 6. Misyon ve Vizyon

#### Misyon
- Velilere en uygun eğitim kurumlarını bulmada yardımcı olmak
- Eğitim kurumlarının dijital dönüşümüne katkı sağlamak
- Şeffaf ve güvenilir bir iletişim platformu sunmak

#### Vizyon
- Türkiye'nin en kapsamlı eğitim CRM platformu olmak
- Tüm eğitim kurumlarını tek platformda toplamak
- Yapay zeka destekli akıllı eşleştirme sistemleri geliştirmek
- Eğitim sektöründe dijital standartları belirlemek

### 7. Neden Bizi Tercih Etmelisiniz?
6 ana avantaj:
- ⏱️ **Zaman Tasarrufu**: Tek platformdan tüm işlemler
- 🛡️ **Güvenli ve Güvenilir**: En yüksek güvenlik standartları
- 📱 **Mobil Uyumlu**: Responsive tasarım
- 🎧 **7/24 Destek**: Uzman destek ekibi
- 💰 **Uygun Fiyatlar**: Esnek paket seçenekleri
- ⚡ **Sürekli Gelişim**: Kullanıcı geri bildirimlerine göre yenilikler

### 8. CTA (Call-to-Action) Bölümü
Kullanıcıları harekete geçiren son bölüm:
- Büyük roket ikonu
- "Hemen Başlayın!" başlığı
- İki ana aksiyon butonu

## Kullanılan Bileşenler

### CustomCard
Tüm içerik bölümleri `CustomCard` komponenti ile oluşturulmuştur:
- Esnek tasarım seçenekleri
- Gradient arka plan desteği
- Özelleştirilebilir başlık ve alt başlık
- Responsive yapı

### Icon
Phosphor Icons kütüphanesi kullanılır:
- `ph-graduation-cap`, `ph-calendar`, `ph-chat-circle-dots`, vb.
- Farklı boyut seçenekleri
- Arka plan rengi desteği

### Link
Next.js Link komponenti ile sayfa yönlendirmeleri:
- Client-side navigation
- Prefetch desteği
- Hızlı sayfa geçişleri

## Stil ve Tasarım

### Renk Paleti
- **Primary**: #487FFF (Mavi)
- **Success**: #00D084 (Yeşil)
- **Warning**: #FF9F43 (Turuncu)
- **Info**: #2D9CDB (Açık Mavi)
- **Danger**: #FF4D4F (Kırmızı)

### Gradient Arka Planlar
```scss
.bg-gradient-primary: linear-gradient(135deg, #487FFF 0%, #6C5CE7 100%)
.bg-gradient-main: linear-gradient(135deg, #487FFF 0%, #2D5BFF 100%)
.bg-gradient-success: linear-gradient(135deg, #00D084 0%, #00B96F 100%)
```

### Animasyonlar
- **hover-shadow**: Hover'da yukarı kaydırma ve gölge efekti
- **scale-hover-effect**: Hover'da hafif büyütme efekti
- **transition-2**: 0.2s geçiş efektleri

## Responsive Tasarım

### Breakpoints
- **Mobile**: < 768px
- **Tablet**: 768px - 991px
- **Desktop**: > 991px

### Mobile Optimizasyonlar
- Font boyutları küçültülür (display-3, display-4)
- Hero section'da görsel gizlenir
- Butonlar ve içerik ortalanır
- Grid yapısı tek sütuna dönüşür

## SEO ve Erişilebilirlik

### SEO
- Anlamlı başlık hiyerarşisi (h1, h2, h3, h4, h5)
- Alt metinler ve açıklayıcı içerikler
- Yapısal veri organizasyonu

### Erişilebilirlik
- Semantik HTML kullanımı
- İkonlarla birlikte açıklayıcı metinler
- Yeterli renk kontrastı
- Klavye navigasyonu desteği

## Dosya Yapısı

```
src/app/(public)/about/
├── layout.tsx          # Layout wrapper
├── page.tsx           # Ana sayfa komponenti
├── about.scss         # Stil dosyası
└── README.md          # Bu dosya
```

## Kullanım

Sayfaya erişim:
```
http://localhost:3000/about
```

Banner'dan link:
```tsx
<Link href="/about" className="btn btn-outline-main">
  Hakkımızda
</Link>
```

## Geliştirme Notları

### Yapılabilecek İyileştirmeler
1. **Animasyonlar**: AOS (Animate On Scroll) kütüphanesi ile scroll animasyonları
2. **Video**: Platform tanıtım videosu ekleme
3. **Testimonials**: Kullanıcı yorumları bölümü
4. **Team**: Ekip tanıtımı bölümü
5. **FAQ**: Sık sorulan sorular bölümü
6. **Blog**: Son blog yazıları widget'ı
7. **Contact Form**: İletişim formu entegrasyonu
8. **Social Proof**: Ortak olunan kurumlar/logolar

### Performans İyileştirmeleri
- Image lazy loading (Next.js Image komponenti kullanılıyor)
- CSS minification
- Code splitting
- Server-side rendering (SSR) optimizasyonu

## Bağımlılıklar

- **next**: 14.1.4
- **react**: ^18
- **Custom Components**: CustomCard, Icon, Button
- **Phosphor Icons**: Icon seti

## Lisans

Bu proje şirket içi kullanım için geliştirilmiştir.

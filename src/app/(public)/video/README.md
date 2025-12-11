# Tanıtım Videosu Sayfası

## 📁 Dosya Yapısı

```
video/
├── _shared/                    # Paylaşılan kaynaklar
│   ├── config/                 # Yapılandırma dosyaları
│   │   ├── video-config.ts    # Video URL, stats, features
│   │   └── index.ts
│   ├── hooks/                  # Custom hooks
│   │   ├── use-video-player.ts # Video player state yönetimi
│   │   └── index.ts
│   ├── sections/               # Sayfa bölümleri
│   │   ├── video-hero-section.tsx
│   │   ├── video-player-section.tsx
│   │   ├── video-stats-section.tsx
│   │   ├── video-features-section.tsx
│   │   ├── video-cta-section.tsx
│   │   ├── video-shapes.tsx
│   │   └── index.ts
│   ├── types/                  # TypeScript tipleri
│   │   ├── video.types.ts
│   │   └── index.ts
│   ├── utils/                  # Yardımcı fonksiyonlar
│   │   ├── video-helpers.ts   # Video URL parsing, format detection
│   │   └── index.ts
│   └── index.ts               # Ana export hub
├── layout.tsx                  # Sayfa layout ve metadata
├── page.tsx                    # Ana sayfa komponenti (temiz ve organize)
├── video.scss                  # Stil dosyası
└── README.md                   # Bu dosya
```

## 🎯 Mimari Yaklaşım

Bu sayfa, projenin diğer sayfalarıyla (about, contact vb.) aynı mimariyi takip eder:

### 1. **_shared Klasörü**
Tüm paylaşılan kaynaklar tek bir yerde toplanır:
- **config**: Statik veriler ve yapılandırma
- **hooks**: Özel React hooks
- **sections**: UI bileşenleri
- **types**: TypeScript tip tanımlamaları
- **utils**: Yardımcı fonksiyonlar

### 2. **Separation of Concerns**
- **page.tsx**: Sadece layout ve orchestration
- **hooks**: İş mantığı ve state yönetimi
- **sections**: UI bileşenleri
- **config**: Veri

### 3. **Reusability**
Tüm bileşenler ve hooks yeniden kullanılabilir şekilde tasarlanmıştır.

## 🔧 Kullanım

### Video URL'sini Değiştirme

`_shared/config/video-config.ts` dosyasını düzenleyin:

```typescript
export const VIDEO_CONFIG = {
  // YouTube video için:
  url: "https://www.youtube.com/watch?v=YOUR_VIDEO_ID",
  
  // veya direkt video için:
  // url: "https://example.com/video.mp4",
  
  publishDate: "11 Ara 2025",
  viewCount: "1,250+",
};
```

### İstatistikleri Güncelleme

Aynı dosyada `VIDEO_STATS` array'ini düzenleyin:

```typescript
export const VIDEO_STATS = [
  {
    icon: "ph-users-three",
    value: "10,000+",
    label: "Aktif Kullanıcı",
    color: "main", // main, main-two, success, info, warning, danger
  },
  // ...
];
```

### Özellikleri Değiştirme

`PLATFORM_FEATURES` array'ini düzenleyin:

```typescript
export const PLATFORM_FEATURES = [
  {
    icon: "ph-magnifying-glass",
    title: "Gelişmiş Arama",
    description: "İhtiyaçlarınıza uygun...",
  },
  // ...
];
```

## 🎨 Komponentler

### VideoHeroSection
Hero bölümü - başlık ve açıklama

### VideoPlayerSection
Video oynatıcı ve bilgi çubuğu
- Props: `videoUrl`, `videoType`, `isPlaying`, `videoRef`, `videoInfo`, `onPlayClick`
- Desteklenen formatlar: YouTube, MP4, WebM, OGG

### VideoStatsSection
İstatistik kartları
- Props: `stats` (readonly VideoStat[])

### VideoFeaturesSection
Platform özellikleri
- Props: `features` (readonly PlatformFeature[])

### VideoCTASection
Call-to-action bölümü
- İki buton: "Aramaya Başla" ve "Hakkımızda"

### VideoShapes
Animasyonlu dekoratif şekiller

## 🪝 Hooks

### useVideoPlayer

Video player state ve fonksiyonlarını yöneten custom hook.

```typescript
const {
  isPlaying,
  videoDuration,
  isLoading,
  videoRef,
  videoType,
  handlePlayClick,
} = useVideoPlayer({
  videoUrl: VIDEO_CONFIG.url,
});
```

**Dönen Değerler:**
- `isPlaying`: Video oynatılıyor mu?
- `videoDuration`: Video süresi (string)
- `isLoading`: Yükleniyor mu?
- `videoRef`: Video element ref
- `videoType`: "youtube" | "direct" | "unknown"
- `handlePlayClick`: Play butonu handler

## 📊 Types

### VideoStat
```typescript
interface VideoStat {
  icon: string;
  value: string;
  label: string;
  color: "main" | "main-two" | "success" | "info" | "warning" | "danger";
}
```

### PlatformFeature
```typescript
interface PlatformFeature {
  icon: string;
  title: string;
  description: string;
}
```

### VideoPlayerState
```typescript
interface VideoPlayerState {
  isPlaying: boolean;
  videoDuration: string;
  isLoading: boolean;
}
```

### VideoInfo
```typescript
interface VideoInfo {
  duration: string;
  publishDate: string;
  viewCount: string;
  status: string;
}
```

## 🛠️ Utils

### Video Helper Functions

`_shared/utils/video-helpers.ts` içinde:

```typescript
// YouTube video ID'sini çıkar
getYouTubeVideoId(url: string): string | null

// Video tipini belirle
getVideoType(url: string): "youtube" | "direct" | "unknown"

// YouTube embed URL oluştur
createYouTubeEmbedUrl(videoId: string, options): string

// Video MIME type
getVideoMimeType(url: string): string

// Süreyi formatla
formatDuration(seconds: number): string

// URL geçerli mi?
isValidYouTubeUrl(url: string): boolean
isDirectVideoUrl(url: string): boolean
```

## 🎨 Stil Yapısı

`video.scss` dosyası şu bölümleri içerir:

```scss
.video-page                  // Ana container
  └── .video-page-shapes    // Dekoratif şekiller

.video-hero                  // Hero section
  ├── __title
  └── __description

.video-player-card          // Video player kartı
  ├── .video-player-container
  │   ├── .video-direct-player
  │   ├── .video-youtube-placeholder
  │   ├── .video-overlay
  │   ├── .video-play-btn
  │   └── .video-embed
  └── .video-info-bar

.stat-card                  // İstatistik kartları
  ├── __icon
  ├── __value
  └── __label

.feature-card               // Özellik kartları
  ├── __icon-wrapper
  ├── __title
  └── __description

.video-cta                  // CTA bölümü
  ├── __icon
  ├── __title
  ├── __description
  └── __buttons
```

## 📱 Responsive

Tüm breakpoint'lerde optimize edilmiştir:
- **Mobile**: < 576px
- **Tablet**: 576px - 991px
- **Desktop**: > 991px

## 🚀 Yeni Bileşen Ekleme

### 1. Section Oluşturma

`_shared/sections/` içinde yeni bir component oluşturun:

```typescript
// _shared/sections/my-new-section.tsx
export const MyNewSection: React.FC = () => {
  return <div>My New Section</div>;
};
```

### 2. Export Ekleme

`_shared/sections/index.ts` dosyasına ekleyin:

```typescript
export { MyNewSection } from "./my-new-section";
```

### 3. Sayfada Kullanma

`page.tsx` içinde import edip kullanın:

```typescript
import { MyNewSection } from "./_shared";

// ...
<MyNewSection />
```

## 🎯 Best Practices

1. ✅ **Config'de veri tut**: Tüm statik veriler config'de
2. ✅ **Logic hook'ta**: İş mantığı custom hook'ta
3. ✅ **UI section'da**: Görsel bileşenler section'da
4. ✅ **Type güvenliği**: Her şey için tip tanımla
5. ✅ **Reusability**: Bileşenleri yeniden kullanılabilir yap
6. ✅ **Export hub**: index.ts ile temiz import'lar

## 📚 İlgili Sayfalar

- `/about` - Benzer _shared yapısı
- `/contact` - Benzer organizasyon
- `/search` - Section tabanlı yapı

## 🔄 Migration Guide

Eski yapıdan yeni yapıya geçiş:

```typescript
// ESKI
import { getVideoType } from "./utils/video-helpers";

// YENİ
import { getVideoType } from "./_shared";

// ESKI
const videoStats = [...]; // page.tsx içinde

// YENİ
import { VIDEO_STATS } from "./_shared/config";
```

## 🐛 Troubleshooting

### Import hataları
```bash
# _shared klasörü doğru konumda mı?
ls src/app/(public)/video/_shared

# Index dosyaları var mı?
ls src/app/(public)/video/_shared/*/index.ts
```

### Type hataları
```typescript
// Tipleri import edin
import type { VideoStat, PlatformFeature } from "./_shared/types";
```

---

**Eğitim İste** © 2025 - Organize ve ölçeklenebilir kod yapısı

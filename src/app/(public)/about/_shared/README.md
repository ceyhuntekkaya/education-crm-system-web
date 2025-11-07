# About Page - Shared Resources

Bu klasör, `about` sayfasının tüm modüler bileşenlerini içerir.

## 📁 Klasör Yapısı

```
_shared/
├── config/              # Statik veri ve konfigürasyon dosyaları
│   ├── features.config.ts        # Veli ve kurum özellikleri
│   ├── advantages.config.ts      # Veli ve kurum avantajları
│   └── index.ts
│
├── sections/            # Yeniden kullanılabilir section bileşenleri
│   ├── about-hero-section.tsx    # Hero section
│   ├── section-header.tsx        # Genel section başlığı
│   ├── features-section.tsx      # Özellikler section
│   ├── how-it-works-section.tsx  # Nasıl çalışır section
│   ├── advantages-section.tsx    # Avantajlar section
│   ├── institution-modules-section.tsx  # Kurum modülleri
│   ├── mission-vision-section.tsx       # Misyon & Vizyon
│   ├── brand-section.tsx         # Brand/Logo section
│   ├── info-section.tsx          # İletişim bilgisi
│   └── index.ts
│
├── utils/               # Yardımcı fonksiyonlar ve konfigürasyonlar
│   ├── tab-config.tsx            # Tab yapılandırması
│   └── index.ts
│
└── index.ts             # Ana export dosyası
```

## 🎯 Kullanım

### Config Dosyaları

```tsx
import { 
  parentFeatures, 
  institutionFeatures,
  parentAdvantages,
  institutionAdvantages 
} from './_shared/config';
```

### Section Bileşenleri

```tsx
import {
  AboutHeroSection,
  SectionHeader,
  FeaturesSection,
  HowItWorksSection,
  AdvantagesSection,
  InstitutionModulesSection,
  MissionVisionSection,
  BrandSection,
  InfoSection
} from './_shared/sections';
```

### Utils

```tsx
import { getAboutTabs } from './_shared/utils';

const tabs = getAboutTabs();
```

## 📝 Bileşen Açıklamaları

### Config

- **features.config.ts**: Veli ve kurumlar için platform özellikleri
- **advantages.config.ts**: Veli ve kurumlar için avantajlar

### Sections

- **AboutHeroSection**: Logo ve genel tanıtım
- **SectionHeader**: Parametrik section başlığı
- **FeaturesSection**: Özellikler kartları
- **HowItWorksSection**: 3 adımlı süreç kartları
- **AdvantagesSection**: Avantaj kartları
- **InstitutionModulesSection**: Kurum modül kartları
- **MissionVisionSection**: Misyon ve vizyon
- **BrandSection**: Marka logosu ve açıklama
- **InfoSection**: İletişim bilgisi

### Utils

- **tab-config.tsx**: Tab yapılandırması ve içerikleri

## 🔧 Yeni Özellik Ekleme

### 1. Yeni Config Ekleme

```typescript
// config/new-config.ts
export interface NewType {
  // ...
}

export const newData: NewType[] = [
  // ...
];

// config/index.ts'e export ekle
export * from "./new-config";
```

### 2. Yeni Section Ekleme

```tsx
// sections/new-section.tsx
import React from "react";

export const NewSection: React.FC = () => {
  return (
    // ...
  );
};

// sections/index.ts'e export ekle
export * from "./new-section";
```

## 💡 Best Practices

1. **Tek Sorumluluk**: Her bileşen tek bir görevi yerine getirmeli
2. **Yeniden Kullanılabilirlik**: Bileşenler parametrik olmalı
3. **Type Safety**: TypeScript interface'leri kullan
4. **Export Organizasyonu**: index.ts dosyaları ile merkezi export
5. **Naming Convention**: Açıklayıcı ve tutarlı isimlendirme

## 🎨 Stil Yapısı

Tüm stiller SASS/CSS ile tanımlanmıştır. Section bileşenleri aşağıdaki class yapılarını kullanır:

- `.feature-card`
- `.process-card`
- `.advantage-card`
- `.module-card`
- `.mission-vision-card`
- `.brand-section`
- `.info-section`

## 🚀 Performans İpuçları

1. Config dosyaları statik olduğu için component dışında tanımlanmıştır
2. Section bileşenleri React.memo ile optimize edilebilir
3. Lazy loading için React.lazy kullanılabilir

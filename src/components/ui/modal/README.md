# Modal Component Yapısı

Bu dokümantasyon modal component'inin organize yapısını açıklar.

## 📁 Klasör Yapısı

```text
modal/
├── contexts/          # Context yönetimi
│   ├── index.ts
│   └── modal-context.tsx
├── hooks/            # Custom hook'lar
│   ├── index.ts
│   ├── use-modal-effects.ts
│   ├── use-modal-keyboard.ts
│   └── use-modal-styles.ts
├── sections/         # Modal bileşenleri
│   ├── index.ts
│   ├── modal-backdrop.tsx
│   ├── modal-body.tsx
│   ├── modal-footer.tsx
│   └── modal-header.tsx
├── types/           # TypeScript type tanımları
│   ├── index.ts
│   ├── base-types.ts
│   ├── modal-types.ts
│   └── section-types.ts
├── utils/           # Utility fonksiyonları
│   ├── index.ts
│   └── modal-utils.ts
├── index.ts         # Ana export dosyası
├── modal.tsx        # Ana modal component'i
├── modal-examples.tsx
└── USAGE_EXAMPLES.md
```

## 🎯 Sorumluluklar

### `contexts/`

- Modal state yönetimi
- Context provider ve hook'lar
- Alt bileşenler arası veri paylaşımı

### `hooks/`

- Modal yaşam döngüsü yönetimi
- Klavye etkileşimleri
- Stil hesaplamaları
- Yan etki yönetimi

### `sections/`

- Modal parçaları (Header, Body, Footer, Backdrop)
- Her bileşen kendi sorumluluğunda
- Yeniden kullanılabilir yapı

### `types/`

- TypeScript type tanımları
- Base types (boyut, pozisyon, vb.)
- Component-specific props
- Kategorize edilmiş yapı

### `utils/`

- Pure fonksiyonlar
- Stil hesaplamaları
- Helper fonksiyonları
- Framework agnostic utilities

## 🚀 Kullanım Avantajları

1. **Modüler Yapı**: Her klasör kendi sorumluluğuna odaklanır
2. **Yeniden Kullanılabilirlik**: Utility'ler başka projelerde kullanılabilir
3. **Tip Güvenliği**: Kategorize edilmiş TypeScript desteği
4. **Performance**: useMemo ve useCallback optimizasyonları
5. **Maintainability**: Kolay bakım ve genişletme
6. **Developer Experience**: Temiz import yapısı ve intellisense desteği

## 📚 Detaylı Kullanım

Detaylı kullanım örnekleri için `USAGE_EXAMPLES.md` dosyasına bakın.

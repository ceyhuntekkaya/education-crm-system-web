# Gallery Add-Edit Sayfası - Uygulama Özeti

## 📋 Genel Bakış

Social Media modülündeki add-edit sayfasının mimarisi baz alınarak, Gallery modülü için eksiksiz bir add-edit yapısı oluşturuldu.

## 🏗️ Mimari Yapı

### 1. **Klasör Yapısı**
```
gallery/add-edit/
├── _shared/
│   ├── constants/
│   │   ├── allowed-fields.ts          # Update için izin verilen alanlar
│   │   ├── disabled-fields.ts         # Edit modunda disable edilecek alanlar
│   │   └── index.ts
│   ├── context/
│   │   ├── gallery-add-edit-context.tsx
│   │   └── index.ts
│   ├── hooks/
│   │   ├── use-add-gallery.ts         # POST hook (ApiResponseDto wrapper)
│   │   ├── use-edit-gallery.ts        # PUT hook (ApiResponseDto wrapper)
│   │   ├── use-gallery-by-id.ts       # GET hook
│   │   ├── use-gallery-options.ts     # Enum options
│   │   └── index.ts
│   ├── sections/
│   │   ├── gallery-form/
│   │   │   ├── schemas/
│   │   │   │   ├── initial-values.ts  # Form başlangıç değerleri
│   │   │   │   ├── validation-schema.ts # Yup validasyon
│   │   │   │   └── index.ts
│   │   │   ├── sections/
│   │   │   │   ├── form-content.tsx   # Form alanları
│   │   │   │   └── index.ts
│   │   │   ├── types/
│   │   │   │   ├── form-data.ts
│   │   │   │   ├── props.ts
│   │   │   │   └── index.ts
│   │   │   ├── gallery-form.tsx       # Ana form component
│   │   │   └── index.ts
│   │   ├── loading-section.tsx
│   │   └── index.ts
│   ├── types/
│   │   ├── context-types.ts
│   │   ├── hook-types.ts
│   │   └── index.ts
│   ├── utils/
│   │   ├── field-utils.ts             # Field disable kontrolü
│   │   ├── form-data-utils.ts         # DTO -> Form data transformu
│   │   ├── gallery-utils.ts           # Edit data filtreleme
│   │   ├── id-utils.ts                # ID validation & parsing
│   │   ├── label-utils.ts             # Enum label'ları
│   │   └── index.ts
│   └── index.ts
├── [id]/
│   └── page.tsx                       # Ana sayfa component
└── layout.tsx                         # Context provider wrapper
```

## 🔌 API Entegrasyonları

### API Endpoints (Eklenen)
```typescript
CONTENT: {
  // Galleries
  GALLERY_CREATE: "/content/galleries",
  GALLERY_UPDATE: (id) => `/content/galleries/${id}`,
  GALLERY_BY_ID: (id) => `/content/galleries/${id}`,
  
  // Gallery Items
  GALLERY_ITEMS: "/content/galleries/items",
  GALLERY_ITEM_CREATE: "/content/galleries/items",
  GALLERY_ITEM_BY_ID: (id) => `/content/galleries/items/${id}`,
  GALLERY_ITEM_UPDATE: (id) => `/content/galleries/items/${id}`,
}
```

### DTO'lar

#### GalleryCreateDto
```typescript
{
  brandId?: number;
  campusId?: number;
  schoolId?: number;
  title?: string;
  description?: string;
  galleryType?: string;
  visibility?: string;
  coverImageUrl?: string;
  sortOrder?: number;
  isFeatured?: boolean;
  allowComments?: boolean;
  allowDownloads?: boolean;
  metaTitle?: string;
  metaDescription?: string;
  tags?: string;
}
```

#### GalleryUpdateDto
```typescript
{
  title?: string;
  description?: string;
  galleryType?: string;  // (Disabled in edit mode)
  visibility?: string;
  coverImageUrl?: string;
  sortOrder?: number;
  isFeatured?: boolean;
  allowComments?: boolean;
  allowDownloads?: boolean;
  metaTitle?: string;
  metaDescription?: string;
  tags?: string;
}
```

#### GalleryItemCreateDto (Güncellenmiş)
```typescript
{
  galleryId: number;         // Required
  title?: string;
  description?: string;
  altText?: string;
  itemType: string;          // MediaType - Required
  fileUrl: string;           // Required
  thumbnailUrl?: string;
  fileName: string;          // Required
  originalFileName: string;  // Required
  fileSizeBytes: number;     // Required
  mimeType: string;          // Required
  
  // Image/Video specific
  width?: number;
  height?: number;
  durationSeconds?: number;
  videoFormat?: string;
  
  // Camera/Device
  cameraMake?: string;
  cameraModel?: string;
  takenAt?: string;
  
  // Location
  locationName?: string;
  latitude?: number;
  longitude?: number;
  
  // Organization
  sortOrder?: number;
  isFeatured?: boolean;
  isCover?: boolean;
  tags?: string;
}
```

## 🎯 Önemli Özellikler

### 1. **ApiResponseDto Wrapper**
Tüm API çağrıları `ApiResponseDto<T>` formatında sarmalanmış:
```typescript
// use-add-gallery.ts
const wrappedPostGallery = async (
  data: GalleryCreateDto
): Promise<GalleryDto | null> => {
  const response = await postGallery(data);
  return response?.data || null;
};
```

### 2. **Edit Mode Yönetimi**
- `isValidEditId()`: ID validation
- `parseEditId()`: ID parsing
- `filterDataForEdit()`: UpdateDto için data filtreleme
- Disabled fields: `galleryType`, `schoolId`, `brandId`, `campusId`

### 3. **Form Validasyonu**
Yup schema ile tam donanımlı validasyon:
- Required fields: title, galleryType, visibility
- Min/Max length kontrolü
- URL format validasyonu
- Number range kontrolü

### 4. **Enum Options**
```typescript
// GalleryType Labels
MIXED: "Karışık"
PHOTOS: "Fotoğraflar"
VIDEOS: "Videolar"
SCHOOL_TOUR: "Okul Turu"
EVENTS: "Etkinlikler"
// ... ve diğerleri

// GalleryVisibility Labels
PUBLIC: "Herkese Açık"
PRIVATE: "Sadece Okul Personeli"
REGISTERED_ONLY: "Sadece Üye Veliler"
PASSWORD_PROTECTED: "Şifre Korumalı"
```

### 5. **Context Yapısı**
```typescript
GalleryAddEditContext:
  - gallery: GalleryDto | null
  - galleryLoading: boolean
  - galleryError: string | null
  - isEditing: boolean
  - galleryId: string | null
  - galleryTypeOptions: SelectOption[]
  - visibilityOptions: SelectOption[]
  - fetchGallery()
  - postGallery()
  - putGallery()
```

## 📝 Form Alanları

### Temel Bilgiler
- Okul (disabled, auto-fill)
- Galeri Tipi (disabled in edit mode)
- Başlık (required)
- Açıklama

### Görünürlük ve Ayarlar
- Görünürlük (required)
- Sıralama
- Öne Çıkan (checkbox)
- Yorumlara İzin Ver (checkbox)
- İndirmelere İzin Ver (checkbox)

### Kapak Görseli
- FileInput ile upload
- Manual URL girişi

### SEO Bilgileri
- Meta Başlık (max 60 karakter)
- Meta Açıklama (max 160 karakter)
- Etiketler

## 🚀 Kullanım

### Yeni Gallery Oluşturma
```
/company/gallery/add-edit/new
```

### Gallery Düzenleme
```
/company/gallery/add-edit/[id]
```

## ✅ Tamamlanan İşlemler

1. ✅ API endpoint'leri eklendi
2. ✅ DTO'lar güncellendi/oluşturuldu
3. ✅ Types export edildi
4. ✅ Context yapısı oluşturuldu
5. ✅ Hooks oluşturuldu (ApiResponseDto wrapper ile)
6. ✅ Form schemas (initial values + validation)
7. ✅ Form content component
8. ✅ Utils (id, field, form-data, gallery, label)
9. ✅ Constants (allowed/disabled fields)
10. ✅ Page ve Layout dosyaları
11. ✅ Loading section
12. ✅ Enum label utils
13. ✅ Compile error'lar düzeltildi

## 🔄 Sonraki Adımlar (Opsiyonel)

1. Gallery Items için ayrı bir yönetim sayfası
2. Bulk upload özelliği
3. Image/Video preview
4. Drag & drop ile sıralama
5. Gallery items için inline editing

## 📌 Not

Tüm mimari, social-media add-edit yapısıyla %100 tutarlı şekilde oluşturulmuştur. Kod standartları, naming convention'lar ve klasör yapısı birebir takip edilmiştir.

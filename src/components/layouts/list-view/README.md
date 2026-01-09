# 🎨 PageLayout Component

Generic, tekrar kullanılabilir sayfa layout componenti. Tüm liste/grid sayfalarınızda kullanabilirsiniz.

## 📋 Özellikler

✅ **Filtreleme** - Custom filter componentleri ekleyebilirsiniz
✅ **Sıralama** - Dropdown ile kolay sıralama
✅ **Arama** - Entegre arama kutusu
✅ **Grid/List Görünümü** - İki farklı görünüm modu
✅ **Loading State** - Otomatik yükleniyor durumu
✅ **Empty State** - Veri yoksa gösterilecek durum
✅ **Action Buttons** - Header'a aksiyon butonları ekleyebilme
✅ **Responsive** - Mobile uyumlu
✅ **Type-Safe** - Full TypeScript desteği
✅ **Organize Prop Yapısı** - Mantıksal gruplara ayrılmış prop'lar

---

## 🚀 Temel Kullanım

### 1. Basit Grid Görünümü

```tsx
import { PageLayout } from "@/components/layouts/page-layout";
import { MyCard } from "./my-card";

function MyListPage() {
  const data = [/* your data */];

  return (
    <PageLayout
      header={{
        title: "Başlık",
        subtitle: "Alt başlık",
      }}
      data={{
        data: data,
      }}
      view={{
        grid: {
          renderCard: ({ item }) => <MyCard item={item} />,
        },
      }}
    />
  );
}
```

### 2. Grid + List Görünümü

```tsx
import { PageLayout } from "@/components/layouts/page-layout";
import type { GridColDef } from "@/components/ui/data-grid";

const columns: GridColDef[] = [
  {
    field: "name",
    headerName: "İsim",
    width: 200,
  },
  {
    field: "email",
    headerName: "E-posta",
    renderCell: ({ value }) => <a href={`mailto:${value}`}>{value}</a>,
  },
];

function MyListPage() {
  return (
    <PageLayout
      header={{
        title: "Kullanıcılar",
      }}
      data={{
        data: users,
      }}
      view={{
        enableToggle: true,
        grid: {
          renderCard: ({ item }) => <UserCard user={item} />,
        },
        list: {
          columns: columns,
        },
      }}
    />
  );
}
```

### 3. Filtreleme ve Sıralama

```tsx
import { PageLayout, SortOption, FilterOption } from "@/components/layouts/page-layout";

const sortOptions: SortOption[] = [
  { value: "name", label: "İsme Göre", icon: "bi-sort-alpha-down" },
  { value: "date", label: "Tarihe Göre", icon: "bi-calendar" },
];

const filters: FilterOption[] = [
  {
    id: "status",
    type: "custom",
    label: "Durum",
    render: () => <StatusFilter />, // Kendi filter componentiniz
  },
];

function MyListPage() {
  const handleSortChange = (field: string, order: "asc" | "desc") => {
    // API çağrısı vs...
  };

  const handleResetFilters = () => {
    // Filtreleri temizle
  };

  return (
    <PageLayout
      header={{
        title: "Ürünler",
      }}
      data={{
        data: products,
      }}
      view={{
        grid: {
          renderCard: ({ item }) => <ProductCard product={item} />,
        },
      }}
      sort={{
        enabled: true,
        options: sortOptions,
        onChange: handleSortChange,
      }}
      filters={{
        enabled: true,
        options: filters,
        onReset: handleResetFilters,
      }}
    />
  );
}
### 4. Action Buttons

```tsx
function MyListPage() {
  return (
    <PageLayout
      header={{
        title: "Alım İlanları",
        actionButtons: [
          {
            label: "Yeni İlan Oluştur",
            icon: "bi-plus-lg",
            onClick: () => router.push("/rfqs/add"),
            variant: "primary",
          },
          {
            label: "Export",
            icon: "bi-download",
            onClick: () => exportData(),
            variant: "secondary",
          },
        ],
      }}
      data={{
        data: rfqs,
      }}
      view={{
        grid: {
          renderCard: ({ item }) => <RFQCard rfq={item} />,
        },
      }}
    />
  );
}
```

### 5. Custom Empty State

```tsx
function MyListPage() {
  return (
    <PageLayout
      header={{
        title: "Siparişler",
      }}
      data={{
        data: orders,
      }}
      view={{
        grid: {
          renderCard: ({ item }) => <OrderCard order={item} />,
        },
      }}
      states={{
        empty: {
          title: "Henüz Sipariş Yok",
          description: "İlk siparişinizi oluşturmak için butona tıklayın",
          icon: "bi-cart-x",
          action: {
            label: "Yeni Sipariş Oluştur",
            onClick: () => router.push("/orders/new"),
          },
        },
      }}
    />
  );
}
```

### 6. Loading State

```tsx
function MyListPage() {
  const { data, loading } = useMyData();

  return (
    <PageLayout
      header={{
        title: "Veriler",
      }}
      data={{
        data: data,
        loading: loading,
      }}
      view={{
        grid: {
          renderCard: ({ item }) => <DataCard item={item} />,
        },
      }}
      states={{
        loading: {
          text: "Veriler yükleniyor, lütfen bekleyin...",
        },
      }}
    />
  );
}
```

## 📝 RFQ Sayfası Örneği (Gerçek Kullanım)

RFQ sayfanızı PageLayout ile nasıl yaparsınız:

```tsx
"use client";

import React from "react";
import { usePageTitle } from "@/hooks";
import { PageLayout, SortOption, FilterOption } from "@/components/layouts/page-layout";
import { RFQCard } from "./_shared/sections/rfq-card";
import { StatusFilter, TypeFilter, DateFilter } from "./_shared/sections/header/sections";
import { rfqColumns } from "./_shared/config/rfq-columns";
import { useRFQsApi } from "./_shared/hooks/api/useRFQsApi";

const sortOptions: SortOption[] = [
  { value: "createdAt", label: "Oluşturma Tarihi", icon: "bi-calendar" },
  { value: "submissionDeadline", label: "Son Teslim Tarihi", icon: "bi-clock" },
  { value: "itemCount", label: "Ürün Sayısı", icon: "bi-box" },
];

const RFQsPage: React.FC = () => {
  usePageTitle("Alım İlanları");

  const {
    rfqs,
    loading,
    totalElements,
    filters,
    setFilters,
    sortBy,
    sortOrder,
    handleSortChange,
    resetFilters,
  } = useRFQsApi();

  const customFilters: FilterOption[] = [
    {
      id: "status",
      type: "custom",
      label: "Durum",
      render: () => (
        <StatusFilter
          value={filters.status}
          onChange={(v) => setFilters({ ...filters, status: v })}
        />
      ),
    },
    {
      id: "type",
      type: "custom",
      label: "Tür",
      render: () => (
        <TypeFilter
          value={filters.type}
          onChange={(v) => setFilters({ ...filters, type: v })}
        />
      ),
    },
    {
      id: "date",
      type: "custom",
      label: "Tarih",
      render: () => (
        <DateFilter
          dateFrom={filters.dateFrom}
          dateTo={filters.dateTo}
          onChange={(from, to) =>
            setFilters({ ...filters, dateFrom: from, dateTo: to })
          }
        />
      ),
    },
  ];

  return (
    <PageLayout
      header={{
        title: "Alım İlanları",
        subtitle: "Tedarikçilerden fiyat teklifi almak için alım ilanları oluşturun",
        totalCount: totalElements,
        icon: "bi-clipboard-check",
        actionButtons: [
          {
            label: "Yeni Alım İlanı",
            icon: "bi-plus-lg",
            onClick: () => router.push("/supply/company/rfqs/add-edit/new"),
            variant: "primary",
          },
        ],
      }}
      data={{
        data: rfqs,
        loading: loading,
      }}
      view={{
        defaultMode: "grid",
        enableToggle: true,
        grid: {
          renderCard: ({ item }) => <RFQCard rfq={item} />,
          className: "row row-gap-24",
          cardClassName: "col-12 col-md-6 col-lg-4",
        },
        list: {
          columns: rfqColumns,
        },
      }}
      filters={{
        enabled: true,
        options: customFilters,
        onReset: resetFilters,
      }}
      sort={{
        enabled: true,
        options: sortOptions,
        defaultBy: sortBy,
        defaultOrder: sortOrder,
        onChange: handleSortChange,
      }}
      search={{
        enabled: true,
        placeholder: "İlan ara...",
        onChange: (query) => setFilters({ ...filters, searchQuery: query }),
      }}
      states={{
        empty: {
          title: "Henüz Alım İlanı Yok",
          description: "İlk alım ilanınızı oluşturmak için butona tıklayın",
          icon: "bi-clipboard-x",
          action: {
            label: "İlk İlanı Oluştur",
            onClick: () => router.push("/supply/company/rfqs/add-edit/new"),
          },
        },
        loading: {
          text: "Alım ilanları yükleniyor...",
        },
      }}
    />
  );
};

export default RFQsPage;
```

---

## 🎯 Props Yapısı

PageLayout bileşeni artık daha organize bir prop yapısına sahip. Props'lar mantıksal gruplara ayrılmıştır:

### `header` - Başlık ve Aksiyon Butonları
```tsx
header: {
  title: string;              // Zorunlu - Sayfa başlığı
  subtitle?: string;          // Alt başlık
  totalCount?: number;        // Toplam kayıt sayısı
  icon?: string;              // Bootstrap icon class
  actionButtons?: ActionButton[];  // Header aksiyon butonları
  customHeader?: ReactNode;   // Custom header component
}
```

### `data` - Veri ve Durum
```tsx
data: {
  data: T[];                  // Zorunlu - Gösterilecek data
  loading?: boolean;          // Yükleniyor durumu
  error?: Error | null;       // Hata durumu
}
```

### `view` - Görünüm Ayarları
```tsx
view?: {
  defaultMode?: "grid" | "list";  // Başlangıç görünüm modu (varsayılan: "grid")
  enableToggle?: boolean;         // Görünüm modu değiştirme butonu (varsayılan: true)
  grid?: {
    renderCard?: (props) => ReactNode;  // Card render fonksiyonu
    col?: 1 | 2 | 3 | 4 | 6;           // Grid kolon sayısı
    className?: string;                  // Grid container class
    cardClassName?: string;              // Card wrapper class
  };
  list?: {
    columns?: GridColDef<T>[];  // Tablo kolonları
    className?: string;          // Table class
  };
}
```

### `filters` - Filtreleme
```tsx
filters?: {
  enabled?: boolean;              // Filtreleme aktif mi (varsayılan: true)
  options?: FilterOption[];       // Filter seçenekleri
  popoverFilters?: PopoverFilterConfig[];  // Popover filter'lar
  onReset?: () => void;          // Filtreleri sıfırla callback
}
```

### `sort` - Sıralama
```tsx
sort?: {
  enabled?: boolean;                        // Sıralama aktif mi (varsayılan: true)
  options?: SortOption[];                   // Sıralama seçenekleri
  defaultBy?: string;                       // Varsayılan sıralama alanı
  defaultOrder?: "asc" | "desc";           // Varsayılan sıralama yönü
  onChange?: (sortBy, sortOrder) => void;  // Sıralama değişince callback
}
```

### `search` - Arama
```tsx
search?: {
  enabled?: boolean;              // Arama aktif mi (varsayılan: true)
  placeholder?: string;           // Arama placeholder
  value?: string;                 // Arama değeri
  onChange?: (value) => void;     // Arama değişince callback
  fields?: string[];              // Arama yapılacak field'lar
}
```

### `states` - Empty ve Loading State'leri
```tsx
states?: {
  empty?: {
    title?: string;                    // Empty state başlık
    description?: string;              // Empty state açıklama
    icon?: string;                     // Empty state icon
    action?: {
      label: string;
      onClick: () => void;
    };
    customRender?: ReactNode;          // Custom empty state
  };
  loading?: {
    text?: string;                     // Loading text
    customRender?: ReactNode;          // Custom loading state
  };
}
```

### `styling` - Stil Özelleştirmeleri
```tsx
styling?: {
  container?: string;  // Container class
  header?: string;     // Header class
}
```

## 🎨 Custom Styling

```tsx
<PageLayout
  header={{
    title: "Başlık",
  }}
  data={{
    data: data,
  }}
  view={{
    grid: {
      renderCard: ({ item }) => <MyCard item={item} />,
      col: 3,  // 3 kolonlu grid (recommended)
      // veya
      className: "row row-gap-32 px-16",  // custom grid class
      cardClassName: "col-12 col-sm-6 col-md-4 col-xl-3",  // custom card class
    },
    list: {
      columns: columns,
      className: "my-custom-table",
    },
  }}
  styling={{
    container: "my-custom-container",
    header: "my-custom-header",
  }}
/>
```

## 🔧 Advanced Features

### Custom Header

Kendi header'ınızı kullanmak istiyorsanız:

```tsx
<PageLayout
  header={{
    title: "Başlık",
    customHeader: (
      <div className="my-custom-header">
        {/* Your custom header */}
      </div>
    ),
  }}
  data={{
    data: data,
  }}
  view={{
    grid: {
      renderCard: ({ item }) => <MyCard item={item} />,
    },
  }}
/>
```

### Custom Empty State

```tsx
<PageLayout
  header={{
    title: "Başlık",
  }}
  data={{
    data: data,
  }}
  view={{
    grid: {
      renderCard: ({ item }) => <MyCard item={item} />,
    },
  }}
  states={{
    empty: {
      customRender: (
        <div className="my-custom-empty-state">
          {/* Your custom empty state */}
        </div>
      ),
    },
  }}
/>
```

### Custom Loading State

```tsx
<PageLayout
  header={{
    title: "Başlık",
  }}
  data={{
    data: data,
  }}
  view={{
    grid: {
      renderCard: ({ item }) => <MyCard item={item} />,
    },
  }}
  states={{
    loading: {
      customRender: (
        <div className="my-custom-loading">
          <Spinner />
        </div>
      ),
    },
  }}
/>
```

---

## 📦 Exports

```tsx
// Main component
import { PageLayout } from "@/components/layouts/page-layout";

// Context (eğer direkt erişmek isterseniz)
import { usePageLayoutContext } from "@/components/layouts/page-layout";

// Types
import type {
  PageLayoutProps,
  SortOption,
  FilterOption,
  ColumnDefinition,
  ActionButton,
  ViewMode,
} from "@/components/layouts/page-layout";

// Components (eğer ayrı kullanmak isterseniz)
import {
  SearchInput,
  SortDropdown,
  ViewModeToggle,
  ResetFiltersButton,
  LoadingState,
  EmptyState,
} from "@/components/layouts/page-layout";
```

---

## 💡 Tips

1. **view.grid.renderCard** prop'u grid görünümü için zorunludur
2. **view.list.columns** prop'u list görünümü için zorunludur
3. Filter'lar için `custom` tipini kullanarak kendi component'lerinizi ekleyebilirsiniz
4. Context üzerinden `viewMode`, `sortBy`, `sortOrder` gibi değerlere erişebilirsiniz
5. Her data item için unique bir `key` prop'u kullanmayı unutmayın
6. **Yeni yapı** ile props'ları mantıksal gruplara ayırdık - daha temiz ve organize kod!

---

## 🐛 Troubleshooting

**Problem:** Grid görünümde kartlar gösterilmiyor
- `view.grid.renderCard` prop'unu kontrol edin
- Data array'inin dolu olduğundan emin olun

**Problem:** List görünümde tablo gösterilmiyor
- `view.list.columns` prop'unu kontrol edin
- Her column için `field` ve `headerName` tanımlı mı?

**Problem:** Sıralama çalışmıyor
- `sort.onChange` callback'ini tanımladınız mı?
- `sort.options` array'ini doldurdunuz mu?

**Problem:** Eski prop yapısını kullanan kod çalışmıyor
- Yeni gruplandırılmış yapıya geçin (yukarıdaki örneklere bakın)
- Eski: `title="Başlık"` → Yeni: `header={{ title: "Başlık" }}`

---

## 📚 Daha Fazla Örnek

Daha fazla örnek için proje içindeki şu dosyalara bakabilirsiniz:

- `/supply/company/rfqs` - RFQ listesi
- `/supply/company/quotations` - Quotation listesi
- `/students` - Öğrenci listesi

---

**Oluşturulma Tarihi:** 2026-01-08
**Son Güncelleme:** 2026-01-09
**Versiyon:** 2.0.0 (Grouped Props Structure)

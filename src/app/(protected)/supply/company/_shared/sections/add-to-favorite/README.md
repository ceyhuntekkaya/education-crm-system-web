# AddToFavorite Component Kullanım Kılavuzu

## Genel Bakış

`AddToFavorite` component'i, ürünleri favorilere ekleme ve çıkarma işlemlerini yapan bir buton bileşenidir.

## Özellikler

- ✅ Ürünü favorilere ekleme/çıkarma
- ✅ Otomatik favori durumu kontrolü
- ✅ Loading state desteği
- ✅ Özelleştirilebilir boyut ve varyasyonlar
- ✅ Icon-only mod
- ✅ Snackbar bildirimleri
- ✅ Callback fonksiyonu desteği

## Kullanım

### Temel Kullanım

```tsx
import { AddToFavorite } from "@/app/(protected)/supply/company/_shared";

<AddToFavorite productId={123} />
```

### İlk Favori Durumu ile

```tsx
<AddToFavorite
  productId={123}
  initialIsFavorite={true}
  wishlistId={456}
/>
```

### Özelleştirilmiş Görünüm

```tsx
<AddToFavorite
  productId={123}
  size="lg"
  variant="primary"
  iconSize={24}
/>
```

### Icon-Only Mod

```tsx
<AddToFavorite
  productId={123}
  iconOnly={true}
  variant="ghost"
/>
```

### Callback ile

```tsx
<AddToFavorite
  productId={123}
  onFavoriteChange={(isFavorite) => {
    console.log("Favori durumu:", isFavorite);
    // Kendi işlemlerinizi yapabilirsiniz
  }}
/>
```

## Props

| Prop | Tip | Varsayılan | Açıklama |
|------|-----|-----------|----------|
| `productId` | `number` | **gerekli** | Ürün ID'si |
| `wishlistId` | `number` | - | Wishlist ID'si (ürün zaten favorilerdeyse) |
| `initialIsFavorite` | `boolean` | `false` | Başlangıç favori durumu |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Buton boyutu |
| `variant` | `'primary' \| 'secondary' \| 'ghost' \| 'outline'` | `'ghost'` | Buton varyasyonu |
| `iconSize` | `number` | `20` | Icon boyutu (px) |
| `iconOnly` | `boolean` | `false` | Sadece icon göster |
| `className` | `string` | `''` | Ek CSS sınıfı |
| `onFavoriteChange` | `(isFavorite: boolean) => void` | - | Favori durumu değiştiğinde çağrılır |
| `disabled` | `boolean` | `false` | Buton disabled durumu |

## Context Fonksiyonları

AddToFavorite component'i doğrudan API hook'larını kullanır. İhtiyacınız olursa aşağıdaki hook'ları doğrudan kullanabilirsiniz:

### `useGetWishlist()`
Kullanıcının tüm favorilerini getirir.

```tsx
import { useGetWishlist } from "@/app/(protected)/supply/company/_shared";

const { data, isLoading, error, refetch } = useGetWishlist();

// data?.data -> WishlistDto[]
```

### `useAddToWishlist()`
Ürünü favorilere ekler.

```tsx
import { useAddToWishlist } from "@/app/(protected)/supply/company/_shared";

const { mutate: addToWishlist, isLoading } = useAddToWishlist();

addToWishlist(
  { productId: 123 },
  {
    onSuccess: (data) => {
      console.log("Eklendi:", data);
    },
  }
);
```

### `useRemoveFromWishlist()`
Ürünü favorilerden çıkarır.

```tsx
import { useRemoveFromWishlist } from "@/app/(protected)/supply/company/_shared";

const { mutate: removeFromWishlist, isLoading } = useRemoveFromWishlist();

removeFromWishlist(wishlistId, {
  onSuccess: () => {
    console.log("Çıkarıldı");
  },
});
```

## Örnek Kullanımlar

### Product Card'da

```tsx
import { AddToFavorite } from "@/app/(protected)/supply/company/_shared";

export const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p>{product.price}</p>
      
      <div className="actions">
        <AddToFavorite
          productId={product.id}
          iconOnly
          variant="ghost"
          size="sm"
        />
        <button className="btn btn-primary">Sepete Ekle</button>
      </div>
    </div>
  );
};
```

### Product Detail Sayfasında

```tsx
import { AddToFavorite } from "@/app/(protected)/supply/company/_shared";

export const ProductDetail = ({ product }) => {
  return (
    <div className="product-detail">
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      
      <div className="actions">
        <AddToFavorite
          productId={product.id}
          size="lg"
          variant="outline"
          onFavoriteChange={(isFavorite) => {
            // Analytics tracking
            console.log("Favori durumu değişti:", isFavorite);
          }}
        />
        <button className="btn btn-primary btn-lg">
          Satın Al
        </button>
      </div>
    </div>
  );
};
```

### Wishlist Sayfasında

```tsx
import { AddToFavorite, useGetWishlist } from "@/app/(protected)/supply/company/_shared";

export const WishlistPage = () => {
  const { data: wishlistData, refetch } = useGetWishlist();
  const wishlist = wishlistData?.data || [];

  const handleFavoriteChange = () => {
    // Wishlist'i yeniden yükle
    refetch();
  };

  return (
    <div>
      {wishlist.map((item) => (
        <div key={item.id} className="wishlist-item">
          <h3>{item.productName}</h3>
          <AddToFavorite
            productId={item.productId!}
            wishlistId={item.id}
            initialIsFavorite={true}
            onFavoriteChange={handleFavoriteChange}
            variant="outline"
          />
        </div>
      ))}
    </div>
  );
};
```

## Notlar

- Component otomatik olarak favori durumunu kontrol eder
- API çağrıları sırasında loading state gösterilir
- Başarılı/başarısız işlemler için snackbar bildirimleri otomatik gösterilir
- useGet, usePost ve useDelete hook'ları kullanılarak modern ve reaktif bir yapı sağlanır
- Component standalone olarak çalışır, context'e bağımlı değildir

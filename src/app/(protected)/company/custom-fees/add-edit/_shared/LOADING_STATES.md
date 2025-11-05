# Custom Fee Add/Edit - İki Ayrı Loading Yapısı

## 📋 Özet

Custom Fee Add/Edit modülünde **iki ayrı loading durumu** bulunmaktadır:

| Loading Türü | Kullanım Amacı | Nerede Gösterilir | Hook Kaynağı |
|--------------|----------------|-------------------|--------------|
| **dataLoading** | Detay çekme işlemi | CustomCard (tüm kart loading) | `useCustomFeeById` |
| **formLoading** | Form submit işlemi | Form butonları (sadece butonlar) | `useAddCustomFee` / `useEditCustomFee` |

---

## 🎯 Kullanım Senaryoları

### Senaryo 1: Yeni Kayıt Ekleme
- URL: `/add-edit/new`
- `dataLoading`: ❌ Aktif değil (detay çekilmiyor)
- `formLoading`: ✅ Form submit edildiğinde aktif

### Senaryo 2: Kayıt Düzenleme
- URL: `/add-edit/123`
- `dataLoading`: ✅ Sayfa açılırken detay çekilirken aktif
- `formLoading`: ✅ Form submit edildiğinde aktif

---

## 🔧 Teknik Detaylar

### Context Type
```typescript
interface CustomFeeAddEditContextType {
  dataLoading: boolean;   // Detay çekme loading'i
  formLoading: boolean;   // Form submit loading'i
  // ... diğer alanlar
}
```

### Hook'lar
- **useCustomFeeById**: `customFeeLoading` → `dataLoading`
- **useAddCustomFee**: `isLoading` → `formLoading` (POST)
- **useEditCustomFee**: `isLoading` → `formLoading` (PUT)

---

## 📦 Dosya Yapısı

```
_shared/
├── context/
│   └── custom-fee-add-edit-context.tsx  → Loading durumlarını birleştirir
├── hooks/
│   ├── use-custom-fee-by-id.ts         → dataLoading kaynağı
│   ├── use-add-custom-fee.ts           → formLoading kaynağı (POST)
│   └── use-edit-custom-fee.ts          → formLoading kaynağı (PUT)
├── sections/
│   └── custom-fee-form/
│       └── sections/
│           └── form-content.tsx         → formLoading kullanımı
└── README.md                            → Detaylı dokümantasyon
```

---

## ✨ Önemli Notlar

1. **dataLoading** sadece `isEditing` true olduğunda anlamlıdır
2. **formLoading** hem ekleme hem düzenleme modunda kullanılır
3. İki loading durumu **birbirinden bağımsız** çalışır
4. CustomCard loading'i tüm kartı etkiler
5. Form loading'i sadece butonları etkiler

---

Detaylı bilgi için `README.md` dosyasına bakınız.

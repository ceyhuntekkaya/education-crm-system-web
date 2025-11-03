# Custom Fee Add/Edit - Loading States Documentation

Bu modül iki ayrı loading durumunu yönetir:

## 1. Data Loading (Detay Çekme Loading'i)

**Ne Zaman Aktif:** Düzenleme modunda (`/add-edit/:id`) custom fee detayı çekilirken

**Nereden Geliyor:** `useCustomFeeById` hook'undan

**Nerede Gösteriliyor:** `CustomCard` bileşeninin `isLoading` prop'unda

**Kullanım:**
```tsx
// page.tsx
<CustomCard
  title={pageTitle}
  isLoading={dataLoading && isEditing} // Sadece düzenleme modunda
>
  <CustomFeeForm />
</CustomCard>
```

**Davranış:**
- Yeni kayıt eklenirken (`/add-edit/new`) → ÇALIŞMAZ
- Düzenleme modunda (`/add-edit/123`) → Detay çekilirken tüm kart loading gösterir

---

## 2. Form Loading (Form Submit Loading'i)

**Ne Zaman Aktif:** Form submit edilirken (POST veya PUT işlemi)

**Nereden Geliyor:** 
- `useAddCustomFee` hook'undan (yeni kayıt için)
- `useEditCustomFee` hook'undan (güncelleme için)

**Nerede Gösteriliyor:** Form butonlarında (`İptal` ve `Kaydet/Güncelle`)

**Kullanım:**
```tsx
// form-content.tsx
<Button 
  type="button" 
  variant="outline" 
  onClick={handleCancel}
  disabled={formLoading} // İptal butonu disable
>
  İptal
</Button>

<Button type="submit" disabled={hasErrors || formLoading}>
  {formLoading ? (
    <>
      <i className="ph ph-circle-notch ph-spin me-8"></i>
      {isEditing ? "Güncelleniyor..." : "Kaydediliyor..."}
    </>
  ) : (
    <>
      <i className="ph ph-floppy-disk me-8"></i>
      {isEditing ? "Güncelle" : "Kaydet"}
    </>
  )}
</Button>
```

**Davranış:**
- Form submit edilmeden → Butonlar normal
- Form submit edilirken → Butonlar loading durumunda ve disable
- İşlem tamamlandıktan sonra → Butonlar normale döner

---

## Context Yapısı

```tsx
interface CustomFeeAddEditContextType {
  // Detay çekme loading'i
  dataLoading: boolean;  // CustomCard'da gösterilir
  
  // Form submit loading'i
  formLoading: boolean;  // Sadece form butonlarında gösterilir
  
  // Diğer alanlar...
}
```

---

## Akış Şeması

### Yeni Kayıt Ekleme (`/add-edit/new`)
```
1. Sayfa yüklenir
   ↓
2. dataLoading = false (çünkü detay çekilmiyor)
   ↓
3. Kullanıcı formu doldurur
   ↓
4. Kullanıcı "Kaydet" butonuna tıklar
   ↓
5. formLoading = true (butonlar loading durumuna geçer)
   ↓
6. API'ye POST isteği atılır
   ↓
7. İşlem tamamlanır
   ↓
8. formLoading = false (butonlar normale döner)
```

### Kayıt Düzenleme (`/add-edit/123`)
```
1. Sayfa yüklenir
   ↓
2. dataLoading = true (CustomCard loading gösterir)
   ↓
3. API'den detay çekilir
   ↓
4. dataLoading = false (form görünür hale gelir)
   ↓
5. Kullanıcı değişiklik yapar
   ↓
6. Kullanıcı "Güncelle" butonuna tıklar
   ↓
7. formLoading = true (butonlar loading durumuna geçer)
   ↓
8. API'ye PUT isteği atılır
   ↓
9. İşlem tamamlanır
   ↓
10. formLoading = false (butonlar normale döner)
```

---

## Avantajları

✅ **Kullanıcı Deneyimi:** İki farklı loading durumu kullanıcıya net geri bildirim sağlar

✅ **Performans:** Detay yüklenirken form alanları da hazırlanır, gereksiz beklemeler olmaz

✅ **Açıklık:** Her loading durumunun ne için olduğu net bir şekilde belirtilmiş

✅ **Bakım Kolaylığı:** Loading durumları merkezi olarak context'te yönetilir

✅ **Esneklik:** İki loading durumu birbirinden bağımsız çalışır

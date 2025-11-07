# Randevu Onaylama ve İptal İşlemleri - Uygulama Özeti

## 📋 Yapılan Değişiklikler

### 1. **Yeni Hook: `useAppointmentActions`**
**Dosya:** `_shared/hooks/useAppointmentActions.ts`

Randevu onaylama ve iptal işlemlerini yöneten hook:
- ✅ `confirmAppointment`: Randevuyu onaylar
- ✅ `cancelAppointment`: Randevuyu iptal eder
- ✅ Loading state yönetimi
- ✅ Snackbar bildirimleri
- ✅ Hata yönetimi

**API Endpoint'leri:**
- `POST /api/appointments/confirm`
  ```typescript
  {
    appointmentId: number;
    confirmedBy: number;
  }
  ```
- `POST /api/appointments/cancel`
  ```typescript
  {
    appointmentId: number;
    cancellationReason: string;
    canceledByType: CancelledByType; // PARENT | SCHOOL | SYSTEM
  }
  ```

---

### 2. **Yeni Modal: `ConfirmAppointmentModal`**
**Dosya:** `_shared/sections/confirm-appointment-modal.tsx`

Randevu onaylama için modal component:
- ✅ Randevu detaylarını gösterir (Veli, Öğrenci, Tarih, Saat)
- ✅ Onaylama işlemi için kullanıcı onayı alır
- ✅ Loading state ile buton devre dışı bırakma
- ✅ Bilgilendirme mesajı

---

### 3. **Yeni Modal: `CancelAppointmentModal`**
**Dosya:** `_shared/sections/cancel-appointment-modal.tsx`

Randevu iptal için modal component:
- ✅ Randevu detaylarını gösterir
- ✅ İptal nedeni girişi (min. 10 karakter validasyonu)
- ✅ İptal eden seçimi (Okul / Veli / Sistem)
- ✅ Form validasyonu
- ✅ Loading state yönetimi
- ✅ Uyarı mesajı

**Form Alanları:**
- İptal Eden (Radio Buttons): Okul, Veli, Sistem
- İptal Nedeni (Textarea): Min. 10 karakter

---

### 4. **Yeni Sütun: `createAppointmentStatusActionsColumn`**
**Dosya:** `_shared/config/appointment-status-actions-column.tsx`

Tablo için yeni aksiyon sütunu:
- ✅ Randevu durumuna göre dinamik gösterim
- ✅ **SCHEDULED** durumunda: Onayla ve İptal Et butonları
- ✅ **CONFIRMED** durumunda: "Onaylandı" badge'i
- ✅ **CANCELLED** durumunda: "İptal Edildi" badge'i
- ✅ Diğer durumlarda: Durum badge'i
- ✅ Individual loading states (her randevu için ayrı)
- ✅ Randevu yoksa: "Henüz randevu yok" mesajı

**Sütun Özellikleri:**
- Başlık: "Randevu Durumu"
- Genişlik: 200px
- Sıralanamaz (sortable: false)

---

### 5. **Güncellenen Component: `AppointmentAvailabilityTable`**
**Dosya:** `_shared/sections/appointment-availability-table.tsx`

Ana tablo component'ine eklenen özellikler:
- ✅ Yeni aksiyon sütunu entegrasyonu
- ✅ Modal açma/kapatma state yönetimi
- ✅ Seçili randevu bilgilerini saklama
- ✅ Onaylama ve iptal işlemlerinin yönetimi
- ✅ İşlem sonrası veri yenileme
- ✅ Loading state'leri (confirmingId, cancellingId)
- ✅ Randevu detaylarını modalara gönderme

**Yeni State'ler:**
```typescript
- confirmModalOpen: boolean
- cancelModalOpen: boolean
- selectedAppointmentId: number | null
- selectedAppointmentDetails: object | null
- confirmingId: number | null
- cancellingId: number | null
```

**Yeni Handler'lar:**
```typescript
- handleConfirmClick(appointmentId)
- handleCancelClick(appointmentId)
- handleConfirmAppointment()
- handleCancelAppointment(reason, canceledByType)
```

---

## 🎯 Kullanım Senaryosu

### 1. **Randevu Onaylama**
1. Kullanıcı tabloda SCHEDULED durumundaki bir randevu görür
2. "Onayla" butonuna tıklar
3. Onaylama modalı açılır (randevu detayları gösterilir)
4. "Onayla" butonuna tıklar
5. API çağrısı yapılır
6. Başarılı olursa:
   - ✅ "Randevu başarıyla onaylandı" snackbar'ı gösterilir
   - ✅ Modal kapanır
   - ✅ Tablo verileri yenilenir
   - ✅ Durum "Onaylandı" olarak güncellenir

### 2. **Randevu İptal Etme**
1. Kullanıcı tabloda SCHEDULED durumundaki bir randevu görür
2. "İptal Et" butonuna tıklar
3. İptal modalı açılır (randevu detayları gösterilir)
4. İptal eden seçer (Okul/Veli/Sistem)
5. İptal nedenini yazar (min. 10 karakter)
6. "İptal Et" butonuna tıklar
7. API çağrısı yapılır
8. Başarılı olursa:
   - ✅ "Randevu başarıyla iptal edildi" snackbar'ı gösterilir
   - ✅ Modal kapanır
   - ✅ Tablo verileri yenilenir
   - ✅ Durum "İptal Edildi" olarak güncellenir

---

## 🎨 UI/UX Özellikleri

### **Aksiyon Butonları**
- **Onayla Butonu:**
  - Variant: `success` (yeşil)
  - İkon: `ph-check-circle`
  - Boyut: `xs`
  
- **İptal Et Butonu:**
  - Variant: `error` (kırmızı)
  - İkon: `ph-x-circle`
  - Boyut: `xs`

### **Durum Badge'leri**
- **Onaylandı:** Yeşil badge (`bg-success-subtle`)
- **İptal Edildi:** Kırmızı badge (`bg-danger-subtle`)
- **Diğer Durumlar:** Gri badge (`bg-secondary-subtle`)

### **Loading States**
- İşlem sırasında ilgili buton loading animasyonu gösterir
- Diğer butonlar devre dışı bırakılır
- Her randevu için ayrı loading state (paralel işlem desteği)

---

## 🔧 Teknik Detaylar

### **Kullanılan Enum'lar**
```typescript
CancelledByType {
  PARENT = "PARENT",
  SCHOOL = "SCHOOL",
  SYSTEM = "SYSTEM"
}
```

### **API İstek Formatları**

**Onaylama İsteği:**
```typescript
POST /api/appointments/confirm
Content-Type: application/json

{
  "appointmentId": 123,
  "confirmedBy": 1
}
```

**İptal İsteği:**
```typescript
POST /api/appointments/cancel
Content-Type: application/json

{
  "appointmentId": 123,
  "cancellationReason": "Veli tarafından talep edildi",
  "canceledByType": "PARENT"
}
```

### **Veri Akışı**
1. Tablo component'i context'ten `availabilities` verisini alır
2. Kullanıcı aksiyon butonuna tıklar
3. Modal açılır ve randevu detayları gösterilir
4. Kullanıcı onaylar
5. Hook API çağrısını yapar
6. Başarılı olursa:
   - Snackbar gösterilir
   - Context'teki `fetchAvailabilities` çağrılır
   - Tablo yenilenir

---

## 📝 Notlar

### **TODO: Kullanıcı Kimliği**
`handleConfirmAppointment` fonksiyonunda `confirmedBy` parametresi için şu an placeholder değer kullanılıyor:
```typescript
const confirmedBy = 1; // TODO: Get from auth context
```
**Yapılması gereken:** Auth context'ten gerçek kullanıcı ID'si alınmalı.

### **Validasyon**
- İptal nedeni minimum 10 karakter olmalıdır
- İptal nedeni boş olamaz
- İptal eden tipi seçilmelidir

### **Hata Yönetimi**
- API hataları catch edilir ve snackbar ile gösterilir
- Console'a hata logları yazılır
- Loading state'ler finally bloğunda temizlenir

---

## 🚀 Eklenen Dosyalar

1. `_shared/hooks/useAppointmentActions.ts` - ✨ YENİ
2. `_shared/sections/confirm-appointment-modal.tsx` - ✨ YENİ
3. `_shared/sections/cancel-appointment-modal.tsx` - ✨ YENİ
4. `_shared/config/appointment-status-actions-column.tsx` - ✨ YENİ

## 📝 Güncellenen Dosyalar

1. `_shared/hooks/index.ts` - Export eklendi
2. `_shared/sections/index.ts` - Export'lar eklendi
3. `_shared/config/index.ts` - Export eklendi
4. `_shared/sections/appointment-availability-table.tsx` - Aksiyon entegrasyonu

---

## ✅ Test Edilmesi Gerekenler

- [ ] Onaylama modalının açılması/kapanması
- [ ] İptal modalının açılması/kapanması
- [ ] Onaylama API çağrısı
- [ ] İptal API çağrısı
- [ ] Loading state'leri
- [ ] Form validasyonları
- [ ] Snackbar bildirimleri
- [ ] Tablo yenileme
- [ ] Durum badge'lerinin gösterimi
- [ ] Paralel işlem desteği (birden fazla randevu üzerinde aynı anda işlem)

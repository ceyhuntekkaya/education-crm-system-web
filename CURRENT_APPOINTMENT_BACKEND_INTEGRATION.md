# Current Appointment Backend Entegrasyonu

## 📋 Genel Bakış

Current Appointment bileşeni, backend'den gelen yeni veri yapısına göre revize edildi. Backend artık `AppointmentSlotDto[]` formatında veri gönderiyor ve her slot içinde `appointment` field'ı bulunuyor.

## 🔄 Yapılan Değişiklikler

### 1. Hook Güncellemesi (`use-current-appointment.ts`)

**Önceki Yapı:**
```typescript
useGet<ApiResponseDto<AppointmentDto[]>>(endpoint)
// Response: { data: [AppointmentDto, ...] }
```

**Yeni Yapı:**
```typescript
useGet<ApiResponseDto<AppointmentSlotDto[]>>(endpoint)
// Response: { data: [{ ...slotData, appointment: AppointmentDto }, ...] }
```

**Değişiklik:**
- Response tipi `AppointmentDto[]` yerine `AppointmentSlotDto[]` olarak güncellendi
- İlk slot'un `appointment` field'ı extract ediliyor: `appointmentResponse?.data?.[0]?.appointment`

### 2. Mock Data Güncellemesi (`current-appointment-data.ts`)

**Yeni Yapı:**
```typescript
export const mockCurrentAppointmentSlot: AppointmentSlotDto = {
  id: 12,
  schoolId: 1,
  schoolName: "Eğitim Dünyası Maslak Anaokulu",
  staffUserId: 1,
  staffUserName: "Ahmet Yılmaz",
  durationMinutes: 30,
  appointmentType: "PHONE_CALL",
  onlineMeetingAvailable: false,
  advanceBookingHours: 24,
  maxAdvanceBookingDays: 30,
  cancellationHours: 4,
  requiresApproval: true,
  dayOfWeekName: "Wednesday",
  isAvailable: false,
  isActive: true,
  slotDate: "2025-11-05T14:40:00",
  appointment: {
    // Nested appointment data
  }
};
```

**Özellikler:**
- Backend'den gelen gerçek data ile 1:1 eşleşiyor
- `null` değerler TypeScript uyumluluğu için `undefined` olarak değiştirildi
- Geriye dönük uyumluluk için `mockCurrentAppointment` export ediliyor

### 3. Utility Fonksiyonları (`appointment-display-utils.ts`)

**Yeni Eklenen Fonksiyon:**
```typescript
export const formatGender = (gender?: string): string => {
  // MALE, FEMALE, OTHER -> Erkek, Kız, Diğer
  // Backend'den gelen enum değerlerini Türkçe'ye çevirir
}
```

**Kullanım:**
```typescript
import { formatGender } from "../utils";
const formattedGender = formatGender(appointment.studentGender); // "MALE" -> "Erkek"
```

### 4. Student Info Section Güncellemesi

```typescript
// Önceki
value: `${appointment.studentAge} yaşında, ${appointment.studentGender}`

// Yeni
value: `${appointment.studentAge} yaşında, ${formatGender(appointment.studentGender)}`
```

## 📊 Backend Response Formatı

```json
{
  "success": true,
  "message": "Appointment slot created successfully",
  "data": [
    {
      "id": 12,
      "schoolId": 1,
      "schoolName": "Eğitim Dünyası Maslak Anaokulu",
      "staffUserId": 1,
      "staffUserName": "Ahmet Yılmaz",
      "durationMinutes": 30,
      "appointmentType": "PHONE_CALL",
      "slotDate": "2025-11-05T14:40:00",
      "appointment": {
        "id": 8,
        "appointmentNumber": "APT73637220",
        "status": "PENDING",
        "studentGender": "MALE",
        // ... diğer appointment alanları
      }
    }
  ]
}
```

## 🎯 Veri Akışı

```
Backend API
    ↓
AppointmentSlotDto[]
    ↓
useCurrentAppointment Hook
    ↓
Extract: slot.appointment
    ↓
AppointmentDto
    ↓
UI Components
```

## ✅ Testler

### Manuel Test Checklist

- [ ] Randevu bilgileri doğru şekilde gösteriliyor
- [ ] Cinsiyet bilgisi Türkçe olarak görüntüleniyor (MALE → Erkek)
- [ ] Tarih ve saat formatları doğru
- [ ] Status badge'leri doğru renk ve iconla gösteriliyor
- [ ] Loading state çalışıyor
- [ ] Error state çalışıyor
- [ ] Empty state çalışıyor
- [ ] Randevu detay sayfası açılıyor

## 📁 Etkilenen Dosyalar

```
src/app/(public)/search/[id]/_shared/sections/current-appointment/
├── hooks/
│   └── use-current-appointment.ts          ✅ Güncellendi
├── mock/
│   ├── current-appointment-data.ts         ✅ Güncellendi
│   └── index.ts                            ✅ Güncellendi
├── sections/
│   └── appointment-detail/
│       └── sections/
│           └── student-info-section.tsx    ✅ Güncellendi
└── utils/
    ├── appointment-display-utils.ts        ✅ Güncellendi
    └── index.ts                            ✅ Güncellendi
```

## 🔍 Önemli Notlar

1. **TypeScript Null Safety**: Backend'den gelen `null` değerler frontend'de `undefined` olarak kullanılmalı
2. **Geriye Dönük Uyumluluk**: `mockCurrentAppointment` export edilmeye devam ediliyor
3. **Gender Formatting**: Backend enum değerleri (`MALE`, `FEMALE`) otomatik olarak Türkçe'ye çevriliyor
4. **Nested Structure**: Appointment verisi artık slot içinde nested olarak geliyor

## 🚀 Gelecek İyileştirmeler

1. ✨ Slot bilgilerini (advanceBookingHours, cancellationHours) UI'da göstermek
2. ✨ Staff bilgilerini (staffUserName) randevu kartında göstermek
3. ✨ Online meeting availability indicator eklemek
4. ✨ Requires approval badge'i eklemek

## 📝 API Endpoint

```typescript
API_ENDPOINTS.APPOINTMENTS.CURRENT_APPOINTMENT(userId, schoolId)
// GET /api/appointments/slots/search/user/{userId}/school/{schoolId}
```

---

**Son Güncelleme:** 3 Kasım 2025
**Versiyon:** 2.0.0
**Durum:** ✅ Tamamlandı

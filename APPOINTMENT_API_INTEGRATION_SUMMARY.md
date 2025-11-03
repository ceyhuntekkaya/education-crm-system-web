# Appointment Create API Entegrasyonu - Özet

## Yapılan Değişiklikler

### 1. Yeni Hook'lar Oluşturuldu

#### `use-appointment-slots.ts`
- **Amaç**: İki tarih arası okul slotlarını getirmek
- **Endpoint**: `POST /appointments/slots/search/date`
- **Request Body**:
  ```typescript
  {
    startDate: string; // "YYYY-MM-DD" - Bugün
    endDate: string;   // "YYYY-MM-DD" - Bugünden 10 gün sonra
    schoolId: number;
  }
  ```
- **Response**: `AppointmentSlotDto[]`
- **Özellikler**:
  - Otomatik olarak bugünden 10 gün sonraya kadar slotları getirir
  - Loading, error state'leri yönetir
  - schoolId değiştiğinde otomatik refetch yapar
  - `enabled` parametresiyle hook'u aktif/pasif yapabilirsiniz

#### `use-create-appointment.ts`
- **Amaç**: Randevu oluşturmak
- **Endpoint**: `POST /appointments`
- **Request Body**:
  ```typescript
  {
    appointmentSlotId: number;     // Required
    schoolId: number;              // Required
    appointmentType: string;       // Required
    studentName: string;           // Required
    parentUserId?: number;
    isOnline?: boolean;
    studentAge?: number;
    studentBirthDate?: string;     // "YYYY-MM-DD"
    studentGender?: string;
    currentSchool?: string;
    gradeInterested?: string;
    specialRequests?: string;
    notes?: string;
  }
  ```
- **Response**: `AppointmentDto`
- **Özellikler**:
  - Success ve error callback'leri destekler
  - Loading state yönetimi
  - Created appointment data'sını döner

### 2. Güncellenen Dosyalar

#### `use-appointment-submission.ts`
- Mock API çağrısı kaldırıldı
- `useCreateAppointment` hook'u entegre edildi
- Gerçek API response'una göre success/error handling yapılıyor
- Appointment ID artık gerçek API'den geliyor

#### `date-time-step.tsx`
- Mock data (`mockSchoolAvailability`) kaldırıldı
- `useAppointmentSlots` hook'u entegre edildi
- API'den gelen `AppointmentSlotDto` tipine göre güncellendi
- Tarihe göre slotları filtreleyip gösteriyor
- Loading state'i eklendi

#### `dto-mapping-schema.ts`
- Backend API'ye uygun DTO mapping yapıldı
- Sadece gerekli alanlar gönderiliyor:
  - `appointmentSlotId`, `schoolId`, `appointmentType`, `studentName` (required)
  - Diğer alanlar optional

#### `form-data-types.ts`
- `AppointmentCreateDto` extend'i kaldırıldı
- Sadece form için gerekli alanlar tanımlandı
- Backend API'sine uygun şekilde düzenlendi

#### `initial-values-schema.ts`
- Gereksiz alanlar kaldırıldı
- Sadece kullanılan form alanları için initial values tanımlandı

#### `API_ENDPOINTS` (endpoints.ts)
- Yeni endpoint eklendi: `APPOINTMENTS.CREATE = "/appointments"`
- Endpoint düzenlemesi yapıldı (CREATE endpoint en üste alındı)

### 3. Kaldırılan Bağımlılıklar

- ✅ `mockSchoolAvailability` - Artık gerçek API'den veri geliyor
- ✅ Mock API call simulation - Gerçek API çağrıları yapılıyor
- ✅ Gereksiz DTO alanları - Sadece backend'in beklediği alanlar gönderiliyor

## Kullanım

### Slot Listesini Getirme
```typescript
const { slots, slotsLoading, slotsError, refetchSlots } = useAppointmentSlots({
  schoolId: 7,
  enabled: true,
});
```

### Randevu Oluşturma
```typescript
const { createAppointment, isCreating } = useCreateAppointment(
  (appointment) => {
    console.log("Başarılı:", appointment);
  },
  (error) => {
    console.error("Hata:", error);
  }
);

// Kullanım
createAppointment({
  appointmentSlotId: 123,
  schoolId: 7,
  appointmentType: "SCHOOL_TOUR",
  studentName: "Ahmet Yılmaz",
  studentAge: 8,
  // ... diğer alanlar
});
```

## Test Edilmesi Gerekenler

1. ✅ Slot listesi başarıyla getiriliyor mu?
2. ✅ Tarih seçimi doğru çalışıyor mu?
3. ✅ Slotlar doğru şekilde gruplandırılıyor mu?
4. ✅ Randevu oluşturma başarılı oluyor mu?
5. ✅ Error handling doğru çalışıyor mu?
6. ✅ Loading state'leri düzgün gösteriliyor mu?

## Notlar

- Backend'den gelen slot verilerinde `slotDate` field'ı `date-time` formatında
- Tarih gruplandırması `YYYY-MM-DD` formatında yapılıyor
- `selectedSlotId` artık `number` tipinde (string değil)
- Tüm API çağrıları `usePost` ve `useGet` hook'ları üzerinden yapılıyor

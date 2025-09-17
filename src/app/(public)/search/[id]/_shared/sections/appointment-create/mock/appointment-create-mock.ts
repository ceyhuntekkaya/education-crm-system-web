import { AppointmentAvailabilityDto } from "@/types/dto/appointment/AppointmentAvailabilityDto";
import { AvailableSlotDto } from "@/types/dto/appointment/AvailableSlotDto";

// Müsait randevu slotları mock data (DTO'ya uygun)
export const mockAvailableSlots: AvailableSlotDto[] = [
  {
    slotId: 1,
    startTime: "09:00",
    endTime: "10:00",
    durationMinutes: 60,
    appointmentType: "INFORMATION_MEETING",
    location: "Konferans Salonu A",
    isOnline: false,
    staffUserName: "Dr. Mehmet Özkan",
    availableCapacity: 1,
    requiresApproval: false,
    timeRange: "09:00 - 10:00",
    isRecommended: true,
  },
  {
    slotId: 2,
    startTime: "10:30",
    endTime: "11:30",
    durationMinutes: 60,
    appointmentType: "SCHOOL_TOUR",
    location: "Okul Girişi",
    isOnline: false,
    staffUserName: "Ayşe Kaya",
    availableCapacity: 5,
    requiresApproval: false,
    timeRange: "10:30 - 11:30",
    isRecommended: false,
  },
  {
    slotId: 3,
    startTime: "13:00",
    endTime: "14:00",
    durationMinutes: 60,
    appointmentType: "ENROLLMENT_INTERVIEW",
    location: "Müdür Odası",
    isOnline: false,
    staffUserName: "Prof. Dr. Ali Veli",
    availableCapacity: 1,
    requiresApproval: true,
    timeRange: "13:00 - 14:00",
    isRecommended: false,
  },
  {
    slotId: 4,
    startTime: "14:30",
    endTime: "15:30",
    durationMinutes: 60,
    appointmentType: "ONLINE_MEETING",
    location: "Online",
    isOnline: true,
    staffUserName: "Dr. Zeynep Yıldız",
    availableCapacity: 1,
    requiresApproval: false,
    timeRange: "14:30 - 15:30",
    isRecommended: true,
  },
  {
    slotId: 5,
    startTime: "16:00",
    endTime: "17:00",
    durationMinutes: 60,
    appointmentType: "CONSULTATION",
    location: "Rehberlik Servisi",
    isOnline: false,
    staffUserName: "Psik. Fatma Öztürk",
    availableCapacity: 1,
    requiresApproval: false,
    timeRange: "16:00 - 17:00",
    isRecommended: false,
  },
  {
    slotId: 6,
    startTime: "09:30",
    endTime: "10:00",
    durationMinutes: 30,
    appointmentType: "PHONE_CALL",
    location: "Telefon",
    isOnline: true,
    staffUserName: "Ahmet Kılıç",
    availableCapacity: 1,
    requiresApproval: false,
    timeRange: "09:30 - 10:00",
    isRecommended: false,
  },
  {
    slotId: 7,
    startTime: "15:00",
    endTime: "16:30",
    durationMinutes: 90,
    appointmentType: "GROUP_MEETING",
    location: "Toplantı Salonu B",
    isOnline: false,
    staffUserName: "Dr. Selin Akar",
    availableCapacity: 10,
    requiresApproval: true,
    timeRange: "15:00 - 16:30",
    isRecommended: true,
  },
  {
    slotId: 8,
    startTime: "11:00",
    endTime: "12:00",
    durationMinutes: 60,
    appointmentType: "OTHER",
    location: "Müdür Yardımcısı Odası",
    isOnline: false,
    staffUserName: "Murat Demir",
    availableCapacity: 1,
    requiresApproval: true,
    timeRange: "11:00 - 12:00",
    isRecommended: false,
  },
];

// UI için timeRange helper function artık kullanılmıyor (DTO'da mevcut)
// Eski kullanım için backward compatibility
export const getTimeRange = (slot: AvailableSlotDto): string => {
  return slot.timeRange || `${slot.startTime} - ${slot.endTime}`;
};

// Okul müsaitlik bilgisi mock data
export const mockSchoolAvailability: AppointmentAvailabilityDto[] = [
  {
    schoolId: 1,
    schoolName: "Bahçeşehir Koleji",
    date: "2024-12-20",
    availableSlots: mockAvailableSlots,
    totalSlots: 10,
    bookedSlots: 2,
    availableCount: 8,
    availability: "AVAILABLE",
  },
  {
    schoolId: 1,
    schoolName: "Bahçeşehir Koleji",
    date: "2024-12-21",
    availableSlots: mockAvailableSlots.slice(0, 3), // Daha az slot
    totalSlots: 8,
    bookedSlots: 5,
    availableCount: 3,
    availability: "LIMITED",
  },
  {
    schoolId: 1,
    schoolName: "Bahçeşehir Koleji",
    date: "2024-12-22",
    availableSlots: [],
    totalSlots: 6,
    bookedSlots: 6,
    availableCount: 0,
    availability: "FULLY_BOOKED",
  },
];

// Randevu türleri seçenekleri (UI için ek bilgiler - DTO dışı)
export const appointmentTypeOptions = [
  {
    value: "INFORMATION_MEETING",
    label: "Bilgilendirme Toplantısı",
    description: "Okul hakkında genel bilgi almak için",
    icon: "ph-info",
    duration: 60,
  },
  {
    value: "SCHOOL_TOUR",
    label: "Okul Turu",
    description: "Okul binalarını gezmek için",
    icon: "ph-map-pin",
    duration: 90,
  },
  {
    value: "ENROLLMENT_INTERVIEW",
    label: "Kayıt Görüşmesi",
    description: "Öğrenci kaydı için görüşme",
    icon: "ph-user-plus",
    duration: 45,
  },
  {
    value: "PARENT_MEETING",
    label: "Veli Toplantısı",
    description: "Veli ile özel görüşme",
    icon: "ph-users",
    duration: 30,
  },
  {
    value: "CONSULTATION",
    label: "Danışmanlık",
    description: "Eğitim danışmanlığı",
    icon: "ph-chat-circle",
    duration: 45,
  },
  {
    value: "ASSESSMENT",
    label: "Değerlendirme",
    description: "Öğrenci değerlendirmesi",
    icon: "ph-clipboard-text",
    duration: 90,
  },
  {
    value: "ORIENTATION",
    label: "Oryantasyon",
    description: "Okula uyum programı",
    icon: "ph-compass",
    duration: 120,
  },
  {
    value: "ONLINE_MEETING",
    label: "Online Görüşme",
    description: "Online toplantı",
    icon: "ph-video-camera",
    duration: 60,
  },
  {
    value: "PHONE_CALL",
    label: "Telefon Görüşmesi",
    description: "Telefon ile görüşme",
    icon: "ph-phone",
    duration: 30,
  },
  {
    value: "GROUP_MEETING",
    label: "Grup Toplantısı",
    description: "Birden fazla ailenin katıldığı toplantı",
    icon: "ph-users-three",
    duration: 90,
  },
  {
    value: "OTHER",
    label: "Diğer",
    description: "Özel amaçlı randevu",
    icon: "ph-dots-three",
    duration: 60,
  },
];

// DTO'ya uygun randevu türleri (sadece value'lar)
export const validAppointmentTypes = appointmentTypeOptions.map(
  (option) => option.value
);

// Müsaitlik durumu seçenekleri (AppointmentAvailabilityDto.availability için)
export const availabilityStatuses = [
  "FULLY_BOOKED",
  "LIMITED",
  "AVAILABLE",
  "ABUNDANT",
] as const;

export type AvailabilityStatus = (typeof availabilityStatuses)[number];

// Form validasyon mesajları
export const validationMessages = {
  appointmentType: "Lütfen randevu türünü seçiniz",
  appointmentDate: "Lütfen randevu tarihini seçiniz",
  timeSlot: "Lütfen uygun saat dilimini seçiniz",
  parentName: "Veli adı soyadı zorunludur",
  parentEmail: "Geçerli bir e-posta adresi giriniz",
  parentPhone: "Telefon numarası zorunludur",
  studentName: "Öğrenci adı soyadı zorunludur",
  studentAge: "Öğrenci yaşı zorunludur",
  gradeInterested: "İlgilenilen sınıf bilgisi zorunludur",
};

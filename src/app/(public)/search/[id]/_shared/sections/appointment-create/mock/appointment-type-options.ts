// Randevu türleri seçenekleri (UI için ek bilgiler - DTO dışı)
export const appointmentTypeOptions = [
  {
    value: "INFORMATION_MEETING",
    label: "Bilgilendirme Toplantısı",
    description: "Okul hakkında genel bilgi almak için detaylı sunum",
    icon: "ph-presentation-chart",
    duration: 60,
  },
  {
    value: "SCHOOL_TOUR",
    label: "Okul Turu",
    description: "Kampüs ve eğitim alanlarını keşfetme gezisi",
    icon: "ph-buildings",
    duration: 90,
  },
  {
    value: "ENROLLMENT_INTERVIEW",
    label: "Kayıt Görüşmesi",
    description: "Öğrenci kabulü için birebir değerlendirme",
    icon: "ph-student",
    duration: 45,
  },
  {
    value: "PARENT_MEETING",
    label: "Veli Toplantısı",
    description: "Aile ile eğitim süreci hakkında konuşma",
    icon: "ph-handshake",
    duration: 30,
  },
  {
    value: "CONSULTATION",
    label: "Eğitim Danışmanlığı",
    description: "Akademik rehberlik ve yönlendirme hizmeti",
    icon: "ph-lightbulb",
    duration: 45,
  },
  {
    value: "ASSESSMENT",
    label: "Seviye Değerlendirmesi",
    description: "Öğrenci beceri ve yetenek ölçümü",
    icon: "ph-exam",
    duration: 90,
  },
  {
    value: "ORIENTATION",
    label: "Oryantasyon Programı",
    description: "Yeni öğrenciler için uyum ve tanışma",
    icon: "ph-rocket-launch",
    duration: 120,
  },
  {
    value: "ONLINE_MEETING",
    label: "Online Görüşme",
    description: "Uzaktan video konferans ile meeting",
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

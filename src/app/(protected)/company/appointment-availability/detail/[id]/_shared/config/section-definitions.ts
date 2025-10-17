import { SectionConfig } from "../types";
import { basicInfoConfig } from "./basic-info-config";
import { dateTimeConfig } from "./datetime-config";
import { studentConfig } from "./student-config";
import { parentConfig } from "./parent-config";
import { staffConfig } from "./staff-config";
import { meetingInfoConfig } from "./meeting-info-config";
import { outcomeConfig } from "./outcome-config";
import { cancellationConfig } from "./cancellation-config";
import { notesConfig } from "./notes-config";
import { participantsDetailConfig } from "./participants-detail-config";
import { appointmentNotesConfig } from "./appointment-notes-config";

/**
 * Tüm appointment section konfigürasyonlarını tanımlar
 */
export const APPOINTMENT_SECTIONS: SectionConfig[] = [
  // 1. ÖĞRENCİ BİLGİLERİ
  {
    title: "Öğrenci Bilgileri",
    titleColor: "text-success-600",
    titleIcon: "ph-bold ph-student",
    config: studentConfig,
  },

  // 2. VELİ BİLGİLERİ
  {
    title: "Veli Bilgileri",
    titleColor: "text-info-600",
    titleIcon: "ph-bold ph-user",
    config: parentConfig,
  },

  // 3. TEMEL BİLGİLER
  {
    title: "Temel Bilgiler",
    titleColor: "text-primary-600",
    titleIcon: "ph-bold ph-info",
    config: basicInfoConfig,
  },

  // 4. PERSONEL BİLGİLERİ
  {
    title: "Personel Bilgileri",
    titleColor: "text-primary-600",
    titleIcon: "ph-bold ph-user-circle",
    config: staffConfig,
  },

  // 5. TARİH VE SAAT BİLGİLERİ
  {
    title: "Tarih ve Saat Bilgileri",
    titleColor: "text-secondary-600",
    titleIcon: "ph-bold ph-calendar",
    config: dateTimeConfig,
  },

  // 6. TOPLANTI BİLGİLERİ
  {
    title: "Toplantı Bilgileri",
    titleColor: "text-success-600",
    titleIcon: "ph-bold ph-video-camera",
    config: meetingInfoConfig,
  },

  // 7. SONUÇ VE TAKİP
  {
    title: "Sonuç ve Takip",
    titleColor: "text-warning-600",
    titleIcon: "ph-bold ph-target",
    config: outcomeConfig,
  },

  // 8. İPTAL/ERTELEME BİLGİLERİ
  {
    title: "İptal/Erteleme Bilgileri",
    titleColor: "text-danger-600",
    titleIcon: "ph-bold ph-x-circle",
    config: cancellationConfig,
  },

  // 9. NOTLAR
  {
    title: "Notlar ve Özel İstekler",
    titleColor: "text-muted-600",
    titleIcon: "ph-bold ph-note",
    config: notesConfig,
  },

  // 10. KATILIMCI DETAYLARI
  {
    title: "Katılımcı Detayları",
    titleColor: "text-purple-600",
    titleIcon: "ph-bold ph-users-three",
    config: participantsDetailConfig,
  },

  // 11. RANDEVU NOTLARI
  {
    title: "Randevu Notları",
    titleColor: "text-indigo-600",
    titleIcon: "ph-bold ph-notebook",
    config: appointmentNotesConfig,
  },
];

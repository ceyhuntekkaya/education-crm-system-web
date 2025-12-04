import { SectionConfig } from "../types";
import { messageInfoConfig } from "./message-info-config";
import { senderInfoConfig } from "./sender-info-config";
import { messageContentConfig } from "./message-content-config";
import { studentInfoConfig } from "./student-info-config";
import { responseInfoConfig } from "./response-info-config";
import { followUpConfig } from "./follow-up-config";
import { trackingInfoConfig } from "./tracking-info-config";
import { assignmentInfoConfig } from "./assignment-info-config";
import {
  getSortedContentConfigs,
  getContentConfigsByType,
} from "./content-display-configs";

/**
 * Tüm section konfigürasyonlarını tanımlar
 * Mantıklı sıralama: Mesaj → İçerik → Kişiler → Süreç → Teknik
 */
export const MESSAGE_SECTIONS: SectionConfig[] = [
  // 1. MESAJ BİLGİLERİ - Mesaj temel bilgileri (konu, tür, öncelik, durum)
  {
    title: "Mesaj Bilgileri",
    titleColor: "text-primary-600",
    titleIcon: "ph-bold ph-envelope",
    config: messageInfoConfig,
  },

  // 2. MESAJ İÇERİĞİ - Gelişmiş içerik gösterimi (dinamik config)
  {
    title: "İçerik ve Detaylar",
    titleColor: "text-success-600",
    titleIcon: "ph-bold ph-text-align-left",
    config: (message) => getSortedContentConfigs(message),
  },

  // 3. GÖNDEREN BİLGİLERİ - Kim göndermiş, iletişim bilgileri
  {
    title: "Gönderen Bilgileri",
    titleColor: "text-info-600",
    titleIcon: "ph-bold ph-user",
    config: senderInfoConfig,
  },

  // 4. ÖĞRENCİ BİLGİLERİ - Öğrenci ve kayıt detayları (varsa)
  {
    title: "Öğrenci Bilgileri",
    titleColor: "text-warning-600",
    titleIcon: "ph-bold ph-student",
    config: studentInfoConfig,
  },

  // 5. ATAMA VE Kurum BİLGİLERİ - Hangi Kurum, kim sorumlu
  {
    title: "Atama ve Kurum Bilgileri",
    titleColor: "text-orange-600",
    titleIcon: "ph-bold ph-buildings",
    config: assignmentInfoConfig,
  },

  // 6. YANIT VE ÇÖZÜM BİLGİLERİ - Süreç takibi (okunma, yanıt, çözüm)
  {
    title: "Yanıt ve Çözüm Bilgileri",
    titleColor: "text-purple-600",
    titleIcon: "ph-bold ph-clock-counter-clockwise",
    config: responseInfoConfig,
  },

  // 7. TAKİP BİLGİLERİ - Takip gerekliliği ve süreç yönetimi
  {
    title: "Takip Bilgileri",
    titleColor: "text-pink-600",
    titleIcon: "ph-bold ph-bell",
    config: (message) =>
      followUpConfig.filter(
        (item) =>
          ![
            "Memnuniyet Yorumu",
            "Memnuniyet Puanı",
            "Memnuniyet Tarihi",
          ].includes(item.label)
      ),
  },

  // 8. İZLEME VE KAYNAK BİLGİLERİ - Teknik detaylar (UTM, IP, browser)
  {
    title: "İzleme ve Kaynak Bilgileri",
    titleColor: "text-cyan-600",
    titleIcon: "ph-bold ph-chart-line-up",
    config: trackingInfoConfig,
  },

  // 9. ÖZEL İÇERİK GÖSTERİMLERİ - Farklı display tipleri örneği
  {
    title: "Vurgulu İçerikler",
    titleColor: "text-indigo-600",
    titleIcon: "ph-bold ph-star-four",
    config: (message) => getContentConfigsByType(message, "highlight"),
  },

  // 10. ZENGIN İÇERİK GÖSTERİMLERİ - Rich content display
  {
    title: "Detaylı Değerlendirmeler",
    titleColor: "text-violet-600",
    titleIcon: "ph-bold ph-medal",
    config: (message) => getContentConfigsByType(message, "rich"),
  },
];

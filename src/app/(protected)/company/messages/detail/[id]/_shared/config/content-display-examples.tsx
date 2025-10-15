import { MessageDto } from "@/types/dto/content/MessageDto";
import { ContentDisplayConfig } from "./content-display-configs";
import {
  createContentDisplayConfig,
  createMultiFieldContentConfig,
  createConditionalContentConfig,
  commonContentConfigs,
} from "../utils/content-display-utils";

/**
 * Örnek kullanım: Farklı content display konfigürasyonları
 * Bu dosya, farklı içerik tiplerini nasıl gösterebileceğinizi örnekler
 */

/**
 * Basit örnek konfigürasyonlar
 */
export const exampleSimpleConfigs: ContentDisplayConfig[] = [
  // Basit metin gösterimi
  commonContentConfigs.simpleText("Konu", "subject", 1),

  // Vurgulu içerik gösterimi
  commonContentConfigs.highlightedContent("İç Notlar", "internalNotes", 2),

  // Kart şeklinde gösterim
  commonContentConfigs.cardContent("Mesaj İçeriği", "content", 3),

  // Tarih gösterimi
  commonContentConfigs.dateDisplay("Oluşturma Tarihi", "createdAt", 4),

  // Badge gösterimi
  commonContentConfigs.badgeStatus("Durum", "status", 5),
];

/**
 * Gelişmiş örnek konfigürasyonlar
 */
export const exampleAdvancedConfigs: ContentDisplayConfig[] = [
  // Çoklu alan gösterimi - Gönderen bilgileri
  createMultiFieldContentConfig(
    "Gönderen Detayları",
    ["senderName", "senderEmail", "senderPhone"],
    "card",
    1,
    (message, [name, email, phone]) => (
      <div className="p-4 bg-info-25 rounded-12 border border-info-200">
        <div className="d-flex align-items-center mb-3">
          <i className="ph ph-user text-info-600 fs-5 me-2"></i>
          <h6 className="text-info-700 mb-0 fw-semibold">Gönderen Detayları</h6>
        </div>
        <div className="row g-2">
          {name && (
            <div className="col-12">
              <small className="text-info-600">Ad Soyad:</small>
              <div className="fw-medium">{name}</div>
            </div>
          )}
          {email && (
            <div className="col-12">
              <small className="text-info-600">E-posta:</small>
              <div className="fw-medium">{email}</div>
            </div>
          )}
          {phone && (
            <div className="col-12">
              <small className="text-info-600">Telefon:</small>
              <div className="fw-medium">{phone}</div>
            </div>
          )}
        </div>
      </div>
    )
  ),

  // Koşullu gösterim - Acil mesajlar için özel görünüm
  createConditionalContentConfig(
    "Acil Mesaj Uyarısı",
    (message) =>
      message.priority === "URGENT" || message.priority === "CRITICAL",
    (message) => (
      <div className="p-4 bg-danger-25 rounded-12 border border-danger-200 shadow-sm">
        <div className="d-flex align-items-center mb-3">
          <i className="ph ph-warning text-danger-600 fs-4 me-2"></i>
          <h6 className="text-danger-700 mb-0 fw-bold">ACİL MESAJ</h6>
          <span className="badge bg-danger-500 text-white ms-2 pulse">
            {message.priority}
          </span>
        </div>
        <div className="fw-medium text-danger-700">
          Bu mesaj acil öncelikli olarak işaretlenmiştir ve hemen müdahale
          gerektirir.
        </div>
        {message.content && (
          <div className="mt-3 p-3 bg-white rounded-8 border">
            <div style={{ whiteSpace: "pre-wrap" }}>{message.content}</div>
          </div>
        )}
      </div>
    ),
    "highlight",
    0 // En yüksek öncelik
  ),

  // Özel renderer ile memnuniyet puanı
  createContentDisplayConfig(
    "Memnuniyet Değerlendirmesi",
    "satisfactionRating",
    "rich",
    2,
    (message) => {
      const rating = message.satisfactionRating;
      if (!rating) return null;

      const getColorClass = (rating: number) => {
        if (rating >= 4) return "success";
        if (rating >= 3) return "warning";
        return "danger";
      };

      const colorClass = getColorClass(rating);

      return (
        <div
          className={`p-4 bg-${colorClass}-25 rounded-12 border border-${colorClass}-200`}
        >
          <div className="d-flex align-items-center justify-content-between mb-3">
            <div className="d-flex align-items-center">
              <i
                className={`ph ph-star-fill text-${colorClass}-600 fs-4 me-2`}
              ></i>
              <h6 className={`text-${colorClass}-700 mb-0 fw-semibold`}>
                Memnuniyet Değerlendirmesi
              </h6>
            </div>
            <div className="d-flex align-items-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <i
                  key={star}
                  className={`ph ${
                    star <= rating ? "ph-star-fill" : "ph-star"
                  } ${
                    star <= rating ? "text-warning-500" : "text-neutral-300"
                  } fs-5 me-1`}
                ></i>
              ))}
            </div>
          </div>
          <div className="text-center">
            <div className={`display-6 fw-bold text-${colorClass}-600 mb-2`}>
              {rating}/5
            </div>
            <div
              className={`badge bg-${colorClass}-500 text-white px-3 py-2 rounded-pill`}
            >
              {rating >= 4
                ? "Mükemmel"
                : rating >= 3
                ? "İyi"
                : "Geliştirilmeli"}
            </div>
          </div>
          {message.satisfactionFeedback && (
            <div className="mt-3 p-3 bg-white rounded-8">
              <small className={`text-${colorClass}-600 fw-medium`}>
                Yorum:
              </small>
              <div className="mt-1" style={{ whiteSpace: "pre-wrap" }}>
                {message.satisfactionFeedback}
              </div>
            </div>
          )}
        </div>
      );
    }
  ),
];

/**
 * Tema bazlı konfigürasyonlar
 */
export const themedConfigs = {
  // Minimal tema
  minimal: [
    commonContentConfigs.simpleText("Konu", "subject", 1),
    commonContentConfigs.simpleText("Durum", "status", 2),
    commonContentConfigs.dateDisplay("Tarih", "createdAt", 3),
  ],

  // Kart tema
  card: [
    commonContentConfigs.cardContent("İçerik", "content", 1),
    commonContentConfigs.cardContent("İç Notlar", "internalNotes", 2),
    commonContentConfigs.cardContent("Takip Notları", "followUpNotes", 3),
  ],

  // Vurgulu tema
  highlight: [
    commonContentConfigs.highlightedContent("Önemli İçerik", "content", 1),
    commonContentConfigs.highlightedContent(
      "Kritik Notlar",
      "internalNotes",
      2
    ),
  ],

  // Zengin tema
  rich: [
    commonContentConfigs.richContent("Ana İçerik", "content", 1),
    ...exampleAdvancedConfigs,
  ],
};

/**
 * Kullanım örnekleri export'u
 */
export const contentDisplayExamples = {
  simple: exampleSimpleConfigs,
  advanced: exampleAdvancedConfigs,
  themed: themedConfigs,
};

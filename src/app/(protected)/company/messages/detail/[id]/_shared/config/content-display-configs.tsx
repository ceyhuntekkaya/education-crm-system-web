import React from "react";
import { MessageDto } from "@/types/dto/content/MessageDto";
import type { ConfigItem } from "../types";

/**
 * Farklı içerik tiplerini göstermek için özelleştirilmiş display konfigürasyonları
 * Her bir content type için farklı görüntüleme stilleri
 */

export interface ContentDisplayConfig extends ConfigItem {
  displayType: "default" | "card" | "highlight" | "minimal" | "rich";
  priority: number; // Gösterim önceliği (düşük sayı = yüksek öncelik)
}

/**
 * Mesaj içeriği için farklı display varyasyonları
 */
export const messageContentDisplayConfigs: ContentDisplayConfig[] = [
  // Ana mesaj içeriği - Card style
  {
    label: "Mesaj İçeriği",
    displayType: "card",
    priority: 1,
    value: (message: MessageDto) => (
      <div className="p-4 bg-primary-25 rounded-12 border border-primary-200 shadow-sm">
        <div className="d-flex align-items-center mb-3">
          <i className="ph ph-text-align-left text-primary-600 fs-5 me-2"></i>
          <h6 className="text-primary-700 mb-0 fw-semibold">Mesaj İçeriği</h6>
        </div>
        <div
          className="content-text mb-0"
          style={{ whiteSpace: "pre-wrap", lineHeight: "1.6" }}
        >
          {message?.content || "İçerik belirtilmemiş"}
        </div>
        {message?.tags && (
          <div className="mt-3 pt-3 border-top border-primary-200">
            <div className="d-flex align-items-center mb-2">
              <i className="ph ph-tag text-primary-600 me-2"></i>
              <small className="text-primary-600 fw-medium">Etiketler:</small>
            </div>
            <div className="d-flex flex-wrap gap-1">
              {message.tags.split(",").map((tag, index) => (
                <span
                  key={index}
                  className="badge bg-primary-100 text-primary-700 fw-normal px-2 py-1"
                >
                  {tag.trim()}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    ),
    isShowing: (message: MessageDto) => !!message?.content,
  },

  // İç notlar - Warning/Alert style
  {
    label: "İç Notlar",
    displayType: "highlight",
    priority: 2,
    value: (message: MessageDto) => (
      <div className="p-4 bg-warning-25 rounded-12 border border-warning-200 shadow-sm">
        <div className="d-flex align-items-center justify-content-between mb-3">
          <div className="d-flex align-items-center">
            <i className="ph ph-note text-warning-600 fs-5 me-2"></i>
            <h6 className="text-warning-700 mb-0 fw-semibold">İç Notlar</h6>
          </div>
          <span className="badge bg-warning-500 text-white px-2 py-1 rounded-pill fw-medium">
            <i className="ph ph-lock-simple me-1"></i>
            Dahili
          </span>
        </div>
        <div
          className="content-text mb-0"
          style={{ whiteSpace: "pre-wrap", lineHeight: "1.6" }}
        >
          {message?.internalNotes || "Not bulunmuyor"}
        </div>
      </div>
    ),
    isShowing: (message: MessageDto) => !!message?.internalNotes,
  },

  // Memnuniyet yorumu - Success/Feedback style
  {
    label: "Memnuniyet Yorumu",
    displayType: "rich",
    priority: 3,
    value: (message: MessageDto) => (
      <div className="p-4 bg-success-25 rounded-12 border border-success-200 shadow-sm">
        <div className="d-flex align-items-center justify-content-between mb-3">
          <div className="d-flex align-items-center">
            <i className="ph ph-chat-text text-success-600 fs-5 me-2"></i>
            <h6 className="text-success-700 mb-0 fw-semibold">
              Memnuniyet Yorumu
            </h6>
          </div>
          {message?.satisfactionRating && (
            <div className="d-flex align-items-center gap-2">
              <div className="d-flex align-items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <i
                    key={star}
                    className={`ph ${
                      star <= (message.satisfactionRating || 0)
                        ? "ph-star-fill"
                        : "ph-star"
                    } text-warning-500`}
                    style={{ fontSize: "0.9rem" }}
                  ></i>
                ))}
              </div>
              <span className="badge bg-success-500 text-white px-2 py-1 fw-medium">
                {message.satisfactionRating}/5
              </span>
            </div>
          )}
        </div>
        <div
          className="content-text mb-0"
          style={{ whiteSpace: "pre-wrap", lineHeight: "1.6" }}
        >
          {message?.satisfactionFeedback || "Memnuniyet yorumu bulunmuyor"}
        </div>
        {message?.satisfactionDate && (
          <div className="mt-3 pt-3 border-top border-success-200">
            <div className="d-flex align-items-center text-success-600">
              <i className="ph ph-calendar-check me-2"></i>
              <small className="fw-medium">
                Değerlendirme Tarihi:{" "}
                {new Date(message.satisfactionDate).toLocaleString("tr-TR")}
              </small>
            </div>
          </div>
        )}
      </div>
    ),
    isShowing: (message: MessageDto) => !!message?.satisfactionFeedback,
  },

  // Takip notları - Info style
  {
    label: "Takip Notları",
    displayType: "card",
    priority: 4,
    value: (message: MessageDto) => (
      <div className="p-4 bg-info-25 rounded-12 border border-info-200 shadow-sm">
        <div className="d-flex align-items-center justify-content-between mb-3">
          <div className="d-flex align-items-center">
            <i className="ph ph-bell text-info-600 fs-5 me-2"></i>
            <h6 className="text-info-700 mb-0 fw-semibold">Takip Notları</h6>
          </div>
          {message?.followUpRequired && (
            <span className="badge bg-info-500 text-white px-2 py-1 rounded-pill fw-medium">
              <i className="ph ph-warning me-1"></i>
              Takip Gerekli
            </span>
          )}
        </div>
        <div
          className="content-text mb-0"
          style={{ whiteSpace: "pre-wrap", lineHeight: "1.6" }}
        >
          {message?.followUpNotes || "Takip notu bulunmuyor"}
        </div>
        {message?.followUpDate && (
          <div className="mt-3 pt-3 border-top border-info-200">
            <div className="d-flex align-items-center text-info-600">
              <i className="ph ph-calendar-dots me-2"></i>
              <small className="fw-medium">
                Takip Tarihi:{" "}
                {new Date(message.followUpDate).toLocaleString("tr-TR")}
              </small>
            </div>
          </div>
        )}
      </div>
    ),
    isShowing: (message: MessageDto) => !!message?.followUpNotes,
  },

  // Ek bilgiler - Düzgün minimal style
  {
    label: "Ek Bilgiler",
    displayType: "minimal",
    priority: 5,
    value: (message: MessageDto) => (
      <div className="p-4 bg-neutral-25 rounded-12 border border-neutral-200 shadow-sm">
        <div className="d-flex align-items-center mb-3">
          <i className="ph ph-info text-neutral-600 fs-5 me-2"></i>
          <h6 className="text-neutral-700 mb-0 fw-semibold">Ek Bilgiler</h6>
        </div>
        <div className="d-flex flex-column gap-3">
          {message?.referenceNumber && (
            <div className="d-flex justify-content-between align-items-center p-2 bg-white rounded-8 border">
              <div className="d-flex align-items-center">
                <i className="ph ph-hash text-neutral-500 me-2"></i>
                <span className="text-neutral-600 fw-medium">Referans No:</span>
              </div>
              <span className="badge bg-neutral-100 text-neutral-700 font-monospace">
                {message.referenceNumber}
              </span>
            </div>
          )}
          {message?.hasAttachments && (
            <div className="d-flex justify-content-between align-items-center p-2 bg-white rounded-8 border">
              <div className="d-flex align-items-center">
                <i className="ph ph-paperclip text-neutral-500 me-2"></i>
                <span className="text-neutral-600 fw-medium">Ek Dosyalar:</span>
              </div>
              <span className="badge bg-success-100 text-success-700 fw-medium">
                <i className="ph ph-check me-1"></i>
                Mevcut
              </span>
            </div>
          )}
        </div>
      </div>
    ),
    isShowing: (message: MessageDto) =>
      !!(message?.referenceNumber || message?.hasAttachments),
  },
];

/**
 * Content display configs'i önceliğe göre sıralar
 */
export const getSortedContentConfigs = (
  message: MessageDto
): ContentDisplayConfig[] => {
  return messageContentDisplayConfigs
    .filter((config) => config.isShowing(message))
    .sort((a, b) => a.priority - b.priority);
};

/**
 * Belirli bir display type'a göre configs'i filtreler
 */
export const getContentConfigsByType = (
  message: MessageDto,
  displayType: ContentDisplayConfig["displayType"]
): ContentDisplayConfig[] => {
  return messageContentDisplayConfigs
    .filter(
      (config) =>
        config.isShowing(message) && config.displayType === displayType
    )
    .sort((a, b) => a.priority - b.priority);
};

import { MessageDto } from "@/types/dto/content/MessageDto";
import { ContentDisplayConfig } from "../config/content-display-configs";
import React from "react";

/**
 * İçerik görüntüleme yardımcı fonksiyonları
 * Farklı içerik tiplerini farklı şekillerde göstermek için kullanılır
 */

/**
 * Kolay content display config oluşturma fonksiyonu
 */
export const createContentDisplayConfig = (
  label: string,
  field: keyof MessageDto,
  displayType: ContentDisplayConfig["displayType"] = "default",
  priority: number = 10,
  customRenderer?: (message: MessageDto) => React.ReactNode
): ContentDisplayConfig => {
  const defaultRenderers = {
    default: (message: MessageDto) => (
      <div className="p-3 bg-neutral-25 rounded-8 border">
        <div className="fw-medium mb-2">{label}</div>
        <div style={{ whiteSpace: "pre-wrap" }}>
          {String(message[field] || "Belirtilmemiş")}
        </div>
      </div>
    ),
    card: (message: MessageDto) => (
      <div className="p-4 bg-white rounded-12 border shadow-sm">
        <div className="d-flex align-items-center mb-3">
          <i className="ph ph-info text-primary-600 fs-5 me-2"></i>
          <h6 className="text-primary-700 mb-0 fw-semibold">{label}</h6>
        </div>
        <div style={{ whiteSpace: "pre-wrap", lineHeight: "1.6" }}>
          {String(message[field] || "Belirtilmemiş")}
        </div>
      </div>
    ),
    highlight: (message: MessageDto) => (
      <div className="p-4 bg-warning-25 rounded-12 border border-warning-200">
        <div className="d-flex align-items-center mb-3">
          <i className="ph ph-star text-warning-600 fs-5 me-2"></i>
          <h6 className="text-warning-700 mb-0 fw-semibold">{label}</h6>
        </div>
        <div style={{ whiteSpace: "pre-wrap", lineHeight: "1.6" }}>
          {String(message[field] || "Belirtilmemiş")}
        </div>
      </div>
    ),
    minimal: (message: MessageDto) => (
      <div className="d-flex align-items-center">
        <span className="text-neutral-600 me-2">{label}:</span>
        <span className="fw-medium">
          {String(message[field] || "Belirtilmemiş")}
        </span>
      </div>
    ),
    rich: (message: MessageDto) => (
      <div className="p-4 bg-gradient-primary-subtle rounded-12 border shadow-sm">
        <div className="d-flex align-items-center mb-3">
          <i className="ph ph-crown text-primary-600 fs-5 me-2"></i>
          <h6 className="text-primary-700 mb-0 fw-semibold">{label}</h6>
        </div>
        <div
          className="content-rich"
          style={{ whiteSpace: "pre-wrap", lineHeight: "1.8" }}
        >
          {String(message[field] || "Belirtilmemiş")}
        </div>
      </div>
    ),
  };

  return {
    label,
    displayType,
    priority,
    value: customRenderer || defaultRenderers[displayType],
    isShowing: (message: MessageDto) => !!message[field],
  };
};

/**
 * Çoklu alan için content display config oluşturma
 */
export const createMultiFieldContentConfig = (
  label: string,
  fields: (keyof MessageDto)[],
  displayType: ContentDisplayConfig["displayType"] = "default",
  priority: number = 10,
  renderer: (message: MessageDto, values: any[]) => React.ReactNode
): ContentDisplayConfig => {
  return {
    label,
    displayType,
    priority,
    value: (message: MessageDto) => {
      const values = fields.map((field) => message[field]);
      return renderer(message, values);
    },
    isShowing: (message: MessageDto) =>
      fields.some((field) => !!message[field]),
  };
};

/**
 * Koşullu content display config oluşturma
 */
export const createConditionalContentConfig = (
  label: string,
  condition: (message: MessageDto) => boolean,
  renderer: (message: MessageDto) => React.ReactNode,
  displayType: ContentDisplayConfig["displayType"] = "default",
  priority: number = 10
): ContentDisplayConfig => {
  return {
    label,
    displayType,
    priority,
    value: renderer,
    isShowing: condition,
  };
};

/**
 * Önceden tanımlanmış yaygın content display configs
 */
export const commonContentConfigs = {
  /**
   * Basit metin içerik gösterimi
   */
  simpleText: (label: string, field: keyof MessageDto, priority: number = 10) =>
    createContentDisplayConfig(label, field, "minimal", priority),

  /**
   * Vurgulu önemli içerik gösterimi
   */
  highlightedContent: (
    label: string,
    field: keyof MessageDto,
    priority: number = 10
  ) => createContentDisplayConfig(label, field, "highlight", priority),

  /**
   * Kart şeklinde içerik gösterimi
   */
  cardContent: (
    label: string,
    field: keyof MessageDto,
    priority: number = 10
  ) => createContentDisplayConfig(label, field, "card", priority),

  /**
   * Zengin içerik gösterimi
   */
  richContent: (
    label: string,
    field: keyof MessageDto,
    priority: number = 10
  ) => createContentDisplayConfig(label, field, "rich", priority),

  /**
   * Tarih bilgisi gösterimi
   */
  dateDisplay: (
    label: string,
    field: keyof MessageDto,
    priority: number = 10
  ) =>
    createContentDisplayConfig(
      label,
      field,
      "minimal",
      priority,
      (message: MessageDto) => (
        <div className="d-flex align-items-center">
          <i className="ph ph-calendar text-info-600 me-2"></i>
          <span className="text-neutral-600 me-2">{label}:</span>
          <span className="fw-medium">
            {message[field]
              ? new Date(message[field] as string).toLocaleString("tr-TR")
              : "Belirtilmemiş"}
          </span>
        </div>
      )
    ),

  /**
   * Badge şeklinde durum gösterimi
   */
  badgeStatus: (
    label: string,
    field: keyof MessageDto,
    priority: number = 10
  ) =>
    createContentDisplayConfig(
      label,
      field,
      "minimal",
      priority,
      (message: MessageDto) => (
        <div className="d-flex align-items-center">
          <span className="text-neutral-600 me-2">{label}:</span>
          <span className="badge bg-info-100 text-info-700 fw-medium">
            {String(message[field] || "Belirtilmemiş")}
          </span>
        </div>
      )
    ),
};

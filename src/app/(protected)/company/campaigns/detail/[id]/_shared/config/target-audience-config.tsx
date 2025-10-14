import React from "react";
import type { TargetAudienceItemConfig } from "../types";
import {
  formatBoolean,
  translateGenderType,
  translateEducationLevel,
  translateIncomeLevel,
} from "../utils";

const translateTargetAudience = (audience?: string): string => {
  switch (audience) {
    case "ALL":
      return "Herkesi";
    case "NEW_STUDENTS":
      return "Yeni Öğrenciler";
    case "EXISTING_STUDENTS":
      return "Mevcut Öğrenciler";
    case "SIBLINGS":
      return "Kardeşler";
    case "EARLY_REGISTRANTS":
      return "Erken Kayıtlar";
    case "LOCAL_RESIDENTS":
      return "Yerel Sakinler";
    case "REFERRALS":
      return "Tavsiye Edilenler";
    case "VIP_MEMBERS":
      return "VIP Üyeler";
    case "SPECIFIC_GRADES":
      return "Belirli Sınıflar";
    case "SPECIFIC_AGES":
      return "Belirli Yaşlar";
    case "LOYALTY_MEMBERS":
      return "Sadakat Üyeleri";
    case "FIRST_TIME_VISITORS":
      return "İlk Kez Gelenler";
    default:
      return audience || "Belirtilmemiş";
  }
};

/**
 * Hedef kitle bilgileri konfigürasyonu
 */
export const targetAudienceConfig: TargetAudienceItemConfig[] = [
  {
    label: "Hedef Kitle",
    value: (campaign) => (
      <span className="badge bg-info-subtle text-info fw-semibold">
        {translateTargetAudience(campaign?.targetAudience)}
      </span>
    ),
    isShowing: (campaign) => !!campaign?.targetAudience,
  },
  {
    label: "Hedef Sınıf Seviyeleri",
    value: (campaign) => (
      <span className="text-warning-600 fw-semibold">
        {campaign?.targetGradeLevels}
      </span>
    ),
    isShowing: (campaign) => !!campaign?.targetGradeLevels,
  },
  {
    label: "Yaş Aralığı",
    value: (campaign) => (
      <span className="text-secondary-600 fw-semibold">
        {campaign?.targetAgeMin && campaign?.targetAgeMax
          ? `${campaign.targetAgeMin} - ${campaign.targetAgeMax} yaş`
          : campaign?.targetAgeMin
          ? `${campaign.targetAgeMin} yaş ve üzeri`
          : campaign?.targetAgeMax
          ? `${campaign.targetAgeMax} yaş ve altı`
          : "Belirtilmemiş"}
      </span>
    ),
    isShowing: (campaign) =>
      !!(campaign?.targetAgeMin || campaign?.targetAgeMax),
  },
  {
    label: "Sadece Yeni Öğrenciler",
    value: (campaign) => (
      <span
        className={`badge ${
          campaign?.targetNewStudentsOnly
            ? "bg-success-subtle text-success"
            : "bg-secondary-subtle text-secondary"
        } fw-semibold`}
      >
        {formatBoolean(campaign?.targetNewStudentsOnly)}
      </span>
    ),
    isShowing: (campaign) => campaign?.targetNewStudentsOnly !== undefined,
  },
  {
    label: "Kardeş İndirimi",
    value: (campaign) => (
      <span
        className={`badge ${
          campaign?.targetSiblingDiscount
            ? "bg-success-subtle text-success"
            : "bg-secondary-subtle text-secondary"
        } fw-semibold`}
      >
        {formatBoolean(campaign?.targetSiblingDiscount)}
      </span>
    ),
    isShowing: (campaign) => campaign?.targetSiblingDiscount !== undefined,
  },
];

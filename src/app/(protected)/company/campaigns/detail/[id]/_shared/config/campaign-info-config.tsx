import React from "react";
import { CampaignDto } from "@/types";
import { formatDate } from "@/utils/format-date";

// Kampanya türü çeviri fonksiyonu
const getCampaignTypeDisplay = (type?: string): string => {
  if (!type) return "Genel";
  switch (type) {
    case "DISCOUNT":
      return "İndirim Kampanyası";
    case "FREE_TRIAL":
      return "Ücretsiz Deneme";
    case "FREE_SERVICE":
      return "Ücretsiz Hizmet";
    case "BONUS":
      return "Bonus Kampanyası";
    case "BONUS_FEATURE":
      return "Bonus Özellik";
    case "EARLY_BIRD":
      return "Erken Kayıt";
    case "REFERRAL":
      return "Referans Kampanyası";
    case "REFERRAL_BONUS":
      return "Tavsiye Bonusu";
    case "SCHOLARSHIP":
      return "Burs";
    case "SIBLING_DISCOUNT":
      return "Kardeş İndirimi";
    case "LOYALTY_REWARD":
      return "Sadakat Ödülü";
    case "NEW_STUDENT":
      return "Yeni Öğrenci";
    case "SEASONAL":
      return "Mevsimlik";
    case "FLASH_SALE":
      return "Flaş İndirim";
    case "BUNDLE_DEAL":
      return "Paket Anlaşma";
    case "LIMITED_TIME":
      return "Sınırlı Süre";
    case "SPECIAL_EVENT":
      return "Özel Etkinlik";
    case "SUMMER_SCHOOL":
      return "Yaz Okulu";
    case "WINTER_CAMP":
      return "Kış Kampı";
    case "INSTALLMENT":
      return "Taksit";
    case "OTHER":
      return "Diğer";
    default:
      return type;
  }
};

// Kalan günleri hesaplama fonksiyonu
const calculateDaysRemaining = (endDate?: string): string => {
  if (!endDate) return "Süresiz";

  try {
    const end = new Date(endDate);
    const now = new Date();
    const diffTime = end.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays <= 0) return "Süresi Dolmuş";
    if (diffDays === 1) return "Son 1 gün";
    if (diffDays <= 7) return `${diffDays} gün kaldı`;
    return `${diffDays} gün kaldı`;
  } catch {
    return "Süresiz";
  }
};

/**
 * Kampanya başlık bilgileri konfigürasyonu (CampaignCard'a ek olarak)
 */
export const campaignInfoConfig = [
  {
    label: "Kalan Süre",
    value: (campaign: CampaignDto) => (
      <div className="d-flex align-items-center gap-8">
        <i
          className={`ph-bold ph-clock text-lg ${
            campaign.isActive ? "text-warning-600" : "text-neutral-400"
          }`}
        ></i>
        <div>
          <span
            className={`fw-bold text-lg ${
              campaign.isActive ? "text-warning-600" : "text-neutral-500"
            }`}
          >
            {campaign.isActive
              ? calculateDaysRemaining(campaign.endDate)
              : "Süresi Dolmuş"}
          </span>
          {campaign.endDate && (
            <div className="text-xs text-neutral-500">
              Bitiş: {formatDate(campaign.endDate)}
            </div>
          )}
        </div>
      </div>
    ),
    isShowing: () => true,
  },
  {
    label: "Kampanya Türü",
    value: (campaign: CampaignDto) => {
      return (
        <div className="d-flex align-items-center gap-8">
          <i className="ph-bold ph-tag text-primary-600 text-lg"></i>
          <span className="text-primary-600 fw-semibold">
            {getCampaignTypeDisplay(campaign.campaignType || "")}
          </span>
        </div>
      );
    },
    isShowing: (campaign: CampaignDto) => !!campaign.campaignType,
  },
  {
    label: "Kampanya Süresi",
    value: (campaign: CampaignDto) => (
      <div className="d-flex align-items-center gap-6">
        <i className="ph-bold ph-calendar text-neutral-400 text-sm"></i>
        <span className="text-sm text-neutral-700 fw-medium">
          {campaign.startDate && formatDate(campaign.startDate)} -{" "}
          {campaign.endDate && formatDate(campaign.endDate)}
        </span>
      </div>
    ),
    isShowing: (campaign: CampaignDto) =>
      !!campaign.startDate && !!campaign.endDate,
  },
  {
    label: "İndirim Bilgisi",
    value: (campaign: CampaignDto) => {
      const getDiscountInfo = () => {
        if (
          campaign.discountType === "PERCENTAGE" &&
          campaign.discountPercentage
        ) {
          return {
            icon: "percent",
            text: `%${campaign.discountPercentage} İndirim`,
            color: "text-success-600",
          };
        }
        if (
          campaign.discountType === "FIXED_AMOUNT" &&
          campaign.discountAmount
        ) {
          return {
            icon: "currency-circle-dollar",
            text: `₺${campaign.discountAmount} İndirim`,
            color: "text-success-600",
          };
        }
        if (campaign.discountType === "FREE_MONTHS") {
          return {
            icon: "gift",
            text: "Ücretsiz Aylar",
            color: "text-info-600",
          };
        }
        if (campaign.discountType === "NO_DISCOUNT") {
          return {
            icon: "x-circle",
            text: "İndirim Yok",
            color: "text-neutral-500",
          };
        }
        return null;
      };

      const discountInfo = getDiscountInfo();
      if (!discountInfo)
        return <span className="text-neutral-500">Belirtilmemiş</span>;

      return (
        <div className="d-flex align-items-center gap-6">
          <i
            className={`ph-bold ph-${discountInfo.icon} text-sm ${discountInfo.color}`}
          ></i>
          <span className={`fw-semibold text-sm ${discountInfo.color}`}>
            {discountInfo.text}
          </span>
        </div>
      );
    },
    isShowing: (campaign: CampaignDto) => !!campaign.discountType,
  },
];

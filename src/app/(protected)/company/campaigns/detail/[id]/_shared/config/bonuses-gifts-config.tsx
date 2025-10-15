import React from "react";
import type { BonusesGiftsItemConfig } from "../types";
import {
  translateArrayItems,
  translateFreeService,
  translateBonusFeature,
  translateGiftItem,
} from "../utils";

/**
 * Hediye ve bonuslar konfigürasyonu
 */
export const bonusesGiftsConfig: BonusesGiftsItemConfig[] = [
  {
    label: "Ücretsiz Hizmetler",
    value: (campaign: any) => {
      if (!campaign?.freeServices) {
        return (
          <span className="text-muted fst-italic">
            Ücretsiz hizmet tanımlanmamış
          </span>
        );
      }

      const translatedServices = translateArrayItems(
        campaign.freeServices,
        translateFreeService
      );

      if (translatedServices.length === 0) {
        return (
          <span className="text-neutral-600">{campaign.freeServices}</span>
        );
      }

      return (
        <div className="d-flex flex-wrap gap-2">
          {translatedServices.map((service: string, index: number) => (
            <span
              key={index}
              className="badge bg-success-subtle text-success fw-semibold"
            >
              <i className="ph ph-gift me-1"></i>
              {service}
            </span>
          ))}
        </div>
      );
    },
    isShowing: (campaign: any) => !!campaign?.freeServices,
  },
  {
    label: "Bonus Özellikler",
    value: (campaign: any) => {
      if (!campaign?.bonusFeatures) {
        return (
          <span className="text-muted fst-italic">
            Bonus özellik tanımlanmamış
          </span>
        );
      }

      const translatedFeatures = translateArrayItems(
        campaign.bonusFeatures,
        translateBonusFeature
      );

      if (translatedFeatures.length === 0) {
        return (
          <span className="text-neutral-600">{campaign.bonusFeatures}</span>
        );
      }

      return (
        <div className="d-flex flex-wrap gap-2">
          {translatedFeatures.map((feature: string, index: number) => (
            <span
              key={index}
              className="badge bg-info-subtle text-info fw-semibold"
            >
              <i className="ph ph-star me-1"></i>
              {feature}
            </span>
          ))}
        </div>
      );
    },
    isShowing: (campaign: any) => !!campaign?.bonusFeatures,
  },
  {
    label: "Hediye Eşyalar",
    value: (campaign: any) => {
      if (!campaign?.giftItems) {
        return (
          <span className="text-muted fst-italic">
            Hediye eşya tanımlanmamış
          </span>
        );
      }

      const translatedGifts = translateArrayItems(
        campaign.giftItems,
        translateGiftItem
      );

      if (translatedGifts.length === 0) {
        return <span className="text-neutral-600">{campaign.giftItems}</span>;
      }

      return (
        <div className="d-flex flex-wrap gap-2">
          {translatedGifts.map((gift: string, index: number) => (
            <span
              key={index}
              className="badge bg-warning-subtle text-warning fw-semibold"
            >
              <i className="ph ph-package me-1"></i>
              {gift}
            </span>
          ))}
        </div>
      );
    },
    isShowing: (campaign: any) => !!campaign?.giftItems,
  },
  {
    label: "Ücretsiz Deneme Süresi",
    value: (campaign: any) => (
      <span className="fw-semibold text-info-600">
        <i className="ph ph-clock me-1"></i>
        {campaign?.freeTrialDays} gün ücretsiz deneme
      </span>
    ),
    isShowing: (campaign: any) =>
      !!campaign?.freeTrialDays && campaign.freeTrialDays > 0,
  },
  {
    label: "Taksit Seçenekleri",
    value: (campaign: any) => (
      <div className="bg-info-50 p-3 rounded border-start border-info-300 border-3">
        <div className="d-flex align-items-center mb-2">
          <i className="ph ph-credit-card text-info-600 me-2 fs-5"></i>
          <strong className="text-info-700">Taksit Seçenekleri</strong>
        </div>
        <p className="mb-0 text-info-600">{campaign?.installmentOptions}</p>
      </div>
    ),
    isShowing: (campaign: any) => !!campaign?.installmentOptions,
  },
  {
    label: "İade Politikası",
    value: (campaign: any) => (
      <div className="bg-warning-50 p-3 rounded border-start border-warning-300 border-3">
        <div className="d-flex align-items-center mb-2">
          <i className="ph ph-shield-check text-warning-600 me-2 fs-5"></i>
          <strong className="text-warning-700">İade Politikası</strong>
        </div>
        <p className="mb-0 text-warning-600">{campaign?.refundPolicy}</p>
      </div>
    ),
    isShowing: (campaign: any) => !!campaign?.refundPolicy,
  },
];

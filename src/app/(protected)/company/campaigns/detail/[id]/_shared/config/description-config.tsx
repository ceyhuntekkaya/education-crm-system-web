import React from "react";
import type { DescriptionItemConfig } from "../types";
import {
  translateFreeService,
  translateBonusFeature,
  translateGiftItem,
  translateArrayItems,
} from "../utils";

/**
 * Açıklama bilgileri konfigürasyonu
 */
export const descriptionConfig: DescriptionItemConfig[] = [
  {
    label: "Açıklama",
    value: (campaign) => (
      <div className="text-secondary" style={{ maxWidth: "600px" }}>
        {campaign?.description}
      </div>
    ),
    isShowing: (campaign) => !!campaign?.description,
  },
  {
    label: "Kısa Açıklama",
    value: (campaign) => (
      <div className="text-muted" style={{ maxWidth: "500px" }}>
        {campaign?.shortDescription}
      </div>
    ),
    isShowing: (campaign) => !!campaign?.shortDescription,
  },
  {
    label: "Şartlar ve Koşullar",
    value: (campaign) => (
      <div className="text-secondary small" style={{ maxWidth: "600px" }}>
        {campaign?.termsAndConditions}
      </div>
    ),
    isShowing: (campaign) => !!campaign?.termsAndConditions,
  },
  {
    label: "Ek Bilgiler",
    value: (campaign) => (
      <div className="text-muted small" style={{ maxWidth: "600px" }}>
        {campaign?.finePrint}
      </div>
    ),
    isShowing: (campaign) => !!campaign?.finePrint,
  },
  {
    label: "İstisnalar",
    value: (campaign) => (
      <div className="text-warning small" style={{ maxWidth: "600px" }}>
        <strong>İstisnalar:</strong>
        <br />
        {campaign?.exclusions}
      </div>
    ),
    isShowing: (campaign) => !!campaign?.exclusions,
  },
  {
    label: "Ücretsiz Hizmetler",
    value: (campaign) => {
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
    isShowing: (campaign) => !!campaign?.freeServices,
  },
  {
    label: "Bonus Özellikler",
    value: (campaign) => {
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
              className="badge bg-primary-subtle text-primary fw-semibold"
            >
              <i className="ph ph-star me-1"></i>
              {feature}
            </span>
          ))}
        </div>
      );
    },
    isShowing: (campaign) => !!campaign?.bonusFeatures,
  },
  {
    label: "Hediye Ürünler",
    value: (campaign) => {
      if (!campaign?.giftItems) {
        return (
          <span className="text-muted fst-italic">
            Hediye ürün tanımlanmamış
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
    isShowing: (campaign) => !!campaign?.giftItems,
  },
];

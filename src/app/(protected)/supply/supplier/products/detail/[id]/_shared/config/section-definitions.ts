import type { SectionConfig } from "../types";
import {
  basicInfoConfig,
  stockInfoConfig,
  priceInfoConfig,
  additionalInfoConfig,
} from "./";

/**
 * Ana product section'ları tanımlar
 * Not: Tedarikçi Bilgileri section'ı dinamik olarak supplier verisi ile oluşturulur
 */
export const PRODUCT_SECTIONS: SectionConfig[] = [
  {
    title: "Temel Bilgiler",
    titleColor: "text-primary-600",
    titleIcon: "ph-bold ph-info",
    config: basicInfoConfig,
  },
  {
    title: "Stok Bilgileri",
    titleColor: "text-warning-600",
    titleIcon: "ph-bold ph-package",
    config: stockInfoConfig,
  },
  {
    title: "Fiyat Bilgileri",
    titleColor: "text-success-600",
    titleIcon: "ph-bold ph-currency-circle-dollar",
    config: priceInfoConfig,
  },
  {
    title: "Ek Bilgiler",
    titleColor: "text-neutral-600",
    titleIcon: "ph-bold ph-note",
    config: additionalInfoConfig,
  },
];

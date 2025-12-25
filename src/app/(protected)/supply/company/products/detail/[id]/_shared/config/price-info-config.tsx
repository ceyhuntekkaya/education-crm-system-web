import React from "react";
import type { PriceInfoItemConfig } from "../types";
import { ProductDtoCurrency } from "@/types";

/**
 * Para birimi formatla
 */
const formatCurrency = (amount?: number, currency?: string): string => {
  if (amount === undefined) return "Belirtilmemiş";

  const currencySymbols: Record<string, string> = {
    [ProductDtoCurrency.TRY]: "₺",
    [ProductDtoCurrency.USD]: "$",
    [ProductDtoCurrency.EUR]: "€",
    [ProductDtoCurrency.GBP]: "£",
    [ProductDtoCurrency.CHF]: "CHF",
    [ProductDtoCurrency.CAD]: "C$",
    [ProductDtoCurrency.AUD]: "A$",
    [ProductDtoCurrency.JPY]: "¥",
    [ProductDtoCurrency.CNY]: "¥",
    [ProductDtoCurrency.RUB]: "₽",
    [ProductDtoCurrency.SAR]: "﷼",
    [ProductDtoCurrency.AED]: "د.إ",
    [ProductDtoCurrency.QAR]: "﷼",
    [ProductDtoCurrency.KWD]: "د.ك",
    [ProductDtoCurrency.BHD]: "د.ب",
  };

  const symbol = currency ? currencySymbols[currency] || currency : "₺";
  const formattedAmount = new Intl.NumberFormat("tr-TR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);

  return `${formattedAmount} ${symbol}`;
};

/**
 * Vergi dahil fiyat hesapla
 */
const calculatePriceWithTax = (
  basePrice?: number,
  taxRate?: number
): number | undefined => {
  if (basePrice === undefined) return undefined;
  const rate = taxRate || 0;
  return basePrice * (1 + rate / 100);
};

/**
 * Fiyat bilgileri konfigürasyonu
 */
export const priceInfoConfig: PriceInfoItemConfig[] = [
  {
    label: "Birim Fiyat (KDV Hariç)",
    value: (product) => (
      <span className="fw-semibold text-primary-600">
        {formatCurrency(product?.basePrice, product?.currency)}
      </span>
    ),
    isShowing: () => true,
  },
  {
    label: "KDV Oranı",
    value: (product) => (
      <span className="text-neutral-700">
        {product?.taxRate !== undefined
          ? `%${product.taxRate}`
          : "Belirtilmemiş"}
      </span>
    ),
    isShowing: (product) => product?.taxRate !== undefined,
  },
  {
    label: "Birim Fiyat (KDV Dahil)",
    value: (product) => {
      const priceWithTax = calculatePriceWithTax(
        product?.basePrice,
        product?.taxRate
      );
      return (
        <span className="fw-semibold text-success-600">
          {formatCurrency(priceWithTax, product?.currency)}
        </span>
      );
    },
    isShowing: (product) => product?.basePrice !== undefined,
  },
  {
    label: "Para Birimi",
    value: (product) => (
      <span className="text-neutral-700">{product?.currency || "TRY"}</span>
    ),
    isShowing: (product) => !!product?.currency,
  },
];

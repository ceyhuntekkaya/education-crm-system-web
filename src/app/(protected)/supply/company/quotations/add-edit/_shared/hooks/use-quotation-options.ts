"use client";

import { useMemo } from "react";
import { QuotationCreateDtoCurrency } from "@/types";
import { UseQuotationOptionsReturn } from "../types";

/**
 * Quotation form için enum options hook'u
 * Social media usePostOptions yapısı ile aynı mimari
 */
export const useQuotationOptions = (): UseQuotationOptionsReturn => {
  // Currency options - QuotationCreateDtoCurrency kullanıyoruz
  const currencyOptions = useMemo(
    () =>
      Object.values(QuotationCreateDtoCurrency).map((value) => ({
        value: value,
        label: value,
      })),
    []
  );

  return {
    currencyOptions,
  };
};

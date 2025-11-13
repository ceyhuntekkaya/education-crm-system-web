"use client";

import React from "react";
import { PricingDetailProvider } from "./_shared";
import { validatePricingId } from "./_shared/utils";
import { useCompany } from "@/app/(protected)/company/_shared";

interface PricingDetailLayoutProps {
  children: React.ReactNode;
  params: { id: string };
}

/**
 * Pricing detail sayfaları için layout
 * Context provider ve ID validasyonu sağlar
 */
const PricingDetailLayout: React.FC<PricingDetailLayoutProps> = ({
  children,
  params,
}) => {
  const { selectedSchool, isInitialized } = useCompany();

  // URL'den gelen ID'yi kontrol et, yoksa selectedSchool.id'yi kullan
  const pricingId = validatePricingId(params.id) ?? selectedSchool?.id;

  // Company context henüz yüklenmediyse bekle
  if (!isInitialized) {
    return null;
  }

  // ID yoksa bile devam et, CustomCard içinde empty state gösterilecek
  return (
    <PricingDetailProvider pricingId={pricingId ?? 0}>
      {children}
    </PricingDetailProvider>
  );
};

export default PricingDetailLayout;

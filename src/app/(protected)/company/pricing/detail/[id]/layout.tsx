"use client";

import React from "react";
import { notFound } from "next/navigation";
import { PricingDetailProvider } from "./_shared";
import { validatePricingId } from "./_shared/utils";

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
  const pricingId = validatePricingId(params.id);

  // Geçersiz ID durumunda 404 sayfasına yönlendir
  if (!pricingId) {
    notFound();
  }

  return (
    <PricingDetailProvider pricingId={pricingId}>
      {children}
    </PricingDetailProvider>
  );
};

export default PricingDetailLayout;

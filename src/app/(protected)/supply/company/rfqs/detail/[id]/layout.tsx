"use client";

import React from "react";
import { RFQDetailProvider } from "./_shared";
import { validateRFQId } from "./_shared/utils";

interface RFQDetailLayoutProps {
  children: React.ReactNode;
  params: { id: string };
}

/**
 * RFQ detail sayfaları için layout
 * Context provider ve ID validasyonu sağlar
 */
const RFQDetailLayout: React.FC<RFQDetailLayoutProps> = ({
  children,
  params,
}) => {
  // URL'den gelen ID'yi kontrol et
  const rfqId = validateRFQId(params.id);

  // ID yoksa veya geçersizse bile devam et, empty state gösterilecek
  return <RFQDetailProvider rfqId={rfqId ?? 0}>{children}</RFQDetailProvider>;
};

export default RFQDetailLayout;

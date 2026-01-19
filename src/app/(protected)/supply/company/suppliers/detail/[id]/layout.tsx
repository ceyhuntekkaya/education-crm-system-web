"use client";

import React from "react";
import { SupplierDetailProvider } from "./_shared";
import { validateSupplierId } from "./_shared/utils";

interface SupplierDetailLayoutProps {
  children: React.ReactNode;
  params: { id: string };
}

/**
 * Supplier detail sayfaları için layout
 * Context provider ve ID validasyonu sağlar
 */
const SupplierDetailLayout: React.FC<SupplierDetailLayoutProps> = ({
  children,
  params,
}) => {
  // URL'den gelen ID'yi kontrol et
  const supplierId = validateSupplierId(params.id);

  // ID yoksa veya geçersizse bile devam et, empty state gösterilecek
  return (
    <SupplierDetailProvider supplierId={supplierId ?? 0}>
      {children}
    </SupplierDetailProvider>
  );
};

export default SupplierDetailLayout;

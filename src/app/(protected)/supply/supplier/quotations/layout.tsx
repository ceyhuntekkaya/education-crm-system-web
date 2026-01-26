"use client";

import React from "react";
import { QuotationsProvider } from "./_shared";

export default function SupplierQuotationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // TODO: supplierId'yi context'ten veya props'tan al
  // Şimdilik örnek bir değer kullanıyoruz
  const supplierId = 1;

  return (
    <QuotationsProvider supplierId={supplierId}>{children}</QuotationsProvider>
  );
}

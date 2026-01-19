"use client";

import React from "react";
import { ProductsProvider } from "./_shared";

export default function SupplierProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // TODO: supplierId'yi context'ten veya props'tan al
  // Şimdilik örnek bir değer kullanıyoruz
  const supplierId = 1;

  return (
    <ProductsProvider supplierId={supplierId}>{children}</ProductsProvider>
  );
}

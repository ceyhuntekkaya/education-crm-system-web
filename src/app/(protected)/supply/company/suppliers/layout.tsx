"use client";

import React from "react";
import { SuppliersProvider } from "./_shared";

export default function SuppliersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // TODO: companyId'yi context'ten veya props'tan al
  // Şimdilik örnek bir değer kullanıyoruz
  const companyId = 1;

  return (
    <SuppliersProvider companyId={companyId}>{children}</SuppliersProvider>
  );
}

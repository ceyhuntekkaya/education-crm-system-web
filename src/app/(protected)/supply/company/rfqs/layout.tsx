"use client";

import React from "react";
import { QuotationsProvider } from "./_shared";

export default function RFQsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // TODO: companyId'yi context'ten veya props'tan al
  // Şimdilik örnek bir değer kullanıyoruz
  const companyId = 1;

  return (
    <QuotationsProvider companyId={companyId}>{children}</QuotationsProvider>
  );
}

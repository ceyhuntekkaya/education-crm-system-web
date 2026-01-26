"use client";

import React from "react";
import { SupplierRFQsProvider } from "./_shared";

export default function SupplierRFQsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SupplierRFQsProvider>{children}</SupplierRFQsProvider>;
}

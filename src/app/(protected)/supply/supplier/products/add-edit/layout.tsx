"use client";

import React from "react";
import { ProductAddEditProvider } from "./_shared";
import { CompanyProvider } from "@/app/(protected)/company/_shared";

export default function ProductAddEditLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CompanyProvider>
      <ProductAddEditProvider>{children}</ProductAddEditProvider>
    </CompanyProvider>
  );
}

"use client";

import React from "react";
import { QuotationItemAddEditProvider } from "./_shared";

export default function QuotationItemAddEditLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QuotationItemAddEditProvider>{children}</QuotationItemAddEditProvider>
  );
}

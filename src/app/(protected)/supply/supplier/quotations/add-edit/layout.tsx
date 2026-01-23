"use client";

import React from "react";
import { QuotationAddEditProvider } from "./_shared";

export default function QuotationAddEditLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <QuotationAddEditProvider>{children}</QuotationAddEditProvider>;
}

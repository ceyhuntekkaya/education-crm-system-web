"use client";

import React from "react";
import { RFQItemAddEditProvider } from "./_shared";

export default function RFQItemAddEditLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <RFQItemAddEditProvider>{children}</RFQItemAddEditProvider>;
}

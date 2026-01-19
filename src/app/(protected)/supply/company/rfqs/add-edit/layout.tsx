"use client";

import React from "react";
import { RFQAddEditProvider } from "./_shared";

export default function RFQAddEditLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <RFQAddEditProvider>{children}</RFQAddEditProvider>;
}

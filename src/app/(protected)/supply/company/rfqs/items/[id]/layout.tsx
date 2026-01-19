"use client";

import React from "react";
import { RFQItemsProvider } from "./_shared";

export default function RFQItemsLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  const rfqId = parseInt(params.id);

  return <RFQItemsProvider rfqId={rfqId}>{children}</RFQItemsProvider>;
}

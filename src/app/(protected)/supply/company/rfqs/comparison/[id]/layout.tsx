"use client";

import React from "react";
import { ComparisonProvider } from "./_shared";

export default function ComparisonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ComparisonProvider>{children}</ComparisonProvider>;
}

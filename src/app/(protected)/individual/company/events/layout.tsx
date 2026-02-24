"use client";

import React from "react";
import { CompanyEventsProvider } from "@/app/(protected)/individual/company/events/_shared";

export default function CompanyEventsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <CompanyEventsProvider>{children}</CompanyEventsProvider>;
}

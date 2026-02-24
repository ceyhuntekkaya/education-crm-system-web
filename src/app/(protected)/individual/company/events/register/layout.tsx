"use client";

import React from "react";
import { EventRegistrationAddProvider } from "@/app/(protected)/individual/company/events/register/_shared";

/**
 * Etkinliğe kayıt sayfası layout (Company)
 */
export default function CompanyEventRegistrationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <EventRegistrationAddProvider>{children}</EventRegistrationAddProvider>
  );
}

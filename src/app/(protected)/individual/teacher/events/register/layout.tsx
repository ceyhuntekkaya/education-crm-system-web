"use client";

import React from "react";
import { EventRegistrationAddProvider } from "./_shared";

/**
 * Etkinliğe kayıt sayfası layout
 */
export default function EventRegistrationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <EventRegistrationAddProvider>{children}</EventRegistrationAddProvider>
  );
}

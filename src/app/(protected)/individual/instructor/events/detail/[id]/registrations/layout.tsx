"use client";

import React from "react";
import { RegistrationsProvider } from "./_shared";

export default function RegistrationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <RegistrationsProvider>{children}</RegistrationsProvider>;
}

"use client";

import React from "react";
import { OrganizersProvider } from "./_shared";

export default function CompanyOrganizersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <OrganizersProvider>{children}</OrganizersProvider>;
}

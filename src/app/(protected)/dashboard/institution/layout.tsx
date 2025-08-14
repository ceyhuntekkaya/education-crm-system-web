"use client";

import { ProtectedRouteProvider } from "@/providers";
import { ROLES } from "@/types/roles";

export default function InstitutionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRouteProvider roles={[ROLES.INSTITUTION]}>
      {children}
    </ProtectedRouteProvider>
  );
}

"use client";

import { ProtectedRouteProvider } from "@/providers";
import { ROLES } from "@/types/roles";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRouteProvider roles={[ROLES.ADMIN]}>
      {children}
    </ProtectedRouteProvider>
  );
}

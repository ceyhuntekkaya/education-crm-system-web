"use client";

import { ProtectedRouteProvider } from "@/providers";
import { ROLES } from "@/types/roles";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRouteProvider roles={[ROLES.USER]}>
      {children}
    </ProtectedRouteProvider>
  );
}

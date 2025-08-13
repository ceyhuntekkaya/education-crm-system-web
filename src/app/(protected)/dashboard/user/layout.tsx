"use client";

import ProtectedRoute from "@/components/protected-route";
import { ROLES } from "@/types/roles";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ProtectedRoute roles={[ROLES.USER]}>{children}</ProtectedRoute>;
}

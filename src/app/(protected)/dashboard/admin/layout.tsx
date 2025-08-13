"use client";

import ProtectedRoute from "@/components/protected-route";
import { ROLES } from "@/types/roles";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ProtectedRoute roles={[ROLES.ADMIN]}>{children}</ProtectedRoute>;
}

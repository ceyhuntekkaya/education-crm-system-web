"use client";

import React from "react";
import { DashboardProvider } from "./_shared";

const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // TODO: Auth context'ten gerçek companyId al
  // const { user } = useAuth();
  // const companyId = user?.companyId || null;
  const companyId = 1; // Mock company ID

  return (
    <DashboardProvider companyId={companyId}>
      <>{children}</>
    </DashboardProvider>
  );
};

export default DashboardLayout;

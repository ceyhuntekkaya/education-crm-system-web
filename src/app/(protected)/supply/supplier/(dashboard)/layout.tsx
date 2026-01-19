"use client";

import React from "react";
import { DashboardProvider } from "./_shared";

const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // TODO: Auth context'ten gerçek supplierId al
  // const { user } = useAuth();
  // const supplierId = user?.supplierId || null;
  const supplierId = 1; // Mock supplier ID

  return (
    <DashboardProvider supplierId={supplierId}>
      <>{children}</>
    </DashboardProvider>
  );
};

export default DashboardLayout;

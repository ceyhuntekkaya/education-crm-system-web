"use client";

import React from "react";
import { CustomCard } from "@/components";
import { usePageTitle } from "@/hooks";
import { StatsCards } from "./_shared/sections";

const SupplyCompanyDashboardPage: React.FC = () => {
  usePageTitle("Kurum Tedarik Yönetimi");

  return (
    <>
      {/* Header with CustomCard */}
      <CustomCard
        title="Kurum Tedarik Yönetimi"
        subtitle="Tüm tedarik süreçlerinizi tek yerden yönetin"
      >
        <StatsCards />
      </CustomCard>
    </>
  );
};

export default SupplyCompanyDashboardPage;

"use client";

import React from "react";
import { CustomCard } from "@/components";
import { usePageTitle } from "@/hooks";
import { StatsCards, OrderTable } from "./_shared/sections";

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

      {/* Son Siparişler Tablosu */}
      <CustomCard
        title="Son Siparişler"
        subtitle="Aktif siparişlerinizin listesi"
        className="mt-4"
      >
        <OrderTable />
      </CustomCard>
    </>
  );
};

export default SupplyCompanyDashboardPage;

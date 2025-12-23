"use client";

import React from "react";
import { CustomCard } from "@/components";
import { usePageTitle } from "@/hooks";
import { StatsCards, OrderTable } from "./_shared/sections";

const SupplyCompanyDashboardPage: React.FC = () => {
  usePageTitle("Kurum Tedarik Yönetimi");

  return (
    <div className="d-flex flex-column gap-32">
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
        subtitle="En son oluşturulan siparişlerinizin detaylarını görüntüleyin"
      >
        <OrderTable />
      </CustomCard>
    </div>
  );
};

export default SupplyCompanyDashboardPage;

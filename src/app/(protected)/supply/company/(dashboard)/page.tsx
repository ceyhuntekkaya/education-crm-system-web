"use client";

import React from "react";
import { CustomCard } from "@/components";
import { usePageTitle } from "@/hooks";
import {
  StatsCards,
  OrderTable,
  RFQTable,
  QuickActions,
} from "./_shared/sections";

const SupplyCompanyDashboardPage: React.FC = () => {
  usePageTitle("Kurum Tedarik Yönetimi");

  return (
    <div className="d-flex flex-column gap-24">
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
        subtitle="En son oluşturulan 5 siparişinizi görüntüleyin"
      >
        <OrderTable />
      </CustomCard>

      {/* Aktif Alım İlanı Listesi Tablosu */}
      <CustomCard
        title="Aktif Alım İlanı Listesi"
        subtitle="Tüm aktif alım ilanlarınızı görüntüleyin"
      >
        <RFQTable />
      </CustomCard>

      {/* Quick Actions */}
      <CustomCard
        title="Hızlı Yönlendirme"
        subtitle="Sık kullanılan sayfalara hızlıca erişin"
      >
        <QuickActions />
      </CustomCard>
    </div>
  );
};

export default SupplyCompanyDashboardPage;

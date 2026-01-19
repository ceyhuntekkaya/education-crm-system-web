"use client";

import React from "react";
import { CustomCard } from "@/components";
import { usePageTitle } from "@/hooks";
import { StatsCards, QuickActions } from "./_shared/sections";

const SupplierDashboardPage: React.FC = () => {
  usePageTitle("Tedarikçi Dashboard");

  return (
    <div className="d-flex flex-column gap-24">
      {/* Header with Stats Cards */}
      <CustomCard
        title="Tedarikçi Dashboard"
        subtitle="Tedarikçi portalına hoş geldiniz. Tüm istatistiklerinizi ve performansınızı buradan takip edebilirsiniz."
      >
        <StatsCards />
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

export default SupplierDashboardPage;

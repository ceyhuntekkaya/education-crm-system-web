"use client";

import React from "react";
import { CustomCard } from "@/components";
import { usePageTitle } from "@/hooks";
import {
  StatsCards,
  QuickActions,
  OrderTable,
  QuotationTable,
} from "./_shared/sections";

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

      {/* Recent Orders */}
      <CustomCard title="Son Siparişler" subtitle="En son aldığınız siparişler">
        <OrderTable />
      </CustomCard>

      {/* Pending Quotations */}
      <CustomCard
        title="Bekleyen Teklifler"
        subtitle="İşleme alınmayı bekleyen teklifleriniz"
      >
        <QuotationTable />
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

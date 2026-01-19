"use client";

import React from "react";
import { ActiveQuotationsCard } from "./active-quotations-card";
import { OrderStatsCard } from "./order-stats-card";
import { ProductPerformanceCard } from "./product-performance-card";

/**
 * Dashboard istatistik kartları komponenti (Supplier)
 * Aktif Teklifler, Sipariş İstatistikleri ve Ürün Performansı kartlarını gösterir
 */
export const StatsCards: React.FC = () => {
  return (
    <div className="row">
      <div className="col-4">
        <ActiveQuotationsCard />
      </div>
      <div className="col-4">
        <OrderStatsCard />
      </div>
      <div className="col-4">
        <ProductPerformanceCard />
      </div>
    </div>
  );
};

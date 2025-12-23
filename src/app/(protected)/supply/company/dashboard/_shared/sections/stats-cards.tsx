"use client";

import React from "react";
import { ActiveOrdersCard } from "./active-orders-card";
import { PendingQuotationsCard } from "./pending-quotations-card";

/**
 * Dashboard istatistik kartları komponenti
 * Aktif Siparişler ve Bekleyen Teklifler kartlarını gösterir
 */
export const StatsCards: React.FC = () => {
  return (
    <div className="row">
      <div className="col-4">
        <ActiveOrdersCard />
      </div>
      <div className="col-4">
        <PendingQuotationsCard />
      </div>
    </div>
  );
};

"use client";

import React from "react";
import { ActiveOrdersCard } from "./active-orders-card";
import { PendingQuotationsCard } from "./pending-quotations-card";
import { ActiveRFQsCard } from "./active-rfqs-card";

/**
 * Dashboard istatistik kartları komponenti
 * Aktif Siparişler, Bekleyen Teklifler ve Aktif İlanlar kartlarını gösterir
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
      <div className="col-4">
        <ActiveRFQsCard />
      </div>
    </div>
  );
};

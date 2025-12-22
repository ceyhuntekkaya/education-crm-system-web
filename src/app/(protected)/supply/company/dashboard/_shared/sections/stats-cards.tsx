"use client";

import React from "react";
import { ActiveOrdersCard } from "./active-orders-card";

/**
 * Dashboard istatistik kartları komponenti
 * Sadece Aktif Siparişler kartını gösterir
 */
export const StatsCards: React.FC = () => {
  return (
    <div className="row">
      <div className="col-4">
        <ActiveOrdersCard />
      </div>
    </div>
  );
};
